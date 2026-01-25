// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Notifox Documentation',
  tagline: 'Multi-channel notifications made simple',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.notifox.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  trailingSlash: true,
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'notifoxhq', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'ignore',

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
          // Edit button configuration - links to GitHub for editing pages
          editUrl: 'https://github.com/notifoxhq/docs/tree/main/',
          // Show git history information (last updated date and author)
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Edit button configuration - links to GitHub for editing blog posts
          editUrl: 'https://github.com/notifoxhq/docs/tree/main/',
          // Show git history information (last updated date and author)
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
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

  scripts: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-66WMG1SY0D',
      async: true,
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/notifox-social-card.jpg',
      metadata: [
        {
          name: 'description',
          content: 'Notifox documentation - Send SMS and email alerts with a simple API. Developer-focused notification service for monitoring, alerts, and system notifications.',
        },
        {
          name: 'keywords',
          content: 'SMS alerts, email notifications, API, notifications, alerts, monitoring, developer tools, SMS API, email API, notification service, Notifox',
        },
        {
          name: 'author',
          content: 'Notifox',
        },
        {
          name: 'contact',
          content: 'support@notifox.com',
        },
        // Open Graph / Facebook
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:title',
          content: 'Notifox Documentation - SMS and Email Alerts API',
        },
        {
          property: 'og:description',
          content: 'Send SMS and email alerts with a simple API. Developer-focused notification service for monitoring, alerts, and system notifications.',
        },
        {
          property: 'og:image',
          content: 'https://docs.notifox.com/img/notifox-social-card.jpg',
        },
        {
          property: 'og:url',
          content: 'https://docs.notifox.com',
        },
        {
          property: 'og:site_name',
          content: 'Notifox Documentation',
        },
        // Twitter Card
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Notifox Documentation - SMS and Email Alerts API',
        },
        {
          name: 'twitter:description',
          content: 'Send SMS and email alerts with a simple API. Developer-focused notification service for monitoring, alerts, and system notifications.',
        },
        {
          name: 'twitter:image',
          content: 'https://docs.notifox.com/img/notifox-social-card.jpg',
        },
        // Additional meta tags
        {
          name: 'application-name',
          content: 'Notifox',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'Notifox Docs',
        },
        {
          name: 'theme-color',
          content: '#25c2a0',
        },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Notifox',
        logo: {
          alt: 'Notifox Logo',
          src: 'img/notifox-logo-min.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://console.notifox.com',
            label: 'Console',
            position: 'right',
          },
          {
            href: 'https://github.com/notifoxhq',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/reference/alerts-api',
              },
              {
                label: 'SDKs',
                to: '/docs/languages/python',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/notifoxhq',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/ZSp5SzxJBF',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@Notifoxhq',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Console',
                href: 'https://console.notifox.com',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/notifoxhq',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Van Eetvelde Ventures LLC DBA Notifox`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash'],
      },
    }),
};

export default config;
