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
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <FeatureCard
            icon="🌐"
            title="Architecture Réseau"
            description="Segmentation complète avec 4 réseaux isolés (LAN, DMZ, DEV, MGMT) gérés par OPNsense"
            link="/docs/homelab/infrastructure/opnsense"
          />
          <FeatureCard
            icon="🔒"
            title="Sécurité Avancée"
            description="Firewall stateful, règles granulaires, isolation complète et authentification multi-facteurs"
            link="/docs/homelab/security/firewall-rules"
          />
          <FeatureCard
            icon="☁️"
            title="Accès Distant"
            description="Cloudflare Tunnel sans port forwarding, protection DDoS et authentification Zero Trust"
            link="/docs/homelab/infrastructure/cloudflare-tunnel"
          />
        </div>
        <div className="row" style={{marginTop: '2rem'}}>
          <FeatureCard
            icon="📦"
            title="Virtualisation"
            description="Proxmox VE avec VMs et containers LXC, snapshots et gestion centralisée"
            link="/docs/homelab/infrastructure/proxmox"
          />
          <FeatureCard
            icon="🛠️"
            title="Maintenance"
            description="Procédures de backup, mises à jour régulières et monitoring des services"
            link="/docs/homelab/procedures/maintenance"
          />
          <FeatureCard
            icon="🌍"
            title="Accès Global"
            description="Gérez votre infrastructure depuis n'importe où dans le monde de manière sécurisée"
            link="/docs/homelab/procedures/maintenance"
          />
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className={styles.techStack}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Stack Technologique</h2>
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <strong>Virtualisation</strong>
            <p>Proxmox VE 8.x</p>
          </div>
          <div className={styles.techItem}>
            <strong>Firewall</strong>
            <p>OPNsense 24.7</p>
          </div>
          <div className={styles.techItem}>
            <strong>Tunnel</strong>
            <p>Cloudflare Tunnel</p>
          </div>
          <div className={styles.techItem}>
            <strong>OS</strong>
            <p>Ubuntu 24.04 LTS</p>
          </div>
          <div className={styles.techItem}>
            <strong>Monitoring</strong>
            <p>Logs Cloudflare Access</p>
          </div>
          <div className={styles.techItem}>
            <strong>Backup</strong>
            <p>Proxmox Snapshots</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Accès Rapide</h2>
        <div className={styles.linksGrid}>
          <a href="https://proxmox.olympus-lab.org" className={styles.linkCard}>
            <div className={styles.linkIcon}>🖥️</div>
            <h3>Proxmox</h3>
            <p>Gestion des VMs et containers</p>
          </a>
          <a href="https://opnsense.olympus-lab.org" className={styles.linkCard}>
            <div className={styles.linkIcon}>🔥</div>
            <h3>OPNsense</h3>
            <p>Configuration firewall</p>
          </a>
          <a href="https://one.dash.cloudflare.com" className={styles.linkCard}>
            <div className={styles.linkIcon}>☁️</div>
            <h3>Cloudflare</h3>
            <p>Dashboard Zero Trust</p>
          </a>
          <a href="https://github.com" className={styles.linkCard}>
            <div className={styles.linkIcon}>📚</div>
            <h3>GitHub</h3>
            <p>Code source de la doc</p>
          </a>
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