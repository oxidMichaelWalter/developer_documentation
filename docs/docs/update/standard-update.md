---
sidebar_position: 1
---

# Standard Update Process

This document describes patches and minor updates of OXID eShop. Follow these steps to update your OXID eShop installation from an existing version to a newer version while maintaining stability and data integrity.

## Overview

Standard updates include:
- **Security patches** and bug fixes
- **Minor feature updates** within the same major version
- **Compatibility improvements** and performance optimizations
- **Third-party dependency updates** (Symfony, Doctrine, etc.)

## Pre-Update Requirements

### System Preparation

:::warning Critical Pre-Update Steps
Always perform these steps before starting any update:

- ✅ **Test Environment**: Install and test updates in staging first
- ✅ **Database Backup**: Create complete database backup
- ✅ **File Backup**: Backup all shop files and customizations
- ✅ **Module Deactivation**: [Disable all modules](/docs/development/modules-components-themes/module/installation-setup/troubleshooting) temporarily
- ✅ **Shop Verification**: Confirm shop works normally before updating
:::

### Environment Check

```bash
# Check current OXID version
./vendor/bin/oe-console oe:version

# Verify system requirements
php -v
composer --version
mysql --version

# Check disk space
df -h

# Check write permissions
ls -la source/
ls -la var/
```

### Module Management

```bash
# List all active modules
./vendor/bin/oe-console oe:module:list --active-only

# Deactivate all modules (recommended)
./vendor/bin/oe-console oe:module:deactivate-all

# Alternative: Deactivate specific modules
./vendor/bin/oe-console oe:module:deactivate vendor-module
```

## Update Process

### Step 1: Optional - Update Composer

Update Composer to ensure compatibility:

```bash
# Check current Composer version
composer --version

# Update Composer globally
composer self-update

# Verify supported Composer version in metapackage requirements
composer show oxid-esales/oxideshop-metapackage-ce | grep require
```

:::tip Composer Version Compatibility
The Composer version must correspond to the version supported by the metapackage. Check the metapackage documentation for specific version requirements.
:::

### Step 2: Specify Target Update Version

Update the metapackage version in your `composer.json`:

#### Community Edition (CE) Update Example:

```bash
# Example: Update CE 7.0.0 to 7.1.0
composer require --no-update oxid-esales/oxideshop-metapackage-ce:v7.1.0
```

#### Professional Edition (PE) Update Example:

```bash
# Example: Update PE 7.0.0 to 7.1.0
composer require --no-update oxid-esales/oxideshop-metapackage-pe:v7.1.0
```

#### Enterprise Edition (EE) Update Example:

```bash
# Example: Update EE 7.0.0 to 7.1.0
composer require --no-update oxid-esales/oxideshop-metapackage-ee:v7.1.0
```

:::info Metapackage Selection
Choose the correct metapackage name based on your shop edition:
- **CE**: `oxid-esales/oxideshop-metapackage-ce`
- **PE**: `oxid-esales/oxideshop-metapackage-pe`
- **EE**: `oxid-esales/oxideshop-metapackage-ee`
:::

### Step 3: Update Dependencies

Resolve and update all package dependencies:

```bash
# Update dependencies without development packages
composer update --no-plugins --no-scripts --no-dev

# Alternative: Include development packages (development environment)
composer update --no-plugins --no-scripts
```

#### Parameters Explained:

- `--no-plugins`: Prevents plugin execution during update
- `--no-scripts`: Skips Composer script execution
- `--no-dev`: Excludes development-only packages (recommended for production)

### Step 4: Obtain New Compilation

Execute all necessary scripts to complete the update:

```bash
# Complete update with script execution
composer update --no-dev

# Alternative: Include development packages
composer update
```

:::warning File Overwrites
During this step, you'll be prompted to confirm file overwrites for:
- **Shop core files**
- **Default themes**
- **Core modules**

Custom modifications may be lost. Ensure you have backups of customizations.
:::

### Step 5: Clear Cache Files

Remove all cached data to prevent conflicts:

```bash
# Clear all OXID cache files
rm -rf source/tmp/*

# Clear specific cache directories
rm -rf source/tmp/smarty/
rm -rf source/tmp/modules/

# Clear Composer autoload cache
composer dump-autoload --optimize
```

### Step 6: Database Migration

Apply database schema changes and data migrations:

```bash
# Run all pending migrations
./vendor/bin/oe-eshop-db_migrate migrations:migrate

# Check migration status
./vendor/bin/oe-eshop-db_migrate migrations:status

# Verify migration logs
tail -f source/log/oxideshop.log
```

#### Migration Troubleshooting:

```bash
# List available migrations
./vendor/bin/oe-eshop-db_migrate migrations:list

# Execute specific migration
./vendor/bin/oe-eshop-db_migrate migrations:execute --up Version20240315120000

# Rollback specific migration (if needed)
./vendor/bin/oe-eshop-db_migrate migrations:execute --down Version20240315120000
```

### Step 7: Optional - Generate Database Views

Required for Enterprise Edition and some complex updates:

```bash
# Regenerate database views
./vendor/bin/oe-eshop-db_views_generate

# Verify view generation
mysql -u[username] -p[password] [database] -e "SHOW FULL TABLES WHERE Table_type = 'VIEW';"
```

:::tip When View Generation is Required
Usually required when:
- **Enterprise Edition updates**
- **Multi-shop configuration changes**
- **Custom view modifications**
- **Database structure changes**

Skip this step for simple CE updates unless experiencing maintenance mode issues.
:::

## Post-Update Verification

### Functional Testing

```bash
# Verify shop accessibility
curl -I http://your-shop.com

# Check admin accessibility
curl -I http://your-shop.com/admin

# Test basic functionality
./vendor/bin/oe-console oe:cache:clear
```

### Module Reactivation

```bash
# List available modules
./vendor/bin/oe-console oe:module:list

# Reactivate modules one by one
./vendor/bin/oe-console oe:module:activate vendor-module1
./vendor/bin/oe-console oe:module:activate vendor-module2

# Verify module functionality
./vendor/bin/oe-console oe:module:show vendor-module1 --details
```

### Performance Check

```bash
# Monitor performance logs
tail -f source/log/oxideshop.log

# Check for errors
grep -i "error\|exception\|fatal" source/log/oxideshop.log

# Verify autoload optimization
composer dump-autoload --optimize --classmap-authoritative
```

## Update Automation

### CI/CD Pipeline Example

```yaml
# .github/workflows/update.yml
name: OXID Shop Update

on:
  workflow_dispatch:
    inputs:
      target_version:
        description: 'Target OXID version (e.g., v7.1.0)'
        required: true

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1'
          
      - name: Backup Database
        run: |
          mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME > backup.sql
          
      - name: Update OXID
        run: |
          composer require --no-update oxid-esales/oxideshop-metapackage-ce:${{ github.event.inputs.target_version }}
          composer update --no-dev
          rm -rf source/tmp/*
          ./vendor/bin/oe-eshop-db_migrate migrations:migrate
          
      - name: Run Tests
        run: ./vendor/bin/phpunit tests/
```

### Update Script

```bash
#!/bin/bash
# update-oxid.sh
set -e

TARGET_VERSION=${1:-"latest"}
ENVIRONMENT=${2:-"development"}

echo "Starting OXID update to version: $TARGET_VERSION"

# Pre-update backup
echo "Creating backup..."
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > "backup-$(date +%Y%m%d-%H%M%S).sql"

# Deactivate modules
echo "Deactivating modules..."
./vendor/bin/oe-console oe:module:deactivate-all

# Update process
echo "Updating OXID..."
composer require --no-update oxid-esales/oxideshop-metapackage-ce:$TARGET_VERSION
composer update --no-plugins --no-scripts --no-dev
composer update --no-dev

# Clear cache
echo "Clearing cache..."
rm -rf source/tmp/*

# Database migration
echo "Running database migrations..."
./vendor/bin/oe-eshop-db_migrate migrations:migrate

# Optional: Generate views (EE)
if [ "$ENVIRONMENT" = "enterprise" ]; then
    echo "Generating database views..."
    ./vendor/bin/oe-eshop-db_views_generate
fi

echo "Update completed successfully!"
echo "Remember to:"
echo "- Test shop functionality"
echo "- Reactivate modules"
echo "- Monitor logs for issues"
```

## Troubleshooting

### Common Update Issues

#### 1. Composer Update Failures

```bash
# Memory limit issues
php -d memory_limit=512M composer update

# Clear Composer cache
composer clear-cache

# Update with verbose output
composer update -vvv
```

#### 2. Database Migration Problems

```bash
# Check migration status
./vendor/bin/oe-eshop-db_migrate migrations:status

# Force migration execution
./vendor/bin/oe-eshop-db_migrate migrations:migrate --force

# Manual migration troubleshooting
mysql -u[user] -p[pass] [db] < vendor/oxid-esales/oxideshop-ce/migration/data/Version20240315120000.sql
```

#### 3. File Permission Errors

```bash
# Fix permissions after update
sudo chown -R www-data:www-data source/
sudo chown -R www-data:www-data var/
sudo chmod -R 755 source/
sudo chmod -R 755 var/
```

#### 4. Module Compatibility Issues

```bash
# Check module compatibility
./vendor/bin/oe-console oe:module:check vendor-module

# Update module dependencies
composer update vendor/module-package

# Force module reinstallation
./vendor/bin/oe-console oe:module:deactivate vendor-module
./vendor/bin/oe-console oe:module:activate vendor-module
```

### Recovery Procedures

#### Rollback Process

```bash
# 1. Restore database backup
mysql -u[user] -p[pass] [database] < backup-20240315.sql

# 2. Restore file backup
rm -rf source/
tar -xzf source-backup-20240315.tar.gz

# 3. Clear caches
rm -rf source/tmp/*
composer dump-autoload
```

#### Emergency Recovery

```bash
# Quick recovery script
#!/bin/bash
set -e

echo "Emergency OXID recovery started..."

# Stop web server
sudo systemctl stop apache2

# Restore from backup
mysql -u$DB_USER -p$DB_PASS $DB_NAME < emergency-backup.sql
rsync -av backup-files/ source/

# Clear all caches
rm -rf source/tmp/*
rm -rf var/cache/*

# Regenerate autoload
composer dump-autoload --optimize

# Restart services
sudo systemctl start apache2

echo "Emergency recovery completed!"
```

## Best Practices

### Update Planning

1. **📅 Schedule Updates**: Plan updates during maintenance windows
2. **🧪 Test First**: Always test in staging environment
3. **📊 Monitor Performance**: Watch for performance regressions
4. **📝 Document Changes**: Keep update logs and changelogs

### Backup Strategy

1. **📦 Automated Backups**: Use automated backup solutions
2. **🔄 Multiple Restore Points**: Keep several backup versions
3. **✅ Backup Validation**: Regularly test backup restoration
4. **☁️ Offsite Storage**: Store backups in multiple locations

### Update Frequency

1. **🚨 Security Updates**: Apply immediately after testing
2. **🔧 Bug Fixes**: Apply monthly or as needed
3. **✨ Feature Updates**: Plan quarterly with thorough testing
4. **📈 Major Versions**: Annual planning with extensive testing

## Maintenance Windows

### Update Timeline Planning

```
Maintenance Window (4-6 hours):
├── 00:00-00:30: Pre-update preparation & backup
├── 00:30-02:00: Update execution & database migration  
├── 02:00-03:00: Post-update verification & testing
├── 03:00-04:00: Module reactivation & configuration
├── 04:00-05:00: Performance monitoring & optimization
└── 05:00-06:00: Final testing & rollback buffer
```

This completes the standard update process. The update is successful when:
- ✅ Shop frontend and admin are accessible
- ✅ All critical functionality works correctly
- ✅ No error messages in logs
- ✅ Performance is maintained or improved
- ✅ All required modules are active and functional