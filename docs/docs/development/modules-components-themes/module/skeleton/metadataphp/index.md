---
sidebar_position: 1
---

# metadata.php Configuration

The `metadata.php` file is the **core configuration file** for every OXID eShop module. It defines essential module information, dependencies, extensions, and settings that control how the module integrates with the shop.

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

## Overview

The metadata file must be located in the **module's root directory** and defines a PHP array `$aModule` containing all module configuration:

```php
<?php
/**
 * Module metadata
 */
$aModule = [
    // Basic module information
    'id'          => 'myvendor-mymodule',
    'title'       => 'My Module Title',
    'description' => 'Detailed module description',
    
    // Module details
    'version'     => '1.0.0',
    'author'      => 'My Company',
    'url'         => 'https://www.mycompany.com',
    'email'       => 'support@mycompany.com',
    
    // Integration
    'extend'      => [],    // Class extensions
    'controllers' => [],    // Custom controllers
    'templates'   => [],    // Template assignments
    'blocks'      => [],    // Template blocks
    'settings'    => [],    // Configuration settings
    'events'      => [],    // Module events
];
```

:::warning Metadata Version
Support for metadata versions 1, 1.1, and 1.2 has been **dropped**. Always use **version 2.0 or later**.
:::

## Required Fields

### id (Required)

**Format**: `vendor-modulename` (lowercase, hyphen-separated)

```php
'id' => 'mycompany-paymentmodule',
```

**Rules**:
- Must be **unique** across all modules
- Use **lowercase** letters and **hyphens** only
- Follow pattern: `{vendor}-{module}`
- Cannot contain spaces, underscores, or special characters

### title (Required)

Human-readable module name displayed in admin interface:

```php
'title' => 'Advanced Payment Gateway',
```

### description (Required)

Detailed description of module functionality:

```php
'description' => [
    'de' => 'Erweiterte Zahlungsabwicklung für OXID eShop',
    'en' => 'Advanced payment processing for OXID eShop',
],
// Or simple string
'description' => 'Advanced payment processing module for OXID eShop',
```

## Basic Information Fields

### version

Module version following semantic versioning:

```php
'version' => '1.2.3',
```

### author

Module developer or company name:

```php
'author' => 'My Company Ltd.',
```

### url

Homepage or documentation URL:

```php
'url' => 'https://www.mycompany.com/oxid-modules',
```

### email

Support or contact email:

```php
'email' => 'support@mycompany.com',
```

### thumbnail

Module logo/icon (relative to module root):

```php
'thumbnail' => 'logo.png',
```

## Core Integration

### extend

Extend existing OXID eShop classes:

```php
'extend' => [
    // Extend Article model
    \OxidEsales\Eshop\Application\Model\Article::class => 
        \MyVendor\MyModule\Application\Model\Article::class,
        
    // Extend User model  
    \OxidEsales\Eshop\Application\Model\User::class =>
        \MyVendor\MyModule\Application\Model\User::class,
        
    // Extend Order controller
    \OxidEsales\Eshop\Application\Controller\OrderController::class =>
        \MyVendor\MyModule\Application\Controller\Order::class,
],
```

**Best Practices**:
- Always use **full namespaces** (no leading backslash)
- Follow **PSR-4 structure** in your module
- Prefer **composition over inheritance** when possible

### controllers

Register custom frontend and admin controllers:

```php
'controllers' => [
    // Frontend controllers
    'mymodule_payment' => \MyVendor\MyModule\Application\Controller\PaymentController::class,
    'mymodule_webhook' => \MyVendor\MyModule\Application\Controller\WebhookController::class,
    
    // Admin controllers  
    'mymodule_admin_config' => \MyVendor\MyModule\Application\Controller\Admin\ConfigController::class,
    'mymodule_admin_main' => \MyVendor\MyModule\Application\Controller\Admin\MainController::class,
],
```

**Naming Convention**: Use `{moduleid}_{purpose}` format

### templates

Override or assign templates:

```php
'templates' => [
    // Override existing templates
    'order_payment.tpl' => 'myvendor/mymodule/views/frontend/tpl/order_payment.tpl',
    
    // Assign custom templates
    'mymodule_payment_form.tpl' => 'myvendor/mymodule/views/frontend/tpl/payment_form.tpl',
],
```

### blocks

Insert content into template blocks:

```php
'blocks' => [
    [
        'template' => 'layout/header.tpl',
        'block'    => 'layout_header_bottom',
        'file'     => 'views/blocks/header_tracking.tpl',
        'position' => '1'
    ],
    [
        'template' => 'page/checkout/payment.tpl', 
        'block'    => 'checkout_payment_main',
        'file'     => 'views/blocks/payment_options.tpl',
        'position' => '10'
    ],
],
```

**Block Parameters**:
- **template**: Target template containing the block
- **block**: Block name to modify
- **file**: Your template file (relative to module root)
- **position**: Insertion order (lower = earlier)

## Module Settings

### settings

Define configurable module options:

```php
'settings' => [
    [
        'group' => 'mymodule_main',
        'name'  => 'mymodule_api_key',
        'type'  => 'str',
        'value' => '',
        'constraints' => '^[A-Za-z0-9]{32}$'
    ],
    [
        'group' => 'mymodule_main',
        'name'  => 'mymodule_enabled',
        'type'  => 'bool',
        'value' => false
    ],
    [
        'group' => 'mymodule_advanced',
        'name'  => 'mymodule_timeout',
        'type'  => 'num',
        'value' => 30,
        'constraints' => '5|300'  // Min|Max
    ],
    [
        'group' => 'mymodule_main',
        'name'  => 'mymodule_mode',
        'type'  => 'select',
        'value' => 'sandbox',
        'constraints' => 'sandbox|live'
    ],
    [
        'group' => 'mymodule_main',
        'name'  => 'mymodule_countries',
        'type'  => 'arr',
        'value' => ['DE', 'AT', 'CH']
    ],
    [
        'group' => 'mymodule_password',
        'name'  => 'mymodule_secret',
        'type'  => 'password',
        'value' => ''
    ],
],
```

**Setting Types**:
- **str**: String input
- **bool**: Boolean checkbox
- **num**: Numeric input
- **select**: Dropdown selection
- **arr**: Array/list input
- **password**: Masked password input

**Constraints**:
- **str**: Regular expression pattern
- **num**: `min|max` values
- **select**: `option1|option2|option3`

## Module Lifecycle

### events

Hook into module lifecycle events:

```php
'events' => [
    'onActivate'   => \MyVendor\MyModule\Core\Events::class . '::onActivate',
    'onDeactivate' => \MyVendor\MyModule\Core\Events::class . '::onDeactivate',
],
```

**Event Implementation**:

```php
<?php
namespace MyVendor\MyModule\Core;

class Events
{
    public static function onActivate(): void
    {
        // Run database migrations
        exec('vendor/bin/oe-eshop-db_migrate migrations:migrate myvendor-mymodule');
        
        // Initialize module data
        self::createDefaultCategories();
    }
    
    public static function onDeactivate(): void
    {
        // Cleanup (be careful not to delete user data)
        self::clearCaches();
    }
    
    private static function createDefaultCategories(): void
    {
        // Implementation...
    }
    
    private static function clearCaches(): void
    {
        // Implementation...
    }
}
```

## Advanced Configuration

### Multi-Language Support

```php
'title' => [
    'de' => 'Mein Modul',
    'en' => 'My Module',
    'fr' => 'Mon Module',
],

'description' => [
    'de' => 'Deutsche Beschreibung',
    'en' => 'English description', 
    'fr' => 'Description française',
],
```

### Conditional Extensions

```php
'extend' => [
    // Only extend if Enterprise Edition
    \OxidEsales\EshopEnterprise\Application\Model\Article::class =>
        \MyVendor\MyModule\Application\Model\Enterprise\Article::class,
        
    // Always extend Community base
    \OxidEsales\Eshop\Application\Model\Article::class =>
        \MyVendor\MyModule\Application\Model\Article::class,
],
```

### Admin Menu Integration

Reference in `menu.xml` file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OX>
    <OXMENU id="NAVIGATION_ESHOPADMIN">
        <MAINMENU id="mymodule_main">
            <SUBMENU id="mymodule_config" cl="mymodule_admin_config" />
            <SUBMENU id="mymodule_list" cl="mymodule_admin_list" />
        </MAINMENU>
    </OXMENU>
</OX>
```

## Complete Example

```php
<?php
/**
 * Advanced Payment Module
 * Metadata Configuration
 */
$aModule = [
    // Basic Information
    'id'          => 'mycompany-advancedpayment',
    'title'       => [
        'de' => 'Erweiterte Zahlungsabwicklung',
        'en' => 'Advanced Payment Processing',
    ],
    'description' => [
        'de' => 'Professionelle Zahlungsabwicklung mit mehreren Gateways',
        'en' => 'Professional payment processing with multiple gateways',
    ],
    'thumbnail'   => 'logo.png',
    'version'     => '2.1.0',
    'author'      => 'MyCompany Payment Solutions',
    'url'         => 'https://www.mycompany.com/oxid-payment',
    'email'       => 'support@mycompany.com',
    
    // Core Integration
    'extend' => [
        \OxidEsales\Eshop\Application\Model\Order::class =>
            \MyCompany\AdvancedPayment\Application\Model\Order::class,
        \OxidEsales\Eshop\Application\Model\Payment::class =>
            \MyCompany\AdvancedPayment\Application\Model\Payment::class,
        \OxidEsales\Eshop\Application\Controller\OrderController::class =>
            \MyCompany\AdvancedPayment\Application\Controller\Order::class,
    ],
    
    'controllers' => [
        'advpay_webhook'     => \MyCompany\AdvancedPayment\Application\Controller\WebhookController::class,
        'advpay_return'      => \MyCompany\AdvancedPayment\Application\Controller\ReturnController::class,
        'advpay_admin_main'  => \MyCompany\AdvancedPayment\Application\Controller\Admin\MainController::class,
        'advpay_admin_logs'  => \MyCompany\AdvancedPayment\Application\Controller\Admin\LogsController::class,
    ],
    
    'templates' => [
        'order_payment.tpl' => 'mycompany/advancedpayment/views/frontend/tpl/order_payment.tpl',
    ],
    
    'blocks' => [
        [
            'template' => 'page/checkout/payment.tpl',
            'block'    => 'checkout_payment_main',
            'file'     => 'views/blocks/payment_methods.tpl',
            'position' => '5'
        ],
        [
            'template' => 'layout/footer.tpl',
            'block'    => 'footer_main',
            'file'     => 'views/blocks/payment_icons.tpl',
            'position' => '1'
        ],
    ],
    
    // Configuration
    'settings' => [
        // Main Settings
        [
            'group' => 'advpay_main',
            'name'  => 'advpay_enabled',
            'type'  => 'bool',
            'value' => false
        ],
        [
            'group' => 'advpay_main',
            'name'  => 'advpay_mode',
            'type'  => 'select',
            'value' => 'sandbox',
            'constraints' => 'sandbox|live'
        ],
        [
            'group' => 'advpay_main',
            'name'  => 'advpay_api_key',
            'type'  => 'str',
            'value' => '',
            'constraints' => '^[A-Za-z0-9]{32,64}$'
        ],
        [
            'group' => 'advpay_main',
            'name'  => 'advpay_secret',
            'type'  => 'password',
            'value' => ''
        ],
        
        // Advanced Settings
        [
            'group' => 'advpay_advanced',
            'name'  => 'advpay_timeout',
            'type'  => 'num',
            'value' => 30,
            'constraints' => '5|300'
        ],
        [
            'group' => 'advpay_advanced',
            'name'  => 'advpay_allowed_countries',
            'type'  => 'arr',
            'value' => ['DE', 'AT', 'CH', 'NL', 'BE']
        ],
        [
            'group' => 'advpay_advanced',
            'name'  => 'advpay_debug_enabled',
            'type'  => 'bool',
            'value' => false
        ],
    ],
    
    // Lifecycle Events
    'events' => [
        'onActivate'   => \MyCompany\AdvancedPayment\Core\Events::class . '::onActivate',
        'onDeactivate' => \MyCompany\AdvancedPayment\Core\Events::class . '::onDeactivate',
    ],
];
```

## Validation & Testing

### Validation Checklist

- ✅ All **required fields** present (`id`, `title`, `description`)
- ✅ **Module ID** follows naming convention
- ✅ **Namespace paths** are correct and exist
- ✅ **Settings groups** are properly organized
- ✅ **Block positions** don't conflict with other modules
- ✅ **Event handlers** are implemented and tested

### Testing Configuration

```php
// Test in development environment
if (class_exists(\MyVendor\MyModule\Application\Model\Article::class)) {
    echo "Module classes loaded correctly\n";
}

// Validate settings
$moduleSettings = \OxidEsales\Eshop\Core\Registry::getConfig()->getModuleSettings('myvendor-mymodule');
var_dump($moduleSettings);
```

## Related Topics

- **[composer.json Configuration](../composerjson/)**: Package management setup
- **[Module Structure](../structure)**: File organization patterns
- **[Module Installation](../../installation-setup/)**: Deployment and activation
- **[Module Services](../../module-services)**: Dependency injection setup