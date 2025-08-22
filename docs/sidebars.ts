import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // OXID eShop Developer Documentation Sidebar
  developerSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/index',
        {
          type: 'category',
          label: 'Installation',
          items: [
            'getting-started/installation/index',
            'getting-started/installation/environment-preparation',
            'getting-started/installation/eshop-installation',
            'getting-started/installation/eshop-installation-without-composer',
            'getting-started/installation/troubleshooting',
          ],
        },
        {
          type: 'category',
          label: 'IDE Setup',
          items: [
            'getting-started/ide/index',
            {
              type: 'category',
              label: 'PhpStorm',
              items: [
                'getting-started/ide/phpstorm/index',
                'getting-started/ide/phpstorm/codingstyle',
                'getting-started/ide/phpstorm/tests',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/index',
        {
          type: 'category',
          label: 'Modules, Components & Themes',
          items: [
            'development/modules-components-themes/index',
            {
              type: 'category',
              label: 'Module Development',
              items: [
                'development/modules-components-themes/module/index',
                {
                  type: 'category',
                  label: 'Module Skeleton',
                  items: [
                    'development/modules-components-themes/module/skeleton/index',
                    {
                      type: 'category',
                      label: 'metadata.php Reference',
                      items: [
                        'development/modules-components-themes/module/skeleton/metadataphp/index',
                        'development/modules-components-themes/module/skeleton/metadataphp/version-20',
                        'development/modules-components-themes/module/skeleton/metadataphp/version-21',
                        'development/modules-components-themes/module/skeleton/metadataphp/version-compatibility',
                        {
                          type: 'category',
                          label: 'aModule Array Reference',
                          items: [
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/index',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/id',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/title',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/description',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/thumbnail',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/version',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/author',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/url',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/email',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/extend',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/controllers',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/templates',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/blocks',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/settings',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/events',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/lang',
                            'development/modules-components-themes/module/skeleton/metadataphp/amodule/smarty-plugin-directories',
                          ],
                        },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'composer.json Configuration',
                      items: [
                        'development/modules-components-themes/module/skeleton/composerjson/index',
                        'development/modules-components-themes/module/skeleton/composerjson/module-via-composer',
                      ],
                    },
                    'development/modules-components-themes/module/skeleton/menu-xml',
                    'development/modules-components-themes/module/skeleton/structure',
                  ],
                },
                {
                  type: 'category',
                  label: 'Installation & Setup',
                  items: [
                    'development/modules-components-themes/module/installation-setup/index',
                    'development/modules-components-themes/module/installation-setup/installation',
                    'development/modules-components-themes/module/installation-setup/configuration',
                    'development/modules-components-themes/module/installation-setup/setup',
                    'development/modules-components-themes/module/installation-setup/troubleshooting',
                  ],
                },
                {
                  type: 'category',
                  label: 'Tutorials',
                  items: [
                    'development/modules-components-themes/module/tutorials/index',
                    'development/modules-components-themes/module/tutorials/create-basic-module',
                    'development/modules-components-themes/module/tutorials/module-setup',
                    'development/modules-components-themes/module/tutorials/extend-shop-class',
                    'development/modules-components-themes/module/tutorials/override-functionality',
                    'development/modules-components-themes/module/tutorials/frontend-user-forms',
                    'development/modules-components-themes/module/tutorials/frontend-mini-basket',
                    'development/modules-components-themes/module/tutorials/multi-lang-and-shop-tables',
                  ],
                },
                {
                  type: 'category',
                  label: 'Module Lifecycle',
                  items: [
                    'development/modules-components-themes/module/deactivation/index',
                    'development/modules-components-themes/module/uninstall/index',
                    'development/modules-components-themes/module/database-migration/index',
                  ],
                },
                {
                  type: 'category',
                  label: 'Advanced Topics',
                  items: [
                    'development/modules-components-themes/module/advanced/module-settings',
                    'development/modules-components-themes/module/advanced/module-services',
                    'development/modules-components-themes/module/advanced/module-dependencies',
                    'development/modules-components-themes/module/advanced/using-database',
                    'development/modules-components-themes/module/advanced/using-namespaces-in-modules',
                    'development/modules-components-themes/module/advanced/using-twig-in-module-templates',
                  ],
                },
                {
                  type: 'category',
                  label: 'Module Certification',
                  items: [
                    'development/modules-components-themes/module/certification/index',
                    'development/modules-components-themes/module/certification/software-quality',
                    'development/modules-components-themes/module/certification/software-tests',
                    'development/modules-components-themes/module/certification/documentation',
                    'development/modules-components-themes/module/certification/inter-module-compatibility',
                    'development/modules-components-themes/module/certification/terms-conditions-checklist',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Theme Development',
              items: [
                'development/modules-components-themes/theme/index',
                'development/modules-components-themes/theme/theme-via-composer',
                'development/modules-components-themes/theme/child-theme',
                'development/modules-components-themes/theme/twig-sandbox',
                {
                  type: 'category',
                  label: 'Twig Integration',
                  items: [
                    'development/modules-components-themes/theme/twig/index',
                    'development/modules-components-themes/theme/twig/loading-dynamic-content',
                    {
                      type: 'category',
                      label: 'Twig Converter',
                      items: [
                        'development/modules-components-themes/theme/twig/twig-converter/index',
                        'development/modules-components-themes/theme/twig/twig-converter/usage',
                        'development/modules-components-themes/theme/twig/twig-converter/issues',
                        'development/modules-components-themes/theme/twig/twig-converter/examples',
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Project Development',
              items: [
                'development/modules-components-themes/project/index',
                'development/modules-components-themes/project/environment',
                'development/modules-components-themes/project/configincphp',
                'development/modules-components-themes/project/parameters',
                'development/modules-components-themes/project/password-hashing',
                {
                  type: 'category',
                  label: 'Module Configuration',
                  items: [
                    'development/modules-components-themes/project/module-configuration/index',
                    'development/modules-components-themes/project/module-configuration/installation',
                    'development/modules-components-themes/project/module-configuration/environment-configuration',
                    'development/modules-components-themes/project/module-configuration/deployment',
                  ],
                },
                {
                  type: 'category',
                  label: 'Twig Template Engine',
                  items: [
                    'development/modules-components-themes/project/twig-template-engine/index',
                    'development/modules-components-themes/project/twig-template-engine/installation',
                    'development/modules-components-themes/project/twig-template-engine/extending',
                    'development/modules-components-themes/project/twig-template-engine/twig-extensions',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Development Utilities',
          items: [
            'development/modules-components-themes/component',
            'development/modules-components-themes/contribution',
            'development/modules-components-themes/quality',
            'development/modules-components-themes/licenses',
          ],
        },
        {
          type: 'category',
          label: 'Testing',
          items: [
            'development/testing/index',
            'development/testing/unit',
            'development/testing/integration',
            'development/testing/acceptance',
            {
              type: 'category',
              label: 'Codeception (Acceptance Tests)',
              items: [
                'development/testing/codeception/index',
                'development/testing/codeception/introduction',
                'development/testing/codeception/write-new-test',
                'development/testing/codeception/example-module-test',
                'development/testing/codeception/oxid-codeception-page-objects',
                'development/testing/codeception/create-own-page-objects',
                'development/testing/codeception/oxid-codeception-step-objects',
                'development/testing/codeception/oxid-codeception-modules',
                'development/testing/codeception/running-tests',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Tell Me About...',
          items: [
            'development/tell-me-about/index',
            {
              type: 'category',
              label: 'Event System',
              items: [
                'development/tell-me-about/event/index',
                'development/tell-me-about/event/event-example',
                'development/tell-me-about/event/list',
                {
                  type: 'category',
                  label: 'Database Events',
                  items: [
                    'development/tell-me-about/event/database-events/index',
                    'development/tell-me-about/event/database-events/before-model-delete-event',
                    'development/tell-me-about/event/database-events/after-model-delete-event',
                    'development/tell-me-about/event/database-events/before-model-update-event',
                    'development/tell-me-about/event/database-events/after-model-update-event',
                    'development/tell-me-about/event/database-events/after-model-insert-event',
                  ],
                },
                {
                  type: 'category',
                  label: 'DI Container Events',
                  items: [
                    'development/tell-me-about/event/di-container-events/index',
                    'development/tell-me-about/event/di-container-events/services-yaml-configuration-error-event',
                    'development/tell-me-about/event/di-container-events/project-yaml-changed-event',
                  ],
                },
                {
                  type: 'category',
                  label: 'Module Events',
                  items: [
                    'development/tell-me-about/event/module-events/index',
                    'development/tell-me-about/event/module-events/before-module-deactivation-event',
                    'development/tell-me-about/event/module-events/finalizing-module-activation-event',
                    'development/tell-me-about/event/module-events/finalizing-module-deactivation-event',
                    'development/tell-me-about/event/module-events/module-class-extension-chain-changed-event',
                    'development/tell-me-about/event/module-events/module-configuration-changed-event',
                    'development/tell-me-about/event/module-events/setting-changed-event',
                    'development/tell-me-about/event/module-events/shop-configuration-changed-event',
                  ],
                },
                {
                  type: 'category',
                  label: 'Shop General Events',
                  items: [
                    'development/tell-me-about/event/shop-general-events/index',
                    'development/tell-me-about/event/shop-general-events/after-request-processed-event',
                    'development/tell-me-about/event/shop-general-events/all-cookies-removed-event',
                    'development/tell-me-about/event/shop-general-events/application-exit-event',
                    'development/tell-me-about/event/shop-general-events/basket-changed-event',
                    'development/tell-me-about/event/shop-general-events/before-headers-send-event',
                    'development/tell-me-about/event/shop-general-events/before-session-start-event',
                  ],
                },
                {
                  type: 'category',
                  label: 'View Events',
                  items: [
                    'development/tell-me-about/event/view-events/index',
                    'development/tell-me-about/event/view-events/theme-setting-changed-event',
                    'development/tell-me-about/event/view-events/view-rendered-event',
                  ],
                },
              ],
            },
            {
              type: 'category', 
              label: 'Logging',
              items: [
                'development/tell-me-about/logging/index',
                'development/tell-me-about/logging/logger-usage',
                'development/tell-me-about/logging/custom-logger-implementation',
              ],
            },
            'development/tell-me-about/service-container',
            'development/tell-me-about/console',
            'development/tell-me-about/controller-as-service',
            'development/tell-me-about/unified-namespace-vs-internal-namespace',
            'development/tell-me-about/migrations',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'System Architecture',
      items: [
        'system-architecture/index',
        {
          type: 'category',
          label: 'Unified Namespace',
          items: [
            'system-architecture/unified-namespace/index',
            'system-architecture/unified-namespace/unified-namespace-generator',
            'system-architecture/unified-namespace/unified-namespace-inheritance',
          ],
        },
        'system-architecture/autoloading',
        'system-architecture/module-installation-activation',
        'system-architecture/multilingual-system',
      ],
    },
    {
      type: 'category',
      label: 'Update & Migration',
      items: [
        'update/index',
        'update/standard-update',
        {
          type: 'category',
          label: 'Edition Upgrades',
          items: [
            'update/upgrade/index',
            'update/upgrade/upgrade-from-ce-to-pe',
            'update/upgrade/upgrade-from-pe-to-ee',
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'conventions',
      label: 'Conventions',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
    {
      type: 'category',
      label: 'Tutorial Examples',
      collapsed: true,
      items: [
        'tutorial-basics/create-a-document',
        'tutorial-basics/create-a-blog-post',
        'tutorial-basics/markdown-features',
        'tutorial-basics/create-a-page',
        'tutorial-basics/deploy-your-site',
        'tutorial-basics/congratulations',
        'tutorial-extras/manage-docs-versions',
        'tutorial-extras/translate-your-site',
      ],
    },
  ],
};

export default sidebars;
