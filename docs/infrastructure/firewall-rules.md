---
sidebar_position: 3
---

# Règles Firewall OPNsense

Configuration mise en place le 30/11/2025

## Principes de sécurité

- **Default Deny** : Tout est bloqué par défaut
- **Least Privilege** : Chaque réseau a le minimum d'accès nécessaire
- **Isolation** : Les réseaux ne peuvent pas communiquer entre eux (sauf MGMT)

## Configuration par interface

### LAN (10.0.1.0/24) - Production

**Ordre des règles :**
1. ✅ Allow LAN → LAN (communication interne)
2. ❌ Block LAN → 10.0.0.0/8 (autres réseaux privés)
3. ✅ Allow LAN → Internet

**Utilisation :** Services de production, VMs principales

### DMZ (10.0.2.0/24) - Services exposés

**Ordre des règles :**
1. ❌ Block DMZ → 10.0.0.0/8 (isolation complète)
2. ✅ Allow DMZ → Internet

**Utilisation :** Serveurs web, services publics

### DEV (10.0.3.0/24) - Développement

**Ordre des règles :**
1. ❌ Block DEV → 10.0.0.0/8 (isolation)
2. ✅ Allow DEV → Internet

**Utilisation :** Tests, expérimentations, VMs jetables

### MGMT (10.0.4.0/24) - Administration

**Ordre des règles :**
1. ✅ Allow MGMT → * (accès complet)

**Utilisation :** Ansible, monitoring, jump host

## Tests de validation
```bash
# Depuis LAN
ping 10.0.1.1  # ✅ OK
ping 10.0.2.1  # ❌ Bloqué
ping 1.1.1.1   # ✅ OK

# Depuis DMZ
ping 10.0.1.1  # ❌ Bloqué
ping 1.1.1.1   # ✅ OK
```

## Logs

Vérifier les blocages : **Firewall → Log Files → Live View**