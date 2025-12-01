---
slug: olympus-lab-setup
title: 🏛️ Olympus Lab - Infrastructure complète opérationnelle
authors: nelia
tags: [infrastructure, proxmox, opnsense, cloudflare, homelab, devops]
date: 2025-12-01T13:00:00Z
---

# 🏛️ Olympus Lab - L'infrastructure est prête !

Aujourd'hui marque l'achèvement de l'infrastructure **Olympus Lab**, mon homelab DevOps personnel. Après plusieurs semaines de travail, j'ai enfin une plateforme complète pour apprendre et expérimenter en toute sécurité.


<!--truncate-->

## 🎯 Le contexte

Je suis actuellement en alternance chez ARPEGE à Nantes en tant qu'étudiante DevOps (TSSR à l'ESGI). Mon apprentissage se concentre sur :
- Ansible pour l'automatisation
- GitLab CI/CD pour les pipelines
- Docker & Kubernetes pour la conteneurisation
- Oracle Cloud Infrastructure pour le déploiement

Mais pour vraiment maîtriser ces technologies, j'avais besoin d'un environnement où je peux **casser, reconstruire, expérimenter** sans limites. D'où **Olympus Lab** ! 🏛️

## 🏗️ Architecture finale

### Le setup physique

**Machine** : Lenovo ThinkCentre M710S
- CPU : Intel i5 (suffisant pour commencer)
- RAM : 16 GB (à upgrader plus tard)
- Stockage : SSD pour l'OS, HDD pour les VMs
- Réseau : 1 Gbps vers la box Internet

### Les composants logiciels

#### 1. **Proxmox VE** (Atlas dans ma nomenclature)

L'hyperviseur qui fait tourner tout le reste. J'ai configuré 5 bridges réseau :
- `vmbr0` : WAN (192.168.1.0/24) - Connexion Internet
- `vmbr1` : LAN (10.0.1.0/24) - Production
- `vmbr2` : DMZ (10.0.2.0/24) - Services exposés
- `vmbr3` : DEV (10.0.3.0/24) - Environnement de test
- `vmbr4` : MGMT (10.0.4.0/24) - Administration

#### 2. **OPNsense** (Olympus - VM 100)

Le firewall FreeBSD qui gère toute la segmentation réseau. Configuration :
- 5 interfaces réseau (1 par bridge)
- Règles firewall strictes avec isolation complète
- DHCP sur chaque réseau
- DNS forwarding vers Cloudflare (1.1.1.1)

#### 3. **Cloudflare Tunnel** (Hermes - Container 202)

Le messager qui me permet d'accéder à mon homelab depuis n'importe où. Ubuntu 24.04 LXC avec `cloudflared` :
- 256 MB RAM (ultra léger)
- Tunnel chiffré vers Cloudflare Edge
- Zéro port ouvert sur ma box Internet
- Authentification Zero Trust avec Cloudflare Access

## 🌐 Segmentation réseau

Le point le plus important : **l'isolation des réseaux**.
```
┌─────────────────────────────────────────────┐
│              Internet                        │
└──────────────────┬──────────────────────────┘
                   │ WAN (192.168.1.0/24)
            ┌──────▼──────┐
            │  OPNsense   │ ← Firewall central
            │  (Olympus)  │
            └──────┬──────┘
       ┌───────────┼───────────┬─────────┐
       │           │           │         │
   ┌───▼───┐   ┌──▼──┐    ┌───▼──┐  ┌──▼───┐
   │  LAN  │   │ DMZ │    │ DEV  │  │ MGMT │
   │ Prod  │   │ Web │    │ Test │  │Admin │
   └───────┘   └─────┘    └──────┘  └──────┘
```

### Les règles qui changent tout

**LAN** (Production) :
- ✅ Accès Internet
- ✅ Communication interne au LAN
- ❌ Accès aux autres réseaux (DMZ, DEV, MGMT)

**DMZ** (Services exposés) :
- ✅ Accès Internet uniquement
- ❌ **Aucun accès** aux réseaux internes

**DEV** (Développement) :
- ✅ Accès Internet uniquement
- ❌ **Aucun accès** aux réseaux internes

**MGMT** (Administration) :
- ✅ **Accès partout** (pour gérer l'infrastructure)

**Pourquoi c'est important ?** Si je fais une erreur en DEV ou si un service en DMZ est compromis, l'attaquant ne peut **pas** rebondir vers la production. C'est le principe de **Defense in Depth**.

## 🔒 Sécurité multi-couches

### Couche 1 : Cloudflare Edge
- Protection DDoS automatique
- WAF (Web Application Firewall)
- Filtrage géographique possible

### Couche 2 : Cloudflare Access (Zero Trust)
- Authentification obligatoire par email
- Code OTP à usage unique
- Logs d'audit de toutes les connexions
- Session limitée à 24h

### Couche 3 : Cloudflare Tunnel
- Connexion chiffrée sortante uniquement
- Aucun port ouvert sur ma box
- IP publique cachée
- Impossible de scanner mon réseau depuis Internet

### Couche 4 : OPNsense Firewall
- Firewall stateful (pf de FreeBSD)
- Default Deny : tout bloqué par défaut
- Règles granulaires par réseau
- Logs de toutes les tentatives bloquées

### Couche 5 : Services individuels
- 2FA sur Proxmox (TOTP)
- 2FA sur OPNsense (Google Authenticator)
- Mots de passe forts (20+ caractères)
- Clés SSH pour l'authentification

## ☁️ Accès distant sans port forwarding

Le gros challenge : comment accéder à mon homelab depuis chez mes parents en décembre ?

**Solution classique** : Port forwarding (ouvrir le port 51820 pour WireGuard)
- ❌ Port ouvert = surface d'attaque
- ❌ IP publique exposée
- ❌ Risque de scan et brute force

**Ma solution** : Cloudflare Tunnel
- ✅ Connexion sortante uniquement (aucun port ouvert)
- ✅ IP publique masquée
- ✅ Authentification obligatoire
- ✅ Gratuit !

### Services accessibles

J'ai configuré trois points d'accès via Cloudflare Tunnel :
- **Interface de virtualisation** : Gestion des VMs et containers
- **Interface du firewall** : Configuration des règles réseau
- **Accès SSH** : Administration en ligne de commande

Tous protégés par Cloudflare Access avec authentification obligatoire (email + code OTP).

Exemple d'utilisation SSH :
```bash
# Sur mon laptop, n'importe où dans le monde
ssh homelab-ssh

# Cloudflare ouvre le navigateur pour l'authentification
# Code OTP par email
# Connexion établie ✅
```

**Note de sécurité** : Les URLs exactes ne sont pas publiées publiquement. 
Prochaine étape : Activation du 2FA sur tous les services (en cours).

## 📚 Documentation complète

Tout est documenté sur [docs.olympus-lab.org](https://docs.olympus-lab.org) avec Docusaurus :

- **Architecture** : Vue d'ensemble, diagrammes réseau
- **Proxmox** : Configuration, bridges, VMs, containers
- **OPNsense** : Firewall, règles détaillées, DHCP, NAT
- **Cloudflare Tunnel** : Setup, configuration, troubleshooting
- **Sécurité** : Règles firewall expliquées, threat model
- **Procédures** : Accès distant, maintenance, backups

La doc est hébergée sur GitHub Pages avec déploiement automatique via GitHub Actions. Chaque `git push` met à jour le site.

## 🛠️ Les galères et apprentissages

### Problème 1 : Changement de hostname Proxmox

J'ai voulu renommer `fox-factory` en `atlas` (nomenclature mythologique grecque). **Grosse erreur** ! Proxmox garde les références au nom original dans `/etc/pve/`, qui est un filesystem cluster spécial.

**Résultat** : Tous mes containers et VMs ont disparu de l'interface ! 😱

**Solution** : Revenir à `fox-factory` en interne, utiliser `atlas` uniquement dans la doc publique. Leçon apprise : **ne jamais renommer un node Proxmox en production**.

### Problème 2 : Container Cloudflare Tunnel perdu

Lors des tentatives de renommage, le disque du container 202 a été supprimé. Heureusement, **j'avais un backup** du dossier `/etc/cloudflared/` !

**Solution** : Recréer le container from scratch, restaurer la config. 10 minutes et c'était reparti. **Les backups sauvent des vies** ! 💾

### Problème 3 : Tailscale subnet routing

J'ai essayé Tailscale pour l'accès distant. Installation ultra simple, mais le **subnet routing** ne fonctionnait pas : impossible d'accéder à OPNsense (10.0.1.1) depuis mon laptop.

**Pourquoi ?** Tailscale donne accès au réseau de la machine où il est installé (192.168.1.x), pas aux réseaux virtuels internes (10.0.x.x).

**Solution** : Passer à Cloudflare Tunnel qui est conçu pour exposer des services internes, pas pour créer un VPN mesh.

### Problème 4 : Certificats SSL auto-signés

Proxmox et OPNsense utilisent des certificats auto-signés. Les navigateurs affichent des warnings.

**Solution temporaire** : Accepter le risque (je sais que c'est mon propre serveur).

**Solution future** : Générer des vrais certificats Let's Encrypt via Cloudflare DNS challenge ou ACME.

## 📊 Stack technique complète

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Hyperviseur | Proxmox VE | 8.x |
| Firewall | OPNsense | 24.7 |
| Tunnel | Cloudflare Tunnel | Latest |
| OS Containers | Ubuntu | 24.04 LTS |
| Documentation | Docusaurus | 3.x |
| Hosting Doc | GitHub Pages | - |
| Domaine | Cloudflare | olympus-lab.org |
| DNS | Cloudflare | 1.1.1.1 |

**Coût total** : ~12€/an (juste le domaine, tout le reste est gratuit !)

## 🚀 Prochaines étapes

### Décembre 2025 (chez mes parents)
- [ ] Tester l'accès distant en conditions réelles
- [ ] Commencer Python (Automate the Boring Stuff)
- [ ] Continuer Practical Networking (cours en ligne)
- [ ] Expérimenter dans le réseau DEV

### Janvier 2026 (retour à Nantes)
- [ ] Déployer **GitLab CE** en LAN pour le CI/CD
- [ ] Installer **Pi-hole** pour le DNS local + blocage pub
- [ ] Setup **Prometheus + Grafana** pour le monitoring
- [ ] Configurer les **backups automatiques** (Proxmox Backup Server ?)

### Q1 2026
- [ ] Apprendre **WireGuard** (dans des VMs de test)
- [ ] Déployer un cluster **K3s** en DEV
- [ ] Automatiser avec **Ansible** (playbooks pour tout)
- [ ] Ajouter un deuxième node Proxmox (si budget)

### Long terme
- [ ] Certifications : AWS, Azure, Kubernetes
- [ ] Contribuer à des projets open source
- [ ] Documenter et partager mes apprentissages

## 💭 Réflexions

### Ce que j'ai appris

**Networking** : Avant ce projet, les VLANs et la segmentation réseau étaient abstraits. Maintenant, je **comprends** vraiment comment fonctionne un firewall, le NAT, le routing, les ACLs. J'ai cassé des choses, debuggé pendant des heures, et c'est comme ça qu'on apprend vraiment.

**Sécurité** : Le principe de **Defense in Depth** n'est pas juste théorique. Chaque couche compte. Si j'avais juste fait du port forwarding basique, j'aurais un point d'entrée unique. Maintenant, pour atteindre mes services, il faut :
1. Passer Cloudflare Edge (DDoS protection)
2. S'authentifier via Access (email + OTP)
3. Traverser le tunnel chiffré
4. Passer le firewall OPNsense
5. S'authentifier sur le service final

**Infrastructure as Code** : Documenter tout dans Docusaurus me force à comprendre ce que je fais. Si je ne peux pas l'expliquer clairement dans la doc, c'est que je ne le comprends pas vraiment. La doc devient aussi un **backup de ma connaissance**.

**Échecs = Apprentissage** : J'ai cassé mon infrastructure plusieurs fois. Chaque fois, j'ai appris :
- L'importance des backups
- Comment débugger méthodiquement
- La valeur de la documentation
- Qu'il faut tester avant de modifier la prod

### Pourquoi un homelab en 2025 ?

Certains diraient : "Pourquoi ne pas juste utiliser AWS ou Azure ?"

**Ma réponse** :
- Je veux comprendre **comment ça marche en dessous**
- Les clouds abstraient trop de choses
- Un homelab, c'est **gratuit** (après l'investissement initial)
- Je peux casser sans craindre une facture de 500€
- C'est **mon** labo, mes règles, mes expérimentations

En alternance, je travaille sur Oracle Cloud et GitLab. Mais dans mon homelab, je peux tout essayer : k3s, Ansible, Terraform, Prometheus, sans limite.

## 🎓 Pour les débutants qui lisent ça

Si tu débutes en DevOps et que tu veux créer ton homelab :

### Commence petit
- Une seule VM suffit au début
- Pas besoin de segmentation réseau complexe
- Apprends Proxmox ou VirtualBox d'abord

### Documente tout
- Prends des notes
- Capture des screenshots
- Écris les commandes que tu utilises
- Future toi te remerciera

### Casse des choses
- Les erreurs sont tes meilleures profs
- Fais des snapshots avant de modifier
- Teste dans un environnement isolé (DEV)

### Apprends les bases
- **Networking** : Comprends IP, subnets, routing, NAT
- **Linux** : CLI, permissions, services systemd
- **Virtualisation** : Concepts de VMs, containers, hyperviseurs

### Sécurité d'abord
- Jamais de port forwarding sans réfléchir
- Toujours des mots de passe forts
- 2FA partout où c'est possible
- Backups réguliers

## 📈 Métriques

Depuis le début du projet :

- **Temps investi** : ~40 heures (configuration, debug, doc)
- **Erreurs commises** : Trop pour compter (c'est ça apprendre !)
- **Services déployés** : 3 (Proxmox, OPNsense, Cloudflare Tunnel)
- **Lignes de doc** : ~3000 (7 fichiers Markdown)
- **Commits Git** : 15+
- **Café consommé** : Beaucoup ☕

## 🌸 Nomenclature mythologique

Parce que DevOps, c'est aussi s'amuser :

- **Atlas** : Proxmox node (le titan qui porte l'infrastructure)
- **Olympus** : OPNsense (le mont Olympe, centre de contrôle)
- **Hermes** : Cloudflare Tunnel (le messager des dieux)

Prochains services :
- **Hephaestus** : GitLab (la forge de code)
- **Prometheus** : Monitoring (approprié !)
- **Apollo** : CI/CD pipeline
- **Artemis** : Backup system
- **Poseidon** : Storage server

Logo : 🌸 Hanami (fleur de cerisier) + 🌙 Lune = esthétique japonaise + mythologie grecque.

## 🎉 Conclusion

**Olympus Lab est maintenant opérationnel** ! Je peux :
- ✅ Créer des VMs et containers à volonté
- ✅ Expérimenter en toute sécurité
- ✅ Accéder depuis n'importe où
- ✅ Apprendre en cassant et réparant
- ✅ Documenter mes apprentissages

La prochaine fois que quelqu'un me demandera "C'est quoi DevOps ?", je pourrai montrer mon homelab et dire : **"C'est ça. Et c'est moi qui l'ai construit."** 💪

Rendez-vous dans le prochain article pour le déploiement de GitLab ! 🚀

---

**Stack** : Proxmox VE • OPNsense • Cloudflare Tunnel • Ubuntu 24.04 • Docusaurus

**Tags** : #DevOps #Homelab #Infrastructure #Networking #Security #Learning

**Documentation** : [docs.olympus-lab.org](https://docs.olympus-lab.org)