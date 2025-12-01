---
sidebar_position: 3
---

# OPNsense - Olympus

Firewall et routeur central de l'infrastructure Olympus Lab.

## Configuration générale

### VM OPNsense

- **ID VM** : 100
- **Hostname** : olympus
- **OS** : OPNsense 24.7
- **RAM** : 2 GB
- **CPU** : 2 cores
- **Disque** : 32 GB (local-lvm)

### Interfaces réseau

| Interface | Bridge Proxmox | Réseau | IP | Rôle |
|-----------|---------------|--------|-----|------|
| vtnet0 | vmbr0 | WAN | DHCP (192.168.1.x) | Internet |
| vtnet1 | vmbr1 | LAN | 10.0.1.1/24 | Production |
| vtnet2 | vmbr2 | DMZ | 10.0.2.1/24 | Services exposés |
| vtnet3 | vmbr3 | DEV | 10.0.3.1/24 | Développement |
| vtnet4 | vmbr4 | MGMT | 10.0.4.1/24 | Administration |

---

## Installation initiale

### Création de la VM
```bash
# Sur Proxmox
qm create 100 \
  --name olympus \
  --memory 2048 \
  --cores 2 \
  --cpu host \
  --net0 virtio,bridge=vmbr0 \
  --net1 virtio,bridge=vmbr1 \
  --net2 virtio,bridge=vmbr2 \
  --net3 virtio,bridge=vmbr3 \
  --net4 virtio,bridge=vmbr4 \
  --scsi0 local-lvm:32 \
  --cdrom local:iso/OPNsense-24.7-dvd-amd64.iso \
  --boot order=scsi0 \
  --ostype other

# Démarrer
qm start 100
```

### Installation OPNsense

1. **Console** : Via Proxmox Web UI
2. **Login** : installer / opnsense
3. **Installation** : UFS (Guided)
4. **Root password** : Définir un mot de passe fort
5. **Reboot** après installation

---

## Configuration réseau

### Assignment des interfaces (Menu console option 1)
```
vtnet0 → WAN
vtnet1 → LAN
vtnet2 → OPT1 (DMZ)
vtnet3 → OPT2 (DEV)
vtnet4 → OPT3 (MGMT)
```

### Configuration IP statique LAN (Menu console option 2)
```
Interface: LAN (vtnet1)
IPv4: 10.0.1.1
Subnet: 24
Gateway: [none]
IPv6: [none]
DHCP: Non (on configurera via web)
```

### Accès interface web

**URL** : https://opnsense.olympus-lab.org (via Cloudflare Tunnel)

**Login initial** : root / [mot de passe défini]

---

## Configuration Web (Wizard)

### General Information

- **Hostname** : olympus
- **Domain** : olympus-lab.org
- **DNS Servers** :
  - Primary: 1.1.1.1 (Cloudflare)
  - Secondary: 8.8.8.8 (Google)
- **Timezone** : Europe/Paris
- **NTP Server** : fr.pool.ntp.org

### WAN Interface

- **Type** : DHCP
- **Block RFC1918** : ☐ (décoché)
- **Block bogon** : ☑ (coché)

### LAN Interface

- **IP** : 10.0.1.1/24
- Confirmer

---

## Configuration des interfaces optionnelles

**Interfaces → Assignments → OPTx**

### OPT1 → DMZ

- **Enable** : ☑
- **Description** : DMZ
- **IPv4 Configuration Type** : Static
- **IPv4 Address** : 10.0.2.1/24
- **Save** → **Apply**

### OPT2 → DEV

- **Enable** : ☑
- **Description** : DEV
- **IPv4 Configuration Type** : Static
- **IPv4 Address** : 10.0.3.1/24
- **Save** → **Apply**

### OPT3 → MGMT

- **Enable** : ☑
- **Description** : MGMT
- **IPv4 Configuration Type** : Static
- **IPv4 Address** : 10.0.4.1/24
- **Save** → **Apply**

---

## Configuration DHCP

**Services → DHCPv4 → [Interface]**

### LAN

- **Enable** : ☑
- **Range** : 10.0.1.100 à 10.0.1.200
- **DNS Servers** : 10.0.1.1
- **Save**

### DMZ

- **Enable** : ☑
- **Range** : 10.0.2.100 à 10.0.2.200
- **DNS Servers** : 10.0.2.1
- **Save**

### DEV

- **Enable** : ☑
- **Range** : 10.0.3.100 à 10.0.3.200
- **DNS Servers** : 10.0.3.1
- **Save**

### MGMT

- **Enable** : ☑
- **Range** : 10.0.4.100 à 10.0.4.200
- **DNS Servers** : 10.0.4.1
- **Save**

---

## Règles Firewall

**Firewall → Rules → [Interface]**

### Principes de sécurité

- **Default Deny** : Tout est bloqué par défaut
- **Stateful Firewall** : Les réponses aux connexions sortantes sont automatiquement autorisées
- **Ordre des règles** : Top-down, première règle qui match gagne
- **Least Privilege** : Chaque réseau a le minimum d'accès nécessaire

---

### Interface LAN (Production)

**Ordre des règles** :

#### Règle 1 : Allow LAN internal
- **Action** : Pass ✅
- **Interface** : LAN
- **Protocol** : any
- **Source** : LAN net
- **Destination** : LAN net
- **Description** : Allow LAN internal communications

#### Règle 2 : Block LAN to other private networks
- **Action** : Block ❌
- **Interface** : LAN
- **Protocol** : any
- **Source** : LAN net
- **Destination** : 10.0.0.0/8
- **Description** : Block LAN to other internal networks
- **Log** : ☑ (optionnel, pour monitoring)

#### Règle 3 : Allow LAN to Internet
- **Action** : Pass ✅
- **Interface** : LAN
- **Protocol** : any
- **Source** : LAN net
- **Destination** : any
- **Description** : Allow LAN to Internet

**Résultat** : LAN peut accéder à Internet et communiquer en interne, mais pas accéder aux autres réseaux (DMZ/DEV/MGMT).

---

### Interface DMZ (Services exposés)

**Ordre des règles** :

#### Règle 1 : Block DMZ to RFC1918
- **Action** : Block ❌
- **Interface** : DMZ
- **Protocol** : any
- **Source** : DMZ net
- **Destination** : 10.0.0.0/8
- **Description** : Block DMZ to private networks
- **Log** : ☑

#### Règle 2 : Allow DMZ to Internet
- **Action** : Pass ✅
- **Interface** : DMZ
- **Protocol** : any
- **Source** : DMZ net
- **Destination** : any
- **Description** : Allow DMZ to Internet only

**Résultat** : DMZ peut uniquement accéder à Internet, **isolation complète** des réseaux internes.

---

### Interface DEV (Développement)

**Ordre des règles** :

#### Règle 1 : Block DEV to RFC1918
- **Action** : Block ❌
- **Interface** : DEV
- **Protocol** : any
- **Source** : DEV net
- **Destination** : 10.0.0.0/8
- **Description** : Block DEV to private networks
- **Log** : ☑

#### Règle 2 : Allow DEV to Internet
- **Action** : Pass ✅
- **Interface** : DEV
- **Protocol** : any
- **Source** : DEV net
- **Destination** : any
- **Description** : Allow DEV to Internet

**Résultat** : DEV peut accéder à Internet uniquement, **isolation complète**.

---

### Interface MGMT (Administration)

**Ordre des règles** :

#### Règle 1 : Allow MGMT to anywhere
- **Action** : Pass ✅
- **Interface** : MGMT
- **Protocol** : any
- **Source** : MGMT net
- **Destination** : any
- **Description** : Allow MGMT full access for administration

**Résultat** : MGMT a un **accès complet** partout (pour gérer l'infrastructure).

---

## Architecture de sécurité
```
Internet
    ↓
┌───────────────────────────────┐
│  OPNsense (Olympus)           │
│  Firewall + NAT + Router      │
└─┬──────┬──────┬──────┬────────┘
  │      │      │      │
┌─▼──┐ ┌─▼──┐ ┌─▼──┐ ┌─▼───┐
│LAN │ │DMZ │ │DEV │ │MGMT │
└────┘ └────┘ └────┘ └─────┘

Règles :
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAN  : ✅ Internet, ✅ LAN interne, ❌ Autres réseaux
DMZ  : ✅ Internet uniquement
DEV  : ✅ Internet uniquement
MGMT : ✅ Partout (administration)
```

---

## Configuration avancée

### Alternate Hostnames (pour Cloudflare Tunnel)

**System → Settings → Administration**

- **Alternate Hostnames** : `opnsense.olympus-lab.org olympus-lab.cloudflareaccess.com`

Ceci permet d'accéder à OPNsense via Cloudflare Tunnel sans avertissement de certificat.

---

### NAT (Network Address Translation)

**Firewall → NAT → Outbound**

- **Mode** : Automatic outbound NAT (default)

NAT automatique pour toutes les interfaces vers WAN.

---

### Aliases (optionnel)

**Firewall → Aliases**

Créer des alias pour simplifier les règles :
```
Name: RFC1918
Type: Network(s)
Content:
  10.0.0.0/8
  172.16.0.0/12
  192.168.0.0/16
```

Utiliser dans les règles : Destination = RFC1918 au lieu de 10.0.0.0/8

---

## Monitoring

### Live View des logs

**Firewall → Log Files → Live View**

Affiche en temps réel :
- Paquets autorisés (vert)
- Paquets bloqués (rouge)
- Informations : source, destination, port, protocole

### États du firewall

**Firewall → Diagnostics → States**

Affiche les connexions actives en cours.

---

## Maintenance

### Mise à jour OPNsense

**System → Firmware → Check for Updates**

1. **Check for updates**
2. **Download** si disponible
3. **Install** puis **Reboot**

**Fréquence recommandée** : Mensuelle

### Backup de la configuration

**System → Configuration → Backups**

1. **Download configuration**
2. Sauvegarder le fichier XML localement
3. Faire un backup régulier (hebdomadaire recommandé)

### Restore configuration

**System → Configuration → Backups**

1. **Choose file** (XML)
2. **Restore configuration**
3. **Reboot**

---

## Troubleshooting

### Pas d'accès Internet depuis un réseau
```bash
# Vérifier les règles firewall
Firewall → Rules → [Interface]

# Vérifier les logs
Firewall → Log Files → Live View

# Vérifier NAT
Firewall → NAT → Outbound
```

### Interface ne monte pas
```bash
# Console OPNsense (via Proxmox)
# Option 1: Assign Interfaces
# Réassigner les interfaces

# Option 2: Set interface IP
# Vérifier/reconfigurer les IPs
```

### Reset mot de passe root
```bash
# Boot en single user mode
# Via console Proxmox, interrompre le boot
# Choisir: Boot Single User

# Changer le mot de passe
passwd root
```

---

## Commandes utiles (console)
```bash
# Redémarrer les interfaces
/usr/local/etc/rc.reload_interfaces

# Redémarrer le firewall
pfctl -F all

# Voir les états
pfctl -s states

# Voir les règles
pfctl -sr

# Voir les statistiques
pfctl -s info
```

---

## Accès

### Local (tunnel SSH depuis Proxmox)
```bash
# SSH vers Proxmox
ssh root@192.168.1.51

# Créer un tunnel
ssh -L 8443:10.0.1.1:443 root@localhost

# Navigateur: https://localhost:8443
```

### Distant (Cloudflare Tunnel)

**https://opnsense.olympus-lab.org**

Authentification Cloudflare Access requise.

---

## Prochaines étapes

1. ✅ Activer 2FA (TOTP)
2. ✅ Configurer des règles plus granulaires (port forwarding, ACLs)
3. ✅ Installer des plugins (HAProxy, Nginx, etc.)
4. ✅ Monitoring avec Grafana