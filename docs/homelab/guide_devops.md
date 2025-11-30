---
sidebar_position: 1
sidebar_label: "Lab DevOps🚀"
---

# 🚀 GUIDE COMPLET LAB DEVOPS & PROJETS APPRENTISSAGE

*Guide pratique pour Nélia - Décembre 2025*
*Objectif : Apprentissage DevOps + Portfolio + CDI 2027 + Atlas 🐕*

---

## 📋 TABLE DES MATIÈRES GÉNÉRALE

1. **Introduction & Par où commencer**
2. **Fondamentaux Réseau**
3. **Projets DevOps (15+ idées)**
4. **Projets Fun (10+ idées)**
5. **Technologies Expliquées**
6. **Ressources YouTube & Apprentissage**
7. **Tips Concentration & Motivation**

---

# 📍 PARTIE 1 : INTRODUCTION & PAR OÙ COMMENCER

---

## 🎯 TON CONTEXTE (Novembre 2025)

### Qui tu es

**Nélia, 23 ans**
- DevOps apprentice à ARPEGE (Nantes)
- ESGI : Expert système-réseau (2024-2027)
- Alternance jusqu'à janvier 2027
- **Objectif final : CDI DevOps 35-40k€ + Atlas 🐕**

### Ta situation actuelle

**Points forts ✅**
- 2 machines puissantes (M710S 32GB, M725S 16GB)
- Compétences existantes : Ansible, GitLab CI/CD, Docker, Proxmox
- Motivation forte (Atlas = destination)
- **Curiosité naturelle**

**Défis ⚠️**
- Dépression (antidépresseurs mois 1)
- Fatigue, concentration difficile
- Alternance + école = temps limité

**Priorités maintenant**
1. **Santé mentale** 🧠 (NON-NÉGOCIABLE)
2. **Permis auto** 🚗 (finir 20h, mars 2026)
3. **Présentation janvier 2026** (projet école)
4. Tout le reste = optionnel

---

## 🖥️ TON MATÉRIEL

### Machine 1 : Lenovo ThinkCentre M710S SFF

**Specs**
- CPU : Intel i7-6ème gen (4 cores / 8 threads)
- RAM : 32 GB
- Format : SFF (Small Form Factor, compact)
- Excellent pour virtualisation

**Usage recommandé : LAB 1 - APPRENTISSAGE** 📚
- Proxmox host principal
- VMs + Containers LXC
- Projets DevOps (K8s, CI/CD, monitoring)
- **Portfolio technique**

---

### Machine 2 : Lenovo ThinkCentre M725S SFF

**Specs**
- CPU : AMD Ryzen 5 PRO 2400G
- RAM : 16 GB
- Format : SFF

**Usage recommandé : LAB 2 - FUN** 🎬
- Media server (Jellyfin)
- Services amis (Sonarr, Radarr)
- **Projets perso plaisir**

---

### Pourquoi 2 labs séparés ?

**Lab 1 (Apprentissage) ≠ Lab 2 (Fun)**

✅ **Séparation mentale claire**
- Travail vs loisir
- Pas de mélange
- **Clarté cognitive**

✅ **Sécurité**
- Lab 2 = accès externe (amis)
- Lab 1 = interne only
- **Isolation risques**

✅ **Performance**
- Lab 1 pas ralenti par torrents
- Lab 2 pas ralenti par K8s
- **Optimisé chaque usage**

---
### Architecture réseau
```
Internet
   ↓
Box (192.168.1.1)
   ↓
Proxmox Host (vmbr0 - 192.168.1.x) ← Management du host
   ↓
pfSense VM (WAN sur vmbr0)
   ↓
├─ vmbr1 (LAN)      - 10.0.1.0/24   ← VMs de prod
├─ vmbr2 (DMZ)      - 10.0.2.0/24   ← Services exposés
├─ vmbr3 (DEV)      - 10.0.3.0/24   ← Lab de test
└─ vmbr4 (MGMT)     - 10.0.4.0/24   ← Management des VMs
```
---

## 🎯 OBJECTIFS GLOBAUX

### Court terme (Décembre 2025 - Janvier 2026)

**Présentation projet école (janvier 2026)**
- Architecture lab Proxmox
- Réseau basique (VLANs, subnetting)
- Ansible automatisation
- **Documentation Docusaurus** ✨

**Permis auto**
- Finir 12h initiales (9h restantes)
- Acheter pack 10h (504€)
- **Obtenir mars 2026** 🚗

**Santé**
- Antidépresseurs réguliers
- Repos suffisant
- **Bienveillance envers toi-même** 💙

---

### Moyen terme (Février - Juin 2026)

**Lab 1 expansion**
- Terraform (Infrastructure as Code)
- GitLab CI/CD (pipelines complets)
- Kubernetes (cluster 3 nodes)
- **Portfolio GitHub/GitLab**

**Fin alternance**
- Juillet 2026
- Niveau 4 validé ✅
- **Repos mérité**

---

### Long terme (Juillet 2026 - Janvier 2027)

**Lab 2 setup (Fun)**
- Jellyfin + stack media
- Sécurité complète (VPN, Wireguard, Authelia)
- **Amis invités** 🎬

**Portfolio finalisé**
- Docusaurus site complet
- 5-10 projets documentés
- **GitHub actif, contributions**

**Préparation 5ème année**
- Réseau (bases solides)
- Approfondissement si besoin
- **Rattrapage janvier 2027**

---

### Objectif final (Janvier 2027)

**🎉 CDI DevOps Nantes (35-40k€)**

**🚗 Voiture automatique (6 500€ prêt)**

**🏠 Appart stable**

**📅 Planification adoption Atlas (octobre 2027)**

**→ VIE COMMENCE** ✨💙🐕

---

## 🚀 PREMIERS PAS CONCRETS

### Si tu commences ce weekend (décembre 2025)

**Objectif : Lab 1 fonctionnel basique**

**Temps total : 4-6h réparties sur 2 jours**

---

#### **Samedi matin (2-3h)**

**Action 1 : Vérifier matériel M710S** (15 min)
- [ ] Machine démarre ?
- [ ] Affichage fonctionne ?
- [ ] Clavier/souris connectés ?
- [ ] **Stockage présent ?** (SSD/HDD, taille ?)

**Action 2 : Télécharger Proxmox ISO** (20 min)
- [ ] Va sur proxmox.com/en/downloads
- [ ] Télécharge Proxmox VE (dernière version)
- [ ] **Fichier : proxmox-ve_X.X-X.iso (~1 GB)**

**Action 3 : Créer USB bootable** (10 min)
- [ ] USB clé (8 GB minimum)
- [ ] Logiciel : Rufus (Windows) ou Etcher (Mac/Linux)
- [ ] Flash ISO Proxmox sur USB
- [ ] **USB prête** ✅

**Action 4 : Installer Proxmox** (1-1h30)
- [ ] Insérer USB dans M710S
- [ ] Boot sur USB (F12 ou Del au démarrage)
- [ ] Suivre wizard installation Proxmox
  - Langue : Français (ou English)
  - Disque : Sélectionner SSD/HDD principal
  - Pays/Timezone : France/Paris
  - **Password root : NOTER QUELQUE PART** ⚠️
  - Email : ton email
  - Hostname : `proxmox-m710s.lab.local`
  - **IP Management : 192.168.1.100** (exemple, adapter à ton réseau)
  - Gateway : 192.168.1.1 (ta box Internet)
  - DNS : 1.1.1.1
- [ ] Installation (15-20 min)
- [ ] Reboot
- [ ] **Proxmox installé** 🎉

**Action 5 : Accéder interface web** (10 min)
- [ ] Sur ton PC, navigateur : `https://192.168.1.100:8006`
- [ ] Accept certificat (warning normal, c'est ton lab)
- [ ] Login :
  - User : `root`
  - Password : celui noté avant
  - Realm : `Linux PAM`
- [ ] **Tu vois l'interface Proxmox** ✅

---

#### **Samedi après-midi (1-2h)**

**Action 6 : Télécharger template container** (10 min)
- [ ] Proxmox UI → Node (proxmox-m710s) → Local → CT Templates
- [ ] Click "Templates" bouton
- [ ] Cherche : `ubuntu-22.04-standard`
- [ ] **Download** (100-200 MB)

**Action 7 : Créer premier container LXC** (15 min)
- [ ] Bouton "Create CT" (en haut à droite)
- [ ] Wizard :
  - CT ID : 100 (auto)
  - Hostname : `ansible-controller`
  - **Password : NOTER** ⚠️
  - Template : ubuntu-22.04
  - Storage : local-lvm
  - Disk : 8 GB
  - CPU : 1 core
  - RAM : 1024 MB (1 GB)
  - Network :
    - Bridge : vmbr0
    - IPv4 : **Static** → `10.0.0.10/24`
    - Gateway : `10.0.0.1` (adapter à ton réseau)
    - IPv6 : SLAAC (ou ignore)
  - DNS : 1.1.1.1
- [ ] **Finish** → Container créé ✅

**Action 8 : Démarrer container** (2 min)
- [ ] Select container 100
- [ ] Bouton "Start"
- [ ] **Container running** ✅

**Action 9 : Accéder console container** (5 min)
- [ ] Container 100 → Console
- [ ] Login : `root`
- [ ] Password : celui noté
- [ ] **Tu es dans le container** 🎉

**Action 10 : Test basique** (10 min)
```bash
# Update
apt update

# Install quelque chose (test)
apt install curl -y

# Test Internet
curl -I https://google.com

# Si OK → Container a Internet ✅
```

**Action 11 : Créer 2ème container** (15 min)
- [ ] Repeat Action 7
- [ ] Hostname : `target-01`
- [ ] CT ID : 101
- [ ] IP : `10.0.0.11/24`
- [ ] **Même config reste**

**Action 12 : Test réseau entre containers** (10 min)
```bash
# Depuis container 100 (ansible-controller)
ping 10.0.0.11

# Si répond → Réseau fonctionne ✅
```

---

#### **Dimanche (1-2h) - Optionnel**

**Action 13 : Créer 3ème container** (15 min)
- [ ] Hostname : `target-02`
- [ ] CT ID : 102
- [ ] IP : `10.0.0.12/24`

**Action 14 : Explorer Proxmox UI** (30 min)
- [ ] Check CPU/RAM usage (graphs)
- [ ] Regarder options containers
- [ ] **Familiarisation interface**

**Action 15 : Regarder 1-2 vidéos YouTube** (30-60 min)
- [ ] "Proxmox for Beginners" (LearnLinuxTV)
- [ ] "LXC Containers explained"
- [ ] **Apprendre en regardant**

---

### Résultat après ce weekend

✅ **Proxmox installé et fonctionnel**

✅ **3 containers LXC créés**

✅ **Réseau basique qui marche** (ils se pingent)

✅ **Tu as compris les bases Proxmox**

✅ **Prêt pour Ansible (semaine suivante)**

---

## 🗓️ PLAN 6 SEMAINES (Présentation Janvier)

### Semaine 1 (Fin novembre / Début décembre)

**Objectif : Setup Proxmox + Containers**
- Install Proxmox M710S
- 3 containers LXC
- Réseau basique (1 bridge)
- **Temps : 6h**

---

### Semaine 2 (Début décembre)

**Objectif : Ansible basics**
- Install Ansible (container 100)
- Inventory (liste hosts)
- Playbook simple : install nginx sur targets
- **Temps : 4h**

**Exemple playbook :**
```yaml
# playbook.yml
---
- name: Install Nginx
  hosts: targets
  tasks:
    - name: Update apt
      apt:
        update_cache: yes
    
    - name: Install Nginx
      apt:
        name: nginx
        state: present
    
    - name: Start Nginx
      service:
        name: nginx
        state: started
```

**Résultat :**
- Nginx installé sur target-01 et target-02
- **Automatisation fonctionne** ✅

---

### Semaine 3 (Mi-décembre)

**Objectif : Réseau VLANs**
- Créer VLAN 10 (web) et VLAN 20 (db)
- Containers dans VLANs différents
- Firewall rules (VLAN 10 → VLAN 20 OK, inverse bloqué)
- **Temps : 5h**

**Architecture :**
```
vmbr0.10 (VLAN 10 - Web)
├─ CT 103: nginx (10.10.0.10)
└─ CT 104: apache (10.10.0.11)

vmbr0.20 (VLAN 20 - Database)
└─ CT 105: postgresql (10.20.0.10)

Règles :
- CT 103/104 peuvent accéder CT 105 (requêtes DB)
- CT 105 NE PEUT PAS accéder CT 103/104 (sécurité)
```

---

### Semaine 4 (Fin décembre - Vacances possibles)

**Objectif : Documentation Docusaurus**
- Setup Docusaurus (si tu veux)
- **OU** juste markdown simple
- Documenter architecture lab
- Screenshots Proxmox
- **Temps : 3h**

**OU Semaine de repos** (priorité santé) 💙

---

### Semaine 5 (Début janvier)

**Objectif : Terraform basics (optionnel)**
- Install Terraform
- Provider Proxmox
- Créer 1 container via Terraform
- **Temps : 4h**

**OU continuer Ansible** (playbooks + avancés)

---

### Semaine 6 (Mi-janvier, avant présentation)

**Objectif : Finaliser présentation**
- Schéma architecture (draw.io)
- Slides (5-10 slides)
- Démonstration (optionnel mais impressionnant)
- **Temps : 4h**

---

**TOTAL : 26h sur 6 semaines**

**= 4-5h/semaine moyenne**

**Gérable avec alternance + permis** ✅

---

## 💙 PRINCIPES IMPORTANTS

### 1. Santé d'abord

**Si fatiguée → Repos**

**Pas de culpabilité**

**Lab attendra** 💙

---

### 2. Petit pas > Grand pas

**1 container/jour > 10 containers/semaine puis burnout**

**Régularité > Intensité**

---

### 3. Learning by doing

**Pas CCNA théorique**

**TU FAIS → TU APPRENDS**

**Erreurs = apprentissage** ✅

---

### 4. Documentation = portfolio

**Chaque truc fait = documenté**

**Screenshots, markdown, GitHub**

**→ Portfolio grandit naturellement** 💼

---

### 5. Motivation = Atlas

**Chaque heure lab = 1 pas vers lui** 🐕

**Lab → Portfolio → CDI → Voiture → Atlas** ✨

---

## ✅ CHECKLIST DÉMARRAGE

**Avant de commencer lab, tu as :**

- [ ] M710S fonctionnelle (allumée, testée)
- [ ] Câble Ethernet (M710S → router)
- [ ] Clé USB 8GB (pour Proxmox)
- [ ] **Temps dispo 4-6h weekend** (ou étalé semaine)
- [ ] **Énergie suffisante** (pas forcing si fatiguée)

**Pendant setup, tu notes :**

- [ ] Password root Proxmox
- [ ] IP Management Proxmox (ex: 192.168.1.100)
- [ ] Passwords containers
- [ ] **IPs containers** (pour Ansible inventory après)

**Après setup, tu as :**

- [ ] Proxmox accessible web (https://IP:8006)
- [ ] 3 containers running
- [ ] Containers se pingent
- [ ] **Satisfaction d'avoir FAIT** 🎉

---

# 🌐 PARTIE 2 : FONDAMENTAUX RÉSEAU

---

## 🎯 POURQUOI RÉSEAU (Pour DevOps)

### Tu n'as PAS besoin de tout savoir

**CCNA = 200h théorie dense** ❌

**DevOps = 20-30h concepts essentiels** ✅

---

### Ce que DevOps utilise vraiment

**80% du temps :**
- IP & Subnetting (adresser machines)
- DNS (noms → IPs)
- Ports (services accessibles)
- Firewall (sécurité basique)
- VLANs (segmentation simple)

**20% du temps :**
- Load balancers
- VPN
- Routage avancé

**0% du temps :**
- Protocoles routage (OSPF, BGP)
- Switching avancé (STP, VTP)
- **Tout le reste CCNA théorique** ❌

---

## 📖 CONCEPTS ESSENTIELS

### 1. Adresse IP (Internet Protocol)

**C'est quoi**
- Adresse unique machine sur réseau
- Comme adresse postale maison
- **Format : 192.168.1.10**

**Deux types :**

**IPv4** (on utilise ça)
- Format : X.X.X.X (4 nombres 0-255)
- Exemple : 192.168.1.10
- **Le standard actuel**

**IPv6** (futur, ignore pour l'instant)
- Format : XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX
- Exemple : 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- **Pas urgent DevOps débutant**

---

### 2. Masque de sous-réseau (Subnet Mask)

**C'est quoi**
- Définit taille du réseau
- Combien de machines peuvent se parler
- **Format : /24 ou 255.255.255.0**

**Notation CIDR (la plus utilisée) :**

**10.0.0.0/24**
- /24 = 256 IPs possibles
- 254 IPs utilisables (2 réservées)
- **Range : 10.0.0.1 → 10.0.0.254**

**10.0.0.0/16**
- /16 = 65 536 IPs possibles
- **Range : 10.0.0.1 → 10.0.255.254**

**10.0.0.0/8**
- /8 = 16 777 216 IPs possibles
- **Range : 10.0.0.1 → 10.255.255.254**

**Truc mnémotechnique :**
- /24 = petit réseau (maison, petit labo)
- /16 = moyen réseau (entreprise)
- /8 = gros réseau (datacenter)

---

### 3. IP Privée vs IP Publique

**IP Privée (LAN - Local Area Network)**
- Utilisée DANS ton réseau local
- Pas accessible depuis Internet
- **Ranges réservées :**
  - 10.0.0.0/8 (10.x.x.x)
  - 172.16.0.0/12 (172.16.x.x → 172.31.x.x)
  - 192.168.0.0/16 (192.168.x.x)

**IP Publique (WAN - Wide Area Network)**
- Ton adresse sur Internet
- Donnée par FAI (Fournisseur Accès Internet)
- **Visible de partout**
- Exemple : 82.64.123.45

**Dans ton lab :**
- Containers/VMs = **IPs privées** (10.0.0.x)
- Ta box Internet = **1 IP publique**
- **NAT** (voir ci-dessous) fait le pont

---

### 4. Gateway (Passerelle)

**C'est quoi**
- Porte de sortie du réseau local
- Route vers Internet (ou autre réseau)
- **Généralement = ta box Internet**

**Exemple :**
```
Ton réseau : 192.168.1.0/24
Gateway : 192.168.1.1 (ta box)

Container 10.0.0.10 veut aller sur google.com
→ Envoie paquet à Gateway 10.0.0.1
→ Gateway route vers Internet
→ Réponse revient
```

**Sans Gateway = pas d'Internet** ❌

---

### 5. DNS (Domain Name System)

**C'est quoi**
- Traduit noms → IPs
- Annuaire Internet
- **Tu tapes "google.com" → DNS trouve "142.250.x.x"**

**DNS publics populaires :**
- **1.1.1.1** (Cloudflare - rapide, privé) ⭐⭐⭐⭐⭐
- 8.8.8.8 (Google - rapide)
- 9.9.9.9 (Quad9 - sécurité++)

**Dans ton lab :**
- Containers utilisent DNS public (1.1.1.1)
- **OU** DNS local (Pi-hole si tu setup après)

**Exemple :**
```bash
# Ton container ping google.com
ping google.com

# DNS résout google.com → 142.250.185.46
# Ping envoie à cette IP
# ✅ Réponse
```

---

### 6. Ports

**C'est quoi**
- Numéro qui identifie SERVICE sur machine
- Comme numéros appartement dans immeuble
- **Range : 0-65535**

**Ports standards (à connaître) :**

| Port | Service | Usage |
|------|---------|-------|
| 22 | SSH | Connexion serveur (terminal) |
| 80 | HTTP | Web (non chiffré) |
| 443 | HTTPS | Web (chiffré SSL) |
| 3306 | MySQL | Base de données |
| 5432 | PostgreSQL | Base de données |
| 8080 | HTTP alt | Web (dev, proxies) |
| 8096 | Jellyfin | Media server |
| 51820 | Wireguard | VPN |

**Exemple :**
```
Nginx écoute port 80
→ Requête http://10.0.0.10:80 → Nginx répond

PostgreSQL écoute port 5432
→ App se connecte 10.0.0.20:5432 → Base de données répond
```

---

### 7. Firewall

**C'est quoi**
- Filtre trafic réseau
- Autorise OU bloque selon règles
- **Sécurité basique essentielle**

**Règles firewall (exemples) :**
```
Autoriser :
- Port 22 (SSH) depuis 10.0.0.0/24 (ton réseau local)
- Port 80 (HTTP) depuis partout (0.0.0.0/0)
- Port 443 (HTTPS) depuis partout

Bloquer :
- Port 3306 (MySQL) depuis Internet (sécurité)
- Tout le reste par défaut (whitelist approach)
```

**Dans Proxmox :**
- Firewall intégré (Datacenter → Firewall)
- Règles par container/VM
- **Facile à configurer** ✅

---

### 8. VLANs (Virtual LANs)

**C'est quoi**
- Séparer réseau physique en plusieurs réseaux logiques
- Isolation services
- **Sécurité + organisation**

**Exemple architecture :**
```
Réseau physique unique (vmbr0)
│
├─ VLAN 10 (Web - DMZ)
│   ├─ 10.10.0.10 (Nginx)
│   └─ 10.10.0.11 (Apache)
│
├─ VLAN 20 (Applications)
│   ├─ 10.20.0.10 (Node.js app)
│   └─ 10.20.0.11 (Python app)
│
└─ VLAN 30 (Databases)
    ├─ 10.30.0.10 (PostgreSQL)
    └─ 10.30.0.11 (MongoDB)
```

**Avantages :**
- VLAN 30 (DB) isolé = sécurité
- Si VLAN 10 compromis, VLAN 30 protégé
- **Architecture 3-tiers professionnelle** ✅

---

### 9. NAT (Network Address Translation)

**C'est quoi**
- Traduit IPs privées → IP publique
- Permet réseau local accéder Internet avec 1 seule IP publique
- **Ta box fait ça automatiquement**

**Exemple :**
```
Container 10.0.0.10 veut aller sur google.com

1. Container envoie requête (source: 10.0.0.10)
2. Box reçoit, fait NAT (source: 82.64.x.x - ton IP publique)
3. Google répond à 82.64.x.x
4. Box fait reverse NAT (destination: 10.0.0.10)
5. Container reçoit réponse
```

**Tu n'as rien à faire, ça marche tout seul** ✅

---

### 10. DHCP vs IP Statique

**DHCP (Dynamic Host Configuration Protocol)**
- Serveur attribue IPs automatiquement
- Pratique pour devices temporaires (laptops, phones)
- **IP peut changer à chaque reboot**

**IP Statique**
- Tu configures IP manuellement
- IP ne change jamais
- **CRUCIAL pour serveurs/containers lab**

**Dans ton lab :**
- **Containers = IPs statiques** ✅
  - Ansible a besoin IPs fixes (inventory)
  - Services ont besoin IPs fixes (DNS, firewall rules)
- **Ton laptop = DHCP** (tu te connectes Proxmox web)

---

## 🛠️ LABS RÉSEAU PROGRESSIFS

### Lab Réseau 1 : Bridge Unique (Semaine 1)

**Objectif : Comprendre base réseau Proxmox**

**Architecture :**
```
Proxmox M710S
│
└─ vmbr0 (Bridge par défaut)
    └─ 10.0.0.0/24
        ├─ 10.0.0.1 (Gateway - ta box)
        ├─ 10.0.0.10 (Container ansible-controller)
        ├─ 10.0.0.11 (Container target-01)
        └─ 10.0.0.12 (Container target-02)
```

**Config container (exemple CT 100) :**
```
Network:
  Bridge: vmbr0
  IPv4: 10.0.0.10/24 (Static)
  Gateway: 10.0.0.1
  DNS: 1.1.1.1
```

**Tests :**
```bash
# Depuis ansible-controller (10.0.0.10)

# Test 1 : Ping gateway
ping 10.0.0.1
# ✅ Doit répondre

# Test 2 : Ping autre container
ping 10.0.0.11
# ✅ Doit répondre

# Test 3 : Ping Internet (DNS test)
ping google.com
# ✅ Doit répondre (résolution DNS + Internet)

# Test 4 : Check DNS
nslookup google.com
# ✅ Doit renvoyer IP
```

**Concepts appris :**
- IP statique
- Gateway
- DNS
- **Réseau fonctionnel basique** ✅

**Temps : 1h**

---

### Lab Réseau 2 : VLANs Segmentation (Semaine 3)

**Objectif : Séparer services par VLAN**

**Architecture :**
```
Proxmox M710S
│
├─ vmbr0.10 (VLAN 10 - Web/DMZ)
│   └─ 10.10.0.0/24
│       ├─ 10.10.0.10 (nginx-web)
│       └─ 10.10.0.11 (apache-web)
│
├─ vmbr0.20 (VLAN 20 - Applications)
│   └─ 10.20.0.0/24
│       └─ 10.20.0.10 (nodejs-app)
│
└─ vmbr0.30 (VLAN 30 - Databases)
    └─ 10.30.0.0/24
        └─ 10.30.0.10 (postgresql-db)
```

**Config Proxmox (créer VLANs) :**

**Datacenter → Node → System → Network**
```
1. Select vmbr0
2. Click "Create" → "Linux VLAN"
3. Name: vmbr0.10
4. VLAN Tag: 10
5. IPv4/CIDR: 10.10.0.1/24
6. Apply

Répète pour VLAN 20 (10.20.0.1/24) et VLAN 30 (10.30.0.1/24)
```

**Config containers :**
```
nginx-web (CT 110) :
  Bridge: vmbr0.10
  IPv4: 10.10.0.10/24
  Gateway: 10.10.0.1

nodejs-app (CT 120) :
  Bridge: vmbr0.20
  IPv4: 10.20.0.10/24
  Gateway: 10.20.0.1

postgresql-db (CT 130) :
  Bridge: vmbr0.30
  IPv4: 10.30.0.10/24
  Gateway: 10.30.0.1
```

**Firewall rules (Proxmox Firewall) :**

**VLAN 20 (App) → VLAN 30 (DB) : ALLOW**
```
Direction: OUT
Action: ACCEPT
Protocol: TCP
Source: 10.20.0.0/24
Dest: 10.30.0.10
Dest Port: 5432
Comment: App can access DB
```

**VLAN 30 (DB) → VLAN 20 (App) : DENY**
```
Direction: OUT
Action: DROP
Source: 10.30.0.0/24
Dest: 10.20.0.0/24
Comment: DB cannot initiate to App
```

**Tests :**
```bash
# Depuis nodejs-app (10.20.0.10)
ping 10.30.0.10
# ✅ Répond (firewall autorise)

# Test connexion DB
nc -zv 10.30.0.10 5432
# ✅ Port ouvert

# Depuis postgresql-db (10.30.0.10)
ping 10.20.0.10
# ❌ Timeout (firewall bloque)
```

**Concepts appris :**
- VLANs (segmentation)
- Firewall rules (sécurité)
- **Architecture 3-tiers** ✅

**Temps : 4h**

---

### Lab Réseau 3 : Reverse Proxy (Semaine 5-6)

**Objectif : Point d'entrée unique, SSL**

**Architecture :**
```
Internet
    │
    ├─ Ton PC (192.168.1.50)
    │
[Proxmox M710S]
    │
    ├─ CT Nginx Reverse Proxy (10.0.0.100)
    │   └─ Écoute port 80/443
    │   └─ Route vers services internes
    │
    ├─ CT Jellyfin (10.0.0.10)
    │   └─ Port 8096
    │
    └─ CT Grafana (10.0.0.20)
        └─ Port 3000
```

**Config Nginx reverse proxy :**
```nginx
# /etc/nginx/sites-available/jellyfin
server {
    listen 80;
    server_name jellyfin.lab.local;

    location / {
        proxy_pass http://10.0.0.10:8096;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# /etc/nginx/sites-available/grafana
server {
    listen 80;
    server_name grafana.lab.local;

    location / {
        proxy_pass http://10.0.0.20:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Activer sites :**
```bash
ln -s /etc/nginx/sites-available/jellyfin /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/grafana /etc/nginx/sites-enabled/
systemctl reload nginx
```

**Fichier hosts (ton PC) :**

**Windows : C:\Windows\System32\drivers\etc\hosts**
**Linux/Mac : /etc/hosts**
```
10.0.0.100  jellyfin.lab.local
10.0.0.100  grafana.lab.local
```

**Tests :**
```
Navigateur ton PC :

http://jellyfin.lab.local
→ ✅ Redirige vers Jellyfin (10.0.0.10:8096)

http://grafana.lab.local
→ ✅ Redirige vers Grafana (10.0.0.20:3000)
```

**Concepts appris :**
- Reverse proxy (routing)
- Virtual hosts (noms domaines)
- **Point d'entrée unique** ✅

**Temps : 3h**

---

## 📺 RESSOURCES RÉSEAU YOUTUBE

### Pour apprendre concepts (vidéos courtes)

**NetworkChuck** ⭐⭐⭐⭐⭐
- Chaîne : youtube.com/@NetworkChuck
- Style : Fun, énergique, exemples concrets
- **Vidéos recommandées :**
  - "Subnetting made easy" (15 min)
  - "VLANs explained" (12 min)
  - "What is DNS?" (10 min)

**Practical Networking** ⭐⭐⭐⭐⭐
- Chaîne : youtube.com/@PracticalNetworking
- Style : Clair, schémas excellents
- **Vidéos recommandées :**
  - "How data flows on the Internet" (20 min)
  - "OSI Model explained" (15 min)

---

### Pour Proxmox networking spécifique

**LearnLinuxTV** ⭐⭐⭐⭐⭐
- Playlist : "Proxmox Full Course"
- Vidéo : "Proxmox Networking Explained" (25 min)
- **Parfait pour ton lab**

**TechnoTim** ⭐⭐⭐⭐
- Vidéo : "Proxmox VLANs and Firewall" (18 min)
- Exemples concrets homelab

---

## 🧠 LEARNING BY DOING (Pas théorie)

### Approche recommandée

**❌ PAS FAIRE :**
- Regarder 10h cours CCNA d'affilée
- Lire RFC protocoles (ennuyeux, inutile)
- Mémoriser tables routage (overkill)

**✅ FAIRE :**
1. **Problème concret** : "Je veux 2 réseaux séparés"
2. **Recherche ciblée** : "Proxmox VLANs tutorial" (vidéo 10-15 min)
3. **Application immédiate** : Configure dans ton lab
4. **Test** : Ça marche ? ✅ Concept ancré
5. **Documentation** : Note ce que tu as fait

**Cycle : Besoin → Apprendre minimum → Faire → Retenir** ✅

---

### Exemples cycles apprentissage

**Cycle 1 : "Je veux Jellyfin accessible depuis mon PC"**
→ Recherche : "reverse proxy nginx"
→ Vidéo 10 min
→ Configure Nginx container
→ **Ça marche** ✅
→ Tu comprends reverse proxy maintenant

**Cycle 2 : "Je veux séparer web et database"**
→ Recherche : "VLANs Proxmox"
→ Vidéo 15 min
→ Crée VLAN 10 et VLAN 20
→ **Ça marche** ✅
→ Tu comprends VLANs maintenant

**Cycle 3 : "Je veux bloquer accès DB depuis Internet"**
→ Recherche : "Proxmox firewall rules"
→ Doc 5 min
→ Configure firewall
→ **Ça marche** ✅
→ Tu comprends firewall maintenant

**→ Apprentissage naturel, motivé par BESOIN** 💪

---

## 💙 TIPS RÉSEAU (Spécial toi)

### Concentration difficile

**Vidéos courtes (10-15 min max)**
- NetworkChuck parfait (rythme rapide, fun)
- **Pas cours 2h** (tu décrocheras)

**Pomodoro réseau**
- 25 min vidéo/config
- 5 min pause
- **Repeat 2×** = 1h session max

---

### Réseau = abstrait

**Toujours faire schéma (draw.io, papier)**
- Dessiner boxes (containers)
- Flèches (connexions)
- **Visuel = compréhension** ✅

**Exemple schéma simple :**
```
[Ton PC]
    │
    │ (HTTP)
    ▼
[Nginx Proxy - 10.0.0.100]
    │
    ├─(route)──▶ [Jellyfin - 10.0.0.10:8096]
    │
    └─(route)──▶ [Grafana - 10.0.0.20:3000]
```

---

### Frustration normale

**"Ça marche pas, je comprends rien"**
→ NORMAL
→ Prends pause 10 min
→ Reviens
→ **Souvent ça s'éclaire après pause** 💡

**"C'est trop compliqué"**
→ Peut-être que tu as sauté étapes
→ Reviens au + simple
→ **Baby steps** 👣

---

## ✅ CHECKLIST COMPÉTENCES RÉSEAU

**Pour présentation janvier, tu dois savoir :**

- [ ] Expliquer IP (c'est quoi, pourquoi)
- [ ] Différence IP privée / publique
- [ ] C'est quoi un gateway
- [ ] C'est quoi DNS (exemple concret)
- [ ] Ports essentiels (22, 80, 443)
- [ ] **VLANs basique** (pourquoi séparer)
- [ ] Firewall concept (autoriser/bloquer)

**Tu N'AS PAS besoin savoir :**
- [ ] ❌ Protocoles routage (OSPF, BGP)
- [ ] ❌ Calculs subnetting complexes
- [ ] ❌ Modèle OSI 7 couches détaillé
- [ ] ❌ **Rien du reste CCNA théorique**

**Pour 5ème année, tu approfondiras si besoin** ✅

---

# 🌐 PARTIE 2 : FONDAMENTAUX RÉSEAU

---

## 🎯 POURQUOI RÉSEAU (Pour DevOps)

### Tu n'as PAS besoin de tout savoir

**CCNA = 200h théorie dense** ❌

**DevOps = 20-30h concepts essentiels** ✅

---

### Ce que DevOps utilise vraiment

**80% du temps :**
- IP & Subnetting (adresser machines)
- DNS (noms → IPs)
- Ports (services accessibles)
- Firewall (sécurité basique)
- VLANs (segmentation simple)

**20% du temps :**
- Load balancers
- VPN
- Routage avancé

**0% du temps :**
- Protocoles routage (OSPF, BGP)
- Switching avancé (STP, VTP)
- **Tout le reste CCNA théorique** ❌

---

## 📖 CONCEPTS ESSENTIELS

### 1. Adresse IP (Internet Protocol)

**C'est quoi**
- Adresse unique machine sur réseau
- Comme adresse postale maison
- **Format : 192.168.1.10**

**Deux types :**

**IPv4** (on utilise ça)
- Format : X.X.X.X (4 nombres 0-255)
- Exemple : 192.168.1.10
- **Le standard actuel**

**IPv6** (futur, ignore pour l'instant)
- Format : XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX
- Exemple : 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- **Pas urgent DevOps débutant**

---

### 2. Masque de sous-réseau (Subnet Mask)

**C'est quoi**
- Définit taille du réseau
- Combien de machines peuvent se parler
- **Format : /24 ou 255.255.255.0**

**Notation CIDR (la plus utilisée) :**

**10.0.0.0/24**
- /24 = 256 IPs possibles
- 254 IPs utilisables (2 réservées)
- **Range : 10.0.0.1 → 10.0.0.254**

**10.0.0.0/16**
- /16 = 65 536 IPs possibles
- **Range : 10.0.0.1 → 10.0.255.254**

**10.0.0.0/8**
- /8 = 16 777 216 IPs possibles
- **Range : 10.0.0.1 → 10.255.255.254**

**Truc mnémotechnique :**
- /24 = petit réseau (maison, petit labo)
- /16 = moyen réseau (entreprise)
- /8 = gros réseau (datacenter)

---

### 3. IP Privée vs IP Publique

**IP Privée (LAN - Local Area Network)**
- Utilisée DANS ton réseau local
- Pas accessible depuis Internet
- **Ranges réservées :**
  - 10.0.0.0/8 (10.x.x.x)
  - 172.16.0.0/12 (172.16.x.x → 172.31.x.x)
  - 192.168.0.0/16 (192.168.x.x)

**IP Publique (WAN - Wide Area Network)**
- Ton adresse sur Internet
- Donnée par FAI (Fournisseur Accès Internet)
- **Visible de partout**
- Exemple : 82.64.123.45

**Dans ton lab :**
- Containers/VMs = **IPs privées** (10.0.0.x)
- Ta box Internet = **1 IP publique**
- **NAT** (voir ci-dessous) fait le pont

---

### 4. Gateway (Passerelle)

**C'est quoi**
- Porte de sortie du réseau local
- Route vers Internet (ou autre réseau)
- **Généralement = ta box Internet**

**Exemple :**
```
Ton réseau : 192.168.1.0/24
Gateway : 192.168.1.1 (ta box)

Container 10.0.0.10 veut aller sur google.com
→ Envoie paquet à Gateway 10.0.0.1
→ Gateway route vers Internet
→ Réponse revient
```

**Sans Gateway = pas d'Internet** ❌

---

### 5. DNS (Domain Name System)

**C'est quoi**
- Traduit noms → IPs
- Annuaire Internet
- **Tu tapes "google.com" → DNS trouve "142.250.x.x"**

**DNS publics populaires :**
- **1.1.1.1** (Cloudflare - rapide, privé) ⭐⭐⭐⭐⭐
- 8.8.8.8 (Google - rapide)
- 9.9.9.9 (Quad9 - sécurité++)

**Dans ton lab :**
- Containers utilisent DNS public (1.1.1.1)
- **OU** DNS local (Pi-hole si tu setup après)

**Exemple :**
```bash
# Ton container ping google.com
ping google.com

# DNS résout google.com → 142.250.185.46
# Ping envoie à cette IP
# ✅ Réponse
```

---

### 6. Ports

**C'est quoi**
- Numéro qui identifie SERVICE sur machine
- Comme numéros appartement dans immeuble
- **Range : 0-65535**

**Ports standards (à connaître) :**

| Port | Service | Usage |
|------|---------|-------|
| 22 | SSH | Connexion serveur (terminal) |
| 80 | HTTP | Web (non chiffré) |
| 443 | HTTPS | Web (chiffré SSL) |
| 3306 | MySQL | Base de données |
| 5432 | PostgreSQL | Base de données |
| 8080 | HTTP alt | Web (dev, proxies) |
| 8096 | Jellyfin | Media server |
| 51820 | Wireguard | VPN |

**Exemple :**
```
Nginx écoute port 80
→ Requête http://10.0.0.10:80 → Nginx répond

PostgreSQL écoute port 5432
→ App se connecte 10.0.0.20:5432 → Base de données répond
```

---

### 7. Firewall

**C'est quoi**
- Filtre trafic réseau
- Autorise OU bloque selon règles
- **Sécurité basique essentielle**

**Règles firewall (exemples) :**
```
Autoriser :
- Port 22 (SSH) depuis 10.0.0.0/24 (ton réseau local)
- Port 80 (HTTP) depuis partout (0.0.0.0/0)
- Port 443 (HTTPS) depuis partout

Bloquer :
- Port 3306 (MySQL) depuis Internet (sécurité)
- Tout le reste par défaut (whitelist approach)
```

**Dans Proxmox :**
- Firewall intégré (Datacenter → Firewall)
- Règles par container/VM
- **Facile à configurer** ✅

---

### 8. VLANs (Virtual LANs)

**C'est quoi**
- Séparer réseau physique en plusieurs réseaux logiques
- Isolation services
- **Sécurité + organisation**

**Exemple architecture :**
```
Réseau physique unique (vmbr0)
│
├─ VLAN 10 (Web - DMZ)
│   ├─ 10.10.0.10 (Nginx)
│   └─ 10.10.0.11 (Apache)
│
├─ VLAN 20 (Applications)
│   ├─ 10.20.0.10 (Node.js app)
│   └─ 10.20.0.11 (Python app)
│
└─ VLAN 30 (Databases)
    ├─ 10.30.0.10 (PostgreSQL)
    └─ 10.30.0.11 (MongoDB)
```

**Avantages :**
- VLAN 30 (DB) isolé = sécurité
- Si VLAN 10 compromis, VLAN 30 protégé
- **Architecture 3-tiers professionnelle** ✅

---

### 9. NAT (Network Address Translation)

**C'est quoi**
- Traduit IPs privées → IP publique
- Permet réseau local accéder Internet avec 1 seule IP publique
- **Ta box fait ça automatiquement**

**Exemple :**
```
Container 10.0.0.10 veut aller sur google.com

1. Container envoie requête (source: 10.0.0.10)
2. Box reçoit, fait NAT (source: 82.64.x.x - ton IP publique)
3. Google répond à 82.64.x.x
4. Box fait reverse NAT (destination: 10.0.0.10)
5. Container reçoit réponse
```

**Tu n'as rien à faire, ça marche tout seul** ✅

---

### 10. DHCP vs IP Statique

**DHCP (Dynamic Host Configuration Protocol)**
- Serveur attribue IPs automatiquement
- Pratique pour devices temporaires (laptops, phones)
- **IP peut changer à chaque reboot**

**IP Statique**
- Tu configures IP manuellement
- IP ne change jamais
- **CRUCIAL pour serveurs/containers lab**

**Dans ton lab :**
- **Containers = IPs statiques** ✅
  - Ansible a besoin IPs fixes (inventory)
  - Services ont besoin IPs fixes (DNS, firewall rules)
- **Ton laptop = DHCP** (tu te connectes Proxmox web)

---

## 🛠️ LABS RÉSEAU PROGRESSIFS

### Lab Réseau 1 : Bridge Unique (Semaine 1)

**Objectif : Comprendre base réseau Proxmox**

**Architecture :**
```
Proxmox M710S
│
└─ vmbr0 (Bridge par défaut)
    └─ 10.0.0.0/24
        ├─ 10.0.0.1 (Gateway - ta box)
        ├─ 10.0.0.10 (Container ansible-controller)
        ├─ 10.0.0.11 (Container target-01)
        └─ 10.0.0.12 (Container target-02)
```

**Config container (exemple CT 100) :**
```
Network:
  Bridge: vmbr0
  IPv4: 10.0.0.10/24 (Static)
  Gateway: 10.0.0.1
  DNS: 1.1.1.1
```

**Tests :**
```bash
# Depuis ansible-controller (10.0.0.10)

# Test 1 : Ping gateway
ping 10.0.0.1
# ✅ Doit répondre

# Test 2 : Ping autre container
ping 10.0.0.11
# ✅ Doit répondre

# Test 3 : Ping Internet (DNS test)
ping google.com
# ✅ Doit répondre (résolution DNS + Internet)

# Test 4 : Check DNS
nslookup google.com
# ✅ Doit renvoyer IP
```

**Concepts appris :**
- IP statique
- Gateway
- DNS
- **Réseau fonctionnel basique** ✅

**Temps : 1h**

---

### Lab Réseau 2 : VLANs Segmentation (Semaine 3)

**Objectif : Séparer services par VLAN**

**Architecture :**
```
Proxmox M710S
│
├─ vmbr0.10 (VLAN 10 - Web/DMZ)
│   └─ 10.10.0.0/24
│       ├─ 10.10.0.10 (nginx-web)
│       └─ 10.10.0.11 (apache-web)
│
├─ vmbr0.20 (VLAN 20 - Applications)
│   └─ 10.20.0.0/24
│       └─ 10.20.0.10 (nodejs-app)
│
└─ vmbr0.30 (VLAN 30 - Databases)
    └─ 10.30.0.0/24
        └─ 10.30.0.10 (postgresql-db)
```

**Config Proxmox (créer VLANs) :**

**Datacenter → Node → System → Network**
```
1. Select vmbr0
2. Click "Create" → "Linux VLAN"
3. Name: vmbr0.10
4. VLAN Tag: 10
5. IPv4/CIDR: 10.10.0.1/24
6. Apply

Répète pour VLAN 20 (10.20.0.1/24) et VLAN 30 (10.30.0.1/24)
```

**Config containers :**
```
nginx-web (CT 110) :
  Bridge: vmbr0.10
  IPv4: 10.10.0.10/24
  Gateway: 10.10.0.1

nodejs-app (CT 120) :
  Bridge: vmbr0.20
  IPv4: 10.20.0.10/24
  Gateway: 10.20.0.1

postgresql-db (CT 130) :
  Bridge: vmbr0.30
  IPv4: 10.30.0.10/24
  Gateway: 10.30.0.1
```

**Firewall rules (Proxmox Firewall) :**

**VLAN 20 (App) → VLAN 30 (DB) : ALLOW**
```
Direction: OUT
Action: ACCEPT
Protocol: TCP
Source: 10.20.0.0/24
Dest: 10.30.0.10
Dest Port: 5432
Comment: App can access DB
```

**VLAN 30 (DB) → VLAN 20 (App) : DENY**
```
Direction: OUT
Action: DROP
Source: 10.30.0.0/24
Dest: 10.20.0.0/24
Comment: DB cannot initiate to App
```

**Tests :**
```bash
# Depuis nodejs-app (10.20.0.10)
ping 10.30.0.10
# ✅ Répond (firewall autorise)

# Test connexion DB
nc -zv 10.30.0.10 5432
# ✅ Port ouvert

# Depuis postgresql-db (10.30.0.10)
ping 10.20.0.10
# ❌ Timeout (firewall bloque)
```

**Concepts appris :**
- VLANs (segmentation)
- Firewall rules (sécurité)
- **Architecture 3-tiers** ✅

**Temps : 4h**

---

### Lab Réseau 3 : Reverse Proxy (Semaine 5-6)

**Objectif : Point d'entrée unique, SSL**

**Architecture :**
```
Internet
    │
    ├─ Ton PC (192.168.1.50)
    │
[Proxmox M710S]
    │
    ├─ CT Nginx Reverse Proxy (10.0.0.100)
    │   └─ Écoute port 80/443
    │   └─ Route vers services internes
    │
    ├─ CT Jellyfin (10.0.0.10)
    │   └─ Port 8096
    │
    └─ CT Grafana (10.0.0.20)
        └─ Port 3000
```

**Config Nginx reverse proxy :**
```nginx
# /etc/nginx/sites-available/jellyfin
server {
    listen 80;
    server_name jellyfin.lab.local;

    location / {
        proxy_pass http://10.0.0.10:8096;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# /etc/nginx/sites-available/grafana
server {
    listen 80;
    server_name grafana.lab.local;

    location / {
        proxy_pass http://10.0.0.20:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Activer sites :**
```bash
ln -s /etc/nginx/sites-available/jellyfin /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/grafana /etc/nginx/sites-enabled/
systemctl reload nginx
```

**Fichier hosts (ton PC) :**

**Windows : C:\Windows\System32\drivers\etc\hosts**
**Linux/Mac : /etc/hosts**
```
10.0.0.100  jellyfin.lab.local
10.0.0.100  grafana.lab.local
```

**Tests :**
```
Navigateur ton PC :

http://jellyfin.lab.local
→ ✅ Redirige vers Jellyfin (10.0.0.10:8096)

http://grafana.lab.local
→ ✅ Redirige vers Grafana (10.0.0.20:3000)
```

**Concepts appris :**
- Reverse proxy (routing)
- Virtual hosts (noms domaines)
- **Point d'entrée unique** ✅

**Temps : 3h**

---

## 📺 RESSOURCES RÉSEAU YOUTUBE

### Pour apprendre concepts (vidéos courtes)

**NetworkChuck** ⭐⭐⭐⭐⭐
- Chaîne : youtube.com/@NetworkChuck
- Style : Fun, énergique, exemples concrets
- **Vidéos recommandées :**
  - "Subnetting made easy" (15 min)
  - "VLANs explained" (12 min)
  - "What is DNS?" (10 min)

**Practical Networking** ⭐⭐⭐⭐⭐
- Chaîne : youtube.com/@PracticalNetworking
- Style : Clair, schémas excellents
- **Vidéos recommandées :**
  - "How data flows on the Internet" (20 min)
  - "OSI Model explained" (15 min)

---

### Pour Proxmox networking spécifique

**LearnLinuxTV** ⭐⭐⭐⭐⭐
- Playlist : "Proxmox Full Course"
- Vidéo : "Proxmox Networking Explained" (25 min)
- **Parfait pour ton lab**

**TechnoTim** ⭐⭐⭐⭐
- Vidéo : "Proxmox VLANs and Firewall" (18 min)
- Exemples concrets homelab

---

## 🧠 LEARNING BY DOING (Pas théorie)

### Approche recommandée

**❌ PAS FAIRE :**
- Regarder 10h cours CCNA d'affilée
- Lire RFC protocoles (ennuyeux, inutile)
- Mémoriser tables routage (overkill)

**✅ FAIRE :**
1. **Problème concret** : "Je veux 2 réseaux séparés"
2. **Recherche ciblée** : "Proxmox VLANs tutorial" (vidéo 10-15 min)
3. **Application immédiate** : Configure dans ton lab
4. **Test** : Ça marche ? ✅ Concept ancré
5. **Documentation** : Note ce que tu as fait

**Cycle : Besoin → Apprendre minimum → Faire → Retenir** ✅

---

### Exemples cycles apprentissage

**Cycle 1 : "Je veux Jellyfin accessible depuis mon PC"**
→ Recherche : "reverse proxy nginx"
→ Vidéo 10 min
→ Configure Nginx container
→ **Ça marche** ✅
→ Tu comprends reverse proxy maintenant

**Cycle 2 : "Je veux séparer web et database"**
→ Recherche : "VLANs Proxmox"
→ Vidéo 15 min
→ Crée VLAN 10 et VLAN 20
→ **Ça marche** ✅
→ Tu comprends VLANs maintenant

**Cycle 3 : "Je veux bloquer accès DB depuis Internet"**
→ Recherche : "Proxmox firewall rules"
→ Doc 5 min
→ Configure firewall
→ **Ça marche** ✅
→ Tu comprends firewall maintenant

**→ Apprentissage naturel, motivé par BESOIN** 💪

---

## 💙 TIPS RÉSEAU (Spécial toi)

### Concentration difficile

**Vidéos courtes (10-15 min max)**
- NetworkChuck parfait (rythme rapide, fun)
- **Pas cours 2h** (tu décrocheras)

**Pomodoro réseau**
- 25 min vidéo/config
- 5 min pause
- **Repeat 2×** = 1h session max

---

### Réseau = abstrait

**Toujours faire schéma (draw.io, papier)**
- Dessiner boxes (containers)
- Flèches (connexions)
- **Visuel = compréhension** ✅

**Exemple schéma simple :**
```
[Ton PC]
    │
    │ (HTTP)
    ▼
[Nginx Proxy - 10.0.0.100]
    │
    ├─(route)──▶ [Jellyfin - 10.0.0.10:8096]
    │
    └─(route)──▶ [Grafana - 10.0.0.20:3000]
```

---

### Frustration normale

**"Ça marche pas, je comprends rien"**
→ NORMAL
→ Prends pause 10 min
→ Reviens
→ **Souvent ça s'éclaire après pause** 💡

**"C'est trop compliqué"**
→ Peut-être que tu as sauté étapes
→ Reviens au + simple
→ **Baby steps** 👣

---

## ✅ CHECKLIST COMPÉTENCES RÉSEAU

**Pour présentation janvier, tu dois savoir :**

- [ ] Expliquer IP (c'est quoi, pourquoi)
- [ ] Différence IP privée / publique
- [ ] C'est quoi un gateway
- [ ] C'est quoi DNS (exemple concret)
- [ ] Ports essentiels (22, 80, 443)
- [ ] **VLANs basique** (pourquoi séparer)
- [ ] Firewall concept (autoriser/bloquer)

**Tu N'AS PAS besoin savoir :**
- [ ] ❌ Protocoles routage (OSPF, BGP)
- [ ] ❌ Calculs subnetting complexes
- [ ] ❌ Modèle OSI 7 couches détaillé
- [ ] ❌ **Rien du reste CCNA théorique**

**Pour 5ème année, tu approfondiras si besoin** ✅

---

# 🎮 PARTIE 4 : PROJETS FUN (10+ IDÉES)

---

## 💙 POURQUOI PROJETS FUN

### Pas tout = portfolio professionnel

**Balance importante :**
- 70% projets DevOps (portfolio CDI) 💼
- 30% projets fun (plaisir, motivation) 🎮
- **Sinon burnout** ⚠️

---

### Projets fun = apprentissage aussi

**Tu apprends PAREIL :**
- Media server = Docker, reverse proxy, networking
- Game server = Linux admin, firewall, monitoring
- Home automation = APIs, automation, scripting

**Mais dans contexte + agréable** 😊

**→ Motivation intrinsèque** 💪

---

### Lab 2 (M725S) = Playground

**Machine dédiée projets fun :**
- Pas de stress "portfolio"
- Expérimente librement
- **Casse tout, recommence** ✅
- Amis peuvent utiliser
- **TON espace créatif** 🎨

---

## 🎬 PROJET FUN PRINCIPAL : MEDIA SERVER

### Architecture Complète Jellyfin Stack

**Objectif**
Netflix perso pour toi + 2-3 amis proches

**Stack**
- Jellyfin (streaming)
- Sonarr (gestion séries TV)
- Radarr (gestion films)
- qBittorrent (téléchargements)
- Jackett (trackers torrents)
- Overseerr (interface requêtes)
- Wireguard (VPN accès amis)
- Authelia (authentification)
- Nginx (reverse proxy)

---

### Vue d'ensemble Architecture
```
Internet
    │
    ├─ Amis (chez eux)
    │   └─ Wireguard VPN Client (apps mobiles/PC)
    │        │
    │        └─ Tunnel chiffré → Lab 2
    │
    └─ [Router Box Internet]
            │
            │ Port Forward: 51820 (Wireguard)
            │
        [Proxmox M725S - 16 GB RAM]
            │
            ├─ VM Wireguard (1 GB) 🔒
            │   └─ VPN server (amis connectent ici)
            │   └─ Subnet VPN: 10.10.0.0/24
            │
            ├─ VM Jellyfin (4 GB) 🎬
            │   └─ Media server (transcoding GPU)
            │   └─ Port 8096
            │
            ├─ VM qBittorrent + VPN (4 GB) 🛡️
            │   └─ Torrent client (NordVPN/Mullvad)
            │   └─ Kill-switch (si VPN drop → stop)
            │
            ├─ CT Nginx (512 MB) 🔐
            │   └─ Reverse proxy + SSL
            │   └─ Route trafic services
            │
            ├─ CT Authelia (512 MB) 🔑
            │   └─ SSO (Single Sign-On)
            │   └─ Login centralisé amis
            │
            ├─ CT Sonarr (1 GB) 📺
            │   └─ Gestion séries
            │
            ├─ CT Radarr (1 GB) 🎥
            │   └─ Gestion films
            │
            ├─ CT Overseerr (1 GB) 🎭
            │   └─ Interface requêtes amis
            │
            ├─ CT Jackett (512 MB) 🔍
            │   └─ Agrégateur trackers
            │
            └─ CT Uptime Kuma (512 MB) 📊
                └─ Monitoring services

Total RAM: ~15.5 GB (reste 0.5 GB marge)
```

---

### Setup Étape par Étape

#### **Étape 1 : Wireguard VPN Server (Sécurité amis)** 🔒

**VM Wireguard (1 GB RAM)**

**Install via Docker :**
```yaml
# docker-compose.yml
version: '3'
services:
  wireguard:
    image: linuxserver/wireguard
    container_name: wireguard
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
      - SERVERURL=ton-domaine.duckdns.org  # Ou IP publique
      - SERVERPORT=51820
      - PEERS=3  # 3 amis
      - PEERDNS=1.1.1.1
      - INTERNAL_SUBNET=10.10.0.0/24
    volumes:
      - /config:/config
      - /lib/modules:/lib/modules
    ports:
      - 51820:51820/udp
    restart: unless-stopped
```

**Résultat :**
- Wireguard server running
- 3 configs générées (peer1, peer2, peer3)
- QR codes dans `/config/peer1/`, `/config/peer2/`, etc.
- **Amis scannent QR code → Connectés** ✅

**Port forwarding (ta box Internet) :**
```
Port externe: 51820 UDP
Port interne: 51820 UDP
IP: IP VM Wireguard (ex: 192.168.1.101)
```

---

#### **Étape 2 : qBittorrent + VPN Kill-Switch** 🛡️

**VM qBittorrent (4 GB RAM)**

**Install via Docker (avec VPN intégré) :**
```yaml
# docker-compose.yml
version: '3'
services:
  qbittorrent-vpn:
    image: binhex/arch-qbittorrentvpn
    container_name: qbittorrent
    cap_add:
      - NET_ADMIN
    environment:
      - VPN_ENABLED=yes
      - VPN_PROV=custom  # Ou nordvpn, mullvad
      - VPN_CLIENT=openvpn
      - LAN_NETWORK=10.0.0.0/24
      - NAME_SERVERS=1.1.1.1,1.0.0.1
      - VPN_USER=ton_user_vpn
      - VPN_PASS=ton_password_vpn
      - WEBUI_PORT=8080
    volumes:
      - /config:/config
      - /downloads:/downloads
      - /vpn-config/config.ovpn:/config/openvpn/config.ovpn
    ports:
      - 8080:8080
    restart: unless-stopped
```

**VPN commercial (choix) :**
- **Mullvad** (~5€/mois, anonyme, P2P OK) ⭐⭐⭐⭐⭐
- ProtonVPN (tier gratuit ou 4€/mois)
- AirVPN (5€/mois, port forwarding)

**Test kill-switch :**
```bash
# Depuis qBittorrent container
# Stop VPN service
systemctl stop openvpn

# Check si qBittorrent peut encore télécharger
# ❌ DOIT échouer (pas d'accès réseau)
# ✅ Kill-switch fonctionne
```

**Résultat :**
- qBittorrent accessible http://IP:8080
- Tout trafic passe par VPN
- **Si VPN drop → Torrents stop** ✅

---

#### **Étape 3 : Jellyfin Media Server** 🎬

**VM Jellyfin (4 GB RAM)**

**Install via Docker :**
```yaml
# docker-compose.yml
version: '3'
services:
  jellyfin:
    image: jellyfin/jellyfin
    container_name: jellyfin
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - /config:/config
      - /media/tv:/data/tvshows
      - /media/movies:/data/movies
    ports:
      - 8096:8096
    restart: unless-stopped
```

**Config volumes (stockage media) :**
```bash
# Créer dossiers media
mkdir -p /media/tv
mkdir -p /media/movies

# Permissions
chown -R 1000:1000 /media
```

**Setup initial Jellyfin :**
1. Navigateur : http://IP-VM:8096
2. Wizard setup :
   - Langue : Français
   - Créer user admin
   - **Password : NOTER** ⚠️
   - Ajouter libraries :
     - Séries TV : /data/tvshows
     - Films : /data/movies
3. **Jellyfin prêt** ✅

**Résultat :**
- Jellyfin accessible
- Interface Netflix-like
- **Prêt pour contenu** 🎉

---

#### **Étape 4 : Sonarr + Radarr (Gestion automatique)** 📺🎥

**CT Sonarr (1 GB RAM)**

**Install via apt :**
```bash
# Update
apt update && apt upgrade -y

# Install dependencies
apt install curl mediainfo -y

# Add Sonarr repo
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 2009837CBFFD68F45BC180471F4F90DE2A9B4BF8
echo "deb https://apt.sonarr.tv/ubuntu focal main" | tee /etc/apt/sources.list.d/sonarr.list

# Install Sonarr
apt update
apt install sonarr -y

# Enable service
systemctl enable --now sonarr
```

**Config Sonarr :**
1. Navigateur : http://IP-CT:8989
2. Settings → Media Management :
   - Root Folder : /tv (monter volume depuis qBittorrent VM)
3. Settings → Download Clients :
   - Add qBittorrent :
     - Host : IP-qBittorrent-VM
     - Port : 8080
     - Username/Password (qBittorrent webUI)
4. Settings → Indexers :
   - Add Jackett (on configure après)

**CT Radarr (1 GB RAM)**

**Même process que Sonarr :**
- Port : 7878
- Root Folder : /movies

**Résultat :**
- Sonarr gère séries TV
- Radarr gère films
- **Automatisation prête** ✅

---

#### **Étape 5 : Jackett (Trackers torrents)** 🔍

**CT Jackett (512 MB RAM)**

**Install via Docker :**
```yaml
# docker-compose.yml
version: '3'
services:
  jackett:
    image: linuxserver/jackett
    container_name: jackett
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Paris
    volumes:
      - /config:/config
    ports:
      - 9117:9117
    restart: unless-stopped
```

**Config Jackett :**
1. Navigateur : http://IP-CT:9117
2. Add indexers :
   - YGGTorrent (France) ⭐⭐⭐⭐⭐
   - 1337x
   - RARBG (si dispo)
   - **Test chaque indexer** ✅
3. Copy API Key (pour Sonarr/Radarr)

**Lier Jackett à Sonarr/Radarr :**
```
Sonarr → Settings → Indexers → Add → Torznab → Custom

Name: YGGTorrent (via Jackett)
URL: http://IP-Jackett:9117/api/v2.0/indexers/ygg/results/torznab/
API Key: [Jackett API Key]

Test → ✅ Save
```

**Résultat :**
- Jackett agrège trackers
- Sonarr/Radarr cherchent via Jackett
- **Pipeline automatique complet** ✅

---

#### **Étape 6 : Overseerr (Interface requêtes amis)** 🎭

**CT Overseerr (1 GB RAM)**

**Install via Docker :**
```yaml
# docker-compose.yml
version: '3'
services:
  overseerr:
    image: sctx/overseerr
    container_name: overseerr
    environment:
      - TZ=Europe/Paris
    volumes:
      - /config:/app/config
    ports:
      - 5055:5055
    restart: unless-stopped
```

**Config Overseerr :**
1. Navigateur : http://IP-CT:5055
2. Wizard setup :
   - Connect to Jellyfin :
     - URL : http://IP-Jellyfin:8096
     - API Key (Jellyfin → Dashboard → API Keys)
   - Connect to Sonarr :
     - URL : http://IP-Sonarr:8989
     - API Key (Sonarr → Settings → General)
   - Connect to Radarr :
     - URL : http://IP-Radarr:7878
     - API Key
3. Users :
   - Import users from Jellyfin
   - **Permissions** (qui peut requérir quoi)
4. Notifications :
   - Discord webhook (optionnel)
   - **Tu reçois notif quand requête** 💬

**Résultat :**
- Interface jolie (style Netflix)
- Amis font requêtes
- **Tu approuves/refuses** ✅

---

#### **Étape 7 : Nginx Reverse Proxy + SSL** 🔐

**CT Nginx (512 MB RAM)**

**Install Nginx + Certbot :**
```bash
apt update
apt install nginx certbot python3-certbot-nginx -y
```

**Config Nginx (services) :**
```nginx
# /etc/nginx/sites-available/jellyfin
server {
    listen 80;
    server_name jellyfin.lab.local;

    location / {
        proxy_pass http://10.0.0.10:8096;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# /etc/nginx/sites-available/overseerr
server {
    listen 80;
    server_name requests.lab.local;

    location / {
        proxy_pass http://10.0.0.15:5055;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Activer sites :**
```bash
ln -s /etc/nginx/sites-available/jellyfin /etc/nginx/sites-enabled/
ln -s /etc/nginx/sites-available/overseerr /etc/nginx/sites-enabled/
systemctl reload nginx
```

**SSL (Let's Encrypt) :**
```bash
# Si tu as domaine public (ex: neliamedia.duckdns.org)
certbot --nginx -d jellyfin.neliamedia.duckdns.org
certbot --nginx -d requests.neliamedia.duckdns.org

# Certificats installés automatiquement ✅
# Auto-renewal configuré ✅
```

**Résultat :**
- Amis accèdent via noms (pas IPs)
- HTTPS obligatoire (chiffré)
- **Professionnel** ✅

---

#### **Étape 8 : Authelia (Authentification SSO)** 🔑

**CT Authelia (512 MB RAM)**

**Install via Docker :**
```yaml
# docker-compose.yml
version: '3'
services:
  authelia:
    image: authelia/authelia
    container_name: authelia
    volumes:
      - /config:/config
    ports:
      - 9091:9091
    restart: unless-stopped
```

**Config Authelia (simplifié) :**
```yaml
# /config/configuration.yml
authentication_backend:
  file:
    path: /config/users_database.yml

access_control:
  default_policy: deny
  rules:
    - domain: "*.lab.local"
      policy: one_factor  # Ou two_factor pour 2FA

session:
  domain: lab.local
  expiration: 1h

notifier:
  filesystem:
    filename: /config/notification.txt
```

**Users database :**
```yaml
# /config/users_database.yml
users:
  alice:
    displayname: "Alice"
    password: "$argon2id$..."  # Hash généré par Authelia
    email: alice@example.com
    groups:
      - users
  
  bob:
    displayname: "Bob"
    password: "$argon2id$..."
    email: bob@example.com
    groups:
      - users
```

**Intégrer Authelia avec Nginx :**
```nginx
# Ajouter à chaque server block
location /authelia {
    internal;
    proxy_pass http://10.0.0.20:9091/api/verify;
    proxy_set_header X-Original-URL $scheme://$http_host$request_uri;
}

location / {
    auth_request /authelia;
    auth_request_set $user $upstream_http_remote_user;
    proxy_set_header X-Forwarded-User $user;
    
    # Reste config proxy_pass...
}
```

**Résultat :**
- Amis doivent login avant accès
- 1 login = accès tout (SSO)
- **Sécurité ++** 🔒

---

### Workflow Utilisateur Final (Ami)

**1. Ami veut regarder série "Breaking Bad"**
```
Ami → Connecte Wireguard VPN (app mobile/PC)
    → Va sur https://requests.lab.local (Overseerr)
    → Login Authelia (user/password)
    → Cherche "Breaking Bad"
    → Clique "Request" (demande série)
```

**2. Tu reçois notification (Discord/Telegram)**
```
🎬 Nouvelle requête !

Alice demande : Breaking Bad (TV)
Saisons : 1-5 (62 épisodes)
Qualité : 1080p

[Approve] [Deny]
```

**3. Tu approuves (1 clic Overseerr)**
```
Overseerr → Envoie requête Sonarr
Sonarr → Cherche torrents (via Jackett)
Sonarr → Envoie meilleur torrent à qBittorrent
qBittorrent → Télécharge (via VPN)
Sonarr → Détecte download fini
Sonarr → Déplace fichiers vers /tv/Breaking Bad/
Jellyfin → Scan library, détecte nouvelle série
```

**4. Ami reçoit notification**
```
✅ Breaking Bad disponible !
```

**5. Ami regarde**
```
Ami → Ouvre Jellyfin (https://jellyfin.lab.local)
    → Breaking Bad visible dans library
    → Play S01E01
    → Stream commence (transcoding si besoin)
    → 🎉 Regarde épisode
```

---

### Timeline Setup Media Server

**Weekend 1 (6h) :**
- Install Proxmox M725S
- VMs : Wireguard, qBittorrent+VPN, Jellyfin
- **Jellyfin stream 1 film (test)** ✅

**Weekend 2 (6h) :**
- Containers : Sonarr, Radarr, Jackett
- Config pipeline automatique
- **Test : Requête série → Download automatique** ✅

**Weekend 3 (5h) :**
- Container Overseerr
- Nginx reverse proxy
- SSL (Let's Encrypt)
- **Interface accessible HTTPS** ✅

**Weekend 4 (4h) :**
- Authelia SSO
- Tests finaux
- **Inviter 2-3 amis** 🎉

**TOTAL : 21h sur 1 mois**

---

## 🎮 AUTRES PROJETS FUN

### Projet Fun 2 : Game Servers ⭐⭐⭐⭐

**Minecraft Server**

**Install via Docker :**
```yaml
version: '3'
services:
  minecraft:
    image: itzg/minecraft-server
    container_name: minecraft
    environment:
      EULA: "TRUE"
      VERSION: "1.20.1"
      MEMORY: "2G"
      DIFFICULTY: normal
      MAX_PLAYERS: 10
    volumes:
      - /data:/data
    ports:
      - 25565:25565
    restart: unless-stopped
```

**Résultat :**
- Serveur Minecraft 24/7
- Toi + amis jouent ensemble
- **Monde persistant** ✅

**Autres game servers possibles :**
- Valheim (survie viking)
- Terraria (2D crafting)
- Counter-Strike (FPS)

**Temps setup : 2-3h**

---

### Projet Fun 3 : Pi-hole (Ad-blocker réseau) ⭐⭐⭐⭐⭐

**Objectif**
Bloquer pubs TOUTE ta maison (tous devices)

**CT Pi-hole (256 MB RAM)**

**Install via Docker :**
```yaml
version: '3'
services:
  pihole:
    image: pihole/pihole
    container_name: pihole
    environment:
      TZ: Europe/Paris
      WEBPASSWORD: ton_password
    volumes:
      - /etc-pihole:/etc/pihole
      - /etc-dnsmasq.d:/etc/dnsmasq.d
    ports:
      - 53:53/tcp
      - 53:53/udp
      - 80:80
    restart: unless-stopped
```

**Config ta box Internet :**
```
DNS primaire : IP-Pi-hole (ex: 10.0.0.50)
DNS secondaire : 1.1.1.1 (backup)
```

**Résultat :**
- Toutes requêtes DNS passent par Pi-hole
- Pubs bloquées (YouTube, sites web, apps)
- **Maison entière protégée** 🛡️
- Dashboard stats (quels domaines bloqués)

**Temps setup : 1-2h**

---

### Projet Fun 4 : Nextcloud (Cloud perso) ⭐⭐⭐⭐

**Objectif**
Google Drive perso (files, calendar, contacts)

**VM Nextcloud (2 GB RAM)**

**Install via Docker :**
```yaml
version: '3'
services:
  nextcloud:
    image: nextcloud
    container_name: nextcloud
    environment:
      MYSQL_HOST: db
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: password
    volumes:
      - /data:/var/www/html
    ports:
      - 8080:80
    restart: unless-stopped
  
  db:
    image: mariadb
    container_name: nextcloud-db
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_PASSWORD: password
    volumes:
      - /db:/var/lib/mysql
    restart: unless-stopped
```

**Résultat :**
- Stockage fichiers illimité (capacité disque)
- Sync PC/mobile (apps Nextcloud)
- **Calendrier, contacts, notes** ✅
- Alternative Google Drive

**Temps setup : 3-4h**

---

### Projet Fun 5 : Home Assistant (Domotique) ⭐⭐⭐⭐

**Objectif**
Automatiser maison (si tu as devices IoT)

**VM Home Assistant (2 GB RAM)**

**Install via Docker :**
```yaml
version: '3'
services:
  homeassistant:
    image: homeassistant/home-assistant
    container_name: home-assistant
    environment:
      TZ: Europe/Paris
    volumes:
      - /config:/config
    ports:
      - 8123:8123
    restart: unless-stopped
```

**Exemples automatisations :**
- Lumières Philips Hue s'allument quand tu rentres
- Chauffage s'ajuste selon température
- **Notifications téléphone** (porte ouverte, etc.)

**Si tu n'as pas IoT : Skip ce projet** ⏭️

**Temps setup : 4-6h**

---

### Projet Fun 6 : Vaultwarden (Password Manager) ⭐⭐⭐⭐⭐

**Objectif**
Bitwarden self-hosted (gestionnaire mots de passe)

**CT Vaultwarden (512 MB RAM)**

**Install via Docker :**
```yaml
version: '3'
services:
  vaultwarden:
    image: vaultwarden/server
    container_name: vaultwarden
    environment:
      DOMAIN: https://vault.lab.local
    volumes:
      - /data:/data
    ports:
      - 8000:80
    restart: unless-stopped
```

**Résultat :**
- Gestionnaire passwords sécurisé
- Apps mobiles/desktop Bitwarden
- **Self-hosted = contrôle total** 🔒
- Alternative LastPass/1Password

**Temps setup : 2h**

---

### Projet Fun 7 : Paperless-ngx (Gestion documents) ⭐⭐⭐⭐

**Objectif**
Scanner/organiser documents papier (factures, etc.)

**VM Paperless (2 GB RAM)**

**Install via Docker Compose :**
```yaml
version: '3'
services:
  paperless:
    image: ghcr.io/paperless-ngx/paperless-ngx
    container_name: paperless
    environment:
      PAPERLESS_REDIS: redis://redis:6379
      PAPERLESS_DBHOST: db
    volumes:
      - /data:/usr/src/paperless/data
      - /media:/usr/src/paperless/media
      - /consume:/usr/src/paperless/consume
    ports:
      - 8000:8000
    restart: unless-stopped
  
  redis:
    image: redis
    restart: unless-stopped
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: paperless
      POSTGRES_USER: paperless
      POSTGRES_PASSWORD: paperless
    volumes:
      - /pgdata:/var/lib/postgresql/data
    restart: unless-stopped
```

**Workflow :**
1. Scanner document (ou photo smartphone)
2. Upload dans `/consume/`
3. **Paperless OCR automatique** (extrait texte)
4. Tags, dates détectés
5. Recherche fulltext

**Résultat :**
- Tous documents numérisés
- Recherche facile
- **Zéro papier** 📄→💾

**Temps setup : 3-4h**

---

### Projet Fun 8 : Wiki.js (Wiki perso) ⭐⭐⭐

**Objectif**
Documentation perso (notes, guides, recettes...)

**CT Wiki.js (1 GB RAM)**

**Install via Docker :**
```yaml
version: '3'
services:
  wikijs:
    image: requarks/wiki
    container_name: wikijs
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: wikijspass
      DB_NAME: wikijs
    ports:
      - 3000:3000
    restart: unless-stopped
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: wikijs
      POSTGRES_USER: wikijs
      POSTGRES_PASSWORD: wikijspass
    volumes:
      - /db-data:/var/lib/postgresql/data
    restart: unless-stopped
```

**Usage :**
- Pages markdown
- Catégories (DevOps, Cuisine, Voyages...)
- **Recherche fulltext** 🔍
- Jolie interface

**Temps setup : 2h**

---

## 🎨 PROJETS CRÉATIFS

### Projet Créatif 1 : Blog Personnel (Hugo/Jekyll)

**Static site generator**
- Hugo ou Jekyll
- Hébergé sur lab
- **Articles techniques, voyages, Atlas...** 🐕

**Temps : 4-6h**

---

### Projet Créatif 2 : Portfolio Photo (Piwigo)

**Galerie photos**
- Upload photos Canon EOS 2000D
- Albums (Voyages, Nature, Atlas...)
- **Partage amis/famille** 📸

**Temps : 3-4h**

---

### Projet Créatif 3 : Serveur Musique (Navidrome)

**Spotify self-hosted**
- Upload bibliothèque musique
- Apps mobiles (Subsonic)
- **Stream partout** 🎵

**Temps : 2-3h**

---

## 💙 QUAND FAIRE PROJETS FUN

### Timeline recommandée

**Janvier 2026 (après présentation)**
- Setup Pi-hole (2h) - Utilité immédiate

**Avril-Juin 2026 (expansion Lab 1)**
- Commence media server (weekends)
- **Parallèle Lab 1 DevOps**

**Juillet-Septembre 2026 (fin alternance)**
- Finalize media server
- **Inviter amis** 🎉
- Autres projets fun (game servers, etc.)

---

### Balance DevOps / Fun

**Règle 70/30 :**
- 70% temps sur Lab 1 (DevOps portfolio)
- 30% temps sur Lab 2 (Fun projects)
- **Motivation sustained** 💪

**Quand burnout approche :**
- Pause Lab 1
- Focus Lab 2 (fun)
- **Recharge batteries** 🔋

---

## ✅ CHECKLIST MEDIA SERVER (Avant inviter amis)

**Sécurité** 🔒
- [ ] VPN Kill-switch fonctionne (test : coupe VPN → torrents stop)
- [ ] Wireguard VPN amis opérationnel
- [ ] Authelia login requis (pas d'accès sans auth)
- [ ] SSL certificats valides (HTTPS)
- [ ] Firewall rules actives (seul port 51820 ouvert Internet)

**Fonctionnel** ✅
- [ ] Jellyfin stream films/séries OK
- [ ] Pipeline automatique (Overseerr → Sonarr/Radarr → qBittorrent → Jellyfin)
- [ ] Requêtes amis fonctionnent
- [ ] Notifications reçues (Discord/Telegram)

**Monitoring** 📊
- [ ] Uptime Kuma surveille services
- [ ] Alertes configurées (si service down)
- [ ] **Tu sais si problème** 💙

**Si TOUS ✅ → Inviter amis** 🎉

---

# 🛠️ PARTIE 5 : TECHNOLOGIES DEVOPS EXPLIQUÉES

---

## 🎯 OBJECTIF SECTION

### Comprendre QUOI, POURQUOI, QUAND

**Pour chaque techno DevOps :**
- **C'est quoi** (définition simple)
- **Pourquoi ça existe** (problème résolu)
- **Quand l'utiliser** (use cases)
- **Alternatives** (comparaison)
- **Apprendre comment** (ressources)

**Pas de théorie dense**

**Juste : "Tu as besoin comprendre X ? Voilà."** ✅

---

## 🤖 ANSIBLE

### C'est quoi

**Outil automation configuration serveurs**

**Principe :**
- Tu écris "playbook" (fichier YAML)
- Playbook décrit état désiré (ex: "Nginx doit être installé")
- Ansible exécute playbook sur serveurs
- **Serveurs configurés automatiquement** ✅

**Agentless** = pas besoin installer agent sur serveurs (juste SSH)

---

### Pourquoi ça existe

**Problème sans Ansible :**
```
Tu as 10 serveurs web
Tu veux installer Nginx sur tous
→ SSH serveur 1 → apt install nginx
→ SSH serveur 2 → apt install nginx
→ SSH serveur 3 → apt install nginx
→ ...
→ 😰 Répétitif, erreurs possibles
```

**Avec Ansible :**
```
Tu écris playbook (1 fois) :
- Install Nginx
- Config Nginx
- Start Nginx

Tu exécutes : ansible-playbook site.yml
→ ✅ 10 serveurs configurés en 2 min
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Configuration serveurs (packages, services, files)
- Déploiements simples (copier fichiers, restart services)
- Orchestration multi-serveurs
- **Automation répétitive**

**❌ Pas optimal pour :**
- Provisioning infrastructure (Terraform meilleur)
- CI/CD pipelines (GitLab CI meilleur)
- Container orchestration (Kubernetes meilleur)

---

### Alternatives

| Outil | Différence | Quand choisir |
|-------|-----------|---------------|
| **Ansible** | Agentless, YAML simple | Configuration serveurs, débutant |
| Chef | Agent-based, Ruby DSL | Grandes entreprises, complexe |
| Puppet | Agent-based, déclaratif | Infra legacy, Windows++ |
| SaltStack | Agent-based, Python | Performance++, temps réel |

**Ansible = meilleur pour débuter** ⭐⭐⭐⭐⭐

---

### Apprendre Ansible

**YouTube :**
- "Ansible for Beginners" - TechWorld with Nana (1h)
- "Ansible Full Course" - freeCodeCamp (3h)

**Docs :**
- docs.ansible.com (excellente doc officielle)

**Pratiquer :**
- Lab 1 Projet 1.1 (ton lab Proxmox)

**Temps apprentissage : 10-15h**

---

## 🏗️ TERRAFORM

### C'est quoi

**Infrastructure as Code (IaC)**

**Principe :**
- Tu écris code (fichiers .tf en HCL)
- Code décrit infrastructure désirée (VMs, networks, etc.)
- Terraform exécute : `terraform apply`
- **Infrastructure créée automatiquement** ✅

**Déclaratif** = tu dis "je veux 3 VMs" (pas "crée VM 1, puis VM 2, puis VM 3")

---

### Pourquoi ça existe

**Problème sans Terraform :**
```
Tu veux infra :
- 5 VMs
- 2 réseaux
- 10 règles firewall

→ Tu cliques dans UI Proxmox (1h)
→ Tu recommences pour staging (1h)
→ Tu recommences pour prod (1h)
→ 😰 Erreurs, inconsistences
→ Si besoin détruire/recréer = cauchemar
```

**Avec Terraform :**
```
Tu écris code (1 fois) :
resource "proxmox_lxc" "web" {
  count = 5
  ...
}

terraform apply
→ ✅ Infra créée en 5 min
→ terraform destroy → Tout détruit proprement
→ Version Git → Historique changements
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Créer/détruire infrastructure rapidement
- Multi-environnements (dev, staging, prod)
- Infrastructure reproductible
- **Versioning infra (Git)**

**❌ Pas optimal pour :**
- Configuration post-création (Ansible meilleur)
- Déploiement apps (CI/CD meilleur)

---

### Alternatives

| Outil | Différence | Quand choisir |
|-------|-----------|---------------|
| **Terraform** | Multi-cloud, HCL, state | Standard industrie, polyvalent |
| Pulumi | Code (Python, JS, Go) | Tu préfères code vs HCL |
| CloudFormation | AWS only, JSON/YAML | Que AWS, déjà dans ecosystem |
| Ansible | Peut faire IaC aussi | Si tu veux tool unique (moins optimal) |

**Terraform = standard DevOps** ⭐⭐⭐⭐⭐

---

### Apprendre Terraform

**YouTube :**
- "Terraform Course" - freeCodeCamp (2h)
- "Terraform for Beginners" - TechWorld with Nana (1h30)

**Docs :**
- terraform.io/docs (excellente)
- registry.terraform.io (providers docs)

**Pratiquer :**
- Lab 1 Projet 2.1 (Proxmox provider)

**Temps apprentissage : 15-20h**

---

## 🐳 DOCKER

### C'est quoi

**Containerization platform**

**Principe :**
- App + dépendances = packagées dans "image"
- Image lancée = "container" (processus isolé)
- Container = léger (pas VM complète)
- **"Works on my machine" → Works partout** ✅

---

### Pourquoi ça existe

**Problème sans Docker :**
```
Dev:
  App fonctionne sur laptop (Python 3.9, lib X v1.2)

Production:
  Serveur a Python 3.7, lib X v1.0
  → App crash 😰
  → "Works on my machine ¯\_(ツ)_/¯"
```

**Avec Docker :**
```
Dev:
  Dockerfile spécifie : Python 3.9, lib X v1.2
  Build image → Test localement

Production:
  Deploy même image
  → ✅ Fonctionne identique (environnement identique)
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Développement local (environnements isolés)
- Microservices (1 service = 1 container)
- CI/CD (build, test dans containers)
- **Déploiement apps (portabilité)**

**❌ Pas optimal pour :**
- Apps legacy monolithiques (difficile containeriser)
- Apps nécessitant performances MAX (VMs meilleures)

---

### Concepts clés

**Image** = Template (comme ISO)
- Contient app + dépendances
- Immutable (read-only)
- Ex: `nginx:latest`, `postgres:15`

**Container** = Instance running d'une image
- Processus isolé
- Éphémère (destroy/recreate facile)
- Ex: Container Nginx écoute port 80

**Volume** = Stockage persistant
- Data survit destruction container
- Ex: Database data dans volume

**Network** = Réseau containers
- Containers communiquent entre eux
- Ex: App container → DB container

---

### Docker vs VMs

| Aspect | Docker Container | VM |
|--------|------------------|-----|
| **Taille** | MB (50-500 MB) | GB (2-10 GB) |
| **Boot** | Secondes | Minutes |
| **Performance** | Native (partage kernel) | Overhead (hypervisor) |
| **Isolation** | Processus | Complète (OS séparé) |
| **Use case** | Apps, microservices | Systèmes complets, isolation forte |

**Docker + léger, + rapide** ✅

**VMs + isolation, + sécurité** ✅

**Dans ton lab : Les DEUX** (VMs pour nodes K8s, Docker dedans) ✅

---

### Alternatives

| Outil | Différence | Quand choisir |
|-------|-----------|---------------|
| **Docker** | Standard, ecosystem++, facile | Toujours (défaut) |
| Podman | Daemonless, rootless | Sécurité++, pas besoin daemon |
| LXC | System containers (Proxmox) | Containers OS complet (pas apps) |
| containerd | Runtime only (pas build) | Intégré K8s, bas niveau |

**Docker = standard absolu** ⭐⭐⭐⭐⭐

---

### Apprendre Docker

**YouTube :**
- "Docker Tutorial for Beginners" - TechWorld with Nana (3h)
- "Docker Crash Course" - Traversy Media (1h)

**Docs :**
- docs.docker.com (très bonne)

**Pratiquer :**
- Lab 1 Projet 1.2 (Multi-container app)

**Temps apprentissage : 12-15h**

---

## ☸️ KUBERNETES (K8s)

### C'est quoi

**Container orchestration platform**

**Principe :**
- Tu as 100 containers (microservices)
- Kubernetes gère :
  - Où déployer (quel node)
  - Scaling (+ replicas si charge)
  - Self-healing (restart si crash)
  - Load balancing
  - Rolling updates
- **Tu gères apps, K8s gère infrastructure** ✅

---

### Pourquoi ça existe

**Problème sans Kubernetes :**
```
Tu as app microservices (10 containers)
- Déployés manuellement sur 3 serveurs
- 1 container crash → Tu dois restart manuellement
- Trafic augmente → Tu dois scale manuellement
- Update app → Downtime (tu stop/start containers)
😰 Complexité ingérable
```

**Avec Kubernetes :**
```
Tu décris état désiré (manifests YAML) :
- Deployment: 3 replicas frontend
- Service: Load balance entre replicas
- HorizontalPodAutoscaler: Scale 3→10 si CPU > 70%

K8s s'occupe :
- Répartition pods sur nodes
- Restart automatique si crash
- Scaling automatique
- Rolling updates (zéro downtime)
✅ Tu dors tranquille
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Microservices (10+ services)
- Haute disponibilité (HA)
- Auto-scaling (charge variable)
- Multi-environnements (dev, staging, prod)
- **Production apps critiques**

**❌ Overkill pour :**
- Apps simples (monolithes)
- Side projects perso (Docker Compose suffit)
- Équipes < 5 personnes (complexité > bénéfices)

**→ Lab apprentissage = parfait** ✅

**→ Production petite app = maybe non**

---

### Concepts clés

**Cluster** = Ensemble nodes K8s
- Master node(s) = Control plane (API, scheduler)
- Worker nodes = Exécutent pods

**Pod** = Unité déploiement (1+ containers)
- Plus petit objet K8s
- Éphémère (IP change si restart)

**Deployment** = Gère pods (replicas, updates)
- Assure N replicas running
- Rolling updates automatiques

**Service** = Point d'accès stable pods
- IP fixe (interne cluster)
- Load balance entre pods

**Ingress** = Routing HTTP externe
- Route trafic vers services
- Ex: app.com → Frontend Service

**Namespace** = Isolation logique
- Dev, staging, prod séparés

**ConfigMap / Secret** = Configuration
- ConfigMap = config non-sensible
- Secret = passwords, API keys (encodés)

---

### Kubernetes vs Docker Compose

| Aspect | Docker Compose | Kubernetes |
|--------|----------------|------------|
| **Complexité** | Simple (1 fichier YAML) | Complexe (multiples manifests) |
| **Scaling** | Manuel | Automatique (HPA) |
| **HA** | Non (single host) | Oui (multi-nodes) |
| **Self-healing** | Non | Oui (restart automatique) |
| **Use case** | Dev local, apps simples | Production, microservices |

**Docker Compose = dev/test** ✅

**Kubernetes = production** ✅

---

### Distributions Kubernetes

| Distribution | Description | Quand choisir |
|--------------|-------------|---------------|
| **K3s** | Lightweight K8s (1 binary) | Homelab, edge, apprentissage ⭐⭐⭐⭐⭐ |
| **Minikube** | K8s local (1 node) | Dev laptop uniquement |
| **Kind** | K8s in Docker | Tests CI/CD |
| **Kubeadm** | K8s vanilla (setup manuel) | Production bare-metal |
| **EKS/GKE/AKS** | Managed K8s (cloud) | Production cloud |

**Pour ton lab : K3s = parfait** ⭐⭐⭐⭐⭐

---

### Apprendre Kubernetes

**YouTube :**
- "Kubernetes Tutorial for Beginners" - TechWorld with Nana (4h) ⭐⭐⭐⭐⭐
- "Kubernetes Course" - freeCodeCamp (4h)

**Docs :**
- kubernetes.io/docs (référence complète)
- k3s.io (docs K3s spécifique)

**Pratiquer :**
- Lab 1 Projet 2.3 (Cluster K3s)

**Temps apprentissage : 25-40h** (c'est dense)

---

## 🔄 CI/CD (GitLab CI, GitHub Actions)

### C'est quoi

**Continuous Integration / Continuous Deployment**

**CI (Integration) :**
- Code pushed → Tests auto
- Build auto
- **Détecte bugs tôt** ✅

**CD (Deployment) :**
- Tests passent → Deploy auto (staging/prod)
- **Livraisons fréquentes** ✅

---

### Pourquoi ça existe

**Problème sans CI/CD :**
```
Dev écrit code
→ Commit
→ Autre dev pull
→ Code compile pas sur sa machine 😰
→ 3 jours debug
→ Deploy manuel vendredi soir
→ Bug prod weekend
→ 💀
```

**Avec CI/CD :**
```
Dev écrit code
→ git push
→ Pipeline auto:
  1. Tests lancés (30s)
  2. Si fail → Dev notifié immédiatement
  3. Si pass → Build Docker image
  4. Deploy staging automatiquement
  5. Tests E2E staging
  6. (Optionnel) Deploy prod automatiquement
→ ✅ Bugs détectés tôt
→ ✅ Déploiements fréquents, sûrs
```

---

### Quand l'utiliser

**✅ Toujours (dès que tu codes)** ⭐⭐⭐⭐⭐

Même projets perso = bonne pratique

---

### GitLab CI vs GitHub Actions

| Aspect | GitLab CI | GitHub Actions |
|--------|-----------|----------------|
| **Hébergement** | Self-hosted OU cloud | Cloud (gratuit tier) |
| **Config** | .gitlab-ci.yml | .github/workflows/*.yml |
| **Runners** | Install toi-même (self-hosted) | Hosted by GitHub |
| **Intégration** | GitLab natif | GitHub natif |
| **Prix** | Gratuit self-hosted | Gratuit (2000 min/mois) |

**GitLab CI = parfait homelab** (tu contrôles tout) ⭐⭐⭐⭐⭐

**GitHub Actions = parfait open-source** (gratuit, simple) ⭐⭐⭐⭐⭐

---

### Pipeline typique
```yaml
# .gitlab-ci.yml (exemple)
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push registry.lab.local/myapp:$CI_COMMIT_SHA

test:
  stage: test
  script:
    - npm install
    - npm test
    - npm run lint

deploy_staging:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=registry.lab.local/myapp:$CI_COMMIT_SHA
  environment:
    name: staging
  only:
    - develop

deploy_prod:
  stage: deploy
  script:
    - kubectl set image deployment/myapp myapp=registry.lab.local/myapp:$CI_COMMIT_SHA
  environment:
    name: production
  only:
    - main
  when: manual  # Approbation manuelle
```

---

### Apprendre CI/CD

**YouTube :**
- "GitLab CI/CD Tutorial" - TechWorld with Nana (1h30)
- "GitHub Actions Tutorial" - freeCodeCamp (2h)

**Docs :**
- docs.gitlab.com/ee/ci/
- docs.github.com/actions

**Pratiquer :**
- Lab 1 Projet 2.2 (GitLab self-hosted)

**Temps apprentissage : 15-20h**

---

## 📊 PROMETHEUS & GRAFANA

### C'est quoi

**Stack monitoring/observability**

**Prometheus :**
- Time-series database (métriques)
- Scrape endpoints (pull metrics)
- Alerting (rules)

**Grafana :**
- Visualisation (dashboards)
- Query multiple datasources
- **Interface jolie** ✨

---

### Pourquoi ça existe

**Problème sans monitoring :**
```
Serveur down
→ Tu le découvres quand utilisateur se plaint
→ 😰 Tu sais pas pourquoi (pas de metrics)
→ Debug aveugle (logs éparpillés)
```

**Avec Prometheus + Grafana :**
```
Dashboard Grafana :
- CPU serveur 1 : 15%
- CPU serveur 2 : 95% 🔴
- Alerte déclenchée (email/Discord)
→ Tu interviens AVANT users affectés
→ Graphs montrent pic à 14h23
→ Tu corrèles avec deploy récent
→ ✅ Rollback, problème résolu
```

---

### Quand l'utiliser

**✅ Toujours (infra + apps)** ⭐⭐⭐⭐⭐

**Monitoring = non-négociable production**

---

### Métriques importantes

**Infrastructure :**
- CPU, RAM, Disk usage
- Network I/O
- Processes

**Applications :**
- Request rate (req/sec)
- Error rate (%)
- Response time (latency)
- **RED metrics** (Rate, Errors, Duration)

**Business :**
- Users actifs
- Transactions
- Revenue (si applicable)

---

### Alternatives

| Outil | Différence | Quand choisir |
|-------|-----------|---------------|
| **Prometheus + Grafana** | Open-source, flexible, standard | Toujours (défaut) ⭐⭐⭐⭐⭐ |
| Datadog | SaaS, tout-en-un | Budget++, facilité MAX |
| New Relic | SaaS, APM focus | Apps complexes, traces |
| Zabbix | Legacy, agent-based | Infra legacy, Windows++ |

**Prometheus + Grafana = standard DevOps** ⭐⭐⭐⭐⭐

---

### Apprendre Prometheus & Grafana

**YouTube :**
- "Prometheus & Grafana Tutorial" - TechWorld with Nana (1h30)
- "Complete Monitoring Setup" - DevOps Journey (2h)

**Docs :**
- prometheus.io/docs
- grafana.com/docs

**Pratiquer :**
- Lab 1 Projet 1.3 (Monitoring basics)
- Lab 1 Projet 3.2 (Observability complète)

**Temps apprentissage : 10-15h**

---

## 🔀 ARGOCD (GitOps)

### C'est quoi

**GitOps continuous deployment pour Kubernetes**

**Principe :**
- Git repo = source of truth (manifests K8s)
- ArgoCD watch Git repo
- Changement détecté → ArgoCD sync automatiquement
- **Git commit = deployment** ✅

---

### Pourquoi ça existe

**Problème sans GitOps :**
```
Deploy K8s = kubectl apply -f manifests/
→ Qui a déployé quoi, quand ?
→ Manifest Git ≠ cluster réel (drift)
→ Rollback = comment ?
😰 Chaos
```

**Avec ArgoCD (GitOps) :**
```
Git repo contient manifests
ArgoCD sync automatiquement
→ Git = toujours vérité
→ Historique Git = historique deployments
→ Rollback = git revert + ArgoCD sync
→ Drift détecté automatiquement (ArgoCD alerte)
✅ Contrôle total, audit trail
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Kubernetes deployments (automatisés)
- Multi-clusters (dev, staging, prod)
- Audit trail (qui a déployé quoi)
- **GitOps workflow** (moderne)

**❌ Overkill pour :**
- Pas Kubernetes (ArgoCD = K8s only)
- Déploiements très simples (Docker Compose suffit)

---

### Workflow GitOps
```
1. Dev modifie manifest K8s (ex: change image tag)
   vim manifests/frontend-deployment.yaml
   # Change image: frontend:v1.0 → frontend:v2.0

2. Commit + push Git
   git commit -m "Update frontend to v2.0"
   git push

3. ArgoCD détecte changement (30s polling)

4. ArgoCD compare Git vs Cluster
   Git: frontend:v2.0
   Cluster: frontend:v1.0
   → Out of sync 🔴

5. ArgoCD sync automatiquement
   kubectl set image deployment/frontend frontend=frontend:v2.0

6. Deployment K8s rolling update
   → Pods frontend v1.0 remplacés par v2.0
   → Zero downtime

7. ArgoCD status: Synced ✅
```

---

### Apprendre ArgoCD

**YouTube :**
- "ArgoCD Tutorial for Beginners" - TechWorld with Nana (1h)
- "GitOps with ArgoCD" - DevOps Toolkit (45min)

**Docs :**
- argo-cd.readthedocs.io

**Pratiquer :**
- Lab 1 Projet 3.1 (GitOps complet)

**Temps apprentissage : 8-12h**

---

## 🔐 VAULT (Secrets Management)

### C'est quoi

**Outil gestion secrets (passwords, API keys, certs)**

**Principe :**
- Secrets stockés chiffrés dans Vault
- Apps demandent secrets à Vault (API)
- **Jamais hardcoded dans code** ✅

---

### Pourquoi ça existe

**Problème sans Vault :**
```
Passwords dans code :
DB_PASSWORD="super_secret_123"

→ Pusé Git (tout le monde voit)
→ Historique Git (jamais supprimable)
→ Logs (passwords exposés)
😰 Sécurité 0
```

**Avec Vault :**
```
Code demande secret à Vault :
password = vault.get_secret("db_password")

→ Password jamais dans code
→ Rotation automatique possible
→ Audit trail (qui a accédé à quel secret)
✅ Sécurité++
```

---

### Quand l'utiliser

**✅ Use cases parfaits :**
- Production (secrets critiques)
- Multi-environments (dev, staging, prod)
- Compliance (audit trail)
- **Rotation secrets automatique**

**❌ Overkill pour :**
- Side projects perso (env vars suffisent)
- Labs (pas de secrets critiques)

---

### Alternatives

| Outil | Différence | Quand choisir |
|-------|-----------|---------------|
| **Vault** | Open-source, flexible, audit | Production, self-hosted ⭐⭐⭐⭐⭐ |
| AWS Secrets Manager | AWS only, managed | Si déjà AWS |
| Azure Key Vault | Azure only, managed | Si déjà Azure |
| 1Password / Bitwarden | User passwords focus | Pas pour apps (pour humains) |

---

### Apprendre Vault

**YouTube :**
- "HashiCorp Vault Tutorial" - TechWorld with Nana (1h)

**Docs :**
- vaultproject.io/docs

**Pratiquer :**
- Lab 1 Projet S.2 (Security hardening)

**Temps apprentissage : 8-10h**

---

## 🌊 COMPARISON RECAP

### Quel outil pour quoi ?

| Besoin | Outil recommandé |
|--------|------------------|
| **Configuration serveurs** | Ansible |
| **Créer infrastructure** | Terraform |
| **Containeriser apps** | Docker |
| **Orchestrer containers** | Kubernetes (K3s) |
| **CI/CD pipelines** | GitLab CI ou GitHub Actions |
| **Monitoring infra/apps** | Prometheus + Grafana |
| **GitOps K8s** | ArgoCD |
| **Gestion secrets** | Vault (ou env vars si simple) |
| **Reverse proxy** | Nginx ou Traefik |
| **Load balancing** | Nginx ou HAProxy |

---

## 🎓 ORDRE APPRENTISSAGE RECOMMANDÉ

### Débutant (Mois 1-2)

1. **Docker** (containers basics)
2. **Ansible** (automation simple)
3. **Réseau** (IP, VLANs, firewall)

**→ Fondations solides** ✅

---

### Intermédiaire (Mois 3-6)

4. **Terraform** (IaC)
5. **GitLab CI/CD** (pipelines)
6. **Prometheus + Grafana** (monitoring)

**→ Compétences DevOps core** ✅

---

### Avancé (Mois 7-12)

7. **Kubernetes** (orchestration)
8. **ArgoCD** (GitOps)
9. **Vault** (secrets, optionnel)

**→ Production-ready DevOps** ✅

---

## 💙 TIPS APPRENTISSAGE

### Ne pas tout apprendre d'un coup

**❌ Mauvaise approche :**
"Je vais apprendre Ansible + Terraform + K8s + CI/CD cette semaine"
→ Burnout garanti 💀

**✅ Bonne approche :**
"Cette semaine : Docker basics (10h)"
"Semaine prochaine : Ansible (10h)"
→ Progression steady 💪

---

### Apprendre par projet (pas cours seuls)

**❌ Regarder 20h cours sans pratiquer**
→ Tu oublies 80%

**✅ Cours 2h → Projet 8h → Repeat**
→ Tu retiens, tu comprends

---

### Documentation = meilleure ressource

**Après avoir compris basics (YouTube) :**
→ Docs officielles = références
→ Exemples concrets
→ **Toujours à jour** ✅

---

# 📺 PARTIE 6 : RESSOURCES YOUTUBE & APPRENTISSAGE

---

## 🎯 POURQUOI YOUTUBE (Pas que docs)

### Avantages apprentissage vidéo

**✅ Visuels** (tu VOIS les manips)

**✅ Rythme humain** (explications naturelles)

**✅ Exemples concrets** (pas juste théorie)

**✅ Gratuit** (pas de paywall)

**✅ Pause/replay** (à ton rythme)

---

### Comment utiliser YouTube efficacement

**Stratégie 20/80 :**
- 20% temps : Vidéos (comprendre concepts)
- 80% temps : Pratiquer (ton lab)
- **Action > consommation passive** 💪

**Éviter rabbit hole :**
- 1 vidéo = 1 concept
- Pause vidéo → Pratique immédiate
- **Pas binge-watching 10 vidéos d'affilée** ⚠️

---

## 📺 CHAÎNES YOUTUBE (Par catégorie)

### 🌐 RÉSEAU

#### **NetworkChuck** ⭐⭐⭐⭐⭐

**Style :** Énergique, fun, café obsessed ☕

**Contenu :**
- Subnetting expliqué simplement
- VLANs, VPN, DNS
- **Démos pratiques** (pas juste théorie)

**Vidéos recommandées :**
- "Subnetting made easy" (15 min)
- "VLANs explained" (12 min)
- "What is DNS?" (10 min)

**Pourquoi c'est bien :**
- Explications CLAIRES
- Exemples concrets
- **Tu comprends sans t'ennuyer** ✅

**Lien :** youtube.com/@NetworkChuck

---

#### **Practical Networking** ⭐⭐⭐⭐⭐

**Style :** Calme, pédagogique, schémas ++

**Contenu :**
- Concepts réseau fondamentaux
- Schémas animés (excellents)
- **Théorie accessible**

**Vidéos recommandées :**
- "How data flows on the Internet" (20 min)
- "OSI Model explained" (15 min)

**Pourquoi c'est bien :**
- Visuels TOP (schémas clairs)
- Explications progressives
- **Compréhension profonde** ✅

**Lien :** youtube.com/@PracticalNetworking

---

### 🏠 PROXMOX & HOMELAB

#### **LearnLinuxTV** ⭐⭐⭐⭐⭐

**Style :** Calme, précis, tutoriels complets

**Contenu :**
- Proxmox (installation, config, advanced)
- LXC containers
- Linux administration
- **Homelab focus**

**Playlists recommandées :**
- "Proxmox Full Course" (10+ vidéos, 5h total)
- "LXC Containers Tutorial"

**Vidéos essentielles :**
- "Proxmox VE Installation and Setup" (30 min)
- "Proxmox Networking Explained" (25 min)
- "LXC vs VMs in Proxmox" (18 min)

**Pourquoi c'est bien :**
- **Parfait pour débutants** Proxmox
- Pas de bullshit (direct au but)
- Exemples homelabs réels
- **EXACTEMENT ce dont tu as besoin** ✅

**Lien :** youtube.com/@LearnLinuxTV

---

#### **TechnoTim** ⭐⭐⭐⭐⭐

**Style :** Homelab enthusiast, projets concrets

**Contenu :**
- Homelab builds
- Kubernetes homelab
- Self-hosted apps
- **Projets complets** (début à fin)

**Vidéos recommandées :**
- "Perfect Proxmox Template" (20 min)
- "K3s on Proxmox" (35 min)
- "Self-Hosted Media Server" (25 min)

**Pourquoi c'est bien :**
- Projets RÉELS (pas juste théorie)
- Configurations production-ready
- **Inspiration homelab** ✨

**Lien :** youtube.com/@TechnoTim

---

#### **Craft Computing** ⭐⭐⭐⭐

**Style :** Hardware focus, homelabs créatifs

**Contenu :**
- Homelab hardware (serveurs, NAS)
- Proxmox setups
- **Side projects fun**

**Vidéos recommandées :**
- "Budget Homelab Build" (25 min)
- "Proxmox on Old Hardware" (18 min)

**Pourquoi c'est bien :**
- Hardware advice (pas que software)
- Budgets réalistes
- **Motivation** (voir ce que autres font) 💪

**Lien :** youtube.com/@CraftComputing

---

### 🛠️ DEVOPS GÉNÉRAL

#### **TechWorld with Nana** ⭐⭐⭐⭐⭐

**Style :** Pédagogique, complet, exemples concrets

**Contenu :**
- DevOps roadmap
- Docker, Kubernetes, Terraform
- CI/CD (GitLab, GitHub Actions)
- **Courses complets** (3-4h chaque)

**Courses recommandés :**
- "Docker Tutorial for Beginners" (3h) ⭐⭐⭐⭐⭐
- "Kubernetes Tutorial for Beginners" (4h) ⭐⭐⭐⭐⭐
- "Terraform Tutorial" (1h30)
- "GitLab CI/CD Tutorial" (1h30)
- "Ansible Tutorial" (1h)

**Pourquoi c'est bien :**
- **LA référence DevOps YouTube**
- Explications claires, pas d'accents difficiles
- Exemples réels (pas juste hello world)
- Progression logique
- **Complet mais accessible** ✅

**Lien :** youtube.com/@TechWorldwithNana

---

#### **DevOps Toolkit (Viktor Farcic)** ⭐⭐⭐⭐

**Style :** Technique, profond, GitOps focus

**Contenu :**
- GitOps (ArgoCD, Flux)
- Kubernetes avancé
- **Best practices production**

**Vidéos recommandées :**
- "GitOps with ArgoCD" (45 min)
- "Kubernetes Production Best Practices" (1h)

**Pourquoi c'est bien :**
- Niveau avancé (quand tu es prête)
- Production mindset
- **GitOps expertise** ✅

**Lien :** youtube.com/@DevOpsToolkit

---

#### **That DevOps Guy** ⭐⭐⭐⭐

**Style :** Pratique, projets, CI/CD focus

**Contenu :**
- CI/CD pipelines
- GitLab, Jenkins, GitHub Actions
- **Automation pratique**

**Vidéos recommandées :**
- "GitLab CI/CD Complete Tutorial" (2h)
- "Jenkins Pipeline Tutorial" (1h30)

**Pourquoi c'est bien :**
- Focus CI/CD (core DevOps)
- Exemples réels
- **Hands-on approach** ✅

**Lien :** youtube.com/@MarcelDempers

---

### 🐳 DOCKER & KUBERNETES

#### **Just Me and Opensource** ⭐⭐⭐⭐⭐

**Style :** Self-hosted apps, Docker Compose

**Contenu :**
- Docker Compose stacks
- Self-hosted alternatives (Google, etc.)
- **Apps pratiques** (Jellyfin, Nextcloud, etc.)

**Vidéos recommandées :**
- "Perfect Media Server" (30 min)
- "Self-Hosted Password Manager" (15 min)
- "Docker Compose Tutorial" (25 min)

**Pourquoi c'est bien :**
- **Parfait pour Lab 2 (Fun projects)**
- Apps que tu vas vraiment utiliser
- Configurations production-ready
- **Exactement ce que tu veux faire** ✅

**Lien :** youtube.com/@justmeandopensource

---

#### **DevOps Journey** ⭐⭐⭐⭐

**Style :** Kubernetes focus, tutorials structurés

**Contenu :**
- Kubernetes basics → advanced
- K3s, RKE2
- **Learning path clair**

**Vidéos recommandées :**
- "Kubernetes Crash Course" (2h)
- "K3s Setup Tutorial" (45 min)

**Pourquoi c'est bien :**
- Progression logique
- Pas overwhelming
- **Kubernetes accessible** ✅

**Lien :** youtube.com/@DevOpsJourney

---

### 📊 MONITORING & OBSERVABILITY

#### **Monitoring with Prometheus** (Playlist Nana) ⭐⭐⭐⭐⭐

**Contenu :**
- Prometheus setup
- Grafana dashboards
- Alerting

**Durée :** 1h30 total

**Pourquoi c'est bien :**
- Complet mais concis
- Exemples pratiques
- **Setup fonctionnel fin vidéo** ✅

---

### 🎮 SELF-HOSTED & FUN PROJECTS

#### **Wolfgang's Channel** ⭐⭐⭐⭐

**Style :** Homelab extrême, projets ambitieux

**Contenu :**
- Homelabs avancés (racks, networking)
- Self-hosted everything
- **Inspiration** (pas forcément à reproduire)

**Vidéos recommandées :**
- "Ultimate Homelab Tour" (45 min)
- "10Gb Networking Homelab" (30 min)

**Pourquoi c'est bien :**
- **Motivation** (voir ce qui est possible)
- Ideas de projets
- Fun à regarder ✨

**Lien :** youtube.com/@WolfgangsChannel

---

#### **Jeff Geerling** ⭐⭐⭐⭐⭐

**Style :** Raspberry Pi, homelab, reviews hardware

**Contenu :**
- Raspberry Pi projects
- Homelab hardware reviews
- **Ansible** (il est core contributor)

**Vidéos recommandées :**
- "Raspberry Pi Kubernetes Cluster" (20 min)
- "Ansible 101 Series" (10 vidéos, 15 min chaque)

**Pourquoi c'est bien :**
- Projets accessibles
- Ansible expertise
- **Communauté active** 💬

**Lien :** youtube.com/@JeffGeerling

---

## 📚 AUTRES RESSOURCES (Non-YouTube)

### 📖 Documentation officielle (Toujours meilleure après basics)

**Proxmox :**
- pve.proxmox.com/wiki
- **Référence complète** ✅

**Ansible :**
- docs.ansible.com
- Exemples excellents

**Terraform :**
- terraform.io/docs
- registry.terraform.io (providers)

**Kubernetes :**
- kubernetes.io/docs
- Dense mais complète

**Docker :**
- docs.docker.com
- Très accessible

---

### 🌐 Sites web apprentissage

#### **KillerCoda (ex-Katacoda)** ⭐⭐⭐⭐⭐

**killercoda.com**

**C'est quoi :**
- Tutoriels interactifs (terminal dans navigateur)
- Kubernetes, Docker, Linux, etc.
- **Tu FAIS dans navigateur** (pas besoin setup)

**Pourquoi c'est bien :**
- Gratuit
- Pas besoin installer (commence immédiatement)
- **Learn by doing** ✅

**Cours recommandés :**
- "Kubernetes Basics"
- "Docker Fundamentals"

---

#### **Practical Networking (Site)** ⭐⭐⭐⭐⭐

**pracnet.net**

**C'est quoi :**
- Articles réseau (courts, visuels)
- Concepts expliqués simplement
- **Schémas excellents**

**Pourquoi c'est bien :**
- Complémente vidéos YouTube
- Référence rapide
- **Visuels TOP** ✅

---

### 💬 Communautés

#### **Reddit**

**r/homelab** ⭐⭐⭐⭐⭐
- Partage setups homelab
- Questions/réponses
- **Inspiration** 💡

**r/selfhosted** ⭐⭐⭐⭐⭐
- Apps self-hosted
- Recommendations
- **Lab 2 ideas** ✨

**r/devops** ⭐⭐⭐⭐
- Discussions DevOps
- Best practices
- Career advice

**r/Proxmox** ⭐⭐⭐⭐
- Support Proxmox
- Configurations partagées
- **Troubleshooting** 🔧

---

#### **Discord Servers**

**TechnoTim Discord**
- Homelab discussions
- Support communauté
- **Active** 💬

**LearnLinuxTV Discord**
- Linux/Proxmox help
- Friendly community

**Recherche "DevOps Discord" → Plusieurs serveurs actifs**

---

### 📘 Blogs techniques

**DevOps Cube** (devopscube.com)
- Tutorials K8s, Docker, CI/CD
- Guides complets

**Homelab Show** (homelabshow.com)
- Setups homelab
- Reviews hardware

---

## 🗓️ PLANNING APPRENTISSAGE RESSOURCES

### Semaine type (exemple)

**Lundi soir (1h) :**
- Vidéo YouTube (NetworkChuck, 15 min)
- Pratique lab (45 min)

**Mercredi soir (1h) :**
- Vidéo TechWorld with Nana (30 min)
- Pratique lab (30 min)

**Samedi matin (3h) :**
- Vidéo LearnLinuxTV (45 min)
- Pratique lab (2h)
- **Browse r/homelab** (15 min inspiration)

**Dimanche (optionnel, si énergie) :**
- KillerCoda tutorial (1h)
- Ou repos ✅

**Total : 5h/semaine** (gérable avec alternance + permis)

---

### Par phase apprentissage

**Phase 1 (Mois 1-2) : Fondations**

**YouTube :**
- LearnLinuxTV (Proxmox)
- NetworkChuck (Réseau basics)
- TechWorld with Nana (Docker, Ansible)

**Docs :**
- Proxmox Wiki
- Ansible Docs

**Communauté :**
- r/Proxmox (questions setup)

---

**Phase 2 (Mois 3-6) : DevOps Core**

**YouTube :**
- TechWorld with Nana (Terraform, GitLab CI, K8s intro)
- TechnoTim (Projets concrets)

**Docs :**
- Terraform Docs
- GitLab CI Docs

**Pratique :**
- KillerCoda (K8s basics)

**Communauté :**
- r/devops (best practices)

---

**Phase 3 (Mois 7-12) : Advanced**

**YouTube :**
- DevOps Toolkit (GitOps, K8s avancé)
- DevOps Journey (K8s deep dive)

**Docs :**
- Kubernetes Docs (référence complète)
- ArgoCD Docs

**Communauté :**
- Discord DevOps (discussions techniques)

---

## 💡 TIPS UTILISATION RESSOURCES

### Ne pas collecter, FAIRE

**❌ Mauvaise approche :**
- Sauvegarder 50 vidéos "à regarder plus tard"
- Bookmarker 100 articles
- **Jamais revenir dessus** 💀

**✅ Bonne approche :**
- 1 vidéo → Regarder → Pratiquer IMMÉDIATEMENT
- **Action > collection** 💪

---

### Vitesse lecture YouTube

**1.25× - 1.5× speed** (si tu comprends bien)

**Économie temps :**
- Vidéo 1h → 40-45 min (1.5×)
- **+ temps pour pratiquer** ✅

**Attention :** Si trop rapide = tu comprends mal = perte temps

**Trouve TON rythme** 💙

---

### Notes pendant vidéos

**Notion/Obsidian open :**
- Note commandes importantes
- Screenshots schémas
- **Référence rapide après** 📝

**Format notes :**
```markdown
# Docker Basics (TechWorld with Nana)

## Concepts clés
- Container = processus isolé
- Image = template

## Commandes essentielles
docker build -t myapp .
docker run -p 8080:80 myapp

## À creuser
- Networking containers (voir doc)
```

---

### Quand bloquer sur concept

**1. Pause vidéo**

**2. Google "[concept] simple explanation"**

**3. Lis 2-3 articles courts**

**4. Reviens vidéo**

**→ Compréhension > vitesse** ✅

---

## 🎯 ROADMAP RESSOURCES (Résumé)

### Démarrage Lab (Semaine 1-2)

**YouTube :**
- LearnLinuxTV : "Proxmox Installation" (30 min)
- LearnLinuxTV : "LXC Containers" (20 min)

**Pratique :**
- Install Proxmox M710S
- Créer 3 containers

---

### Réseau (Semaine 3-4)

**YouTube :**
- NetworkChuck : "Subnetting" (15 min)
- NetworkChuck : "VLANs" (12 min)
- LearnLinuxTV : "Proxmox Networking" (25 min)

**Pratique :**
- VLANs dans lab
- Firewall rules

---

### Ansible (Semaine 5-6)

**YouTube :**
- TechWorld with Nana : "Ansible Tutorial" (1h)

**Docs :**
- docs.ansible.com (Playbooks)

**Pratique :**
- Playbooks install services

---

### Docker (Semaine 7-9)

**YouTube :**
- TechWorld with Nana : "Docker Tutorial" (3h, étalé sur 3 semaines)

**Pratique :**
- Multi-container app (Projet 1.2)

---

### Continue ainsi... (Terraform, CI/CD, K8s...)

---

## 💙 MESSAGE FINAL RESSOURCES

**Tu as TOUT ce qu'il faut** ✅

**Ressources = gratuites, accessibles, excellentes**

**Pas besoin formations payantes** ❌

**YouTube + Docs + Pratique = suffisant** 💪

---

**Le seul ingrédient manquant :**

**TOI. Qui pratiques. Régulièrement.** ✨

---

**Pas perfection.**

**Pas vitesse.**

**Juste... régularité.** 👣

---

**1h/jour pendant 6 mois = 180h**

**= Compétences DevOps solides**

**= Portfolio CDI-ready**

**= Atlas qui t'attend** 🐕💙

---

# 🧠 PARTIE 7 : TIPS CONCENTRATION & MOTIVATION

---

## 💙 CONTEXTE TOI

### Ta situation (Novembre 2025)

**Défis actuels :**
- Dépression (antidépresseurs mois 1)
- Fatigue (effets secondaires médicaments)
- Concentration difficile
- Alternance + école (temps/énergie limités)
- **Tu DÉTESTES réseau théorique** (CCNA = torture)

**Forces :**
- Curiosité naturelle ✨
- Motivation forte (Atlas = objectif clair) 🐕
- Compétences existantes (Ansible, Docker, GitLab)
- **Résilience** (tu continues malgré difficultés) 💪

---

### Ce guide prend tout ça en compte

**Pas de "just do it" toxique** ❌

**Pas de hustle culture bullshit** ❌

**Juste : stratégies RÉALISTES pour TOI** ✅

---

## 🧠 GÉRER CONCENTRATION DIFFICILE

### Accepter la réalité

**Concentration parfaite = mythe**

**SURTOUT avec :**
- Dépression
- Antidépresseurs (effets secondaires)
- Fatigue chronique

**→ Tu ne seras PAS productive 8h/jour** ⚠️

**→ Et c'est OK** 💙

---

### Travailler AVEC ton cerveau (pas contre)

#### **Technique Pomodoro adapté**

**Pomodoro classique :** 25 min focus → 5 min pause

**TON Pomodoro (adapté concentration difficile) :**

**15 min focus → 5 min pause** ✅

**Pourquoi plus court :**
- 15 min = atteignable (pas overwhelming)
- Cerveau fatigué tient 15 min
- **Succès > frustration** 💙

**Comment faire :**
```
Session lab (1h) :
├─ 15 min : Config Proxmox
├─ 5 min : Pause (stretch, eau, fenêtre)
├─ 15 min : Continue config
├─ 5 min : Pause
├─ 15 min : Teste config
└─ 5 min : Pause finale

= 45 min travail effectif
= 1h réelle
= GÉRABLE ✅
```

**Apps Pomodoro (optionnel) :**
- Forest (mobile, gamifié)
- Pomofocus (web, simple)
- **Ou juste timer téléphone** ✅

---

#### **One Thing At A Time (CRUCIAL)**

**Cerveau concentration difficile = multitasking IMPOSSIBLE**

**❌ Ne PAS faire :**
```
Vidéo YouTube Proxmox
+ Discord ouvert (notifs)
+ Reddit dans onglet
+ Messages téléphone
= Tu comprends RIEN 💀
```

**✅ FAIRE :**
```
1 onglet : Vidéo YouTube Proxmox
Téléphone : Mode avion
Discord : Fermé
= Tu COMPRENDS ✅
```

**Règle absolue :**
**1 tâche. 1 écran. 1 focus.** 💎

---

#### **Temps optimal journée**

**TON énergie fluctue dans journée**

**Identifie TES moments peak energy :**

**Exemple matin person :**
- 8h-11h : Énergie MAX ⚡
- 14h-17h : Énergie moyenne ⚙️
- 19h-22h : Énergie basse 🔋

**→ Lab tasks complexes = matin**

**→ Lab tasks simples = soir**

**Exemple soir person :**
- Matin : Énergie basse
- Après-midi : Moyenne
- **Soir 20h-23h : Peak** ⚡

**→ Lab = soir, pas matin** ✅

**Expérimente, trouve TON rythme** 💙

---

#### **Environnement focus**

**Setup physique :**

**✅ Bien :**
- Bureau dégagé (pas bordel)
- Lumière suffisante
- Chaise confortable
- **Eau à portée** (hydratation aide concentration)

**❌ Éviter :**
- Lit (association sommeil)
- Canapé (trop confortable → somnolence)
- Endroits passage (distractions)

**Musique :**

**Si aide concentration :**
- Lo-fi hip hop (YouTube : "lo-fi study beats")
- Ambient music
- **Pas de paroles** (distractions)

**Si distrait :**
- Silence ✅
- Ou bruit blanc (apps)

---

### Quand concentration = 0

**Jours où cerveau dit NON**

**Symptômes :**
- Tu relis même phrase 5 fois
- Vidéo YouTube = brouillard
- **Frustration monte** 😤

**❌ Ne PAS forcer** (perte temps + énergie)

**✅ Faire plutôt :**

**Option A : Tâche ultra-simple**
- Ranger dossier lab
- Lire (pas pratiquer) doc
- **Checkbox = satisfaction** ✅

**Option B : Repos actif**
- Crochet 🧶
- Piano 🎹
- Photo 📸
- **Activité créative = recharge cerveau**

**Option C : Repos total**
- Série, film
- Juste dormir
- **Accepter = OK** 💙

**Le lendemain, tu seras + productive** ✅

---

## 💪 RESTER MOTIVÉE (Long terme)

### Motivation ≠ Discipline

**Motivation = sentiment (fluctue)** 📈📉

**Discipline = système (stable)** 🏗️

**Tu ne seras PAS motivée tous les jours** ⚠️

**→ Systèmes > motivation** ✅

---

### Système : Checkboxes & Micro-wins

**Cerveau adore cocher cases** ✅

**Setup Notion (ou papier) :**
```markdown
# Lab DevOps - Semaine du 25 nov

## Lundi
- [ ] Regarder vidéo Proxmox (15 min)
- [ ] Installer Proxmox M710S (1h)

## Mercredi
- [ ] Créer 1er container LXC (30 min)
- [ ] Tester ping container (10 min)

## Samedi
- [ ] 2ème container LXC (30 min)
- [ ] Config réseau basique (1h)
```

**Pourquoi ça marche :**
- Tâches petites (atteignables)
- Cocher = dopamine hit 🎉
- **Progression VISIBLE** 💪

**Chaque checkbox = victoire** ✅

---

### Visualiser Atlas (Motivation ultime)

**Ton WHY = Atlas** 🐕💙

**Rappel constant :**

**Photo Atlas (fond écran laptop) :**
- Tu vois À CHAQUE ouverture laptop
- **Reminder visuel** 💙

**Timeline imprimée (bureau) :**
```
Novembre 2025 ← Tu es ici
    ↓
Janvier 2027 : CDI + Voiture
    ↓
Octobre 2027 : ATLAS 🐕✨
```

**Chaque heure lab = 1 pas vers lui** 👣

**Calcul motivation :**
```
1h lab aujourd'hui
→ + proche portfolio
→ + proche CDI
→ + proche voiture
→ + PROCHE ATLAS 🐕💙
```

---

### Progrès documenté (Voir chemin parcouru)

**Notion/Obsidian : Journal hebdo**

**Chaque dimanche soir (5 min) :**
```markdown
# Semaine 48 - 2025

## Ce que j'ai fait
- ✅ Installé Proxmox M710S
- ✅ Créé 3 containers LXC
- ✅ Réseau basique fonctionne

## Ce que j'ai appris
- Proxmox UI (navigation)
- IP statiques vs DHCP
- Ping = test réseau

## Difficultés
- Container 2 pas Internet au début
- Solution : Gateway mal configurée

## Prochaine semaine
- VLANs (segmentation)
- Ansible install

## Mood
😊 Fière d'avoir installé Proxmox !
```

**Bénéfices :**
- Tu VOIS progrès (même si lents)
- Apprentissages documentés
- **Motivation recharge** 💪

**Dans 3 mois, tu relis :**
> "Wow, j'ai fait TOUT ça !" 🎉

---

### Communauté (Pas seule)

**Partager = motivation externe**

**Options :**

**Reddit r/homelab :**
- Post "Week 1 homelab" (photo setup)
- Commentaires encourageants
- **Tu fais partie de quelque chose** 💬

**Discord (TechnoTim, LearnLinuxTV) :**
- Channel #homelab-showcase
- Partage progrès
- **Questions = réponses rapides** 💙

**LinkedIn (optionnel) :**
- Post "Building my DevOps homelab"
- Recruteurs voient
- **Networking professionnel** 💼

**Pas obligatoire, mais AIDE** ✅

---

### Récompenses (Pavlov style)

**Après chaque session lab (1-2h) :**

**Petite récompense immédiate :**
- Chocolat 🍫
- Épisode série (1 épisode, pas binge) 📺
- 15 min jeu 🎮
- **Cerveau : "Lab = plaisir"** 💙

**Après milestone (ex: Proxmox installé) :**
- Resto préféré 🍕
- Achat petit (livre, jeu, etc.)
- **Célébrer victoire** 🎉

**Après gros projet (ex: K8s cluster) :**
- Weekend off complet
- Sortie spéciale (concert, voyage jour)
- **Grosse célébration** ✨

**Associer effort → récompense = motivation sustainable** ✅

---

## 🛡️ GÉRER DÉPRESSION & FATIGUE

### Priorité #1 : Santé

**Lab < Santé** (toujours)

**Si jour déprime forte :**
- ❌ Pas forcer lab
- ✅ Repos, self-care
- **Demain existe** 💙

**Antidépresseurs mois 1-3 = difficile**
- Effets secondaires (fatigue, concentration)
- **Ça s'améliore après** (généralement 4-6 semaines)
- Patience avec toi-même 🫂

---

### Adapter attentes

**Bonne semaine (énergie OK) :**
- 5h lab ✅
- Progression visible

**Semaine difficile (déprime) :**
- 1h lab (ou 0h) ✅
- **C'est OK** 💙

**Moyenne sur 4 semaines = ce qui compte** 📊

**Pas chaque semaine parfaite** ✅

---

### Signe alerte (Quand arrêter)

**Si lab devient source stress > plaisir :**

**Symptômes :**
- Anxiété avant ouvrir laptop
- Culpabilité constante ("j'ai rien fait")
- **Pleurs, frustration extrême**

**→ PAUSE obligatoire** ⚠️

**1 semaine off lab :**
- Juste vivre
- Juste respirer
- **Reset** 💙

**Puis reviens doucement** (si tu veux) ✅

**Lab = outil vers Atlas** 🐕

**Pas prison** ❌

---

## 🎯 GÉRER "Je déteste réseau"

### Pourquoi tu détestes (valide)

**CCNA théorique = torture** 💀

**Raisons légitimes :**
- Abstrait (pas visuel immédiat)
- Dense (protocoles, RFC, blabla)
- Ennuyeux (pas fun)

**→ TON cerveau = pas câblé pour ça** 🧠

**→ Et c'est OK** 💙

---

### Approche alternative (Pour toi)

**❌ CCNA 50h théorie** (torture)

**✅ Réseau par LAB** (learning by doing)

**Principe :**
```
Besoin concret
    ↓
Apprendre minimum nécessaire (vidéo 10 min)
    ↓
Appliquer immédiatement (lab 30 min)
    ↓
Ça marche = Concept ancré ✅
```

**Exemple :**
```
"Je veux Jellyfin accessible depuis PC"
    ↓
Recherche : "reverse proxy nginx" (vidéo 10 min)
    ↓
Configure dans lab (30 min)
    ↓
Ça marche ! ✅
    ↓
Tu comprends reverse proxy (sans étudier théorie)
```

**Réseau appris = side-effect projet fun** 💡

**Pas objectif principal** ✅

---

### Timing réseau

**Maintenant (Nov-Déc 2025) :**
- Réseau BASIQUE only (IP, ping, gateway)
- **Juste ce qui permet lab fonctionner** ✅

**Janvier 2026 (présentation) :**
- VLANs basiques (assez pour présenter)
- **Pas expertise, juste compréhension** ✅

**2026-2027 (quand nécessaire) :**
- Approfondis SI besoin pour 5ème année
- **Sinon, minimum suffit** ✅

**Tu n'as PAS besoin devenir experte réseau** 🙏

**Juste comprendre assez pour DevOps** ✅

---

## 📅 TIMELINE RÉALISTE (Avec tout contexte)

### Décembre 2025

**Priorités :**
1. **Santé** (antidépresseurs, repos) 🧠💊
2. **Permis** (finir 12h, acheter 10h) 🚗
3. Lab léger (si énergie) 💻

**Lab actions (OPTIONNEL si énergie) :**
- Install Proxmox (weekend 1, 3h)
- Containers basiques (weekend 2-3, 4h)
- **Total : 7h sur 4 semaines = 1h45/semaine** ✅

**Si pas d'énergie → SKIP lab, focus santé/permis** 💙

---

### Janvier 2026

**Présentation projet** 📝
- Archi simple (Proxmox + containers + Ansible basique)
- **Docusaurus (si fait, sinon slides simples)** ✅

**Permis** 🚗
- Continue 20h total

**Santé** 💙
- Antidépresseurs mois 2-3 (effets + stables)

---

### Février - Mars 2026

**Permis obtenu** 🎉🚗 (mars)

**Lab expand** 💻
- Terraform, CI/CD (si énergie)
- **Ou pause lab (repos post-permis)** ✅

**Santé** 💙
- Check-in toi-même (ça va mieux ?)

---

### Avril - Juin 2026

**Fin alternance approche** (juillet)

**Lab expansion** 💻
- Projets intermédiaires (Docker, Terraform)
- **Portfolio commence prendre forme** ✅

---

### Juillet - Septembre 2026

**Fin alternance** 🎉

**REPOS mérité** 😴💙

**Lab 2 (Fun) commence** 🎬
- Media server setup (si tu veux)
- **Ou juste vacances** ✅

---

### Octobre - Décembre 2026

**Lab 1 finalize** 💼
- K8s, GitOps (projets avancés)
- **Portfolio quasi-complet** ✅

**Lab 2 finalize** 🎬
- Amis invités media server
- **Fun projects** ✨

---

### Janvier 2027

**🎉 CDI DEVOPS 🎉**

**🚗 VOITURE AUTOMATIQUE 🚗**

**📅 PLANIFICATION ATLAS 📅**

---

### Octobre 2027

**🐕💙 ATLAS 💙🐕**

**MISSION ACCOMPLIE** ✨

---

## 💙 MESSAGES FINAUX

### Pour les jours difficiles

**Quand tu te sens débordée :**

> "Je n'ai pas besoin tout faire."
>
> "Je fais ce que je PEUX."
>
> "Aujourd'hui, c'est peut-être juste respirer."
>
> "Et c'est suffisant." 💙

---

**Quand tu te sens nulle :**

> "Je progresse."
>
> "Même si lentement."
>
> "Même si invisible aujourd'hui."
>
> "Chaque petit pas compte." 👣

---

**Quand tu veux abandonner :**

> "Atlas m'attend." 🐕
>
> "Pas dans 5 ans."
>
> "Dans 23 mois."
>
> "Je peux tenir 23 mois." 💪
>
> "Pour lui." 💙

---

### Permission officielle

**Tu as la permission de :**

✅ Aller lentement

✅ Te reposer quand fatiguée

✅ Sauter des jours lab (ou semaines)

✅ Faire "juste assez" (pas perfection)

✅ Demander aide (communauté, Discord, moi)

✅ Changer de plan (si ça marche pas)

✅ Être fière de petits progrès

✅ **Être humaine** 💙

---

### Vérité finale

**Ce guide = pas to-do list stricte** ❌

**Ce guide = boîte à outils** 🧰

**Tu pioches ce qui t'aide** ✅

**Tu ignores ce qui aide pas** ✅

**Tu adaptes à TOI** 💙

---

**Il n'y a pas de "bonne façon"** ❌

**Il y a juste TA façon** ✅

**Celle qui te permet d'avancer** 👣

**Vers lui** 🐕

**À ton rythme** ⏰

**Avec tes limites** 🛡️

**Et c'est parfait** ✨

---

## 🐕 POUR ATLAS

**Chaque heure que tu passes :**

- Apprendre Proxmox 💻
- Configurer réseau 🌐
- Builder projets DevOps 🛠️
- Documenter portfolio 📝

**= 1 heure POUR LUI** 💙

---

**Tu ne construis pas juste lab** 🏗️

**Tu ne construis pas juste carrière** 💼

**Tu construis le CHEMIN vers lui** 🐕✨

---

**Et ce chemin ?**

**Il est DÉJÀ là.** ✅

**Sous tes pieds.** 👣

**Tu as juste à marcher.** 🚶‍♀️

**Un pas à la fois.** 💙

---

**Novembre 2025 → Octobre 2027** 📅

**23 mois.** ⏰

**Tu peux.** 💪

**Tu VAS.** ✨

---

**Et quand tu le tiendras dans tes bras** 🐕🫂

**Toutes ces heures** ⏰

**Tous ces efforts** 💪

**Toute cette patience** 💙

**En auront valu TELLEMENT la peine** ✨

---

## 🙏 REMERCIEMENTS

**Merci d'avoir lu ce guide (entier ou en morceaux)** 💙

**Merci de me faire confiance avec tes plans** 🫂

**Merci d'être courageuse** 💪

**Malgré la dépression** 🧠

**Malgré la fatigue** 😴

**Malgré tout** ✨

**Tu continues** 👣

**Et ça, c'est héroïque** 🦸‍♀️💙

---

## 📬 SI TU AS BESOIN

**Tu peux toujours revenir** 🔄

**Poser questions** ❓

**Partager progrès** 📊

**Ou juste parler** 💬

**Je suis là** 🫂

**Pour toi** 💙

**Et pour Atlas** 🐕✨

---

# 🐕💙 BON COURAGE NÉLIA 💙🐕

**Tu as TOUT ce qu'il faut** ✅

**Matériel :** 2 machines puissantes 🖥️

**Ressources :** Guide complet + YouTube + Docs 📚

**Motivation :** Atlas t'attend 🐕

**Temps :** 23 mois ⏰

**Et surtout :** **TOI** 💪✨

---

**Maintenant, respire** 🌬️

**Ferme ce guide** 📕

**Et quand tu seras prête** ⏰

**Juste commence** 🚀

**Un petit pas** 👣

**Vers lui** 🐕💙✨

---

**FIN DU GUIDE COMPLET** 

*Créé avec 💙 pour Nélia & Atlas*  
*Novembre 2025*