---
sidebar_position: 1
---

# Vue d'ensemble de l'infrastructure

## Architecture Olympus Lab

**Olympus Lab** est un homelab DevOps professionnel basé sur Proxmox VE et OPNsense, avec accès distant sécurisé via Cloudflare Tunnel.

### Nomenclature mythologique

Inspiré de la mythologie grecque, chaque composant porte le nom d'une divinité ou d'un titan :

- **Atlas** : Node Proxmox principal (porte l'infrastructure)
- **Olympus** : OPNsense (Mont Olympe = centre de contrôle)
- **Hermes** : Cloudflare Tunnel (messager des dieux)

---

## Plan d'adressage réseau

### Réseaux segmentés

| Réseau | CIDR | Usage | Gateway | Naming |
|--------|------|-------|---------|--------|
| WAN | 192.168.1.0/24 | Connexion Internet | 192.168.1.254 | - |
| LAN | 10.0.1.0/24 | Production | 10.0.1.1 | Olympus |
| DMZ | 10.0.2.0/24 | Services exposés | 10.0.2.1 | Demilitarized |
| DEV | 10.0.3.0/24 | Développement | 10.0.3.1 | Development |
| MGMT | 10.0.4.0/24 | Administration | 10.0.4.1 | Management |

### DHCP Ranges (OPNsense)

Chaque réseau a une plage DHCP pour les VMs temporaires :

- **LAN** : 10.0.1.100-200
- **DMZ** : 10.0.2.100-200
- **DEV** : 10.0.3.100-200
- **MGMT** : 10.0.4.100-200

**IPs statiques réservées** : x.x.x.2-99

---

## Infrastructure physique

### Serveur Proxmox VE "Atlas"

- **Modèle** : Lenovo ThinkCentre M710S
- **Hostname** : atlas (anciennement fox-factory)
- **Version** : Proxmox VE 8.x
- **IP Management** : 192.168.1.51
- **Stockage** : local-lvm
- **Accès Web** : https://proxmox.olympus-lab.org
- **Accès SSH** : `ssh ssh-proxmox`

### Bridges réseau

| Bridge | Description | Réseau | Interface physique |
|--------|-------------|---------|-------------------|
| vmbr0 | WAN/Management | 192.168.1.0/24 | enp1s0 (physique) |
| vmbr1 | LAN | 10.0.1.0/24 | Virtuel |
| vmbr2 | DMZ | 10.0.2.0/24 | Virtuel |
| vmbr3 | DEV | 10.0.3.0/24 | Virtuel |
| vmbr4 | MGMT | 10.0.4.0/24 | Virtuel |

---

## VMs et Containers

### VM 100 - Olympus (OPNsense)

**Rôle** : Firewall et routeur central

- **Type** : VM
- **OS** : OPNsense 24.7
- **RAM** : 2 GB
- **CPU** : 2 cores
- **Disque** : 32 GB
- **Interfaces** :
  - vtnet0 → vmbr0 (WAN)
  - vtnet1 → vmbr1 (LAN)
  - vtnet2 → vmbr2 (DMZ)
  - vtnet3 → vmbr3 (DEV)
  - vtnet4 → vmbr4 (MGMT)
- **Accès** : https://opnsense.olympus-lab.org

### CT 200 - opn-access

**Rôle** : Container temporaire pour accès local OPNsense

- **Type** : LXC Container
- **OS** : Ubuntu 24.04
- **RAM** : 512 MB
- **Réseau** : vmbr1 (LAN) - DHCP
- **Status** : Peut être arrêté quand non utilisé

### CT 202 - Hermes (Cloudflare Tunnel)

**Rôle** : Tunnel sécurisé pour accès distant

- **Type** : LXC Container
- **OS** : Ubuntu 24.04
- **RAM** : 256 MB
- **CPU** : 1 core
- **Réseau** : vmbr1 (10.0.1.104)
- **Service** : cloudflared (systemd)
- **Tunnel ID** : f7fedba1-6be1-4408-a755-e9badd33f9a0

---

## Domaine et DNS

### Domaine principal

**olympus-lab.org** (Cloudflare)

### Services exposés

| Subdomain | Service | Destination |
|-----------|---------|-------------|
| docs.olympus-lab.org | Documentation | GitHub Pages |
| proxmox.olympus-lab.org | Proxmox Web | 192.168.1.51:8006 |
| opnsense.olympus-lab.org | OPNsense Web | 10.0.1.1:443 |
| ssh-proxmox.olympus-lab.org | Proxmox SSH | 192.168.1.51:22 |
| vpn.olympus-lab.org | DynDNS | IP publique |

### DynDNS

Configuration automatique avec **ddclient** sur Proxmox pour mettre à jour `vpn.olympus-lab.org` avec l'IP publique actuelle.

---

## Sécurit