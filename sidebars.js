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
          items: [
            'homelab/security/firewall-rules',
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
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        'tutorial/tutorial-basics/create-a-document',
        'tutorial/tutorial-basics/create-a-blog-post',
        'tutorial/tutorial-basics/create-a-page',
        'tutorial/tutorial-basics/markdown-features',
        'tutorial/tutorial-basics/deploy-your-site',
        'tutorial/tutorial-basics/congratulations',
        'tutorial/tutorial-extras/manage-docs-versions',
        'tutorial/tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;