import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OXID eShop Developer Documentation',
  tagline: 'OXID eShop für Entwickler',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.oxid-esales.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OXID-eSales', // Usually your GitHub org/user name.
  projectName: 'developer_documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'developer',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/OXID-eSales/developer_documentation/tree/main/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],
  
  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.png',
    navbar: {
      title: 'OXID eShop',
      logo: {
        alt: 'OXID eShop Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'developerSidebar',
          position: 'left',
          label: 'Developer Docs',
        },
        {
          href: 'https://github.com/OXID-eSales/developer_documentation',
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
              to: '/developer/getting-started',
            },
            {
              label: 'Development',
              to: '/developer/development',
            },
            {
              label: 'System Architecture',
              to: '/developer/system-architecture',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Forum',
              href: 'https://forum.oxid-esales.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/OXID-eSales',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OXID eSales AG. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'bash', 'yaml', 'json', 'mermaid'],
    },
    mermaid: {
      theme: {
        light: 'base',
        dark: 'base'
      },
      options: {
        theme: 'base',
        themeVariables: {
          // OXID Corporate Colors
          primaryColor: '#c02124',
          primaryTextColor: '#ffffff',
          primaryBorderColor: '#721c24',
          lineColor: '#333333',
          
          // Secondary colors
          secondaryColor: '#f8f9fa',
          tertiaryColor: '#e9ecef',
          
          // Background colors
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f8f9fa',
          tertiaryBkg: '#e9ecef',
          
          // Text colors
          textColor: '#333333',
          primaryTextColor: '#ffffff',
          
          // Node styling
          fillType0: '#c02124',
          fillType1: '#f8f9fa',
          fillType2: '#e9ecef',
          fillType3: '#dee2e6',
          
          // Edge/line styling
          edgeLabelBackground: '#ffffff',
          clusterBkg: '#f8f9fa',
          clusterBorder: '#c02124',
          
          // Decision node colors (light mode)
          altBackground: '#fff3cd',
          altPrimaryColor: '#721c24',
          
          // Success/error colors
          successBkgColor: '#d4edda',
          successTextColor: '#155724',
          errorBkgColor: '#f8d7da',
          errorTextColor: '#721c24',
          
          // Font settings
          fontFamily: 'DINNextLTPro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
          fontSize: '16px',
        },
        themeCSS: `
          /* Dark mode overrides */
          [data-theme="dark"] .mermaid {
            --mermaid-bg: #1b1b1d;
            --mermaid-text: #ffffff;
            --mermaid-primary: #c02124;
            --mermaid-secondary: #2d3748;
            --mermaid-tertiary: #4a5568;
            --mermaid-line: #718096;
            --mermaid-decision-bg: #1a202c;
            --mermaid-decision-text: #ffffff;
          }
          
          [data-theme="dark"] .mermaid .node rect,
          [data-theme="dark"] .mermaid .node circle,
          [data-theme="dark"] .mermaid .node polygon {
            fill: var(--mermaid-secondary) !important;
            stroke: var(--mermaid-line) !important;
            stroke-width: 2px !important;
          }
          
          /* Dark mode decision nodes (diamonds) */
          [data-theme="dark"] .mermaid .node polygon {
            fill: var(--mermaid-decision-bg) !important;
            stroke: #ffd700 !important;
            stroke-width: 2px !important;
          }
          
          [data-theme="dark"] .mermaid .node .label {
            color: var(--mermaid-text) !important;
            fill: var(--mermaid-text) !important;
            font-weight: 600 !important;
          }
          
          /* Dark mode decision node text specifically */
          [data-theme="dark"] .mermaid .node polygon + .label,
          [data-theme="dark"] .mermaid .node[class*="decision"] .label {
            color: var(--mermaid-decision-text) !important;
            fill: var(--mermaid-decision-text) !important;
            font-weight: bold !important;
          }
          
          [data-theme="dark"] .mermaid .edgePath .path {
            stroke: var(--mermaid-line) !important;
            stroke-width: 2px !important;
          }
          
          [data-theme="dark"] .mermaid .edgeLabel {
            background-color: var(--mermaid-bg) !important;
            color: var(--mermaid-text) !important;
            fill: var(--mermaid-text) !important;
            font-weight: bold !important;
          }
          
          [data-theme="dark"] .mermaid .cluster rect {
            fill: var(--mermaid-tertiary) !important;
            stroke: var(--mermaid-primary) !important;
          }
          
          /* Light mode specific styling */
          [data-theme="light"] .mermaid {
            --mermaid-decision-bg: #fff3cd;
            --mermaid-decision-text: #721c24;
          }
          
          [data-theme="light"] .mermaid .edgePath .path {
            stroke: #333333 !important;
            stroke-width: 2px !important;
          }
          
          [data-theme="light"] .mermaid .edgeLabel {
            font-weight: 600 !important;
            color: #333333 !important;
            background-color: #ffffff !important;
            border: 1px solid #dee2e6 !important;
            border-radius: 4px !important;
            padding: 2px 6px !important;
          }
          
          /* Light mode decision nodes */
          [data-theme="light"] .mermaid .node polygon {
            fill: var(--mermaid-decision-bg) !important;
            stroke: #856404 !important;
            stroke-width: 2px !important;
          }
          
          [data-theme="light"] .mermaid .node polygon + .label,
          [data-theme="light"] .mermaid .node[class*="decision"] .label {
            color: var(--mermaid-decision-text) !important;
            fill: var(--mermaid-decision-text) !important;
            font-weight: bold !important;
          }
          
          /* General improvements for all nodes */
          .mermaid .node .label {
            font-family: 'DINNextLTPro', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            font-size: 14px !important;
          }
          
          /* Override global label color with highest specificity - Dark Mode */
          [data-theme="dark"] div[id*="mermaid-svg"] .label,
          [data-theme="dark"] svg[id*="mermaid-svg"] .label,
          [data-theme="dark"] .mermaid svg[id*="mermaid-svg"] .label,
          [data-theme="dark"] .mermaid .node .label,
          [data-theme="dark"] .mermaid g.node text {
            color: #1a202c !important;
            fill: #1a202c !important;
            font-weight: 600 !important;
          }
          
          /* Dark mode: Primary autoloader nodes specifically white text */
          [data-theme="dark"] .mermaid .node.oxid-primary .label,
          [data-theme="dark"] .mermaid g.node.oxid-primary text,
          [data-theme="dark"] .mermaid .node[class*="B"] .label,
          [data-theme="dark"] .mermaid .node[class*="E"] .label,
          [data-theme="dark"] .mermaid .node[class*="H"] .label,
          [data-theme="dark"] .mermaid g.node[class*="B"] text,
          [data-theme="dark"] .mermaid g.node[class*="E"] text,
          [data-theme="dark"] .mermaid g.node[class*="H"] text {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
          }
          
          /* Dark mode: Decision nodes yellow on dark */
          [data-theme="dark"] .mermaid .node.oxid-warning .label,
          [data-theme="dark"] .mermaid .node[class*="C"] .label,
          [data-theme="dark"] .mermaid .node[class*="F"] .label,
          [data-theme="dark"] .mermaid .node[class*="I"] .label,
          [data-theme="dark"] .mermaid .node[class*="K"] .label {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
          }
          
          /* Light mode - general dark text */
          [data-theme="light"] div[id*="mermaid-svg"] .label,
          [data-theme="light"] svg[id*="mermaid-svg"] .label,
          [data-theme="light"] .mermaid svg[id*="mermaid-svg"] .label,
          [data-theme="light"] .mermaid .node .label,
          [data-theme="light"] .mermaid g.node text {
            color: #333333 !important;
            fill: #333333 !important;
            font-weight: 600 !important;
          }
          
          /* Light mode: Primary autoloader nodes white text on red */
          [data-theme="light"] .mermaid .node.oxid-primary .label,
          [data-theme="light"] .mermaid g.node.oxid-primary text,
          [data-theme="light"] .mermaid .node[class*="B"] .label,
          [data-theme="light"] .mermaid .node[class*="E"] .label,
          [data-theme="light"] .mermaid .node[class*="H"] .label,
          [data-theme="light"] .mermaid g.node[class*="B"] text,
          [data-theme="light"] .mermaid g.node[class*="E"] text,
          [data-theme="light"] .mermaid g.node[class*="H"] text {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
          }
          
          /* OXID branded primary nodes - both themes */
          .mermaid .node.oxid-primary rect,
          .mermaid .node.oxid-primary circle {
            fill: #c02124 !important;
            stroke: #a61d20 !important;
            stroke-width: 3px !important;
          }
          
          .mermaid .node.oxid-primary .label {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
            font-size: 14px !important;
          }
          
          /* Dark mode overrides for primary nodes */
          [data-theme="dark"] .mermaid .node.oxid-primary rect,
          [data-theme="dark"] .mermaid .node.oxid-primary circle {
            fill: #c02124 !important;
            stroke: #ffffff !important;
            stroke-width: 3px !important;
          }
          
          [data-theme="dark"] .mermaid .node.oxid-primary .label {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.8) !important;
          }
          
          /* Light mode overrides for primary nodes */
          [data-theme="light"] .mermaid .node.oxid-primary rect,
          [data-theme="light"] .mermaid .node.oxid-primary circle {
            fill: #c02124 !important;
            stroke: #721c24 !important;
            stroke-width: 3px !important;
          }
          
          [data-theme="light"] .mermaid .node.oxid-primary .label {
            color: #ffffff !important;
            fill: #ffffff !important;
            font-weight: bold !important;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5) !important;
          }
          
          /* Additional fallback selectors for primary autoloader nodes */
          .mermaid g.node:has(rect[class*="oxid-primary"]) text,
          .mermaid g.node.oxid-primary text,
          .mermaid .node[class*="B"] text,
          .mermaid .node[class*="E"] text,
          .mermaid .node[class*="H"] text {
            fill: #ffffff !important;
            color: #ffffff !important;
            font-weight: bold !important;
          }
          
          .mermaid g.node:has(rect[class*="oxid-primary"]) rect,
          .mermaid g.node.oxid-primary rect,
          .mermaid .node[class*="B"] rect,
          .mermaid .node[class*="E"] rect,
          .mermaid .node[class*="H"] rect {
            fill: #c02124 !important;
            stroke: #721c24 !important;
            stroke-width: 3px !important;
          }
        `
      }
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
