// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Olympus Lab',
  tagline: 'My DevOps Homelab Infrastructure',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  // Set the production url of your site here
  url: 'https://docs.olympus-lab.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Ajoute ça pour le CNAME
  customFields: {
    cname: 'docs.olympus-lab.org',
    },
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'panda-factory-gist', // Usually your GitHub org/user name.
  projectName: 'homelab-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Olympus Lab',
        logo: {
          alt: 'Olympus Lab Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Homelab',
          },
          {
            to: '/blog', 
            label: 'Blog', 
            position: 'left'},
          {
            href: 'https://github.com/panda-factory-gist',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        logo: {
          alt: 'Olympus Lab Logo',
          src: 'img/logo.svg',
          width: 50,
          height: 50,
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Vue d\'ensemble',
                to: '/docs/homelab/infrastructure/overview',
              },
              {
                label: 'Accès distant',
                to: '/docs/homelab/procedures/access-remote',
              },
              {
                label: 'Maintenance',
                to: '/docs/homelab/procedures/maintenance',
              },
            ],
          },
          {
            title: 'Accès',
            items: [
              {
                label: 'Proxmox',
                href: 'https://proxmox.olympus-lab.org',
              },
              {
                label: 'OPNsense',
                href: 'https://opnsense.olympus-lab.org',
              },
              {
                label: 'Cloudflare',
                href: 'https://one.dash.cloudflare.com',
              },
            ],
          },
          {
            title: 'Plus',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/panda-factory-gist',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Olympus Lab 🌸 Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
