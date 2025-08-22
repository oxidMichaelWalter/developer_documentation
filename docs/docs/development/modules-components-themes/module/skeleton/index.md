---
sidebar_position: 1
---

# Module Skeleton: Structure & Metadata

Creating a working OXID eShop module requires a specific file structure and metadata configuration. This guide covers the essential files and structure needed for modern module development.

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

## Overview

A complete OXID eShop module consists of:

1. **[metadata.php](metadataphp/)** - Required module metadata and configuration
2. **[composer.json](composerjson/)** - Package management and autoloading
3. **[File structure](structure)** - Organized directory layout
4. **Additional files** - Services, translations, templates, etc.

## Required Files

### 1. metadata.php (Required)

The `metadata.php` file is **mandatory** for all OXID eShop modules and contains essential module information:

```php
<?php
/**
 * Module metadata
 */
$aModule = [
    'id'          => 'myvendor-mymodule',
    'title'       => 'My Custom Module',
    'description' => 'Description of what the module does',
    'thumbnail'   => 'logo.png',
    'version'     => '1.0.0',
    'author'      => 'My Company',
    'url'         => 'https://www.mycompany.com',
    'email'       => 'info@mycompany.com',
    
    'extend' => [
        // Class extensions
    ],
    
    'controllers' => [
        // Custom controllers
    ],
    
    'templates' => [
        // Template assignments
    ],
    
    'blocks' => [
        // Template blocks
    ],
    
    'settings' => [
        // Module settings
    ],
    
    'events' => [
        // Module events
    ],
];
```

### 2. composer.json (Recommended)

While optional, `composer.json` is **strongly recommended** for:
- **Dependency management**
- **PSR-4 autoloading**
- **Composer-based installation**
- **Version constraints**

```json
{
    "name": "myvendor/mymodule",
    "description": "My OXID eShop Module",
    "type": "oxideshop-module",
    "keywords": ["oxid", "modules", "ecommerce"],
    "homepage": "https://www.mycompany.com/",
    "license": ["GPL-3.0-only"],
    "require": {
        "php": "^8.1",
        "oxid-esales/oxideshop-ce": "^7.1"
    },
    "autoload": {
        "psr-4": {
            "MyVendor\\MyModule\\": "src/"
        }
    },
    "extra": {
        "oxideshop": {
            "target-directory": "myvendor/mymodule"
        }
    }
}
```

## Metadata Versions

:::warning Deprecated Versions
Support for metadata versions 1, 1.1, and 1.2 has been **dropped**. Always use **version 2.0 or later** for new modules.
:::

### Version 2.0+ Features

```php
$aModule = [
    'id' => 'myvendor-mymodule',
    
    // Modern class extensions with namespaces
    'extend' => [
        \OxidEsales\Eshop\Application\Model\Article::class => 
            \MyVendor\MyModule\Application\Model\Article::class
    ],
    
    // Namespaced controllers
    'controllers' => [
        'mymodule_admin' => \MyVendor\MyModule\Application\Controller\Admin\ModuleAdmin::class
    ],
    
    // Enhanced settings with constraints
    'settings' => [
        [
            'group' => 'mymodule_main',
            'name'  => 'mymodule_api_key',
            'type'  => 'str',
            'value' => '',
            'constraints' => '^[A-Za-z0-9]{32}$'
        ]
    ]
];
```

## Basic File Structure

```
myvendor-mymodule/
├── metadata.php              # Required: Module metadata
├── composer.json             # Recommended: Package definition
├── README.md                 # Documentation
├── CHANGELOG.md              # Version history
├── LICENSE                   # License file
├── services.yaml             # Service definitions
├── src/                      # PHP source code (PSR-4)
│   ├── Application/
│   │   ├── Controller/       # Controllers
│   │   ├── Model/           # Model extensions
│   │   └── Component/       # Components
│   ├── Core/                # Core extensions
│   ├── Service/             # Custom services
│   └── EventSubscriber/     # Event subscribers
├── views/                   # Frontend templates
│   ├── admin/              # Admin templates
│   │   └── tpl/
│   ├── frontend/           # Frontend templates
│   │   └── tpl/
│   └── blocks/             # Template blocks
├── translations/           # Language files
│   ├── de/
│   ├── en/
│   └── ...
├── assets/                 # Static assets
│   ├── css/
│   ├── js/
│   └── images/
├── migration/              # Database migrations
├── tests/                  # Unit & integration tests
│   ├── Unit/
│   └── Integration/
└── docs/                   # Additional documentation
```

## Advanced Structure Example

For a comprehensive module with all features:

```
myvendor-advanced-module/
├── metadata.php
├── composer.json
├── services.yaml
├── menu.xml                    # Admin menu configuration
├── src/
│   ├── Application/
│   │   ├── Controller/
│   │   │   ├── Admin/
│   │   │   │   ├── ModuleConfig.php
│   │   │   │   └── ModuleMain.php
│   │   │   └── Frontend/
│   │   │       └── ModuleController.php
│   │   ├── Model/
│   │   │   ├── Article.php      # Extends core Article
│   │   │   └── User.php         # Extends core User
│   │   └── Component/
│   │       └── Widget/
│   │           └── ModuleWidget.php
│   ├── Core/
│   │   ├── Config.php           # Extends core Config
│   │   └── Utils.php            # Extends core Utils
│   ├── Service/
│   │   ├── PaymentService.php
│   │   ├── NotificationService.php
│   │   └── ApiClient.php
│   ├── EventSubscriber/
│   │   ├── OrderEventSubscriber.php
│   │   └── UserEventSubscriber.php
│   ├── Exception/
│   │   ├── ModuleException.php
│   │   └── ApiException.php
│   └── Traits/
│       └── LoggerAwareTrait.php
├── views/
│   ├── admin/
│   │   └── tpl/
│   │       ├── module_config.tpl
│   │       └── module_main.tpl
│   ├── frontend/
│   │   └── tpl/
│   │       ├── module_widget.tpl
│   │       └── module_page.tpl
│   └── blocks/
│       ├── layout_header.tpl
│       └── page_checkout_payment.tpl
├── translations/
│   ├── de/
│   │   └── mymodule_lang.php
│   ├── en/
│   │   └── mymodule_lang.php
│   └── fr/
│       └── mymodule_lang.php
├── assets/
│   ├── css/
│   │   ├── admin.css
│   │   └── frontend.css
│   ├── js/
│   │   ├── admin.js
│   │   └── frontend.js
│   └── images/
│       ├── logo.png
│       └── icons/
├── migration/
│   └── data/
│       └── Version20241122000001.php
├── tests/
│   ├── Unit/
│   │   ├── Service/
│   │   └── Model/
│   ├── Integration/
│   │   ├── Controller/
│   │   └── Service/
│   └── phpunit.xml
└── docs/
    ├── installation.md
    ├── configuration.md
    └── api.md
```

## Naming Conventions

### Module ID
- Format: `vendor-modulename` (lowercase, hyphen-separated)
- Example: `mycompany-paymentmodule`

### Class Names
- Follow PSR-4 standards
- Use vendor namespace: `MyVendor\MyModule\...`
- Example: `MyVendor\PaymentModule\Service\PaymentProcessor`

### File Names
- Match class names exactly
- Use PascalCase for PHP classes
- Use lowercase with hyphens for templates

## PSR-4 Autoloading Setup

In `composer.json`:

```json
{
    "autoload": {
        "psr-4": {
            "MyVendor\\MyModule\\": "src/"
        }
    }
}
```

Corresponding directory structure:
```
src/
├── Application/              # MyVendor\MyModule\Application
├── Service/                  # MyVendor\MyModule\Service
└── EventSubscriber/          # MyVendor\MyModule\EventSubscriber
```

## Module Installation Target

Configure where the module is installed:

```json
{
    "extra": {
        "oxideshop": {
            "target-directory": "myvendor/mymodule"
        }
    }
}
```

This installs the module to: `source/modules/myvendor/mymodule/`

## Validation Checklist

Before releasing your module, ensure:

- ✅ **metadata.php** exists and is valid
- ✅ **Module ID** follows naming conventions
- ✅ **composer.json** defines correct autoloading
- ✅ **PSR-4 structure** matches namespace declarations
- ✅ **Version 2.0+** metadata format used
- ✅ **All class extensions** use full namespaces
- ✅ **Translation files** exist for supported languages
- ✅ **README.md** provides installation and usage instructions

## Quick Start

1. **Create directory structure**:
   ```bash
   mkdir -p myvendor-mymodule/src/Application/{Controller,Model}
   mkdir -p myvendor-mymodule/views/{admin,frontend}/tpl
   mkdir -p myvendor-mymodule/translations/{de,en}
   ```

2. **Create basic metadata.php**:
   ```php
   <?php
   $aModule = [
       'id' => 'myvendor-mymodule',
       'title' => 'My Module',
       'description' => 'Module description',
       'version' => '1.0.0',
       'author' => 'My Company'
   ];
   ```

3. **Create composer.json** with PSR-4 autoloading

4. **Install module**:
   ```bash
   composer require myvendor/mymodule
   ./vendor/bin/oe-console oe:module:activate myvendor-mymodule
   ```

## Next Steps

- **[metadata.php Configuration](metadataphp/)**: Detailed metadata options
- **[composer.json Setup](composerjson/)**: Package management configuration  
- **[Module Structure Details](structure)**: Advanced file organization
- **[Module Services](../module-services)**: Dependency injection setup
- **[Module Installation](../installation-setup/)**: Deployment and activation