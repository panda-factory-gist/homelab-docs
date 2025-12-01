---
sidebar_position: 4
---

# Cloudflare Tunnel - Hermes

Accès distant sécurisé sans port forwarding, nommé d'après Hermès, le messager des dieux.

## Concept

**Cloudflare Tunnel** crée une connexion sortante chiffrée entre ton homelab et l'edge network de Cloudflare. Aucun port n'est ouvert sur ta box Internet.

### Architecture
```
Internet
    ↓
Cloudflare Edge Network
    ↓
Tunnel chiffré (sortant uniquement)
    ↓
Container Hermes (CT 202)
    ↓
Services internes (Proxmox, OPNsense)
```

### Avantages

- ✅ **Zéro port ouvert** sur la box Internet
- ✅ **IP publique cachée** - personne ne connaît ton IP réelle
- ✅ **Protection DDoS** gratuite
- ✅ **Certificats SSL** automatiques
- ✅ **Authentification** via Cloudflare Access
- ✅ **Logs d'audit** complets
- ✅ **Gratuit** pour usage personnel

---

## Infrastructure

### Container LXC

- **ID** : 202
- **Hostname** : hermes
- **OS** : Ubuntu 24.04
- **RAM** : 256 MB
- **CPU** : 1 core
- **Réseau** : vmbr1 (LAN) - DHCP
- **Service** : cloudflared (systemd)

### Tunnel Cloudflare

- **Tunnel ID** : `[tunnel-uuid]`
- **Tunnel Name** : opnsense-access
- **Domaine** : [your-domain].org

---

## Installation

### Étape 1 : Créer le container
```bash
# Sur Proxmox
pct create 202 \
  local:vztmpl/ubuntu-24.04-standard_24.04-2_amd64.tar.zst \
  --hostname hermes \
  --memory 256 \
  --cores 1 \
  --net0 name=eth0,bridge=vmbr1,ip=dhcp \
  --rootfs local-lvm:4 \
  --unprivileged 1 \
  --password

# Démarrer
pct start 202
```

### Étape 2 : Installer cloudflared
```bash
# Entrer dans le container
pct enter 202

# Mise à jour
apt update && apt upgrade -y

# Installer curl
apt install curl -y

# Télécharger cloudflared
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared

# Rendre exécutable
chmod +x /usr/local/bin/cloudflared

# Vérifier
cloudflared --version
```

### Étape 3 : Se connecter à Cloudflare
```bash
# Ajouter /usr/local/bin au PATH
export PATH=$PATH:/usr/local/bin

# Login Cloudflare (ouvre un lien dans le navigateur)
cloudflared tunnel login
```

**Copie le lien** affiché, ouvre-le dans ton navigateur :
1. Connecte-toi à Cloudflare
2. Sélectionne **[your-domain].org**
3. Clique **Authorize**

Un fichier `cert.pem` est créé dans `/root/.cloudflared/`

---

## Configuration

### Créer les dossiers
```bash
# Créer le dossier de config
mkdir -p /etc/cloudflared

# Copier le certificat
cp /root/.cloudflared/cert.pem /etc/cloudflared/
```

### Créer la configuration
```bash
nano /etc/cloudflared/config.yml
```

**Contenu** :
```yaml
tunnel: [tunnel-uuid]
credentials-file: /etc/cloudflared/[tunnel-uuid].json

ingress:
  - hostname: opnsense.[your-domain].org
    service: https://10.0.1.1
    originServerName: 10.0.1.1
    originRequest:
      noTLSVerify: true
  - hostname: proxmox.[your-domain].org
    service: https://192.168.1.51:8006
    originRequest:
      noTLSVerify: true
  - hostname: ssh-proxmox.[your-domain].org
    service: ssh://192.168.1.51:22
  - service: http_status:404
```

### Récupérer les credentials
```bash
# Télécharger les credentials du tunnel
cloudflared tunnel token --cred-file /etc/cloudflared/f7fedba1-6be1-4408-a755-e9badd33f9a0.json f7fedba1-6be1-4408-a755-e9badd33f9a0
```

---

## Service systemd

### Créer le service
```bash
nano /etc/systemd/system/cloudflared.service
```

**Contenu** :
```ini
[Unit]
Description=Cloudflare Tunnel
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/cloudflared tunnel run opnsense-access
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Activer et démarrer
```bash
# Recharger systemd
systemctl daemon-reload

# Activer au démarrage
systemctl enable cloudflared

# Démarrer
systemctl start cloudflared

# Vérifier le statut
systemctl status cloudflared
```

**Statut attendu** :
```
● cloudflared.service - Cloudflare Tunnel
   Active: active (running)
```

### Voir les logs
```bash
# Logs en temps réel
journalctl -u cloudflared -f

# Dernières 50 lignes
journalctl -u cloudflared -n 50
```

**Logs attendus** :
```
Connection established to cftunnel.com
Connection established to cftunnel.com
Connection established to cftunnel.com
Connection established to cftunnel.com
```

**4 connexions = tunnel opérationnel** ✅

---

## DNS Configuration

**Cloudflare Dashboard** → **DNS** → **Records**

Tous les enregistrements pointent vers le tunnel :

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | opnsense | [tunnel-uuid].cfargotunnel.com | ☁️ Proxied |
| CNAME | proxmox | [tunnel-uuid].cfargotunnel.com | ☁️ Proxied |
| CNAME | ssh-proxmox | [tunnel-uuid].cfargotunnel.com | ☁️ Proxied |
| CNAME | docs | [github-user].github.io | ☁️ OFF |

---

## Cloudflare Access (Zero Trust)

**Dashboard** : https://one.dash.cloudflare.com/

### Applications configurées


| Application | URL | Policy |
|-------------|-----|--------|
| OPNsense Admin | opnsense.[your-domain].org | Email authentication |
| Proxmox | proxmox.[your-domain].org | Email authentication |
| SSH Proxmox | ssh-proxmox.[your-domain].org | Email authentication |

### Créer une application

1. **Access** → **Applications** → **Add an application**
2. **Self-hosted**
3. **Application name** : OPNsense Admin
4. **Session duration** : 24 hours
5. **Application domain** : opnsense.[your-domain].org
6. **Next**

**Policy** :
- **Policy name** : Allow my email
- **Action** : Allow
- **Selector** : Emails
- **Value** : ton-email@example.com
- **Add policy** → **Done**

### Session

- **Durée** : 24 heures (configurable)
- **Authentification** : Via email (code OTP)
- **Première connexion** : Code envoyé par email
- **Connexions suivantes** : Cookie de session

---

## Accès SSH via Cloudflare Tunnel

### Sur Windows

#### Installation cloudflared

1. Télécharger : https://github.com/cloudflare/cloudflared/releases/latest
2. Fichier : `cloudflared-windows-amd64.exe`
3. Placer dans : `C:\Program Files\cloudflared\cloudflared.exe`

#### Configuration SSH

Créer/éditer `C:\Users\[TON_USER]\.ssh\config` :
```
Host ssh-proxmox
    HostName ssh-proxmox.[your-domain].org
    User root
    ProxyCommand C:\PROGRA~1\cloudflared\cloudflared.exe access ssh --hostname ssh-proxmox.[your-domain].org
```

#### Utilisation
```powershell
ssh ssh-proxmox
```

La première connexion ouvre le navigateur pour l'authentification Cloudflare Access.

---

## Ajouter un nouveau service

### Exemple : Ajouter GitLab

#### 1. Modifier la config du tunnel
```bash
# Dans le container hermes
pct enter 202

nano /etc/cloudflared/config.yml
```

**Ajouter** avant la dernière ligne :
```yaml
  - hostname: gitlab.[your-domain].org
    service: http://10.0.1.100:80
```

#### 2. Redémarrer le service
```bash
systemctl restart cloudflared

# Vérifier
journalctl -u cloudflared -f
```

#### 3. Créer le DNS record
```bash
cloudflared tunnel route dns opnsense-access gitlab.[your-domain].org
```

Ou manuellement dans Cloudflare Dashboard :
- Type : CNAME
- Name : gitlab
- Target : [tunnel-uuid]
- Proxy : ON ☁️

#### 4. Créer l'application Cloudflare Access

**https://one.dash.cloudflare.com/** → **Access** → **Applications** → **Add**

- Application domain : gitlab.[your-domain].org
- Policy : Allow ton email

#### 5. Tester

https: //gitlab.[your-domain].org

---

## Backup

### Fichiers critiques à sauvegarder
```bash
# Configuration
/etc/cloudflared/config.yml

# Credentials (TRÈS IMPORTANT - ne jamais perdre !)
/etc/cloudflared/[tunnel-uuid].json

# Certificat
/etc/cloudflared/cert.pem
```

### Méthode de backup
```bash
# Depuis Proxmox
pct exec 202 -- tar czf /tmp/cloudflared-backup.tar.gz /etc/cloudflared

# Télécharger sur ton PC
pct pull 202 /tmp/cloudflared-backup.tar.gz ~/cloudflared-backup-$(date +%Y%m%d).tar.gz
```

### Restauration
```bash
# Uploader le backup
pct push 202 ~/cloudflared-backup-YYYYMMDD.tar.gz /tmp/cloudflared-backup.tar.gz

# Restaurer
pct exec 202 -- tar xzf /tmp/cloudflared-backup.tar.gz -C /

# Redémarrer le service
pct exec 202 -- systemctl restart cloudflared
```

---

## Monitoring

### Vérifier l'état du tunnel
```bash
# Dans le container
pct enter 202

# Statut du service
systemctl status cloudflared

# Logs
journalctl -u cloudflared -f
```

**Indicateurs de santé** :
- 4 connexions établies ✅
- Aucune erreur dans les logs ✅
- Services accessibles via les URLs ✅

### Cloudflare Analytics

**Dashboard** : https://one.dash.cloudflare.com/

- **Access** → **Analytics** : Statistiques de connexion
- **Logs** → **Access** : Audit des authentifications
- **Network** : Statistiques du tunnel

---

## Troubleshooting

### Tunnel ne démarre pas
```bash
# Vérifier la config YAML
nano /etc/cloudflared/config.yml
# Vérifier l'indentation (espaces, pas de tabs)

# Tester manuellement
systemctl stop cloudflared
cloudflared tunnel run opnsense-access

# Voir les erreurs détaillées
```

**Erreurs communes** :
- Indentation YAML incorrecte
- Fichier credentials manquant
- Tunnel ID incorrect
- Chemin vers credentials-file incorrect

### Service ne se connecte pas
```bash
# Vérifier la connectivité Internet du container
ping -c 3 1.1.1.1
ping -c 3 cloudflare.com

# Vérifier que OPNsense route correctement
# Firewall → Log Files → Live View
```

### Page inaccessible (Error 1033)

**Cause** : Le tunnel n'est pas connecté

**Solution** :
1. Vérifier que le container est démarré : `pct status 202`
2. Vérifier que le service tourne : `pct exec 202 -- systemctl status cloudflared`
3. Redémarrer si nécessaire : `pct exec 202 -- systemctl restart cloudflared`

### Authentification Cloudflare Access ne fonctionne pas

1. Vérifier que l'application existe dans le dashboard
2. Vérifier la policy (email correct)
3. Essayer en navigation privée
4. Vérifier les logs Access dans le dashboard

---

## Sécurité

### Best practices

- ✅ **Backup régulier** du dossier `/etc/cloudflared/`
- ✅ **Authentification forte** (email + 2FA Cloudflare)
- ✅ **Policies restrictives** (whitelist emails uniquement)
- ✅ **Monitoring des logs** Access
- ✅ **Session courte** (24h max)
- ✅ **Firewall rules** pour restreindre l'accès au container

### Limitations

- **Latence** : +10-50ms due au passage par Cloudflare Edge
- **Protocoles** : HTTP/HTTPS/SSH uniquement (pas de RDP direct)
- **Bande passante** : Limitée par le plan gratuit (suffisant pour homelab)

---

## Commandes utiles
```bash
# Lister les tunnels
cloudflared tunnel list

# Info sur le tunnel
cloudflared tunnel info opnsense-access

# Créer un nouveau tunnel
cloudflared tunnel create nom-tunnel

# Supprimer un tunnel
cloudflared tunnel delete nom-tunnel

# Créer une route DNS
cloudflared tunnel route dns opnsense-access subdomain.[your-domain].org

# Lister les routes
cloudflared tunnel route dns list

# Tester la config
cloudflared tunnel ingress validate

# Tester un hostname spécifique
cloudflared tunnel ingress rule https://proxmox.[your-domain].org
```

---

## Ressources

- **Documentation officielle** : https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- **Cloudflare Access** : https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/
- **GitHub cloudflared** : https://github.com/cloudflare/cloudflared
- **Dashboard** : https://one.dash.cloudflare.com/