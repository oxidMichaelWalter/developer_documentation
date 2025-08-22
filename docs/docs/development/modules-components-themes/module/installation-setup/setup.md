---
sidebar_position: 3
---

# Module Setup & Activation

After successful installation and configuration, the final step is module activation. This guide covers different activation methods, verification procedures, and post-activation setup for optimal module operation.

## Overview

Module activation is the process that:

1. **Registers the module** with OXID eShop's module system
2. **Applies class extensions** defined in metadata.php
3. **Registers custom controllers** and routes
4. **Activates template blocks** and modifications
5. **Triggers module events** (onActivate)
6. **Updates module metadata** in the database

## Activation Methods

There are **three primary ways** to activate OXID eShop modules:

### Method 1: Admin Panel Activation (Recommended for Manual Setup)

**Best for**: Single module activation, testing, initial setup

#### Steps:

1. **Access Admin Panel**: Login to OXID eShop administration
2. **Navigate to Modules**: Go to `Extensions → Modules`
3. **Locate Module**: Find your module in the list
4. **Activate**: Click the "Activate" button

#### Admin Interface Workflow:

```
Admin Panel Navigation:
├── 🏠 Dashboard
├── 📦 Extensions
│   ├── 🔧 Modules                    ← Click here
│   │   ├── 📋 Module List
│   │   │   ├── ⚪ myvendor-mymodule  ← Find your module
│   │   │   │   ├── ℹ️ Information
│   │   │   │   ├── ⚙️ Settings
│   │   │   │   └── ✅ Activate       ← Click to activate
│   │   │   └── ...
│   │   └── 📊 Module Overview
│   └── ...
```

#### Visual Confirmation:

After activation, you should see:
- ✅ **Green checkmark** next to module name
- ✅ **"Active" status** in module list
- ✅ **Module settings** become available
- ✅ **Module blocks** appear in relevant templates

### Method 2: Console Command Activation (Recommended for Automation)

**Best for**: Deployment scripts, automation, batch operations

#### Basic Activation:

```bash
# Activate module for default shop (shop ID 1)
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Check activation status
./vendor/bin/oe-console oe:module:list | grep myvendor-mymodule
```

#### Multi-Shop Activation:

```bash
# Activate for specific shop
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --shop-id=2

# Activate for multiple shops
for shop_id in 1 2 3; do
    ./vendor/bin/oe-console oe:module:activate myvendor-mymodule --shop-id=$shop_id
done

# Verify activation across shops
./vendor/bin/oe-console oe:module:list --shop-id=1
./vendor/bin/oe-console oe:module:list --shop-id=2
./vendor/bin/oe-console oe:module:list --shop-id=3
```

#### Advanced Activation Options:

```bash
# Activate with verbose output
./vendor/bin/oe-console oe:module:activate myvendor-mymodule -v

# Force activation (bypass some checks)
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --force

# Dry-run activation (test without applying)
./vendor/bin/oe-console oe:module:activate myvendor-mymodule --dry-run
```

#### Finding Module and Shop IDs:

```bash
# Find module ID (from metadata.php)
grep -r "id.*=>" source/modules/myvendor/mymodule/metadata.php

# List all available modules
./vendor/bin/oe-console oe:module:list

# Find shop IDs (Enterprise Edition)
./vendor/bin/oe-console oe:shop:list
```

### Method 3: Bulk Activation (Deployment)

**Best for**: Production deployment, CI/CD pipelines, infrastructure as code

#### Configuration-Based Activation:

Create a deployment configuration file:

```yaml
# config/module-deployment.yaml
modules:
  activation:
    - id: myvendor-paymentmodule
      shops: [1, 2, 3]
      settings:
        enabled: true
        api_key: "${PAYMENT_API_KEY}"
        environment: "${ENVIRONMENT}"
    
    - id: myvendor-analyticsmodule  
      shops: [1]
      settings:
        enabled: true
        tracking_id: "${ANALYTICS_TRACKING_ID}"
```

#### Deployment Script:

```bash
#!/bin/bash
# deploy-modules.sh

set -e

ENVIRONMENT=${1:-development}
CONFIG_FILE="config/module-deployment.yaml"

echo "Deploying modules for environment: $ENVIRONMENT"

# Parse YAML and activate modules
yq eval '.modules.activation[] | .id' $CONFIG_FILE | while read module_id; do
    echo "Activating module: $module_id"
    
    # Get shops for this module
    shops=$(yq eval ".modules.activation[] | select(.id == \"$module_id\") | .shops[]" $CONFIG_FILE)
    
    for shop_id in $shops; do
        echo "  - Shop $shop_id"
        ./vendor/bin/oe-console oe:module:activate $module_id --shop-id=$shop_id
    done
done

echo "All modules activated successfully"
```

#### Usage:

```bash
# Deploy for different environments
./deploy-modules.sh development
./deploy-modules.sh staging  
./deploy-modules.sh production
```

## Activation Verification

### Quick Status Check:

```bash
# Check if module is activated
./vendor/bin/oe-console oe:module:show myvendor-mymodule

# List all active modules
./vendor/bin/oe-console oe:module:list --active-only

# Check module details
./vendor/bin/oe-console oe:module:show myvendor-mymodule --details
```

### Detailed Verification:

```php
<?php
// verify-module-activation.php

use OxidEsales\Eshop\Core\Registry;
use OxidEsales\EshopCommunity\Internal\Container\ContainerFacade;

$moduleId = 'myvendor-mymodule';
$shopId = 1;

// Check if module is active
$moduleActivationService = ContainerFacade::getContainer()
    ->get(\OxidEsales\EshopCommunity\Internal\Framework\Module\State\ModuleStateServiceInterface::class);

$isActive = $moduleActivationService->isActive($moduleId, $shopId);
echo "Module active: " . ($isActive ? 'YES' : 'NO') . "\n";

// Check class extensions
$moduleConfig = Registry::getConfig();
$extensions = $moduleConfig->getModuleConfig('aModules');

foreach ($extensions as $coreClass => $moduleClass) {
    if (strpos($moduleClass, 'MyVendor\MyModule') !== false) {
        echo "Extension registered: {$coreClass} -> {$moduleClass}\n";
    }
}

// Check module settings
$settings = $moduleConfig->getModuleSettings($moduleId);
echo "Module settings loaded: " . (empty($settings) ? 'NO' : 'YES') . "\n";
```

### Database Verification:

```sql
-- Check module activation status
SELECT * FROM oxconfig WHERE oxvarname LIKE '%modules%' AND oxvarvalue LIKE '%myvendor-mymodule%';

-- Check module settings
SELECT * FROM oxconfig WHERE oxmodule = 'myvendor-mymodule';

-- Check module metadata
SELECT * FROM oxmodules WHERE oxid = 'myvendor-mymodule';
```

## Post-Activation Setup

### 1. Database Migrations

If your module includes database changes:

```bash
# Run module-specific migrations
./vendor/bin/oe-eshop-db_migrate migrations:migrate myvendor-mymodule

# Verify migrations were applied
./vendor/bin/oe-eshop-db_migrate migrations:status myvendor-mymodule
```

### 2. Cache Management

Clear relevant caches after activation:

```bash
# Clear all caches
rm -rf source/tmp/*

# Clear specific caches
rm -rf source/tmp/smarty/
rm -rf source/tmp/modules/

# Clear Composer autoload cache
composer dump-autoload --optimize
```

### 3. Asset Compilation

If your module includes frontend assets:

```bash
# Compile CSS/JS assets (if applicable)
npm run build

# Symlink module assets
php vendor/bin/oe-console oe:module:assets myvendor-mymodule

# Verify assets are accessible
curl -I http://localhost/out/modules/myvendor-mymodule/css/styles.css
```

### 4. Service Registration

Verify module services are registered:

```php
// Test service availability
$container = \OxidEsales\EshopCommunity\Internal\Container\ContainerFacade::getContainer();

try {
    $service = $container->get('MyVendor\MyModule\Service\PaymentService');
    echo "Service registered successfully\n";
} catch (\Exception $e) {
    echo "Service registration failed: " . $e->getMessage() . "\n";
}
```

## Troubleshooting Activation

### Common Activation Issues:

#### 1. Class Extension Conflicts

```bash
# Check for conflicting extensions
./vendor/bin/oe-console oe:module:conflicts myvendor-mymodule

# View detailed conflict information
./vendor/bin/oe-console oe:module:show myvendor-mymodule --conflicts
```

#### 2. Missing Dependencies

```bash
# Check module dependencies
composer show myvendor/mymodule --tree

# Install missing dependencies
composer install --no-dev
```

#### 3. Permission Issues

```bash
# Fix file permissions
sudo chown -R www-data:www-data source/modules/
sudo chmod -R 755 source/modules/

# Fix cache permissions
sudo chown -R www-data:www-data source/tmp/
sudo chmod -R 755 source/tmp/
```

#### 4. Metadata Validation

```php
// Validate metadata.php
$metadataFile = 'source/modules/myvendor/mymodule/metadata.php';

if (!file_exists($metadataFile)) {
    echo "ERROR: metadata.php not found\n";
    exit(1);
}

include $metadataFile;

if (!isset($aModule) || !is_array($aModule)) {
    echo "ERROR: Invalid metadata.php format\n";
    exit(1);
}

if (empty($aModule['id'])) {
    echo "ERROR: Module ID not defined\n";
    exit(1);
}

echo "Metadata validation passed\n";
```

### Activation Logs

Monitor activation process:

```bash
# Watch OXID logs during activation
tail -f source/log/oxideshop.log &

# Activate module
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Check for activation errors
grep -i "error\|exception" source/log/oxideshop.log
```

## Deactivation & Reactivation

### Temporary Deactivation:

```bash
# Deactivate module
./vendor/bin/oe-console oe:module:deactivate myvendor-mymodule

# Verify deactivation
./vendor/bin/oe-console oe:module:list | grep myvendor-mymodule
```

### Safe Reactivation:

```bash
# Deactivate and reactivate (useful for applying changes)
./vendor/bin/oe-console oe:module:deactivate myvendor-mymodule
./vendor/bin/oe-console oe:module:activate myvendor-mymodule

# Clear caches after reactivation
rm -rf source/tmp/*
```

## Best Practices

### 1. Activation Planning

- **🧪 Test Environment**: Always test activation in staging first
- **💾 Database Backup**: Create backup before activating in production
- **📋 Dependencies**: Ensure all dependencies are met
- **⏰ Maintenance Window**: Schedule activation during low-traffic periods

### 2. Verification Process

- **✅ Functional Testing**: Verify core functionality works
- **📊 Performance Testing**: Monitor impact on shop performance
- **🔍 Error Monitoring**: Watch logs for activation-related issues
- **👥 User Testing**: Test from user perspective

### 3. Rollback Planning

- **📦 Module Backup**: Keep previous version available
- **🗄️ Database Backup**: Maintain pre-activation database state
- **🔄 Rollback Script**: Prepare rollback procedures
- **📝 Rollback Documentation**: Document rollback steps

## Automation Examples

### CI/CD Pipeline Activation:

```yaml
# .github/workflows/deploy.yml
name: Deploy and Activate Modules

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install Dependencies
        run: composer install --no-dev --optimize-autoloader
        
      - name: Activate Modules
        run: |
          ./vendor/bin/oe-console oe:module:activate myvendor-mymodule
          ./vendor/bin/oe-console oe:module:activate myvendor-analytics
          
      - name: Verify Activation
        run: |
          ./vendor/bin/oe-console oe:module:list --active-only
          
      - name: Run Post-Activation Tests
        run: ./vendor/bin/phpunit tests/Integration/
```

### Docker Deployment:

```dockerfile
# Dockerfile with module activation
FROM oxideshop:latest

COPY modules/ /var/www/html/source/modules/
COPY scripts/activate-modules.sh /usr/local/bin/

RUN /usr/local/bin/activate-modules.sh

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ./vendor/bin/oe-console oe:module:list --active-only | grep -q "myvendor-mymodule"
```

## Quick Reference

### Essential Commands:

```bash
# Activation
./vendor/bin/oe-console oe:module:activate <module-id>
./vendor/bin/oe-console oe:module:activate <module-id> --shop-id=<shop-id>

# Status
./vendor/bin/oe-console oe:module:list
./vendor/bin/oe-console oe:module:show <module-id>

# Management
./vendor/bin/oe-console oe:module:deactivate <module-id>
./vendor/bin/oe-console oe:module:configure <module-id>

# Troubleshooting
./vendor/bin/oe-console cache:clear
tail -f source/log/oxideshop.log
```

### File Locations:

- **Module Directory**: `source/modules/vendor/module/`
- **Metadata**: `source/modules/vendor/module/metadata.php`
- **Logs**: `source/log/oxideshop.log`
- **Cache**: `source/tmp/`
- **Configuration**: Admin → Extensions → Modules

## Next Steps

After successful activation:

1. **[Functional Testing](../../testing/)**: Test module functionality thoroughly
2. **[Performance Monitoring](../../../tell-me-about/logging/)**: Monitor performance impact
3. **[Module Configuration](configuration)**: Fine-tune module settings
4. **[Troubleshooting](troubleshooting)**: Resolve any post-activation issues