---
sidebar_position: 2
sidebar_label: "Maintenance"
---

# Maintenance et Backup

Procédures de maintenance régulière et stratégies de backup pour l'infrastructure Olympus Lab.

## Vue d'ensemble

### Composants critiques à maintenir

1. **Proxmox VE** (fox-factory)
2. **OPNsense** (Olympus - VM 100)
3. **Cloudflare Tunnel** (Hermes - CT 202)
4. **Configurations firewall**
5. **Documentation**

### Philosophie

- **Prévention** : Mises à jour régulières pour éviter les failles de sécurité
- **Backup** : Toujours avoir un plan B
- **Documentation** : Chaque modification est documentée
- **Testing** : Tester avant de déployer en production

---

## Calendrier de maintenance

### Hebdomadaire

**Dimanche soir (ou moment calme)** :

- ✅ Vérifier l'état des services (Proxmox, OPNsense, Tunnel)
- ✅ Consulter les logs Cloudflare Access
- ✅ Vérifier l'espace disque

**Temps estimé** : 10-15 minutes

### Mensuel

**Premier dimanche du mois** :

- ✅ Mettre à jour Proxmox
- ✅ Mettre à jour OPNsense
- ✅ Mettre à jour le container Cloudflare Tunnel
- ✅ Backup des configurations
- ✅ Vérifier les règles firewall (supprimer l'inutile)
- ✅ Tester les accès distants

**Temps estimé** : 1-2 heures

### Trimestriel

**Début de chaque trimestre** :

- ✅ Audit de sécurité complet
- ✅ Review des logs sur 3 mois
- ✅ Mettre à jour la documentation
- ✅ Tester la restauration des backups
- ✅ Planifier les évolutions (nouvelles VMs, services)

**Temps estimé** : 2-3 heures

---

## Mises à jour

### Proxmox VE

#### Vérification des mises à jour
```bash
# SSH vers Proxmox
ssh root@192.168.1.51

# Vérifier les updates disponibles
apt update
apt list --upgradable
```

#### Mise à jour
```bash
# Mettre à jour les packages
apt update
apt dist-upgrade -y

# Si le kernel est mis à jour, redémarrer
reboot
```

**Après reboot** :
```bash
# Vérifier la version
pveversion

# Vérifier que tout fonctionne
pct list
qm list
```

#### Via l'interface Web

1. https://proxmox.olympus-lab.org
2. **Node (fox-factory)** → **Updates**
3. **Refresh**
4. **Upgrade** (si updates disponibles)
5. **Reboot** si nécessaire

**Fréquence** : Mensuel

---

### OPNsense

#### Via l'interface Web

1. https://opnsense.olympus-lab.org
2. **System** → **Firmware** → **Status**
3. **Check for updates**
4. Si updates disponibles :
   - **Download** → Attendre
   - **Install** → Confirmer
   - **Reboot** automatique après installation

**Durée** : 5-10 minutes (le firewall redémarre)

**⚠️ Important** : Prévoir une fenêtre de maintenance car **tout l'accès Internet est coupé pendant le reboot**.

**Fréquence** : Mensuel

#### Backup avant update

**TOUJOURS** faire un backup avant une mise à jour OPNsense :
```
System → Configuration → Backups → Download configuration
```

Sauvegarder le fichier XML localement.

---

### Container Cloudflare Tunnel (Hermes)

#### Mise à jour du système
```bash
# Entrer dans le container
pct enter 202

# Mettre à jour Ubuntu
apt update && apt upgrade -y

# Sortir
exit
```

#### Mise à jour de cloudflared
```bash
# Entrer dans le container
pct enter 202

# Télécharger la dernière version
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /tmp/cloudflared

# Remplacer l'ancien
mv /tmp/cloudflared /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Vérifier la version
cloudflared --version

# Redémarrer le service
systemctl restart cloudflared

# Vérifier que tout fonctionne
systemctl status cloudflared
journalctl -u cloudflared -n 20
```

**Statut attendu** : 4 connexions établies ✅

**Fréquence** : Mensuel

---

## Stratégie de backup

### Priorités de backup

**Critique (journalier recommandé)** :
1. Configuration OPNsense
2. Configuration Cloudflare Tunnel
3. Snapshots des VMs critiques

**Important (hebdomadaire)** :
4. Containers LXC
5. Configuration Proxmox

**Optionnel (mensuel)** :
6. VMs de développement/test

---

### Backup OPNsense

#### Backup manuel

**Via l'interface Web** :
```
System → Configuration → Backups → Download configuration
```

**Fichier** : `config-fox-factory.localdomain-YYYYMMDD.xml`

**Sauvegarde** : Sur ton PC dans un dossier dédié
```
C:\Backups\olympus-lab\opnsense\
```

#### Backup automatique (à configurer)

OPNsense peut envoyer des backups automatiques :
```
System → Configuration → Backups → Enable automatic backup
Destination: Email, FTP, etc.
```

**Fréquence recommandée** : Hebdomadaire

#### Restauration
```
System → Configuration → Backups
    ↓
Choose file (XML)
    ↓
Restore configuration
    ↓
Reboot
```

---

### Backup Cloudflare Tunnel

#### Fichiers critiques
```
/etc/cloudflared/config.yml
/etc/cloudflared/f7fedba1-6be1-4408-a755-e9badd33f9a0.json
```

**⚠️ Le fichier .json est CRITIQUE** : Sans lui, impossible de reconnecter le tunnel !

#### Backup manuel
```bash
# Depuis Proxmox
pct exec 202 -- tar czf /tmp/cloudflared-backup.tar.gz /etc/cloudflared

# Télécharger sur ton PC
pct pull 202 /tmp/cloudflared-backup.tar.gz ~/cloudflared-backup-$(date +%Y%m%d).tar.gz
```

**Sauvegarde** : Sur ton PC + cloud (Google Drive, Dropbox)
```
C:\Backups\olympus-lab\cloudflared\
```

#### Restauration
```bash
# Uploader le backup
pct push 202 ~/cloudflared-backup-YYYYMMDD.tar.gz /tmp/cloudflared-backup.tar.gz

# Extraire
pct exec 202 -- tar xzf /tmp/cloudflared-backup.tar.gz -C /

# Redémarrer le service
pct exec 202 -- systemctl restart cloudflared

# Vérifier
pct exec 202 -- systemctl status cloudflared
```

**Fréquence recommandée** : Après chaque modification de la config

---

### Backup VMs et Containers

#### Snapshots manuels

**Avant une modification importante** :
```bash
# Snapshot d'une VM
qm snapshot 100 pre-update-$(date +%Y%m%d) --description "Avant mise à jour OPNsense"

# Snapshot d'un container
pct snapshot 202 pre-config-change-$(date +%Y%m%d) --description "Avant modif config tunnel"
```

#### Restauration d'un snapshot
```bash
# Lister les snapshots
qm listsnapshot 100

# Restaurer
qm rollback 100 nom-du-snapshot

# Pour container
pct listsnapshot 202
pct rollback 202 nom-du-snapshot
```

#### Backup complet (vzdump)

**Backup d'une VM** :
```bash
# Backup de OPNsense
vzdump 100 --compress zstd --mode snapshot --storage local

# Fichier créé dans /var/lib/vz/dump/
# vzdump-qemu-100-YYYY_MM_DD-HH_MM_SS.vma.zst
```

**Backup d'un container** :
```bash
# Backup du container Cloudflare
vzdump 202 --compress zstd --mode snapshot --storage local
```

**Télécharger le backup** :
```bash
# Sur ton PC
scp root@192.168.1.51:/var/lib/vz/dump/vzdump-*.zst ~/Backups/olympus-lab/
```

**Restauration** :

Via l'interface Web Proxmox :
1. **Datacenter** → **Storage (local)** → **Backups**
2. Sélectionner le backup
3. **Restore**

---

### Backup automatique avec Proxmox

#### Configurer un job de backup

**Via l'interface Web** :
```
Datacenter → Backup → Add
    ↓
Schedule: Daily at 2:00 AM
Selection Mode: Include selected VMs
VMs: 100 (OPNsense), 202 (Hermes)
Storage: local
Compression: ZSTD
Mode: Snapshot
Email notification: [ton email]
    ↓
Create
```

**Résultat** : Backup automatique tous les jours à 2h du matin.

**Rétention** : Configurer la rétention (ex: garder 7 derniers backups)

---

## Monitoring

### Vérifications quotidiennes (automatisable)

#### Espace disque
```bash
# Sur Proxmox
df -h

# Vérifier que / et /var/lib/vz ne sont pas pleins
# Alerte si > 80%
```

#### Services critiques
```bash
# Statut OPNsense
qm status 100
# Doit être "running"

# Statut Cloudflare Tunnel
pct status 202
pct exec 202 -- systemctl status cloudflared
# Doit être "active (running)"
```

#### Connectivité Internet
```bash
# Depuis Proxmox
ping -c 3 1.1.1.1

# Depuis un container en LAN
pct enter 200
ping -c 3 google.com
exit
```

---

### Logs à surveiller

#### Cloudflare Access Logs

**Dashboard** : https://one.dash.cloudflare.com/
```
Logs → Access
    ↓
Voir :
- Tentatives de connexion refusées (suspicious ?)
- Patterns d'accès inhabituels
- Accès depuis des pays inattendus
```

**Alertes à configurer** :
- Email si > 5 tentatives refusées en 1h
- Email si accès depuis un nouveau pays

#### OPNsense Firewall Logs

**Via l'interface Web** :
```
Firewall → Log Files → Live View
    ↓
Filtrer sur "Block"
    ↓
Identifier les patterns suspects :
- Port scanning (nombreux ports différents)
- Brute force SSH (nombreuses tentatives port 22)
- Accès depuis IP suspectes
```

**Action** : Créer des règles de blocage si nécessaire

#### Proxmox Logs
```bash
# Logs système
journalctl -xe

# Logs des VMs
qm showcmd 100

# Logs des containers
pct exec 202 -- journalctl -n 50
```

---

## Nettoyage

### Proxmox

#### Nettoyer les anciens kernels
```bash
# Lister les kernels installés
dpkg --list | grep linux-image

# Supprimer les anciens (garder le current + 1)
apt autoremove -y
```

#### Nettoyer le cache APT
```bash
apt clean
apt autoclean
```

#### Supprimer les anciens backups
```bash
# Lister
ls -lh /var/lib/vz/dump/

# Supprimer manuellement les plus vieux
rm /var/lib/vz/dump/vzdump-qemu-100-OLD_DATE.vma.zst
```

Ou configurer la rétention automatique dans le job de backup.

---

### OPNsense

#### Supprimer les anciens backups config
```
System → Configuration → Backups
    ↓
Liste des backups automatiques
    ↓
Supprimer les plus anciens (garder les 10 derniers)
```

#### Nettoyer les logs

Les logs sont automatiquement rotatés par OPNsense.

**Optionnel** : Réduire la rétention si l'espace disque est limité
```
System → Settings → Logging → Keep logs: 7 days
```

---

## Procédures d'urgence

### OPNsense ne répond plus

#### Symptômes

- Pas d'accès Internet depuis les VMs
- Interface Web inaccessible
- Pas de réponse ping sur 10.0.1.1

#### Solution

**Via console Proxmox** :
```bash
# Vérifier le statut
qm status 100

# Si stopped, démarrer
qm start 100

# Si running mais ne répond pas, redémarrer
qm reboot 100

# En dernier recours, forcer l'arrêt
qm stop 100
qm start 100
```

**Après redémarrage** :

1. Attendre 2-3 minutes (OPNsense boot complet)
2. Tester : `ping 10.0.1.1`
3. Vérifier l'interface Web

**Si ça ne fonctionne toujours pas** : Restaurer depuis backup

---

### Cloudflare Tunnel down

#### Symptômes

- Erreur 1033 sur proxmox.olympus-lab.org
- Pas d'accès aux services

#### Solution
```bash
# Vérifier le container
pct status 202

# Démarrer si arrêté
pct start 202

# Vérifier le service
pct exec 202 -- systemctl status cloudflared

# Redémarrer le service
pct exec 202 -- systemctl restart cloudflared

# Voir les logs
pct exec 202 -- journalctl -u cloudflared -f
```

**Si erreurs dans les logs** :
```bash
# Vérifier la config
pct exec 202 -- cat /etc/cloudflared/config.yml

# Tester manuellement
pct exec 202 -- cloudflared tunnel run opnsense-access
```

---

### Proxmox ne démarre plus

#### Solution

1. **Accès physique** à la machine (ThinkCentre M710S)
2. Brancher un écran + clavier
3. **Boot depuis USB** (clé de rescue)
4. **Monter les disques** et récupérer les configs
5. **Réinstaller Proxmox** si nécessaire
6. **Restaurer depuis backups**

**Prévention** : Avoir une clé USB bootable Proxmox prête

---

## Documentation continue

### Après chaque modification

**Mettre à jour la documentation Docusaurus** :
```powershell
# Sur ton PC
cd C:\Docu

# Éditer les fichiers concernés
code docs\infrastructure\...

# Commit et push
git add .
git commit -m "Update: description de la modification"
git push

# Déploiement automatique via GitHub Actions
# https://docs.olympus-lab.org sera mis à jour automatiquement
```

### Template de note de modification
```markdown
## [Date] - Titre de la modification

**Quoi** : Description de ce qui a été fait

**Pourquoi** : Raison de la modification

**Impact** : Downtime ? Services affectés ?

**Rollback** : Comment revenir en arrière si problème

**Validé par** : Test effectué pour confirmer que ça marche
```

---

## Checklist de maintenance mensuelle
```markdown
## Maintenance [Mois YYYY]

### Avant de commencer
- [ ] Vérifier que c'est un moment calme (pas d'utilisation critique)
- [ ] Prévenir si d'autres utilisent le homelab
- [ ] Avoir les backups à jour

### Proxmox
- [ ] SSH vers Proxmox : `ssh root@192.168.1.51`
- [ ] `apt update && apt dist-upgrade -y`
- [ ] `reboot` si kernel mis à jour
- [ ] Vérifier post-reboot : `pct list`, `qm list`
- [ ] Nettoyer : `apt autoremove -y && apt clean`

### OPNsense
- [ ] https://opnsense.olympus-lab.org
- [ ] System → Configuration → Backups → Download
- [ ] System → Firmware → Check for updates
- [ ] Installer si disponible
- [ ] Tester après reboot : ping, accès web, firewall rules

### Cloudflare Tunnel
- [ ] `pct enter 202`
- [ ] `apt update && apt upgrade -y`
- [ ] Mettre à jour cloudflared (voir procédure ci-dessus)
- [ ] `systemctl restart cloudflared`
- [ ] Vérifier : `systemctl status cloudflared`
- [ ] `exit`

### Backups
- [ ] Backup OPNsense téléchargé et sauvegardé
- [ ] Backup Cloudflare Tunnel : `pct exec 202 -- tar czf /tmp/cf-backup.tar.gz /etc/cloudflared`
- [ ] Snapshots des VMs : `qm snapshot 100 monthly-YYYYMM`

### Vérifications
- [ ] Accès web : https://proxmox.olympus-lab.org ✅
- [ ] Accès web : https://opnsense.olympus-lab.org ✅
- [ ] SSH : `ssh ssh-proxmox` ✅
- [ ] Internet depuis VM LAN : `pct enter 200 && ping 1.1.1.1` ✅
- [ ] Logs Cloudflare : Pas d'alertes suspectes ✅

### Documentation
- [ ] Mettre à jour la doc si modifications
- [ ] Commit + push vers GitHub
- [ ] Vérifier https://docs.olympus-lab.org

### Notes
[Ajouter ici les observations, problèmes rencontrés, etc.]
```

---

## Outils recommandés

### Monitoring (à déployer plus tard)

- **Uptime Kuma** : Monitoring simple des services
- **Grafana + Prometheus** : Métriques détaillées
- **Netdata** : Monitoring temps réel

### Backup

- **Proxmox Backup Server** (PBS) : Solution officielle Proxmox
- **Restic** : Backups chiffrés vers cloud
- **Rclone** : Sync vers Google Drive, Dropbox, etc.

### Documentation

- ✅ **Docusaurus** (déjà en place)
- **Draw.io** : Diagrammes réseau
- **Obsidian** : Notes personnelles markdown

---

## Ressources

- **Proxmox Best Practices** : https://pve.proxmox.com/wiki/Storage
- **OPNsense Docs** : https://docs.opnsense.org/
- **Cloudflare Status** : https://www.cloudflarestatus.com/
- **Backup Strategy Guide** : https://www.backblaze.com/blog/the-3-2-1-backup-strategy/

---

## Règle 3-2-1 pour les backups

**3** copies de tes données :
- 1x Production (sur Proxmox)
- 1x Backup local (snapshots Proxmox)
- 1x Backup distant (cloud)

**2** types de média différents :
- Disque dur local
- Cloud storage

**1** copie off-site :
- Google Drive, Dropbox, ou autre cloud

**Appliquer à** :
- ✅ Configuration OPNsense (critique)
- ✅ Configuration Cloudflare Tunnel (critique)
- ✅ Documentation (GitHub + local)
- ⚠️ VMs complètes (si espace suffisant)