---
sidebar_position: 2
---

# 📊 Monitoring

Infrastructure de surveillance complète d'Olympus Lab.

## 🎯 Objectifs

- Surveillance 24/7 de tous les services
- Alertes en temps réel (Discord)
- Métriques de performance
- Historique et dashboards

---

## 📐 Architecture
```
┌─────────────────────────────────────────┐
│         Uptime Kuma (Léger)             │
│    - Availability monitoring            │
│    - HTTP/HTTPS checks                  │
│    - Alertes Discord (Iris)             │
└─────────────────────────────────────────┘
                    +
┌─────────────────────────────────────────┐
│    Prometheus + Grafana (À venir)       │
│    - Métriques système                  │
│    - CPU, RAM, Disque, Réseau           │
│    - Dashboards visuels                 │
│    - Alertes avancées                   │
└─────────────────────────────────────────┘
                    +
┌─────────────────────────────────────────┐
│      Logs (À venir)                     │
│    - Loki pour centralisation           │
│    - Analyse des logs                   │
└─────────────────────────────────────────┘
```

---

## 🟢 Uptime Kuma (Actuel)

### Fonction

Monitoring de disponibilité (uptime) des services HTTP/HTTPS

### Configuration

**Container** :
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

**Accès** : https: //uptime.[domain].org

### Monitors configurés

| Service | Type | URL | Intervalle | Retry |
|---------|------|-----|------------|-------|
| Proxmox | HTTP(s) | https: //proxmox.[domain].org | 60s | 3 |
| OPNsense | HTTP(s) | https: //opnsense.[domain].org | 60s | 3 |
| Dockge | HTTP(s) | https: //dockge.[domain].org | 60s | 3 |
| Nextcloud | HTTP(s) | https: //nextcloud.[domain].org | 60s | 3 |
| Documentation | HTTP(s) | https: //docs.[domain].org | 300s | 2 |

### Notifications Discord (Iris 🌈)

**Bot** : Iris (déesse messagère)

**Webhook** : [à ne pas publier]

**Notifications** :
- 🟢 Service UP
- 🔴 Service DOWN
- 🟡 Service SLOW (> 2000ms)
- 📊 Rapport quotidien (optionnel)

**Configuration** :
```
Settings → Notifications → Discord
Name: Iris
Webhook URL: [webhook]
Friendly Name: Iris
```

**Messages exemples** :
```
🟢 Iris: Proxmox is back online
🔴 Iris: OPNsense is DOWN!
🟡 Iris: Nextcloud response time: 2500ms (slow)
```

### Limitations

- ❌ Pas de métriques détaillées (CPU, RAM, etc.)
- ❌ Pas de dashboards visuels
- ❌ Pas d'historique long terme
- ❌ Monitoring externe uniquement (pas interne)

**→ C'est pourquoi on va ajouter Prometheus + Grafana**

---

## 📊 Prometheus + Grafana (À déployer)

### Fonction

- **Prometheus** : Collecte et stockage des métriques
- **Grafana** : Visualisation et dashboards

### Architecture
```
┌─────────────────────────────────────────┐
│             Grafana                     │
│         (Dashboards)                    │
└──────────────┬──────────────────────────┘
               │
               ↓ (Query)
┌──────────────▼──────────────────────────┐
│          Prometheus                     │
│      (Métriques storage)                │
└──────────────┬──────────────────────────┘
               │
               ↓ (Scrape)
      ┌────────┴────────┐
      │                 │
┌─────▼─────┐    ┌─────▼─────┐
│  Node     │    │  cAdvisor │
│ Exporter  │    │  (Docker) │
└───────────┘    └───────────┘
```

### Stack Docker Compose
```yaml
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--storage.tsdb.retention.time=30d'
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=[mot-de-passe-fort]
      - GF_SERVER_ROOT_URL=https: //grafana.[domain].org
    volumes:
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    restart: unless-stopped
    ports:
      - "9100:9100"
    command:
      - '--path.procfs=/host/proc'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    networks:
      - monitoring

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - monitoring

volumes:
  prometheus_data:
  grafana_data:

networks:
  monitoring:
```

### Configuration Prometheus

**Fichier** : `prometheus.yml`
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  # Prometheus lui-même
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter (métriques système)
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # cAdvisor (métriques Docker)
  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']

  # Proxmox (à configurer)
  - job_name: 'proxmox'
    static_configs:
      - targets: ['192.168.1.51:9221']

  # OPNsense (à configurer)
  - job_name: 'opnsense'
    static_configs:
      - targets: ['10.0.1.1:9273']
```

### Dashboards Grafana

**À importer** :

1. **Node Exporter Full** (ID: 1860)
   - CPU, RAM, Disque, Réseau
   - Pour la VM Docker

2. **Docker Container & Host Metrics** (ID: 10619)
   - Métriques de tous les containers
   - cAdvisor

3. **Proxmox** (ID: 10347)
   - Monitoring Proxmox VE

4. **Custom Dashboard** (à créer)
   - Vue d'ensemble Olympus Lab
   - Services critiques
   - Alertes actives

### Accès

- **Prometheus** : https: //prometheus.[domain].org
- **Grafana** : https: //grafana.[domain].org
- **Login Grafana** : admin / [mot-de-passe]

### Alertes Prometheus

**Fichier** : `alert.rules.yml`
```yaml
groups:
  - name: olympus_lab
    interval: 30s
    rules:
      # CPU élevé
      - alert: HighCPU
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU on {{ $labels.instance }}"
          description: "CPU usage is above 80% (current: {{ $value }}%)"

      # RAM élevée
      - alert: HighMemory
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100 < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Low memory on {{ $labels.instance }}"
          description: "Available memory is below 10% (current: {{ $value }}%)"

      # Disque plein
      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes{mountpoint="/"} / node_filesystem_size_bytes{mountpoint="/"}) * 100 < 15
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space on {{ $labels.instance }}"
          description: "Disk space is below 15% (current: {{ $value }}%)"

      # Container down
      - alert: ContainerDown
        expr: absent(container_last_seen{name=~"nextcloud|uptime-kuma|dockge"})
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Container {{ $labels.name }} is down"
          description: "Critical container is not running"
```

---

## 📈 Métriques à surveiller

### Système (Node Exporter)

- **CPU** : Utilisation par core, load average
- **RAM** : Utilisée, disponible, swap
- **Disque** : Espace utilisé, IOPS, latence
- **Réseau** : Bande passante, paquets, erreurs

### Docker (cAdvisor)

- **Containers** : CPU, RAM par container
- **Volumes** : Espace utilisé
- **Networks** : Trafic inter-containers

### Services

- **Uptime** : Disponibilité %
- **Response time** : Latence HTTP
- **Errors** : 4xx, 5xx

### Infrastructure

- **Proxmox** : VMs actives, ressources
- **OPNsense** : Firewall rules, trafic
- **Cloudflare Tunnel** : Connexions actives

---

## 🔔 Stratégie d'alertes

### Niveaux de sévérité

| Niveau | Description | Action |
|--------|-------------|--------|
| 🟢 Info | Information | Log uniquement |
| 🟡 Warning | Attention requise | Discord Iris |
| 🔴 Critical | Action immédiate | Discord + SMS (futur) |

### Alertes configurées

#### Uptime Kuma (Actuel)

- 🔴 Service DOWN > 2 min
- 🟡 Response time > 2000ms

#### Prometheus (À venir)

- 🔴 CPU > 90% pendant 5 min
- 🔴 RAM < 5% disponible
- 🔴 Disque < 10% disponible
- 🔴 Container critique DOWN > 1 min
- 🟡 CPU > 80% pendant 5 min
- 🟡 RAM < 15% disponible
- 🟡 Disque < 20% disponible

### Canaux de notification

**Actuel** :
- Discord (Iris) via Uptime Kuma

**À venir** :
- Discord (Iris) via Alertmanager (Prometheus)
- Email (pour alertes critiques)
- SMS / PagerDuty (alertes 🔴 uniquement)

---

## 📊 Dashboards

### Dashboard 1 : Vue d'ensemble

**Contenu** :
- Status de tous les services (UP/DOWN)
- CPU/RAM/Disque global
- Trafic réseau
- Alertes actives

### Dashboard 2 : Infrastructure

**Contenu** :
- Proxmox : VMs, LXC, ressources
- OPNsense : Firewall, WAN/LAN
- Cloudflare : Tunnel status, requêtes

### Dashboard 3 : Docker

**Contenu** :
- Tous les containers (CPU, RAM)
- Volumes (espace)
- Networks (trafic)
- Images (versions)

### Dashboard 4 : Services

**Contenu** :
- Nextcloud : Users, files, storage
- Uptime Kuma : Uptime %, response times
- Dockge : Stacks actives

---

## 🛠️ Maintenance

### Updates

**Uptime Kuma** :
```bash
cd ~/stacks/uptime-kuma
docker compose pull
docker compose up -d
```

**Prometheus + Grafana** :
```bash
cd ~/stacks/monitoring
docker compose pull
docker compose up -d
```

### Backup

**Uptime Kuma** :
- Volume : `uptime-kuma`
- Fréquence : Hebdomadaire

**Prometheus** :
- Volume : `prometheus_data`
- Retention : 30 jours
- Backup : Optionnel (données reconstructibles)

**Grafana** :
- Volume : `grafana_data`
- Dashboards : Export JSON mensuel
- Fréquence : Hebdomadaire

---

## 📋 Checklist déploiement Prometheus

- [ ] Créer la stack dans Dockge
- [ ] Configurer `prometheus.yml`
- [ ] Déployer Node Exporter
- [ ] Déployer cAdvisor
- [ ] Configurer alertes
- [ ] Ajouter dans Cloudflare Tunnel
- [ ] Créer DNS records
- [ ] Configurer Cloudflare Access
- [ ] Importer dashboards Grafana
- [ ] Configurer Alertmanager → Discord
- [ ] Tester alertes
- [ ] Documenter

---

## 🔗 Ressources

**Documentation** :
- Uptime Kuma : https://github.com/louislam/uptime-kuma
- Prometheus : https://prometheus.io/docs/
- Grafana : https://grafana.com/docs/
- Node Exporter : https://github.com/prometheus/node_exporter
- cAdvisor : https://github.com/google/cadvisor

**Dashboards Grafana** :
- https://grafana.com/grafana/dashboards/

**Guides** :
- Prometheus + Grafana avec Docker : https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/