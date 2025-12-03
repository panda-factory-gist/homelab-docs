---
slug: docker-services-deployment
title: 🐳 Déploiement de services Docker avec Dockge
authors: nelia
tags: [docker, nextcloud, monitoring, dockge, containers]
date: 2025-12-02T23:00:00Z
---

# 🐳 Déploiement de services Docker - Jour 2

Aujourd'hui, j'ai déployé mes premiers services en production sur Olympus Lab en utilisant Docker et Dockge. L'objectif : apprendre Docker en pratique, pas en regardant des cours !

<!--truncate-->

## 🎯 Objectifs du jour

- Déployer Dockge pour gérer les containers Docker
- Installer Uptime Kuma pour le monitoring
- Déployer Nextcloud comme cloud personnel
- Apprendre Docker Compose en pratique

---

## 📦 Services déployés

### 1. Dockge (Gestion Docker)

**Pourquoi** : Interface web pour gérer les stacks Docker Compose

**Configuration** :
```yaml
services:
  dockge:
    image: louislam/dockge:latest
    container_name: dockge
    restart: unless-stopped
    ports:
      - "5001:5001"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
      - ./stacks:/opt/stacks
    environment:
      - DOCKGE_STACKS_DIR=/opt/stacks
```

**Accès** : https://dockge.[domain].org (protégé par Cloudflare Access)

**Avantages** :
- Interface graphique pour déployer des stacks
- Logs en temps réel
- Start/Stop/Restart en un clic
- Édition de docker-compose.yml directement

---

### 2. Uptime Kuma (Monitoring)

**Pourquoi** : Surveillance 24/7 de tous les services

**Configuration** :
```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    container_name: uptime-kuma
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - uptime-kuma:/app/data

volumes:
  uptime-kuma:
```

**Accès** : https://uptime.[domain].org

**Services monitorés** :
- Proxmox
- OPNsense
- Dockge
- Nextcloud
- Documentation

**Alertes** : Bot Discord "Iris" (🌈) pour notifications en temps réel

---

### 3. Nextcloud (Cloud personnel)

**Pourquoi** : Partage de fichiers entre tous mes appareils (PC, laptop, téléphone)

**Architecture** :
- Nextcloud (application)
- PostgreSQL (base de données)
- Redis (cache)

**Configuration** :
```yaml
services:
  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: unless-stopped
    ports:
      - "8083:80"
    environment:
      - POSTGRES_HOST=db
      - POSTGRES_DB=nextcloud
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=[mot-de-passe-fort]
      - REDIS_HOST=redis
      - NEXTCLOUD_TRUSTED_DOMAINS=[domain].org [IP-locale]
      - TRUSTED_PROXIES=172.16.0.0/12
      - OVERWRITEPROTOCOL=https
      - OVERWRITEHOST=[domain].org
    volumes:
      - nextcloud_data:/var/www/html
    depends_on:
      - db
      - redis
    networks:
      - nextcloud_net

  db:
    image: postgres:16-alpine
    container_name: nextcloud-db
    restart: unless-stopped
    environment:
      - POSTGRES_DB=nextcloud
      - POSTGRES_USER=nextcloud
      - POSTGRES_PASSWORD=[mot-de-passe-fort]
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - nextcloud_net

  redis:
    image: redis:alpine
    container_name: nextcloud-redis
    restart: unless-stopped
    networks:
      - nextcloud_net

volumes:
  nextcloud_data:
  db_data:

networks:
  nextcloud_net:
```

**Accès** : https://nextcloud.[domain].org

**Fonctionnalités** :
- Synchronisation automatique (desktop + mobile)
- Partage de fichiers
- Calendrier & Contacts
- Notes collaboratives

---

## 🔧 Configuration Cloudflare Tunnel

### Mise à jour du tunnel (Hermes)

**Fichier** : `/etc/cloudflared/config.yml`
```yaml
tunnel: [tunnel-id]
credentials-file: /etc/cloudflared/[tunnel-id].json

ingress:
  # Services existants
  - hostname: opnsense.[domain].org
    service: https://10.0.1.1
    originServerName: 10.0.1.1
    originRequest:
      noTLSVerify: true
  
  - hostname: proxmox.[domain].org
    service: https://192.168.1.51:8006
    originRequest:
      noTLSVerify: true
  
  - hostname: ssh-proxmox.[domain].org
    service: ssh://192.168.1.51:22
  
  - hostname: ssh-docker.[domain].org
    service: ssh://10.0.1.102:22
  
  # Nouveaux services Docker
  - hostname: dockge.[domain].org
    service: http://10.0.1.102:5001
  
  - hostname: uptime.[domain].org
    service: http://10.0.1.102:3001
  
  - hostname: nextcloud.[domain].org
    service: http://10.0.1.102:8083
  
  # Catch-all
  - service: http_status:404
```

**Redémarrage** :
```bash
systemctl restart cloudflared
journalctl -u cloudflared -f
```

---

## 🔐 Sécurité

### Cloudflare Access (Zero Trust)

**Applications configurées** :

| Service | URL | Policy | Session |
|---------|-----|--------|---------|
| Dockge | dockge.[domain].org | Email + OTP | 24h |
| Uptime Kuma | uptime.[domain].org | Email + OTP | 24h |
| Nextcloud | nextcloud.[domain].org | Email + OTP | 24h |

**Protection multi-couches** :
1. Cloudflare Edge (DDoS, WAF)
2. Cloudflare Access (authentification email + OTP)
3. Cloudflare Tunnel (zéro port ouvert)
4. Firewall OPNsense (règles granulaires)
5. Authentification service (login/password)

### Isolation réseau

**VM Docker** : Réseau LAN (10.0.1.0/24)
- ✅ Accès Internet
- ✅ Communication interne LAN
- ❌ Pas d'accès DMZ, DEV, MGMT

**Containers Docker** : Réseau bridge isolé (172.x.x.x/12)
- Communication entre containers de la même stack uniquement
- Pas d'accès direct aux autres containers

---

## 📚 Apprentissage Docker

### Ce que j'ai appris en pratique

#### 1. Docker Compose - Structure

**Services** : Liste des containers à créer
```yaml
services:
  mon-app:
    image: ...
    ports: ...
    volumes: ...
```

#### 2. Images Docker
```yaml
image: nextcloud:latest
```
- `nextcloud` = nom de l'image
- `:latest` = tag (version)

**Alternatives** :
- `:1.23.11` = version spécifique (plus stable)
- `:alpine` = version légère

#### 3. Ports
```yaml
ports:
  - "8083:80"
```
- `8083` = port sur la VM (externe)
- `80` = port dans le container (interne)

**Utilisation** : `http://10.0.1.102:8083` pointe vers le port 80 du container

#### 4. Volumes (persistance des données)

**Volumes nommés** :
```yaml
volumes:
  - nextcloud_data:/var/www/html

volumes:
  nextcloud_data:  # Déclaration
```
- Géré par Docker
- Stocké dans `/var/lib/docker/volumes/`
- Persiste même si container supprimé

**Bind mounts** :
```yaml
volumes:
  - ./data:/app/data
```
- Dossier local monté directement
- Fichiers visibles sur la VM
- Modifiable à chaud

#### 5. Networks (communication inter-containers)
```yaml
networks:
  - nextcloud_net

networks:
  nextcloud_net:  # Déclaration
```

**Utilité** : Les containers sur le même network peuvent communiquer par nom
- `nextcloud` peut joindre `db` directement
- `POSTGRES_HOST=db` fonctionne

#### 6. Environment variables
```yaml
environment:
  - POSTGRES_PASSWORD=secure123
  - POSTGRES_HOST=db
```

**Configuration sans rebuild** : Change le comportement du container

#### 7. Depends_on (ordre de démarrage)
```yaml
depends_on:
  - db
  - redis
```

**Utilité** : Nextcloud démarre APRÈS PostgreSQL et Redis

#### 8. Restart policies
```yaml
restart: unless-stopped
```

**Options** :
- `no` : Ne jamais redémarrer
- `always` : Toujours redémarrer (même si arrêté manuellement)
- `unless-stopped` : Redémarrer sauf si arrêté volontairement
- `on-failure` : Redémarrer seulement si erreur

---

## 🐛 Problèmes rencontrés et solutions

### Problème 1 : Cache navigateur

**Symptôme** : "Unable to find your Access application"
**Cause** : Cache SSL du navigateur
**Solution** : Navigation privée ou vider le cache (Ctrl+Shift+Delete)

### Problème 2 : PostgreSQL sans mot de passe

**Symptôme** : `POSTGRES_PASSWORD is not specified`
**Cause** : Variable d'environnement mal formatée
**Solution** : Utiliser `- POSTGRES_PASSWORD=xxx` (avec le tiret)

### Problème 3 : Nextcloud ne peut pas joindre "db"

**Symptôme** : `could not translate host name "db"`
**Cause** : Containers pas sur le même réseau Docker
**Solution** : Vérifier la section `networks` dans docker-compose.yml

### Problème 4 : Configuration Nextcloud protégée

**Symptôme** : `Configuration was not read or initialized correctly`
**Cause** : Tentative de réinstallation avec données existantes
**Solution** : `docker compose down -v` pour supprimer les volumes

---

## 📊 Architecture finale
```
Internet
    ↓
Cloudflare Edge (DDoS, WAF)
    ↓
Cloudflare Access (Email + OTP)
    ↓
Cloudflare Tunnel (Hermes CT-202)
    ↓
VM Docker (10.0.1.102)
    ↓
    ├─→ Dockge :5001
    ├─→ Uptime Kuma :3001
    └─→ Nextcloud Stack
        ├─→ nextcloud :80
        ├─→ postgres :5432
        └─→ redis :6379
```

---

## 🎯 Prochaines étapes

### Cette semaine
- [ ] Installer app Nextcloud sur tous les appareils
- [ ] Préparer projet Docker Compose pour l'école
- [ ] Activer 2FA sur OPNsense et Proxmox

### Décembre 2025
- [ ] Python (Automate the Boring Stuff)
- [ ] Networking (Practical Networking)
- [ ] Utiliser Nextcloud en mobilité

### Janvier 2026
- [ ] GitLab CE ou Gitea (hébergement code)
- [ ] Prometheus + Grafana (monitoring avancé)
- [ ] Pi-hole (DNS + blocage pub)

---

## 💭 Réflexions

### L'apprentissage par la pratique

J'ai réalisé aujourd'hui que **je n'aime pas les cours théoriques**, j'aime **FAIRE**.

**Avant** : "Docker c'est compliqué, il faut apprendre toutes les commandes"
**Maintenant** : "Docker c'est juste un outil, on l'utilise quand on en a besoin"

**La différence** :
- ❌ Cours Udemy : 20h de vidéos théoriques → Ennui → Oubli
- ✅ Projet concret : "Je veux Nextcloud" → Docker Compose → Déploiement → Apprentissage réel

### Ce que j'ai vraiment appris

- 🐳 **Docker Compose** : Services, volumes, networks, environment
- 🔧 **Debugging** : Lire les logs, comprendre les erreurs, tester
- 🌐 **Networking** : Communication inter-containers, isolation
- 🎯 **Méthodologie** : Déployer, casser, réparer, documenter

**Et tout ça en UNE journée** parce que j'avais un **objectif concret** : avoir un cloud perso.

### Pour les débutants

Si tu débutes en Docker :
1. **Ne regarde PAS 20h de cours**
2. **Choisis UN service** que tu veux déployer
3. **Trouve un docker-compose.yml**
4. **Déploie-le**
5. **Casse-le**
6. **Comprends pourquoi**
7. **Répare-le**
8. **Répète**

Tu apprendras **10x plus vite** qu'en regardant des cours.

---

## 📈 Statistiques

**Temps investi** : ~6 heures
- Déploiement Dockge : 30 min
- Déploiement Uptime Kuma : 45 min
- Configuration Iris (Discord) : 15 min
- Déploiement Nextcloud : 3h (debug inclus)
- Documentation : 1h

**Services déployés** : 3 stacks (6 containers)
**Problèmes résolus** : 4 (cache, PostgreSQL, réseau, config)
**Lignes de YAML écrites** : ~150
**Café consommé** : Beaucoup ☕

---

## 🔗 Ressources

**Documentation** :
- Docker Compose : https://docs.docker.com/compose/
- Nextcloud : https://hub.docker.com/_/nextcloud
- Dockge : https://github.com/louislam/dockge
- Uptime Kuma : https://github.com/louislam/uptime-kuma

**Mon infrastructure** :
- Documentation : https://docs.[domain].org
- Monitoring : https://uptime.[domain].org

---

**Stack** : Docker • Docker Compose • Dockge • Nextcloud • PostgreSQL • Redis • Uptime Kuma

**Tags** : #Docker #Containers #Nextcloud #Cloud #DevOps #Learning