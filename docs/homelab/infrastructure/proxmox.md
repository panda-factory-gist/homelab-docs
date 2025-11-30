---
sidebar_position: 2
---

# Proxmox VE

## Informations générales

- **Version** : Proxmox VE 8.x
- **Hostname** : fox-factory
- **IP Management** : 192.168.1.51
- **Stockage** : local-lvm

## Configuration réseau

### Bridges

| Bridge | Description | Réseau |
|--------|-------------|---------|
| vmbr0 | WAN/Management | 192.168.1.0/24 |
| vmbr1 | LAN | 10.0.1.0/24 |
| vmbr2 | DMZ | 10.0.2.0/24 |
| vmbr3 | DEV | 10.0.3.0/24 |
| vmbr4 | MGMT | 10.0.4.0/24 |

## VMs et Containers

### VM 100 - OPNsense
- **RAM** : 2GB
- **CPU** : 2 cores
- **Interfaces** : 5 (WAN + 4 internes)
- **Rôle** : Firewall/Router

### CT 200 - opn-access
- **Type** : LXC Ubuntu 24.04
- **Réseau** : vmbr1 (LAN)
- **Usage** : Accès temporaire interface OPNsense