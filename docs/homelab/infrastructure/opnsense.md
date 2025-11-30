---
sidebar_position: 3
---

# OPNsense Firewall

## Accès

**Interface Web** : 
```bash
ssh -L 8443:10.0.1.1:443 root@192.168.1.XX
# Puis ouvrir : https://localhost:8443
```

**Login** : root / [mot de passe]

## Interfaces réseau

| Interface | Bridge | IP | Réseau |
|-----------|--------|----|----|
| WAN (vtnet0) | vmbr0 | DHCP | 192.168.1.x |
| LAN (vtnet1) | vmbr1 | 10.0.1.1 | 10.0.1.0/24 |
| DMZ (vtnet2) | vmbr2 | 10.0.2.1 | 10.0.2.0/24 |
| DEV (vtnet3) | vmbr3 | 10.0.3.1 | 10.0.3.0/24 |
| MGMT (vtnet4) | vmbr4 | 10.0.4.1 | 10.0.4.0/24 |

## DHCP Ranges

- LAN : 10.0.1.100-200
- DMZ : 10.0.2.100-200
- DEV : 10.0.3.100-200
- MGMT : 10.0.4.100-200

## Règles Firewall (Basiques)

### LAN
- ✅ Allow LAN → Internet (any)

### DMZ
- ✅ Allow DMZ → Internet (any)
- ❌ Block DMZ → RFC1918 (internal networks)

### DEV
- ✅ Allow DEV → Internet (any)

### MGMT
- ✅ Allow MGMT → Anywhere