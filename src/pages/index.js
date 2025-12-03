import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">🏛️ Olympus Lab</h1>
        <p className="hero__subtitle">Infrastructure DevOps moderne et sécurisée</p>
        <p className={styles.description}>
          Homelab personnel avec segmentation réseau, firewall avancé et accès distant via Cloudflare Tunnel
        </p>
        <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/homelab/infrastructure/overview">
              📖 Voir la documentation
            </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="https://proxmox.olympus-lab.org"
            style={{marginLeft: '10px'}}>
            🖥️ Accéder à Proxmox
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({icon, title, description, link}) {
  return (
    <div className={clsx('col col--4', styles.feature)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <Link to={link} className={styles.featureLink}>
            En savoir plus →
          </Link>
        )}
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: '🌐 Architecture Réseau',
      description: 'Segmentation en 4 réseaux isolés (LAN/DMZ/DEV/MGMT) avec firewall OPNsense',
      link: '/docs/homelab/infrastructure/opnsense',
    },
    {
      title: '🔒 Sécurité Avancée',
      description: 'Defense in Depth avec 5 couches de sécurité et Zero Trust',
      link: '/docs/homelab/security/firewall-rules',
    },
    {
      title: '☁️ Accès Distant',
      description: 'Cloudflare Tunnel avec authentification Zero Trust, zéro port ouvert',
      link: '/docs/homelab/infrastructure/cloudflare-tunnel',
    },
    {
      title: '🐳 Services Docker',
      description: 'Nextcloud, Uptime Kuma, et plus via Dockge',
      link: '/docs/homelab/services/docker-containers',
    },
    {
      title: '📊 Monitoring 24/7',
      description: 'Uptime Kuma avec alertes Discord (Iris 🌈)',
      link: '/docs/homelab/services/monitoring',
    },
    {
      title: '🌍 Accès Global',
      description: 'Services accessibles depuis partout, protégés par Cloudflare Access',
      link: '/docs/homelab/procedures/access-remote',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresGrid}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureCard}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <a href={feature.link} className={styles.featureLink}>
                En savoir plus →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const technologies = [
    {
      title: 'Proxmox VE 8.x',
      description: 'Hyperviseur de virtualisation',
      icon: '🖥️',
    },
    {
      title: 'OPNsense 24.7',
      description: 'Firewall & routeur',
      icon: '🔥',
    },
    {
      title: 'Cloudflare Tunnel',
      description: 'Accès distant sécurisé',
      icon: '☁️',
    },
    {
      title: 'Ubuntu 24.04 LTS',
      description: 'OS containers',
      icon: '🐧',
    },
    {
      title: 'Docker & Compose',
      description: 'Conteneurisation',
      icon: '🐳',
    },
    {
      title: 'Dockge',
      description: 'Gestion Docker',
      icon: '🎛️',
    },
    {
      title: 'Nextcloud',
      description: 'Cloud personnel',
      icon: '☁️',
    },
    {
      title: 'Uptime Kuma',
      description: 'Monitoring',
      icon: '📊',
    },
    {
      title: 'PostgreSQL 16',
      description: 'Base de données',
      icon: '🐘',
    },
    {
      title: 'Redis',
      description: 'Cache',
      icon: '⚡',
    },
    {
      title: 'Cloudflare Access',
      description: 'Zero Trust',
      icon: '🔐',
    },
    {
      title: 'Proxmox Snapshots',
      description: 'Sauvegarde',
      icon: '💾',
    },
  ];

  return (
    <section className={styles.techStack}>
      <div className="container">
        <h2>🛠️ Technologies utilisées</h2>
        <div className={styles.techGrid}>
          {technologies.map((tech, idx) => (
            <div key={idx} className={styles.techCard}>
              <div className={styles.techIcon}>{tech.icon}</div>
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  const links = [
    {
      title: '🖥️ Proxmox',
      url: 'https://proxmox.olympus-lab.org',
      description: 'Interface de virtualisation',
    },
    {
      title: '🔥 OPNsense',
      url: 'https://opnsense.olympus-lab.org',
      description: 'Firewall & routeur',
    },
    {
      title: '🐳 Dockge',
      url: 'https://dockge.olympus-lab.org',
      description: 'Gestion Docker',
    },
    {
      title: '☁️ Nextcloud',
      url: 'https://nextcloud.olympus-lab.org',
      description: 'Cloud personnel',
    },
    {
      title: '📊 Uptime Kuma',
      url: 'https://uptime.olympus-lab.org',
      description: 'Monitoring',
    },
    {
      title: '☁️ Cloudflare',
      url: 'https://one.dash.cloudflare.com',
      description: 'Tunnel & Access',
    },
  ];

  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2>🔗 Accès rapides</h2>
        <div className={styles.linksGrid}>
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href={link.url} 
              className={styles.linkCard}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3>{link.title}</h3>
              <p>{link.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Accueil"
      description="Documentation de l'infrastructure Olympus Lab - Homelab DevOps avec Proxmox, OPNsense et Cloudflare Tunnel">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <TechStack />
        <QuickLinks />
      </main>
    </Layout>
  );
} 