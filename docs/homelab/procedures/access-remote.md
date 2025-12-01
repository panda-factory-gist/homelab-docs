---
sidebar_position: 1
sidebar_label: "Acces Remote"
---

# Accès distant

Guide complet pour accéder à l'infrastructure Olympus Lab depuis n'importe où dans le monde.

## Vue d'ensemble

Trois méthodes d'accès distant :

1. **Interface Web** (Proxmox, OPNsense) → via navigateur
2. **SSH** → via terminal
3. **Documentation** → GitHub Pages (publique)

**Sécurité** : Toutes les connexions passent par Cloudflare Tunnel avec authentification obligatoire (sauf docs publiques).

---

## Accès Web

### Services disponibles

| Service | URL | Usage |
|---------|-----|-------|
| Proxmox VE | https://proxmox.olympus-lab.org | Gestion des VMs/containers |
| OPNsense | https://opnsense.olympus-lab.org | Configuration firewall |
| Documentation | https://docs.olympus-lab.org | Documentation publique |

---

### Procédure de connexion Web

#### Étape 1 : Ouvrir l'URL

Exemple : **https://proxmox.olympus-lab.org**

#### Étape 2 : Authentification Cloudflare Access

**Première visite** :
```
1. Page Cloudflare Access s'affiche
2. Entre ton email (celui autorisé dans la policy)
3. Clique "Send me a code"
4. Vérifie tes emails
5. Entre le code reçu (6 chiffres)
6. Authentification réussie ✅
```

**Visites suivantes** :

- Cookie de session valide 24h
- Pas besoin de re-authentification pendant 24h
- Après 24h, redemander le code

#### Étape 3 : Authentification du service

Après Cloudflare Access, authentification du service lui-même :

**Proxmox** :
- User : `root@pam`
- Password : [ton mot de passe Proxmox]

**OPNsense** :
- User : `root`
- Password : [ton mot de passe OPNsense]

---

### Troubleshooting Web

#### Erreur "Access Denied"

**Cause** : Ton email n'est pas dans la policy Cloudflare Access

**Solution** :
1. Va sur https://one.dash.cloudflare.com/
2. **Access** → **Applications**
3. Trouve l'application (ex: Proxmox)
4. **Edit** → **Policies**
5. Ajoute ton email dans la liste
6. **Save**

#### Erreur 1033 "Tunnel error"

**Cause** : Le container Cloudflare Tunnel (hermes) n'est pas démarré

**Solution** :
```bash
# SSH vers Proxmox (voir section SSH ci-dessous)
ssh ssh-proxmox

# Vérifier le container
pct status 202

# Démarrer si arrêté
pct start 202

# Vérifier le service
pct exec 202 -- systemctl status cloudflared
```

#### Certificat invalide

**Cause normale** : Proxmox et OPNsense utilisent des certificats auto-signés

**Dans le navigateur** :
- Chrome/Edge : Cliquer "Avancé" → "Continuer vers le site"
- Firefox : "Avancé" → "Accepter le risque"

**C'est normal et sécurisé** : Le tunnel Cloudflare chiffre la connexion de bout en bout.

---

## Accès SSH

### Prérequis

1. **cloudflared** installé sur ton PC
2. **Fichier SSH config** configuré
3. **Email autorisé** dans Cloudflare Access

---

### Installation cloudflared

#### Windows

**Téléchargement** :
1. https://github.com/cloudflare/cloudflared/releases/latest
2. Télécharge : `cloudflared-windows-amd64.exe`

**Installation** :
```powershell
# Créer le dossier
New-Item -ItemType Directory -Force -Path "C:\Program Files\cloudflared"

# Déplacer le fichier téléchargé
Move-Item "$env:USERPROFILE\Downloads\cloudflared-windows-amd64.exe" "C:\Program Files\cloudflared\cloudflared.exe"

# Vérifier
& "C:\Program Files\cloudflared\cloudflared.exe" --version
```

#### Linux / macOS
```bash
# Linux
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# macOS
brew install cloudflared

# Vérifier
cloudflared --version
```

---

### Configuration SSH

#### Windows

**Créer/éditer le fichier config** :
```powershell
# Créer le dossier .ssh si inexistant
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.ssh"

# Éditer avec Notepad
notepad "$env:USERPROFILE\.ssh\config"
```

**Contenu** :
```
Host ssh-proxmox
    HostName ssh-proxmox.olympus-lab.org
    User root
    ProxyCommand C:\PROGRA~1\cloudflared\cloudflared.exe access ssh --hostname ssh-proxmox.olympus-lab.org
```

**Important** : `C:\PROGRA~1\` est le chemin court pour `C:\Program Files\`. Les espaces posent problème dans ProxyCommand.

#### Linux / macOS

**Éditer** :
```bash
nano ~/.ssh/config
```

**Contenu** :
```
Host ssh-proxmox
    HostName ssh-proxmox.olympus-lab.org
    User root
    ProxyCommand /usr/local/bin/cloudflared access ssh --hostname ssh-proxmox.olympus-lab.org
```

---

### Utilisation SSH

#### Première connexion
```bash
ssh ssh-proxmox
```

**Ce qui se passe** :
```
1. cloudflared se lance
2. Ouvre ton navigateur automatiquement
3. Page Cloudflare Access
4. Entre ton email
5. Code envoyé par email
6. Entre le code
7. Authentification réussie
8. Connexion SSH établie ✅
```

#### Connexions suivantes
```bash
ssh ssh-proxmox
```

- Pas besoin de ré-authentification (cookie valide 24h)
- Connexion directe

---

### Ajouter d'autres machines SSH

#### Exemple : Ajouter une VM GitLab

**1. Dans le container hermes (CT 202)** :
```bash
# Éditer la config tunnel
pct enter 202
nano /etc/cloudflared/config.yml
```

**Ajouter** :
```yaml
  - hostname: ssh-gitlab.olympus-lab.org
    service: ssh://10.0.1.100:22
```

**Redémarrer** :
```bash
systemctl restart cloudflared
exit
```

**2. Créer le DNS** :
```bash
pct exec 202 -- cloudflared tunnel route dns opnsense-access ssh-gitlab.olympus-lab.org
```

**3. Créer l'application Cloudflare Access** :

https://one.dash.cloudflare.com/ → **Access** → **Applications** → **Add**

- Type : Self-hosted
- Name : SSH GitLab
- Domain : ssh-gitlab.olympus-lab.org
- Policy : Allow ton email

**4. Ajouter dans ton fichier SSH config** :
```
Host ssh-gitlab
    HostName ssh-gitlab.olympus-lab.org
    User root
    ProxyCommand C:\PROGRA~1\cloudflared\cloudflared.exe access ssh --hostname ssh-gitlab.olympus-lab.org
```

**5. Se connecter** :
```bash
ssh ssh-gitlab
```

---

### Troubleshooting SSH

#### "Could not resolve hostname"

**Erreur** :
```
ssh: Could not resolve hostname ssh-proxmox: Hôte inconnu
```

**Cause** : Le fichier `~/.ssh/config` n'existe pas ou est mal configuré

**Solution** :
1. Vérifier que le fichier existe
2. Vérifier la syntaxe (indentation, pas de tabs)
3. Vérifier que `Host` correspond au nom utilisé dans la commande ssh

#### "Permission denied (publickey)"

**Cause** : Cloudflare Access fonctionne, mais l'authentification SSH échoue

**Solutions** :
- Vérifier le mot de passe
- Vérifier que l'user est correct (`root` pour Proxmox)
- Ajouter une clé SSH si nécessaire

#### cloudflared non trouvé

**Erreur** :
```
ProxyCommand: command not found: cloudflared
```

**Solution** :
- Vérifier que cloudflared est installé : `cloudflared --version`
- Vérifier le chemin dans ProxyCommand
- Windows : utiliser `C:\PROGRA~1\` au lieu de `C:\Program Files\`

#### Navigateur ne s'ouvre pas pour l'authentification

**Solution manuelle** :
```bash
# Ouvrir manuellement dans le navigateur
https://ssh-proxmox.olympus-lab.org

# S'authentifier
# Puis retry la commande SSH
ssh ssh-proxmox
```

---

## Accès depuis différents appareils

### Laptop personnel

**Setup** :
1. Installer cloudflared
2. Configurer SSH config
3. Utiliser normalement

### PC du travail (si autorisé)

**Même setup que laptop personnel**

**Attention** : Vérifier la politique de l'entreprise concernant les connexions SSH externes.

### Téléphone/Tablette

#### Option 1 : Interface Web

- Safari/Chrome sur iOS/Android
- Ouvrir https://proxmox.olympus-lab.org
- Authentification Cloudflare Access
- Interface responsive

#### Option 2 : App SSH (Termius, JuiceSSH)

**Pas directement supporté** car cloudflared n'est pas disponible sur mobile.

**Alternative** : Utiliser un jump host ou VPN.

---

## Scénarios d'usage

### Scénario 1 : Chez tes parents en décembre
```
1. Ouvrir le laptop
2. Connexion WiFi des parents
3. ssh ssh-proxmox (fonctionne immédiatement)
4. OU navigateur → https://proxmox.olympus-lab.org
5. Gérer ton homelab normalement ✅
```

### Scénario 2 : Urgence depuis le téléphone
```
1. Navigateur mobile
2. https://proxmox.olympus-lab.org
3. Authentification Cloudflare
4. Redémarrer une VM
5. Vérifier les logs
```

### Scénario 3 : Depuis un réseau restrictif (entreprise, école)

**Cloudflare Tunnel fonctionne sur le port 443 (HTTPS)**, donc passe généralement à travers les firewalls d'entreprise.

**Si bloqué** :
- Essayer en 4G/5G (hotspot)
- Utiliser un VPN personnel si autorisé

---

## Sécurité de l'accès distant

### Authentification multi-facteurs

**Cloudflare Access** : Email + code OTP (déjà 2FA)

**Recommandation** : Activer aussi 2FA sur :
- **OPNsense** : System → Access → Servers → Google Authenticator
- **Proxmox** : Datacenter → Users → [user] → TFA

### Bonnes pratiques

- ✅ Utiliser des mots de passe forts (20+ caractères)
- ✅ Ne jamais partager les credentials
- ✅ Vérifier les logs régulièrement (Cloudflare Dashboard)
- ✅ Révoquer l'accès immédiatement en cas de perte d'appareil
- ✅ Session timeout : 24h maximum

### Révoquer un accès

**Cloudflare Dashboard** :
1. https://one.dash.cloudflare.com/
2. **Access** → **Applications**
3. **Edit** l'application
4. **Policies** → Retirer l'email
5. **Save**

**Immédiat** : L'utilisateur perd l'accès immédiatement.

---

## Monitoring des connexions

### Voir qui se connecte

**Cloudflare Dashboard** :
1. https://one.dash.cloudflare.com/
2. **Logs** → **Access**

**Informations** :
- Timestamp
- Email utilisé
- Application accédée
- IP source
- User agent (navigateur)
- Succès/échec

### Alertes

Cloudflare peut envoyer des alertes par email en cas de :
- Tentatives d'accès refusées
- Accès depuis un nouveau pays
- Pattern suspect

**Configuration** : Dashboard → Notifications

---

## Coûts

**Tous les accès décrits ici sont GRATUITS** :

- ✅ Cloudflare Tunnel : Gratuit
- ✅ Cloudflare Access : Gratuit (jusqu'à 50 utilisateurs)
- ✅ DNS Cloudflare : Gratuit
- ✅ Certificats SSL : Gratuits (auto-générés)

**Seul coût** : Domaine olympus-lab.org (~12€/an)

---

## Alternatives

### WireGuard VPN (non implémenté)

**Avantages** :
- Accès complet au réseau (pas seulement web/SSH)
- Plus rapide (pas de proxy)
- Peut accéder aux services non-HTTP

**Inconvénients** :
- Nécessite port forwarding (sécurité moindre)
- Configuration plus complexe
- Pas de logs centralisés

### Tailscale (testé, non fonctionnel pour subnet routing)

**Avantages** :
- Zéro configuration
- Mesh VPN
- Pas de port forwarding

**Inconvénients** :
- Nécessite Tailscale sur chaque machine
- Subnet routing problématique dans notre setup

**Choix actuel** : Cloudflare Tunnel = meilleur compromis simplicité/sécurité.

---

## Ressources

- **Cloudflare Access Docs** : https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/
- **SSH Config Guide** : https://www.ssh.com/academy/ssh/config
- **cloudflared GitHub** : https://github.com/cloudflare/cloudflared