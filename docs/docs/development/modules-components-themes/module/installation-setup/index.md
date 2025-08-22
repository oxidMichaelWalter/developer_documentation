---
sidebar_position: 2
---

# Module Installation & Activation

Proper module installation and activation is crucial for successful OXID eShop module deployment. This guide covers the complete process from installation through configuration to final setup and troubleshooting.

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

## Overview

A complete module deployment involves three key phases:

1. **[Installation](installation)** - Getting the module files into your shop
2. **[Configuration](configuration)** - Setting up module parameters and settings  
3. **[Setup](setup)** - Final activation and verification

If you encounter issues during any phase, consult the **[Troubleshooting](troubleshooting)** section.

## Installation Methods

### Method 1: Composer Installation (Recommended)

**Best for**: Production environments, version management, dependency handling

```bash
# Install module via Composer
composer require myvendor/mymodule

# Activate the module
./vendor/bin/oe-console oe:module:activate myvendor-mymodule
```

**Advantages**:
- ✅ Automatic dependency resolution
- ✅ Version management and updates
- ✅ Clean uninstallation
- ✅ Professional distribution

### Method 2: Manual Installation

**Best for**: Development, custom modules, quick testing

```bash
# 1. Copy module to modules directory
cp -r myvendor-mymodule/ source/modules/myvendor/mymodule/

# 2. Activate the module
./vendor/bin/oe-console oe:module:activate myvendor-mymodule
```

**Considerations**:
- ⚠️ Manual dependency management
- ⚠️ No automatic updates
- ⚠️ Manual cleanup required

### Method 3: Development Installation

**Best for**: Active module development

```bash
# 1. Clone/symlink during development
ln -s /path/to/development/mymodule source/modules/myvendor/mymodule

# 2. Install dependencies if composer.json exists
cd source/modules/myvendor/mymodule && composer install

# 3. Activate module
./vendor/bin/oe-console oe:module:activate myvendor-mymodule
```

## Quick Start Guide

### 1. Prerequisites Check

Before installation, verify:

```bash
# Check OXID eShop version compatibility
./vendor/bin/oe-console --version

# Check PHP version
php --version

# Verify file permissions
ls -la source/modules/
```

### 2. Installation Process

```bash
# Step 1: Install the module
composer require myvendor/mymodule

# Step 2: Clear cache (if needed)
rm -rf source/tmp/*

# Step 3: Activate module
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Step 4: Verify installation
./vendor/bin/oe-console oe:module:list
```

### 3. Immediate Verification

After activation, check:

- ✅ **Admin Interface**: Module appears in Extensions → Modules
- ✅ **Frontend**: Module functionality works as expected
- ✅ **Logs**: No error messages in `source/log/oxideshop.log`
- ✅ **Database**: Module tables created (if applicable)

## Multi-Shop Installation

### Enterprise Edition with Multiple Shops

```bash
# Activate for specific shop
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --shop-id=2

# Activate for all shops
for shop_id in 1 2 3; do
    ./vendor/bin/oe-console oe:module:activate myvendor-mymodule --shop-id=$shop_id
done

# Check activation status per shop
./vendor/bin/oe-console oe:module:list --shop-id=2
```

## Configuration Phase

After successful installation, configure module settings:

### Admin Interface Configuration

1. **Navigate to**: Extensions → Modules → [Your Module]
2. **Configure Settings**: Fill in required parameters
3. **Save Configuration**: Apply changes
4. **Test Functionality**: Verify module behavior

### Programmatic Configuration

```php
use OxidEsales\Eshop\Core\Registry;

// Get module settings service
$moduleSettings = Registry::getContainer()
    ->get(\OxidEsales\EshopCommunity\Internal\Framework\Module\Setting\SettingDaoInterface::class);

// Set module configuration
$moduleSettings->save(
    'myvendor-mymodule',
    'api_key', 
    'your-api-key-here',
    1 // shop id
);
```

## Validation & Testing

### Post-Installation Checks

```bash
# 1. Verify module status
./vendor/bin/oe-console oe:module:list | grep myvendor-mymodule

# 2. Check for errors
tail -f source/log/oxideshop.log

# 3. Test frontend functionality
curl -I http://localhost/your-shop/

# 4. Verify admin access
# Navigate to admin → Extensions → Modules
```

### Functional Testing

```php
// Test module services
$container = \OxidEsales\EshopCommunity\Internal\Container\ContainerFacade::getContainer();
$moduleService = $container->get('MyVendor\MyModule\Service\MyService');

// Test module functionality
$result = $moduleService->performOperation();
assert($result === 'expected_value');
```

## Common Installation Scenarios

### Scenario 1: Fresh Installation

```bash
# Complete fresh module setup
composer require myvendor/mymodule
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Configure via admin interface or CLI
./vendor/bin/oe-console oe:module:configure myvendor-mymodule
```

### Scenario 2: Module Update

```bash
# Update existing module
composer update myvendor/mymodule

# Reactivate to apply changes
./vendor/bin/oe-console oe:module:deactivate myvendor-mymodule
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Run migrations if needed
./vendor/bin/oe-eshop-db_migrate migrations:migrate myvendor-mymodule
```

### Scenario 3: Development Environment

```bash
# Install in development mode
composer require myvendor/mymodule --dev

# Enable debug mode
export OXID_DEBUG=1

# Activate with verbose output
./vendor/bin/oe-console oe:module:activate myvendor-mymodule -v
```

## Best Practices

### 1. Pre-Installation Planning

- **📋 Document Dependencies**: List all required packages and versions
- **🔍 Environment Check**: Verify PHP/OXID compatibility
- **💾 Backup Database**: Create backup before major module installations
- **🧪 Test Environment**: Install in staging before production

### 2. Installation Process

- **📦 Use Composer**: Prefer Composer over manual installation
- **🔄 Clear Caches**: Clear all caches after installation
- **📊 Monitor Logs**: Watch for errors during activation
- **✅ Verify Functionality**: Test immediately after activation

### 3. Configuration Management

- **🔐 Secure Credentials**: Store API keys securely
- **📝 Document Settings**: Maintain configuration documentation
- **🔄 Version Control**: Track configuration changes
- **🧪 Test Settings**: Validate configuration before going live

### 4. Maintenance

- **🔄 Regular Updates**: Keep modules up to date
- **📊 Monitor Performance**: Watch for performance impacts
- **🗄️ Database Maintenance**: Run migrations when needed
- **📋 Documentation**: Keep installation docs current

## Module Dependencies

### Automatic Dependency Resolution

When using Composer, dependencies are resolved automatically:

```json
// composer.json in your module
{
    "require": {
        "oxid-esales/oxideshop-ce": "^7.1",
        "guzzlehttp/guzzle": "^7.0",
        "other-vendor/required-module": "^2.0"
    }
}
```

### Manual Dependency Management

For manual installations, ensure dependencies are met:

```bash
# Check required OXID version
grep -r "oxid-esales/oxideshop" composer.json

# Install dependencies manually
composer require guzzlehttp/guzzle

# Activate dependency modules first
./vendor/bin/oe-console oe:module:activate dependency-module
./vendor/bin/oe-console oe:module:activate your-module
```

## Integration with CI/CD

### Automated Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy Module
on:
  push:
    tags: ['*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Module
        run: |
          composer require myvendor/mymodule:${{ github.ref_name }}
          
      - name: Activate Module
        run: |
          ./vendor/bin/oe-console oe:module:activate myvendor-mymodule
          
      - name: Run Tests
        run: |
          ./vendor/bin/phpunit modules/myvendor/mymodule/tests/
```

### Environment-Specific Configuration

```bash
# Production deployment
ENVIRONMENT=production composer require myvendor/mymodule
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --env=prod

# Staging deployment  
ENVIRONMENT=staging composer require myvendor/mymodule
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --env=staging
```

## Related Documentation

- **[System Architecture: Module Installation & Activation](../../../system-architecture/module-installation-activation)**: Deep dive into the module lifecycle
- **[Module Skeleton](../skeleton/)**: Learn about proper module structure
- **[Troubleshooting](troubleshooting)**: Solve common installation issues
- **[Configuration Guide](configuration)**: Detailed configuration options
- **[Setup Instructions](setup)**: Advanced setup procedures

## Quick Reference

### Essential Commands

```bash
# Install
composer require vendor/module
./vendor/bin/oe-console oe:module:activate module-id

# Status
./vendor/bin/oe-console oe:module:list
./vendor/bin/oe-console oe:module:show module-id

# Manage
./vendor/bin/oe-console oe:module:deactivate module-id
./vendor/bin/oe-console oe:module:configure module-id

# Troubleshoot
tail -f source/log/oxideshop.log
./vendor/bin/oe-console cache:clear
```

### Common File Locations

- **Module Directory**: `source/modules/vendor/module/`
- **Composer Modules**: `vendor/vendor/module/`  
- **Configuration**: Admin → Extensions → Modules
- **Logs**: `source/log/oxideshop.log`
- **Cache**: `source/tmp/`