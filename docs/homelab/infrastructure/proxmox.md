---
sidebar_position: 2
---

# Proxmox VE - Atlas

## Configuration matérielle

### Serveur physique

- **Modèle** : Lenovo ThinkCentre M710S
- **Hostname** : atlas (anciennement fox-factory)
- **Processeur** : Intel (VT-x et VT-d activés)
- **RAM** : [À compléter]
- **Stockage** : [À compléter]

### Activation virtualisation BIOS

Dans le BIOS du ThinkCentre M710S :

1. **F1** au démarrage pour entrer dans le BIOS
2. **Security** → **Virtualization**
3. Activer **Intel VT-x** ✅
4. Activer **Intel VT-d** ✅
5. **F10** pour sauvegarder

**Vérification** :
```bash
egrep -c '(vmx|svm)' /proc/cpuinfo
# Doit retourner > 0 (nombre de cores)

dmesg | grep -e DMAR -e IOMMU
# Doit montrer que l'IOMMU est actif
```

---

## Configuration réseau

### Interfaces réseau

**Interface physique** : `enp1s0`

### Bridges configurés

Fichier : `/etc/network/interfaces`

#### vmbr0 - WAN/Management (Physique)
```
auto vmbr0
iface vmbr0 inet static
    address 192.168.1.51/24
    gateway 192.168.1.254
    bridge-ports enp1s0
    bridge-stp off
    bridge-fd 0
```

#### vmbr1 - LAN (Virtuel)
```
auto vmbr1
iface vmbr1 inet manual
    bridge-ports none
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
```

#### vmbr2 - DMZ (Virtuel)
```
auto vmbr2
iface vmbr2 inet manual
    bridge-ports none
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
```

#### vmbr3 - DEV (Virtuel)
```
auto vmbr3
iface vmbr3 inet manual
    bridge-ports none
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
```

#### vmbr4 - MGMT (Virtuel)
```
auto vmbr4
iface vmbr4 inet manual
    bridge-ports none
    bridge-stp off
    bridge-fd 0
    bridge-vlan-aware yes
```

**Vérification** :
```bash
brctl show
# Doit lister les 5 bridges
```

---

## Dépôts Proxmox

### Problème : Erreurs 401 Enterprise

Par défaut, Proxmox essaie d'utiliser les dépôts Enterprise (payants).

### Solution : Dépôts no-subscription
```bash
# Désactiver les dépôts enterprise
mv /etc/apt/sources.list.d/pve-enterprise.sources \
   /etc/apt/sources.list.d/pve-enterprise.sources.disabled

mv /etc/apt/sources.list.d/ceph.sources \
   /etc/apt/sources.list.d/ceph.sources.disabled

# Mettre à jour
apt update
apt upgrade -y
```

---

## DynDNS avec Cloudflare

### Installation ddclient
```bash
apt install ddclient -y
```

### Configuration

Fichier : `/etc/ddclient.conf`
```
daemon=300
syslog=yes
use=web, web=checkip.dyndns.org/, web-skip='IP Address'

protocol=cloudflare
zone=olympus-lab.org
ttl=1
login=token
password=VOTRE_TOKEN_CLOUDFLARE
vpn.olympus-lab.org
```

### Gestion du service
```bash
# Démarrer
systemctl start ddclient

# Activer au boot
systemctl enable ddclient

# Vérifier le statut
systemctl status ddclient

# Voir les logs
journalctl -u ddclient -f
```

**Test** :
```bash
nslookup vpn.olympus-lab.org
# Doit retourner votre IP publique
```

---

## Accès

### Interface Web

**Local** : https://192.168.1.51:8006
**Distant** : https://proxmox.olympus-lab.org

**Login** : root / [mot de passe]

### SSH

**Local** :
```bash
ssh root@192.168.1.51
```

**Distant (via Cloudflare Tunnel)** :
```bash
ssh ssh-proxmox
```

---

## Commandes utiles

### Gestion des VMs
```bash
# Lister les VMs
qm list

# Statut
qm status 100

# Démarrer/Arrêter
qm start 100
qm stop 100

# Console
qm terminal 100

# Snapshot
qm snapshot 100 backup-$(date +%Y%m%d)

# Cloner
qm clone 100 101 --name nouvelle-vm
```

### Gestion des Containers
```bash
# Lister les containers
pct list

# Statut
pct status 200

# Démarrer/Arrêter
pct start 200
pct stop 200

# Entrer dans le container
pct enter 200

# Snapshot
pct snapshot 200 backup-$(date +%Y%m%d)
```

### Réseau
```bash
# Voir les bridges
brctl show

# Tester la connectivité
ping 10.0.1.1

# Voir les routes
ip route show
```

---

## Mises à jour

### Mise à jour automatique

**Proxmox ne se met PAS à jour automatiquement.**

### Mise à jour manuelle
```bash
# Via SSH
ssh ssh-proxmox

# Mise à jour
apt update
apt dist-upgrade -y

# Redémarrer si kernel mis à jour
reboot
```

### Fréquence recommandée

- **Mensuel** : Mises à jour de sécurité
- **Après alerte** : CVE critiques

### Vérifier la version
```bash
pveversion
```

---

## Backup

### Snapshots manuels
```bash
# VM
qm snapshot 100 pre-update-$(date +%Y%m%d)

# Container
pct snapshot 202 pre-update-$(date +%Y%m%d)
```

### Backup automatique (à configurer)

Via l'interface Web :
- **Datacenter** → **Backup**
- Créer un job de backup
- Planifier (ex: tous les jours à 2h)

---

## Troubleshooting

### VM ne démarre pas
```bash
# Voir les logs
qm showcmd 100

# Vérifier la config
cat /etc/pve/qemu-server/100.conf

# Forcer l'arrêt
qm stop 100 --skiplock
```

### Problème réseau
```bash
# Redémarrer le networking
systemctl restart networking

# Vérifier les bridges
brctl show

# Logs réseau
journalctl -u networking -f
```

### Espace disque plein
```bash
# Voir l'utilisation
df -h

# Nettoyer les anciens kernels
apt autoremove -y

# Nettoyer le cache APT
apt clean
```