---
sidebar_position: 3
---

# Module File & Folder Structure

Proper file organization is crucial for maintainable OXID eShop modules. This guide covers the recommended directory structure, naming conventions, and organization patterns for professional module development.

## Overview

A well-structured module requires:
- **Unique module ID** for separation and identification
- **Logical directory organization** for different file types
- **Consistent naming conventions** for discoverability
- **Standard file locations** for OXID eShop integration

## Complete Directory Structure

```
myvendor-mymodule/                    # Module root directory
├── 📄 metadata.php                  # Required: Module metadata
├── 📄 composer.json                 # Package definition & autoloading
├── 📄 services.yaml                 # Service container definitions
├── 📄 menu.xml                      # Admin menu integration (optional)
├── 📄 README.md                     # Documentation
├── 📄 CHANGELOG.md                  # Version history
├── 📄 LICENSE                       # License file
├── 📂 src/                          # PHP source code (PSR-4)
│   ├── 📂 Application/              # Application layer
│   │   ├── 📂 Controller/           # Controllers
│   │   │   ├── 📂 Admin/            # Admin controllers
│   │   │   └── 📂 Frontend/         # Frontend controllers
│   │   ├── 📂 Model/                # Model extensions
│   │   ├── 📂 Component/            # Components & widgets
│   │   └── 📂 Service/              # Business logic services
│   ├── 📂 Core/                     # Core layer extensions
│   ├── 📂 EventSubscriber/          # Event subscribers
│   ├── 📂 Exception/                # Custom exceptions
│   └── 📂 Traits/                   # Reusable traits
├── 📂 views/                        # Templates & frontend
│   ├── 📂 admin_twig/               # Admin templates
│   │   ├── 📂 de/                   # German admin translations
│   │   └── 📂 en/                   # English admin translations
│   ├── 📂 frontend/                 # Frontend templates
│   │   └── 📂 tpl/                  # Template files
│   └── 📂 blocks/                   # Template block files
├── 📂 translations/                 # Frontend translations
│   ├── 📂 de/                       # German frontend translations
│   └── 📂 en/                       # English frontend translations
├── 📂 assets/                       # Static assets
│   ├── 📂 css/                      # Stylesheets
│   ├── 📂 js/                       # JavaScript files
│   └── 📂 images/                   # Images & icons
├── 📂 migration/                    # Database migrations
│   └── 📂 data/                     # Migration files
├── 📂 tests/                        # Test suite
│   ├── 📂 Unit/                     # Unit tests
│   ├── 📂 Integration/              # Integration tests
│   ├── 📂 Codeception/              # Acceptance tests
│   ├── 📂 PhpStan/                  # Static analysis config
│   └── 📄 phpunit.xml               # PHPUnit configuration
└── 📂 docs/                         # Additional documentation
    ├── 📄 installation.md
    ├── 📄 configuration.md
    └── 📄 api.md
```

## Core Files

### Required Files

**metadata.php** (Required)
```php
<?php
$aModule = [
    'id' => 'myvendor-mymodule',
    'title' => 'My Module',
    // ... configuration
];
```

**composer.json** (Recommended)
```json
{
    "name": "myvendor/mymodule",
    "type": "oxideshop-module",
    // ... package configuration
}
```

### Optional Configuration Files

**services.yaml** - Service container definitions
```yaml
services:
  MyVendor\MyModule\Service\PaymentService:
    arguments:
      - '@Psr\Log\LoggerInterface'
```

**menu.xml** - Admin menu integration
```xml
<?xml version="1.0" encoding="UTF-8"?>
<OX>
    <OXMENU id="NAVIGATION_ESHOPADMIN">
        <MAINMENU id="mymodule_main">
            <SUBMENU id="mymodule_config" cl="mymodule_admin_config" />
        </MAINMENU>
    </OXMENU>
</OX>
```

## Source Code Organization

### PSR-4 Structure (src/)

The `src/` directory follows **PSR-4 autoloading** standards:

```
src/
├── Application/                      # Application layer
│   ├── Controller/
│   │   ├── Admin/
│   │   │   ├── ConfigController.php   # Admin configuration
│   │   │   └── MainController.php     # Admin main view
│   │   └── Frontend/
│   │       ├── PaymentController.php  # Frontend payment handling
│   │       └── WebhookController.php  # API webhooks
│   ├── Model/
│   │   ├── Article.php               # Extends \OxidEsales\Eshop\Application\Model\Article
│   │   ├── Order.php                 # Extends \OxidEsales\Eshop\Application\Model\Order
│   │   └── Payment.php               # Extends \OxidEsales\Eshop\Application\Model\Payment
│   ├── Component/
│   │   ├── Widget/
│   │   │   └── PaymentWidget.php     # Custom widget component
│   │   └── UserComponent.php         # Custom user component
│   └── Service/
│       ├── PaymentService.php        # Payment processing logic
│       ├── NotificationService.php   # Notification handling
│       └── ApiClient.php             # External API communication
├── Core/
│   ├── Config.php                    # Extends \OxidEsales\Eshop\Core\Config
│   └── Utils.php                     # Extends \OxidEsales\Eshop\Core\Utils
├── EventSubscriber/
│   ├── OrderEventSubscriber.php      # Order-related events
│   └── PaymentEventSubscriber.php    # Payment-related events
├── Exception/
│   ├── PaymentException.php          # Payment-specific exceptions
│   └── ApiException.php              # API communication exceptions
└── Traits/
    ├── LoggerAwareTrait.php          # Logger dependency injection
    └── ConfigAwareTrait.php          # Configuration access
```

### Namespace Mapping

PSR-4 autoloading maps namespaces to directories:

```php
// composer.json autoload configuration
"MyVendor\\MyModule\\": "src/"

// Class file locations
MyVendor\MyModule\Application\Model\Article          → src/Application/Model/Article.php
MyVendor\MyModule\Service\PaymentService             → src/Service/PaymentService.php
MyVendor\MyModule\EventSubscriber\OrderEventSubscriber → src/EventSubscriber/OrderEventSubscriber.php
```

## Language Files

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Translations](https://www.youtube.com/watch?v=a4hz54TIsLM)
:::

Language files are discovered by **naming conventions** rather than metadata configuration.

### Frontend Translations

**Location**: `translations/{language}/`

```
translations/
├── de/
│   └── myvendormymodule_de_lang.php    # German frontend translations
├── en/
│   └── myvendormymodule_en_lang.php    # English frontend translations
└── fr/
    └── myvendormymodule_fr_lang.php    # French frontend translations
```

**File format**:
```php
<?php
$sLangName = 'English';

$aLang = [
    'charset' => 'UTF-8',
    
    'MYVENDOR_MYMODULE_PAYMENT_TITLE'       => 'Payment Method',
    'MYVENDOR_MYMODULE_PAYMENT_DESCRIPTION' => 'Secure payment processing',
    'MYVENDOR_MYMODULE_ERROR_INVALID_CARD'  => 'Invalid credit card number',
    'MYVENDOR_MYMODULE_SUCCESS_MESSAGE'     => 'Payment processed successfully',
];
```

### Admin Translations

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Settings](https://www.youtube.com/watch?v=2gLrhrEZ83M)
:::

**Location**: `views/admin_twig/{language}/`

```
views/admin_twig/
├── de/
│   ├── module_options.php              # German module settings
│   └── myvendormymodule_admin_de_lang.php
└── en/
    ├── module_options.php              # English module settings
    └── myvendormymodule_admin_en_lang.php
```

**Module options file format**:
```php
<?php
$aLang = [
    // Settings group names
    'SHOP_MODULE_GROUP_mymodule_main'     => 'Main Settings',
    'SHOP_MODULE_GROUP_mymodule_advanced' => 'Advanced Settings',
    
    // Setting labels
    'SHOP_MODULE_mymodule_api_key'        => 'API Key',
    'SHOP_MODULE_mymodule_enabled'        => 'Enable Module',
    'SHOP_MODULE_mymodule_timeout'        => 'Request Timeout (seconds)',
    
    // Setting option values
    'SHOP_MODULE_mymodule_mode_sandbox'   => 'Sandbox Mode',
    'SHOP_MODULE_mymodule_mode_live'      => 'Live Mode',
    
    // Help texts
    'HELP_SHOP_MODULE_mymodule_api_key'   => 'Your API key from the payment provider',
    'HELP_SHOP_MODULE_mymodule_timeout'   => 'Maximum time to wait for API responses',
];
```

:::note Translation Loading Requirement
To use translation files in your module, you must specify **at least one class** in the `extend` section of your `metadata.php`.
:::

:::warning Admin Translations
`module_options.php` translations are **only loaded when logged in as admin**.
:::

### Character Encoding

**UTF-8 is mandatory** for all language files:

```php
$aLang = [
    'charset' => 'UTF-8',  // Required!
    // ... translations
];
```

OXID eShop runs with UTF-8 by default and does not convert charsets. Use HTML entities for special characters if using other encodings.

## Templates & Views

### Frontend Templates

```
views/frontend/tpl/
├── payment/
│   ├── payment_form.tpl            # Payment form template
│   └── payment_success.tpl         # Success page template
├── widgets/
│   └── payment_widget.tpl          # Widget template
└── emails/
    ├── payment_confirmation.tpl    # Email templates
    └── payment_failure.tpl
```

### Admin Templates

```
views/admin_twig/
├── module_config.tpl               # Module configuration page
├── module_main.tpl                 # Main admin page
└── includes/
    └── module_sidebar.tpl          # Shared admin components
```

### Template Blocks

```
views/blocks/
├── layout_header.tpl               # Header modifications
├── page_checkout_payment.tpl       # Checkout payment block
└── footer_payment_icons.tpl        # Footer payment icons
```

**Block usage in metadata.php**:
```php
'blocks' => [
    [
        'template' => 'layout/header.tpl',
        'block'    => 'layout_header_bottom',
        'file'     => 'views/blocks/layout_header.tpl',
        'position' => '1'
    ],
],
```

## Static Assets

:::tip YouTube Tutorial
Watch a short video tutorial: [Custom Styles in Modules](https://www.youtube.com/watch?v=RouvOeQpCFE)
:::

### Asset Organization

```
assets/
├── css/
│   ├── admin.css                   # Admin interface styles
│   ├── frontend.css                # Frontend styles
│   └── vendor/                     # Third-party CSS
├── js/
│   ├── admin.js                    # Admin JavaScript
│   ├── frontend.js                 # Frontend JavaScript
│   ├── payment-form.js             # Specific functionality
│   └── vendor/                     # Third-party JavaScript
└── images/
    ├── logo.png                    # Module logo
    ├── payment-icons/              # Payment method icons
    └── admin-icons/                # Admin interface icons
```

### Asset Linking

Assets are automatically symlinked to: `out/modules/{module-id}/`

**Template usage**:
```twig
{# CSS inclusion #}
{{ style({ include: oViewConf.getModuleUrl('myvendor-mymodule', 'css/frontend.css') }) }}

{# JavaScript inclusion #}
{{ script({ include: oViewConf.getModuleUrl('myvendor-mymodule', 'js/payment-form.js') }) }}

{# Image usage #}
<img src="{{ oViewConf.getModuleUrl('myvendor-mymodule', 'images/logo.png') }}" alt="Logo">
```

**PHP usage**:
```php
$moduleUrl = $this->getViewConfig()->getModuleUrl('myvendor-mymodule', 'css/frontend.css');
```

## Database Migrations

```
migration/data/
├── Version20241122000001.php       # Initial schema
├── Version20241123000001.php       # Add payment table
└── Version20241124000001.php       # Add indexes
```

**Migration file example**:
```php
<?php declare(strict_types=1);

namespace MyVendor\MyModule\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20241122000001 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql("
            CREATE TABLE mymodule_payments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                order_id VARCHAR(32) NOT NULL,
                payment_method VARCHAR(50) NOT NULL,
                status VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB
        ");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DROP TABLE IF EXISTS mymodule_payments");
    }
}
```

## Testing Structure

```
tests/
├── Unit/                           # Unit tests
│   ├── Service/
│   │   └── PaymentServiceTest.php
│   ├── Model/
│   │   └── ArticleTest.php
│   └── Controller/
│       └── PaymentControllerTest.php
├── Integration/                    # Integration tests
│   ├── Model/
│   │   └── OrderIntegrationTest.php
│   └── Service/
│       └── PaymentIntegrationTest.php
├── Codeception/                    # Acceptance tests
│   ├── acceptance/
│   ├── _support/
│   └── codeception.yml
├── PhpStan/                        # Static analysis
│   └── phpstan.neon
└── phpunit.xml                     # PHPUnit configuration
```

## Naming Conventions

### Module ID Format
- **Pattern**: `vendor-modulename`
- **Example**: `mycompany-advancedpayment`
- **Rules**: Lowercase, hyphen-separated, unique

### Class Naming
- **Namespace**: `MyVendor\MyModule\...`
- **Example**: `MyCompany\AdvancedPayment\Service\PaymentProcessor`
- **Rules**: PascalCase, PSR-4 compliant

### File Naming
- **PHP Classes**: Match class name exactly
- **Templates**: Lowercase with underscores
- **Assets**: Lowercase with hyphens
- **Language files**: `{vendor}{module}_{lang}_lang.php`

### Translation Keys
- **Frontend**: `MYVENDOR_MYMODULE_KEY_NAME`
- **Admin**: `SHOP_MODULE_mymodule_setting_name`
- **Rules**: UPPERCASE, underscore-separated

## Best Practices

### 1. Consistent Structure
```
✅ Good: Organized by function and layer
src/
├── Application/Model/
├── Application/Controller/
└── Service/

❌ Bad: Mixed organization
src/
├── PaymentStuff/
├── RandomFiles/
└── Utils/
```

### 2. Clear Naming
```
✅ Good: Descriptive and consistent
PaymentProcessingService.php
OrderConfirmationController.php

❌ Bad: Vague or inconsistent  
Helper.php
Stuff.php
```

### 3. Logical Grouping
```
✅ Good: Related files together
assets/js/
├── payment-form.js
├── payment-validation.js
└── payment-processing.js

❌ Bad: No logical grouping
assets/js/
├── file1.js
├── randomScript.js
└── utils.js
```

### 4. Documentation
```
✅ Good: Comprehensive documentation
├── README.md              # Installation & usage
├── CHANGELOG.md           # Version history
└── docs/
    ├── configuration.md   # Configuration guide
    └── api.md            # API documentation

❌ Bad: No documentation
└── (no documentation files)
```

## Validation Checklist

Before releasing your module:

- ✅ **Unique module ID** follows naming conventions
- ✅ **PSR-4 structure** matches namespace declarations  
- ✅ **Language files** exist for all supported languages
- ✅ **Asset organization** is logical and consistent
- ✅ **Translation keys** follow naming conventions
- ✅ **Test coverage** exists for critical functionality
- ✅ **Documentation** covers installation and usage
- ✅ **Migration files** handle schema changes properly

## Related Topics

- **[metadata.php Configuration](metadataphp/)**: Module metadata setup
- **[composer.json Setup](composerjson/)**: Package management
- **[Module Services](../../module-services)**: Service container integration
- **[Module Installation](../../installation-setup/)**: Deployment process