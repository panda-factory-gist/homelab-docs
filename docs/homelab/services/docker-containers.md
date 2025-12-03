---
sidebar_position: 1
---

# 🐳 Docker Containers

Tous les services déployés via Docker sur la VM Docker (10.0.1.102).

## 📦 VM Docker

**Spécifications** :
- **Hostname** : docker-host
- **OS** : Ubuntu 24.04 LTS
- **IP** : 10.0.1.102
- **RAM** : [à remplir] GB
- **CPU** : [à remplir] cores
- **Réseau** : LAN (vmbr1)

**Gestion** :
- Interface : Dockge (https: //dockge.[domain].org)
- Accès SSH : `ssh docker-admin@10.0.1.102`

---

## 🎛️ Dockge (Gestion Docker)

**Fonction** : Interface web pour gérer les stacks Docker Compose

### Configuration
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

### Accès

- **URL** : https: //dockge.[domain].org
- **Protection** : Cloudflare Access
- **Credentials** : [stocker dans gestionnaire de mots de passe]

### Utilisation

**Déployer une stack** :
1. `+ Compose`
2. Nom de la stack
3. Coller le `docker-compose.yml`
4. `Deploy`

**Gérer une stack** :
- Start/Stop/Restart
- Edit (modifier le compose)
- Logs en temps réel
- Terminal

---

## 📊 Uptime Kuma (Monitoring léger)

**Fonction** : Surveillance HTTP/HTTPS des services

### Configuration
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

### Accès

- **URL** : https: //uptime.[domain].org
- **Bot Discord** : Iris 🌈
- **Webhook** : [stocker séparément]

### Services monitorés

| Service | URL | Intervalle |
|---------|-----|------------|
| Proxmox | https: //proxmox.[domain].org | 60s |
| OPNsense | https: //opnsense.[domain].org | 60s |
| Dockge | https: //dockge.[domain].org | 60s |
| Nextcloud | https: //nextcloud.[domain].org | 60s |
| Documentation | https: //docs.[domain].org | 300s |

### Alertes Discord

**Configuration** :
- Notification Type : Discord
- Webhook URL : [webhook Iris]
- Trigger : Down, Error

**Messages** :
- 🟢 `Iris: [Service] is back online`
- 🔴 `Iris: [Service] is DOWN!`
- 🟡 `Iris: [Service] response time: XXXXms (slow)`

---

## ☁️ Nextcloud (Cloud personnel)

**Fonction** : Synchronisation de fichiers entre appareils

### Architecture

- **nextcloud** : Application web
- **nextcloud-db** : PostgreSQL 16
- **nextcloud-redis** : Cache Redis

### Configuration
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
      - POSTGRES_PASSWORD=[mot-de-passe]
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
      - POSTGRES_PASSWORD=[mot-de-passe]
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

### Accès

- **URL Web** : https: //nextcloud.[domain].org
- **WebDAV** : https: //nextcloud.[domain].org/remote.php/dav/
- **Admin** : admin / [mot-de-passe]

### Clients

**Desktop** :
- Windows : https: //nextcloud.com/install/#install-clients
- Configuration : Server URL + credentials

**Mobile** :
- Android/iOS : App "Nextcloud" officielle
- Auto-upload photos : Activable

### Apps installées

- [ ] Files (par défaut)
- [ ] Calendar
- [ ] Contacts
- [ ] Notes
- [ ] Collabora Online (édition documents)
- [ ] Photos

### Maintenance

**Backup** :
```bash
# Arrêter Nextcloud
docker compose -f ~/stacks/nextcloud/docker-compose.yml down

# Backup volumes
sudo tar czf nextcloud-backup-$(date +%Y%m%d).tar.gz \
  /var/lib/docker/volumes/nextcloud_nextcloud_data \
  /var/lib/docker/volumes/nextcloud_db_data

# Redémarrer
docker compose -f ~/stacks/nextcloud/docker-compose.yml up -d
```

---

## 📋 Stack template (à venir)

### GitLab CE / Gitea

**Fonction** : Hébergement Git + CI/CD

**Décision** : Gitea (plus léger) ou GitLab CE (plus complet)

**Ressources** :
- Gitea : ~500 MB RAM
- GitLab CE : ~4 GB RAM

### Prometheus + Grafana

**Fonction** : Monitoring avancé avec métriques

**Voir** : [Monitoring](/docs/homelab/services/monitoring)

### Pi-hole

**Fonction** : DNS + blocage publicités

**Prérequis** : Configuration OPNsense pour utiliser Pi-hole comme DNS

---

## 🔧 Commandes utiles

### Docker général
```bash
# Lister tous les containers
docker ps -a

# Voir les logs d'un container
docker logs [container-name] -f

# Entrer dans un container
docker exec -it [container-name] bash

# Redémarrer un container
docker restart [container-name]

# Voir les ressources utilisées
docker stats

# Nettoyer les images inutilisées
docker system prune -a
```

### Docker Compose
```bash
# Démarrer une stack
docker compose up -d

# Arrêter une stack
docker compose down

# Redémarrer une stack
docker compose restart

# Voir les logs
docker compose logs -f

# Rebuild une stack
docker compose up -d --build
```

### Docker Volumes
```bash
# Lister les volumes
docker volume ls

# Inspecter un volume
docker volume inspect [volume-name]

# Supprimer un volume
docker volume rm [volume-name]

# Nettoyer les volumes inutilisés
docker volume prune
```

### Docker Networks
```bash
# Lister les réseaux
docker network ls

# Inspecter un réseau
docker network inspect [network-name]

# Voir les containers sur un réseau
docker network inspect [network-name] | grep Name
```

---

## 🐛 Troubleshooting

### Container ne démarre pas
```bash
# Voir les logs détaillés
docker logs [container-name] --tail 100

# Vérifier la config
docker inspect [container-name]

# Tester manuellement
docker run -it [image-name] sh
```

### Problème de réseau entre containers
```bash
# Vérifier que les containers sont sur le même network
docker network inspect [network-name]

# Tester la connectivité
docker exec [container1] ping [container2]
```

### Volume plein
```bash
# Voir l'espace disque
df -h

# Voir l'espace des volumes Docker
docker system df

# Nettoyer
docker system prune -a --volumes
```

### Performances dégradées
```bash
# Voir les ressources en temps réel
docker stats

# Limiter les ressources d'un container
docker update --memory="512m" --cpus="1.0" [container-name]
```

---

## 📊 Monitoring des ressources

### Via Dockge

Interface → Stack → Voir CPU/RAM en temps réel

### Via CLI
```bash
# Stats en temps réel
docker stats

# Espace disque
docker system df -v
```

### Alertes à configurer (futur)

- [ ] CPU > 80% pendant 5 min
- [ ] RAM > 90%
- [ ] Disque > 85%
- [ ] Container down > 1 min

---

## 🔐 Sécurité

### Bonnes pratiques

- ✅ Restart policy : `unless-stopped`
- ✅ Pas de port exposé inutilement
- ✅ Networks isolés par stack
- ✅ Volumes pour données persistantes
- ✅ Variables d'environnement pour secrets
- ✅ Images officielles uniquement
- ✅ Updates régulières

### Updates
```bash
# Pull les nouvelles images
docker compose pull

# Redéployer avec nouvelles images
docker compose up -d

# Nettoyer les anciennes images
docker image prune -a
```

### Backup

**Fréquence** : Hebdomadaire (automatisé à venir)

**Contenu** :
- [ ] docker-compose.yml de toutes les stacks
- [ ] Volumes Docker critiques (Nextcloud, bases de données)
- [ ] Configuration Dockge

**Destination** : [à définir - NAS ? Cloud ?]

---

## 📈 Évolution

### Stacks déployées

- [x] Dockge
- [x] Uptime Kuma
- [x] Nextcloud
- [ ] Gitea / GitLab
- [ ] Prometheus + Grafana
- [ ] Pi-hole
- [ ] [autres services à venir]

### Améliorations prévues

- [ ] Automatisation des backups
- [ ] Monitoring avancé (Prometheus)
- [ ] Alertes avancées (PagerDuty ?)
- [ ] CI/CD avec GitLab
- [ ] Reverse proxy interne (Caddy/Traefik)
- [ ] Clustering (Docker Swarm ou K3s)