const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Homelab',
      items: [
        {
          type: 'category',
          label: 'Infrastructure',
          items: [
            'homelab/infrastructure/overview',
            'homelab/infrastructure/proxmox',
            'homelab/infrastructure/opnsense',
            'homelab/infrastructure/cloudflare-tunnel',
            'homelab/infrastructure/network',
          ],
        },
        {
          type: 'category',
          label: 'Sécurité',
          items: ['homelab/security/firewall-rules'],
        },
        {
          type: 'category',
          label: 'Services', 
          items: [
            'homelab/services/docker-containers',
            'homelab/services/monitoring',
          ],
        },
        {
          type: 'category',
          label: 'Procédures',
          items: [
            'homelab/procedures/access-remote',
            'homelab/procedures/maintenance',
          ],
        },
        {
          type: 'category',
          label: 'Apprentissage',
          items: [
            'homelab/apprentissage/python',
            'homelab/apprentissage/practical-networking',
          ],
        },
        'homelab/guide_devops',
      ],
    },
  ],
};

module.exports = sidebars;