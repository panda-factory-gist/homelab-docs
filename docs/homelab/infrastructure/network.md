---
sidebar_position: 1
---

# Architecture Réseau

## Plan d'adressage IP

| Réseau | CIDR | Usage | Gateway |
|--------|------|-------|---------|
| WAN | 192.168.1.0/24 | Connexion Internet | 192.168.1.254 |
| LAN | 10.0.1.0/24 | Production | 10.0.1.1 |
| DMZ | 10.0.2.0/24 | Services exposés | 10.0.2.1 |
| DEV | 10.0.3.0/24 | Développement | 10.0.3.1 |
| MGMT | 10.0.4.0/24 | Administration | 10.0.4.1 |

## Bridges Proxmox

- `vmbr0` : WAN/Management physique
- `vmbr1-4` : Bridges virtuels pour segmentation