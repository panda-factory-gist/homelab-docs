---
sidebar_position: 1
---

# Règles Firewall détaillées

Configuration complète des règles de sécurité OPNsense pour l'infrastructure Olympus Lab.

## Philosophie de sécurité

### Defense in Depth (Défense en profondeur)

Plusieurs couches de sécurité :
```
1. Cloudflare Edge (DDoS, WAF)
    ↓
2. Cloudflare Access (Authentication)
    ↓
3. Cloudflare Tunnel (Encryption)
    ↓
4. OPNsense Firewall (Network Segmentation)
    ↓
5. Application-level security (2FA, ACLs)
```

### Principes appliqués

- **Default Deny** : Tout est bloqué par défaut, autorisation explicite nécessaire
- **Least Privilege** : Chaque réseau/système a le minimum d'accès nécessaire
- **Network Segmentation** : Isolation des zones selon leur niveau de confiance
- **Zero Trust** : Ne jamais faire confiance, toujours vérifier

---

## Segmentation réseau

### Zones de sécurité
```
┌─────────────────────────────────────────────┐
│         NIVEAU DE CONFIANCE                  │
├─────────────────────────────────────────────┤
│ HIGH    │ MGMT (10.0.4.0/24)                │
│         │ Administration complète            │
├─────────┼────────────────────────────────────┤
│ MEDIUM  │ LAN (10.0.1.0/24)                 │
│         │ Production, services internes      │
├─────────┼────────────────────────────────────┤
│ LOW     │ DEV (10.0.3.0/24)                 │
│         │ Développement, tests               │
├─────────┼────────────────────────────────────┤
│ UNTRUST │ DMZ (10.0.2.0/24)                 │
│         │ Services exposés publiquement      │
└─────────┴────────────────────────────────────┘
```

### Matrice de communication

| Source ↓ Dest → | Internet | LAN | DMZ | DEV | MGMT |
|-----------------|----------|-----|-----|-----|------|
| **LAN**         | ✅       | ✅  | ❌  | ❌  | ❌   |
| **DMZ**         | ✅       | ❌  | ❌  | ❌  | ❌   |
| **DEV**         | ✅       | ❌  | ❌  | ❌  | ❌   |
| **MGMT**        | ✅       | ✅  | ✅  | ✅  | ✅   |

---

## Règles détaillées par interface

### LAN (10.0.1.0/24) - Production

**Cas d'usage** : Services de production, VMs principales, containers critiques

#### Règle 1 : Allow LAN internal communication
```
Action: Pass
Interface: LAN
Protocol: any
Source: LAN net (10.0.1.0/24)
Destination: LAN net (10.0.1.0/24)
Description: Allow LAN internal communications
```

**Justification** : Les machines en LAN doivent pouvoir communiquer entre elles (ex: serveur web → base de données).

**Services autorisés** :
- SSH inter-VM
- Bases de données
- APIs internes
- File sharing (NFS, SMB)

#### Règle 2 : Block LAN to other private networks
```
Action: Block
Interface: LAN
Protocol: any
Source: LAN net (10.0.1.0/24)
Destination: 10.0.0.0/8
Log: Yes
Description: Block LAN to other internal networks
```

**Justification** : Le LAN ne doit PAS pouvoir accéder à :
- DMZ (10.0.2.0/24) : isolation des services exposés
- DEV (10.0.3.0/24) : isolation de l'environnement de test
- MGMT (10.0.4.0/24) : isolation de l'administration

**Pourquoi** : Si une VM en LAN est compromise, l'attaquant ne peut pas rebondir vers les autres réseaux.

#### Règle 3 : Allow LAN to Internet
```
Action: Pass
Interface: LAN
Protocol: any
Source: LAN net (10.0.1.0/24)
Destination: any
Description: Allow LAN to Internet
```

**Justification** : Les services de production ont besoin d'accéder à Internet pour :
- Mises à jour (apt, yum)
- APIs externes
- Services cloud
- Téléchargements

---

### DMZ (10.0.2.0/24) - Services exposés

**Cas d'usage** : Serveurs web, reverse proxy, services accessibles publiquement

#### Règle 1 : Block DMZ to RFC1918 (private networks)
```
Action: Block
Interface: DMZ
Protocol: any
Source: DMZ net (10.0.2.0/24)
Destination: 10.0.0.0/8
Log: Yes
Description: Block DMZ to private networks - Isolation complète
```

**Justification** : **CRITIQUE** - La DMZ ne doit JAMAIS pouvoir accéder aux réseaux internes.

**Scénario d'attaque bloqué** :
```
1. Attaquant compromise un serveur web en DMZ
2. Tente de scanner le réseau interne (10.0.1.x)
3. ❌ BLOQUÉ par cette règle
4. L'attaque s'arrête là
```

**Ce qui est bloqué** :
- ❌ DMZ → LAN (10.0.1.0/24)
- ❌ DMZ → DEV (10.0.3.0/24)
- ❌ DMZ → MGMT (10.0.4.0/24)
- ❌ DMZ → OPNsense (10.0.x.1)

#### Règle 2 : Allow DMZ to Internet
```
Action: Pass
Interface: DMZ
Protocol: any
Source: DMZ net (10.0.2.0/24)
Destination: any
Description: Allow DMZ to Internet only
```

**Justification** : Les services en DMZ ont besoin d'Internet pour :
- Mises à jour de sécurité (critique !)
- APIs externes
- CDN, services cloud

**Limitations** : Accès Internet uniquement, **rien d'autre**.

---

### DEV (10.0.3.0/24) - Développement

**Cas d'usage** : Environnement de test, expérimentations, VMs jetables

#### Règle 1 : Block DEV to RFC1918
```
Action: Block
Interface: DEV
Protocol: any
Source: DEV net (10.0.3.0/24)
Destination: 10.0.0.0/8
Log: Yes
Description: Block DEV to private networks - Isolation complète
```

**Justification** : L'environnement DEV est volatile et moins sécurisé :
- Tests de nouvelles technos
- Configurations expérimentales
- Code non testé

**Protection** : Si une VM DEV est compromise (volontairement ou non), elle ne peut pas atteindre la production.

#### Règle 2 : Allow DEV to Internet
```
Action: Pass
Interface: DEV
Protocol: any
Source: DEV net (10.0.3.0/24)
Destination: any
Description: Allow DEV to Internet
```

**Justification** : L'environnement DEV a besoin d'Internet pour :
- Télécharger des outils
- Tester des APIs
- Installer des packages

---

### MGMT (10.0.4.0/24) - Administration

**Cas d'usage** : Jump host, Ansible control node, monitoring, outils d'administration

#### Règle 1 : Allow MGMT to anywhere
```
Action: Pass
Interface: MGMT
Protocol: any
Source: MGMT net (10.0.4.0/24)
Destination: any
Description: Allow MGMT full access for administration
```

**Justification** : Le réseau MGMT doit pouvoir gérer TOUTE l'infrastructure :
- SSH vers toutes les VMs
- Accès aux interfaces web (Proxmox, OPNsense)
- Déploiement Ansible
- Monitoring Prometheus/Grafana
- Backups

**Sécurité** : Accès restreint, authentification forte requise, machines hautement sécurisées.

---

## Concepts avancés

### Stateful Firewall

OPNsense utilise **pf** (Packet Filter) de FreeBSD, qui est **stateful**.

**Qu'est-ce que ça veut dire ?**
```
Client (10.0.1.50) → Server web externe (1.2.3.4:443)
    ↓
1. Client envoie SYN → Firewall crée un "state"
2. Server répond SYN-ACK → Firewall autorise automatiquement (state existant)
3. Client envoie ACK → Autorisé
4. Données échangées → Autorisées
5. Connexion fermée → State supprimé
```

**Avantage** : Pas besoin de règle "Allow Internet → LAN" pour les réponses. Le firewall se souvient des connexions sortantes et autorise automatiquement les réponses.

---

### NAT (Network Address Translation)

**Mode** : Automatic Outbound NAT

**Fonctionnement** :
```
VM LAN (10.0.1.50) veut accéder à google.com
    ↓
1. Paquet : 10.0.1.50:12345 → 142.250.x.x:443
2. OPNsense traduit : IP_PUBLIQUE:54321 → 142.250.x.x:443
3. Réponse : 142.250.x.x:443 → IP_PUBLIQUE:54321
4. OPNsense retraduit : 142.250.x.x:443 → 10.0.1.50:12345
5. VM reçoit la réponse
```

**Résultat** : Une seule IP publique pour tous les réseaux internes.

---

### Default Deny

**Par défaut, TOUT est bloqué.**

Si tu ne crées PAS de règle explicite, le trafic est **rejeté**.

**Exemple** :
```
Machine en LAN (10.0.1.50) essaie de contacter DMZ (10.0.2.10)
    ↓
Pas de règle "Allow LAN → DMZ"
    ↓
❌ BLOQUÉ par défaut
    ↓
Apparaît dans les logs comme "Default deny"
```

**Avantage** : Sécurité maximale, pas de surprise.

---

## Cas d'usage pratiques

### Scénario 1 : Serveur web en DMZ qui a besoin d'une base de données en LAN

**Problème** : DMZ ne peut pas accéder au LAN par design.

**Solutions** :

#### Option A : Reverse Proxy avec API Gateway
```
Client → DMZ (Nginx reverse proxy)
         ↓
         API Gateway en LAN
         ↓
         Base de données en LAN
```

Le reverse proxy en DMZ expose une API. L'API Gateway en LAN gère les requêtes.

#### Option B : Règle firewall spécifique
```
Action: Pass
Interface: DMZ
Protocol: TCP
Source: DMZ net (10.0.2.0/24)
Destination: 10.0.1.100 (serveur DB)
Destination Port: 5432 (PostgreSQL)
Description: Allow DMZ web server to DB only
```

**Principe** : Autorisation très spécifique (1 IP, 1 port), pas d'accès général.

---

### Scénario 2 : Jump Host en MGMT pour administrer le LAN

**Setup** :

1. Machine admin en MGMT (10.0.4.10)
2. SSH vers les VMs en LAN via le jump host
3. Pas d'accès SSH direct depuis l'extérieur

**Workflow** :
```
Laptop (via VPN) → Jump Host (10.0.4.10)
                        ↓
                   SSH vers VM LAN (10.0.1.50)
```

**Avantage** : Un seul point d'entrée sécurisé, logs centralisés.

---

### Scénario 3 : Environnement DEV isolé

**Besoin** : Tester une nouvelle stack (Docker Swarm, K3s) sans risquer la production.

**Setup** :

1. Cluster de VMs en DEV (10.0.3.x)
2. Expérimentation libre
3. Si compromis → isolation totale, pas d'impact sur LAN

**Protection** : Règle "Block DEV to RFC1918" empêche toute propagation.

---

## Monitoring et logs

### Activer le logging

Pour toutes les règles "Block", activer le logging :
```
Firewall → Rules → [Interface] → Edit Rule
    ↓
Log packets that are handled by this rule: ☑
    ↓
Save → Apply
```

### Voir les logs

**Firewall → Log Files → Live View**

**Informations affichées** :
- Timestamp
- Action (Pass/Block)
- Interface
- Protocol
- Source IP:Port
- Destination IP:Port
- Flags TCP

**Exemple de log** :
```
Dec 01 14:23:45  block  DMZ  TCP  10.0.2.50:54321 → 10.0.1.100:22  Flags: S
```

**Interprétation** : Une machine en DMZ (10.0.2.50) a tenté de se connecter en SSH (port 22) vers une machine en LAN (10.0.1.100). ❌ **Bloqué** par la règle "Block DMZ to RFC1918".

---

## Règles à NE PAS faire

### ❌ Allow any → any
```
Action: Pass
Source: any
Destination: any
```

**Danger** : Annule toute la sécurité. Tout le monde peut accéder à tout.

### ❌ DMZ → LAN autorisé
```
Action: Pass
Interface: DMZ
Source: DMZ net
Destination: LAN net
```

**Danger** : Si un serveur web en DMZ est compromis, l'attaquant peut accéder à la production.

### ❌ Règles trop larges
```
Action: Pass
Protocol: any
Source: any
Destination: Serveur important
```

**Problème** : N'importe qui peut accéder. Toujours restreindre la source.

---

## Best Practices

### ✅ Principe du moindre privilège

Chaque règle doit être la plus spécifique possible :
- IP source précise (ou réseau)
- IP destination précise
- Ports spécifiques
- Protocole spécifique

### ✅ Documentation

Chaque règle doit avoir une description claire :
```
✅ "Allow web server in DMZ to PostgreSQL in LAN (10.0.1.100:5432)"
❌ "Allow DMZ to LAN"
```

### ✅ Review régulier

- **Mensuel** : Vérifier les règles, supprimer celles qui ne servent plus
- **Après incident** : Analyser les logs, ajuster les règles

### ✅ Logging

- Activer le logging sur toutes les règles "Block"
- Optionnel sur les règles "Pass" (peut générer beaucoup de logs)

### ✅ Testing

Après chaque modification :
1. Tester que ce qui doit marcher fonctionne
2. Tester que ce qui doit être bloqué est bien bloqué
```bash
# Exemple de test depuis une VM en DMZ
ping 10.0.1.1  # Doit être bloqué
ping 1.1.1.1   # Doit fonctionner
```

---

## Évolutions futures

### Port Forwarding (quand nécessaire)

Pour exposer un service en DMZ :
```
Firewall → NAT → Port Forward

WAN Interface: WAN
Protocol: TCP
Destination: WAN address
Destination Port: 443
Redirect Target IP: 10.0.2.50 (serveur web DMZ)
Redirect Target Port: 443
Description: Forward HTTPS to web server
```

**Avec Cloudflare Tunnel, pas besoin de port forwarding !** ✅

### VPN (WireGuard)

Pour un accès VPN classique (alternative à Cloudflare Tunnel) :
```
VPN → Tunnel vers MGMT (10.0.4.0/24)
    ↓
Depuis MGMT, accès à toute l'infra
```

### IDS/IPS (Suricata)

OPNsense peut installer Suricata pour détecter les intrusions :

**System → Firmware → Plugins** → Installer `os-suricata`

---

## Ressources

- **pf Handbook** : https://www.openbsd.org/faq/pf/
- **OPNsense Docs** : https://docs.opnsense.org/manual/firewall.html
- **NIST Security Guidelines** : https://www.nist.gov/cyberframework