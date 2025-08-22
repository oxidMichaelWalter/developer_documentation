---
sidebar_position: 2
---

# composer.json Configuration

The `composer.json` file enables **professional package management** for OXID eShop modules. While optional, it's **highly recommended** for modern module development as it provides dependency management, autoloading, and standardized distribution.

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

## Overview

The `composer.json` file enables:

- **📦 Dependency Management**: Declare required packages and versions
- **🔄 PSR-4 Autoloading**: Automatic class loading without manual includes
- **📋 Package Metadata**: Standardized package information
- **🚀 Easy Installation**: `composer require vendor/module` 
- **🔗 Version Constraints**: Ensure compatibility with OXID eShop versions
- **📊 Packagist Distribution**: Publish modules for easy discovery

## Basic Structure

```json
{
    "name": "myvendor/mymodule",
    "description": "Description of what the module does",
    "type": "oxideshop-module",
    "keywords": ["oxid", "modules", "ecommerce", "payment"],
    "homepage": "https://www.mycompany.com/",
    "license": ["GPL-3.0-only"],
    "authors": [
        {
            "name": "My Company",
            "email": "info@mycompany.com",
            "homepage": "https://www.mycompany.com"
        }
    ],
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

## Required Fields

### name

**Format**: `vendor/package` (lowercase, hyphen-separated)

```json
{
    "name": "mycompany/advanced-payment"
}
```

**Rules**:
- Must be **unique** on Packagist
- Use **lowercase** only
- Separate words with **hyphens**
- Format: `{vendor}/{module-name}`

### type

Must be `oxideshop-module` for OXID eShop modules:

```json
{
    "type": "oxideshop-module"
}
```

This tells Composer that this is an OXID eShop module and activates the OXID-specific installation logic.

### require

Define minimum dependencies:

```json
{
    "require": {
        "php": "^8.1",
        "oxid-esales/oxideshop-ce": "^7.1"
    }
}
```

**Essential Dependencies**:
- **php**: Minimum PHP version
- **oxid-esales/oxideshop-ce**: Minimum OXID eShop version

## Package Information

### description

Clear, concise description of module functionality:

```json
{
    "description": "Advanced payment gateway integration with support for multiple providers"
}
```

### keywords

Help users discover your module:

```json
{
    "keywords": [
        "oxid",
        "modules", 
        "ecommerce",
        "payment",
        "gateway",
        "stripe",
        "paypal"
    ]
}
```

### homepage

Module or company website:

```json
{
    "homepage": "https://www.mycompany.com/oxid-modules/payment"
}
```

### license

Software license (use SPDX identifiers):

```json
{
    "license": ["GPL-3.0-only"]
}
```

**Common Licenses**:
- `GPL-3.0-only`: GNU GPL v3 only
- `MIT`: MIT License
- `Apache-2.0`: Apache License 2.0
- `proprietary`: Commercial/proprietary

### authors

Module developers/maintainers:

```json
{
    "authors": [
        {
            "name": "John Doe",
            "email": "john@mycompany.com",
            "homepage": "https://johndoe.dev",
            "role": "Developer"
        },
        {
            "name": "My Company Ltd.",
            "email": "info@mycompany.com",
            "homepage": "https://www.mycompany.com",
            "role": "Maintainer"
        }
    ]
}
```

## Autoloading Configuration

### PSR-4 Autoloading

Map namespaces to directories:

```json
{
    "autoload": {
        "psr-4": {
            "MyVendor\\MyModule\\": "src/",
            "MyVendor\\MyModule\\Tests\\": "tests/"
        }
    }
}
```

**Directory Mapping**:
```
src/
├── Application/              # MyVendor\MyModule\Application
├── Service/                  # MyVendor\MyModule\Service
└── EventSubscriber/          # MyVendor\MyModule\EventSubscriber

tests/
├── Unit/                     # MyVendor\MyModule\Tests\Unit
└── Integration/              # MyVendor\MyModule\Tests\Integration
```

### Files Autoloading

For non-PSR-4 files (legacy or special cases):

```json
{
    "autoload": {
        "files": [
            "functions/helper_functions.php",
            "legacy/compatibility.php"
        ]
    }
}
```

## OXID-Specific Configuration

### Installation Target

Define where the module should be installed:

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

### Blacklist Files

Exclude files from module installation:

```json
{
    "extra": {
        "oxideshop": {
            "target-directory": "myvendor/mymodule",
            "blacklist-filter": [
                "tests/**/*",
                "docs/**/*",
                ".github/**/*",
                "*.md",
                "phpunit.xml"
            ]
        }
    }
}
```

## Dependency Management

### OXID eShop Version Constraints

```json
{
    "require": {
        "oxid-esales/oxideshop-ce": "^7.1",
        "oxid-esales/oxideshop-pe": "^7.1",
        "oxid-esales/oxideshop-ee": "^7.1"
    }
}
```

**Version Constraint Operators**:
- `^7.1`: Compatible with 7.1.0, but not 8.0.0
- `~7.1.5`: Compatible with 7.1.5, but not 7.2.0
- `>=7.1,<8.0`: Range specification
- `7.1.*`: Any 7.1.x version

### External Dependencies

```json
{
    "require": {
        "guzzlehttp/guzzle": "^7.0",
        "monolog/monolog": "^3.0",
        "symfony/validator": "^6.0",
        "league/csv": "^9.0"
    }
}
```

### Development Dependencies

```json
{
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "squizlabs/php_codesniffer": "^3.7",
        "phpstan/phpstan": "^1.0",
        "mockery/mockery": "^1.5"
    }
}
```

## Advanced Configuration

### Scripts

Automate common tasks:

```json
{
    "scripts": {
        "test": "phpunit",
        "test-coverage": "phpunit --coverage-html coverage",
        "cs-check": "phpcs --standard=PSR12 src/",
        "cs-fix": "phpcbf --standard=PSR12 src/",
        "analyse": "phpstan analyse src/ --level=8",
        "post-install-cmd": "php scripts/post-install.php",
        "post-update-cmd": "php scripts/post-update.php"
    }
}
```

Usage:
```bash
composer test
composer cs-check
composer analyse
```

### Conflict Resolution

Declare incompatible packages:

```json
{
    "conflict": {
        "old-vendor/old-payment-module": "*",
        "competitor/similar-module": "<2.0"
    }
}
```

### Suggestions

Recommend complementary packages:

```json
{
    "suggest": {
        "myvendor/analytics-module": "Enhanced analytics tracking",
        "myvendor/fraud-protection": "Advanced fraud detection"
    }
}
```

### Platform Requirements

Specify required PHP extensions:

```json
{
    "require": {
        "php": "^8.1",
        "ext-curl": "*",
        "ext-json": "*",
        "ext-openssl": "*",
        "ext-mbstring": "*"
    }
}
```

## Complete Example

```json
{
    "name": "mycompany/advanced-payment",
    "description": "Professional payment gateway integration for OXID eShop with support for Stripe, PayPal, and custom providers",
    "type": "oxideshop-module",
    "keywords": [
        "oxid",
        "modules",
        "ecommerce", 
        "payment",
        "gateway",
        "stripe",
        "paypal",
        "pci-compliant"
    ],
    "homepage": "https://www.mycompany.com/oxid-payment",
    "license": ["GPL-3.0-only"],
    "authors": [
        {
            "name": "Payment Team",
            "email": "payment@mycompany.com",
            "homepage": "https://www.mycompany.com",
            "role": "Development Team"
        }
    ],
    "support": {
        "email": "support@mycompany.com",
        "docs": "https://docs.mycompany.com/oxid-payment",
        "issues": "https://github.com/mycompany/oxid-payment/issues"
    },
    "require": {
        "php": "^8.1",
        "oxid-esales/oxideshop-ce": "^7.1",
        "guzzlehttp/guzzle": "^7.0",
        "monolog/monolog": "^3.0",
        "stripe/stripe-php": "^10.0",
        "paypal/paypal-checkout-sdk": "^1.0",
        "ext-curl": "*",
        "ext-json": "*",
        "ext-openssl": "*"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "mockery/mockery": "^1.5",
        "squizlabs/php_codesniffer": "^3.7",
        "phpstan/phpstan": "^1.0",
        "friendsofphp/php-cs-fixer": "^3.0"
    },
    "autoload": {
        "psr-4": {
            "MyCompany\\AdvancedPayment\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "MyCompany\\AdvancedPayment\\Tests\\": "tests/"
        }
    },
    "extra": {
        "oxideshop": {
            "target-directory": "mycompany/advancedpayment",
            "blacklist-filter": [
                "tests/**/*",
                "docs/**/*", 
                ".github/**/*",
                "*.md",
                "phpunit.xml",
                ".phpcs.xml",
                ".phpstan.neon"
            ]
        }
    },
    "scripts": {
        "test": "phpunit",
        "test-coverage": "phpunit --coverage-html coverage",
        "cs-check": "phpcs --standard=PSR12 src/",
        "cs-fix": "phpcbf --standard=PSR12 src/",
        "analyse": "phpstan analyse src/ --level=8",
        "quality": [
            "@cs-check",
            "@analyse", 
            "@test"
        ]
    },
    "config": {
        "optimize-autoloader": true,
        "sort-packages": true
    }
}
```

## Installation & Usage

### Module Installation

```bash
# Install via Composer
composer require mycompany/advanced-payment

# Activate module
./vendor/bin/oe-console oe:module:activate mycompany-advancedpayment
```

### Development Workflow

```bash
# Install development dependencies
composer install

# Run quality checks
composer quality

# Run specific tests
composer test -- --filter PaymentTest

# Fix code style issues
composer cs-fix
```

## Best Practices

### 1. Semantic Versioning

```json
{
    "version": "2.1.3"
}
```

- **Major** (2): Breaking changes
- **Minor** (1): New features, backward compatible
- **Patch** (3): Bug fixes, backward compatible

### 2. Proper Version Constraints

```json
{
    "require": {
        "oxid-esales/oxideshop-ce": "^7.1",  // Allow minor updates
        "guzzlehttp/guzzle": "^7.0",         // Allow minor/patch updates
        "ext-json": "*"                      // Any version of extension
    }
}
```

### 3. Security Considerations

```json
{
    "require": {
        "ext-openssl": "*",     // For secure communications
        "ext-hash": "*"         // For token generation
    },
    "config": {
        "secure-http": true     // Force HTTPS for packages
    }
}
```

### 4. Performance Optimization

```json
{
    "config": {
        "optimize-autoloader": true,
        "classmap-authoritative": true,
        "apcu-autoloader": true
    }
}
```

## Troubleshooting

### Common Issues

1. **Module not found after installation**
   - Check `target-directory` configuration
   - Verify autoload namespace mapping
   - Run `composer dump-autoload`

2. **Class loading errors**
   - Ensure PSR-4 namespace matches directory structure
   - Check for typos in class names
   - Verify `src/` directory structure

3. **Dependency conflicts**
   - Use `composer why-not vendor/package` to diagnose
   - Adjust version constraints
   - Consider using `conflict` declarations

### Debug Commands

```bash
# Show installed packages
composer show

# Validate composer.json
composer validate

# Show autoload mapping
composer dump-autoload --optimize --verbose

# Check platform requirements
composer check-platform-reqs
```

## See Also

- **[Module via Composer](./module-via-composer)**: Complete composer.json template and configuration guide

## Related Topics

- **[metadata.php Configuration](../metadataphp/)**: Module metadata setup
- **[Module Structure](../structure)**: File organization patterns
- **[Module Installation](../../installation-setup/)**: Deployment process
- **[PSR-4 Autoloading](https://www.php-fig.org/psr/psr-4/)**: Autoloading standard