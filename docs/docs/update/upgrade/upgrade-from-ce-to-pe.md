---
sidebar_position: 1
---

# Upgrading from Community to Professional Edition

This comprehensive guide walks you through upgrading your OXID eShop from Community Edition (CE) to Professional Edition (PE). The Professional Edition adds multi-shop capabilities, B2B features, advanced admin tools, and enhanced performance optimization.

## Overview

### What Changes with PE Upgrade

The upgrade from CE to PE introduces significant new capabilities:

#### 🏪 Multi-Shop Architecture
- **Multiple Storefronts**: Manage multiple shops from single admin
- **Shared Resources**: Products, customers, and orders across shops
- **Individual Branding**: Separate themes and configurations per shop
- **Centralized Administration**: Unified management interface

#### 💼 B2B Functionality
- **Business Customer Management**: Company accounts and user hierarchies
- **Advanced Pricing**: Volume discounts and custom pricing models
- **Quote Management**: Request and manage price quotes
- **Purchase Order Integration**: B2B workflow support

#### ⚙️ Enhanced Administration
- **Advanced User Management**: Extended admin user capabilities
- **Enhanced Reporting**: Detailed analytics and reporting tools
- **Workflow Management**: Approval processes and automation
- **API Extensions**: Enhanced REST and GraphQL APIs

## Pre-Upgrade Preparation

### System Requirements

```bash
# Verify current CE installation
./vendor/bin/oe-console oe:version

# Check system requirements
php -v  # PHP 8.1+ required
mysql --version  # MySQL 5.7+ or MariaDB 10.4+
composer --version  # Latest stable Composer

# Verify disk space (PE requires additional space)
df -h
```

### Professional Edition Access

Before starting, ensure you have:

1. **🔑 PE License**: Valid Professional Edition license
2. **👤 Repository Access**: Credentials for PE package repository
3. **📧 Support Account**: Access to professional support channels
4. **📋 Documentation**: PE-specific documentation and resources

### Comprehensive Backup

```bash
#!/bin/bash
# comprehensive-backup.sh
set -e

BACKUP_DIR="/backup/oxid-ce-to-pe-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

echo "Creating comprehensive backup in: $BACKUP_DIR"

# 1. Database backup
echo "Backing up database..."
mysqldump -u$DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/database-backup.sql

# 2. Full source backup
echo "Backing up source files..."
tar -czf $BACKUP_DIR/source-backup.tar.gz source/

# 3. Composer configuration backup
echo "Backing up configuration..."
cp composer.json $BACKUP_DIR/composer-backup.json
cp composer.lock $BACKUP_DIR/composer-backup.lock

# 4. Configuration backup
cp -r var/ $BACKUP_DIR/var-backup/

# 5. Custom modifications backup
find source/ -name "*.php" -newer vendor/ 2>/dev/null > $BACKUP_DIR/modified-files.list

echo "Backup completed successfully in: $BACKUP_DIR"
```

### Module Compatibility Check

```bash
# List all active modules
./vendor/bin/oe-console oe:module:list --active-only

# Check each module for PE compatibility
./vendor/bin/oe-console oe:module:show module-id --compatibility

# Deactivate potentially incompatible modules
./vendor/bin/oe-console oe:module:deactivate vendor-module
```

## Upgrade Process

### Step 1: Configure Professional Edition Repository

Add the Professional Edition Composer repository with proper authentication:

```bash
# Add PE repository
composer config repositories.oxid-esales composer https://professional-edition.packages.oxid-esales.com

# Configure authentication interactively
composer config http-basic.professional-edition.packages.oxid-esales.com

# Alternative: Configure via auth.json
cat > auth.json << 'EOF'
{
    "http-basic": {
        "professional-edition.packages.oxid-esales.com": {
            "username": "YOUR_PE_USERNAME",
            "password": "YOUR_PE_TOKEN"
        }
    }
}
EOF
```

### Step 2: Install Professional Edition Metapackage

Install the PE metapackage without executing scripts initially:

```bash
# Install PE metapackage (replace ^7 with specific version if needed)
composer require oxid-esales/oxideshop-metapackage-pe:^7 --no-plugins --no-scripts

# Verify installation
composer show oxid-esales/oxideshop-metapackage-pe
```

#### Version Selection Guide:

```bash
# List available PE versions
composer show oxid-esales/oxideshop-metapackage-pe --available

# Install specific version (recommended for production)
composer require oxid-esales/oxideshop-metapackage-pe:v7.1.0 --no-plugins --no-scripts

# Install latest patch version in major series
composer require oxid-esales/oxideshop-metapackage-pe:^7.1 --no-plugins --no-scripts
```

### Step 3: Database Migration

Run shop migrations to update database schema for PE features:

```bash
# Check migration status before running
./vendor/bin/oe-eshop-db_migrate migrations:status

# Run migrations with detailed output
./vendor/bin/oe-eshop-db_migrate migrations:migrate --verbose

# Verify migration completion
./vendor/bin/oe-eshop-db_migrate migrations:status | grep -E "(executed|pending)"
```

#### PE-Specific Database Changes:

The migration adds:
- **Multi-shop tables**: Shop management and configuration
- **B2B tables**: Company accounts and business user management  
- **Enhanced user tables**: Additional admin user capabilities
- **Performance tables**: Caching and optimization structures

### Step 4: Regenerate Database Views

Update database views for PE multi-shop architecture:

```bash
# Regenerate views for PE
./vendor/bin/oe-eshop-db_views_generate

# Verify view generation
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW FULL TABLES WHERE Table_type = 'VIEW';"

# Check for PE-specific views
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES LIKE '%shop%';"
```

### Step 5: Update Dependencies

Complete the upgrade by updating all dependencies:

```bash
# Update with script execution
composer update

# Clear Composer cache if issues occur
composer clear-cache

# Optimize autoloader
composer dump-autoload --optimize --classmap-authoritative
```

### Step 6: Clear Application Cache

Clear all caches to ensure PE features load properly:

```bash
# Clear OXID cache
./vendor/bin/oe-console oe:cache:clear

# Clear file system caches
rm -rf source/tmp/*
rm -rf var/cache/*

# Clear specific PE caches
rm -rf source/tmp/modules/
rm -rf source/tmp/smarty/
```

## Post-Upgrade Configuration

### Multi-Shop Setup

#### Configure Default Shop

```bash
# Check shop configuration
./vendor/bin/oe-console oe:shop:list

# Update shop settings if needed
./vendor/bin/oe-console oe:shop:configure 1 --name="Main Shop" --url="https://main.yourstore.com"
```

#### Create Additional Shops (Optional)

```bash
# Create second shop
./vendor/bin/oe-console oe:shop:create \
    --name="Shop 2" \
    --url="https://shop2.yourstore.com" \
    --template-shop=1

# Verify shop creation
./vendor/bin/oe-console oe:shop:list --details
```

### B2B Feature Configuration

#### Enable B2B Functionality

```bash
# Check B2B modules
./vendor/bin/oe-console oe:module:list | grep -i b2b

# Activate B2B modules
./vendor/bin/oe-console oe:module:activate oxid-b2b-module

# Configure B2B settings via admin panel
echo "Configure B2B settings in Admin → Master Settings → B2B"
```

### User Management Enhancement

```bash
# Check enhanced admin capabilities
./vendor/bin/oe-console oe:user:list --show-capabilities

# Create admin user with PE privileges
./vendor/bin/oe-console oe:user:create \
    --username=peadmin \
    --email=admin@yourstore.com \
    --role=admin \
    --permissions=multishop,b2b
```

## Verification & Testing

### System Verification

```bash
# Verify PE edition activation
./vendor/bin/oe-console oe:version
# Should show "Professional Edition"

# Check PE-specific functionality
./vendor/bin/oe-console oe:shop:list
./vendor/bin/oe-console oe:module:list --pe-only

# Test database connectivity
./vendor/bin/oe-console oe:database:test-connection
```

### Web Interface Testing

```bash
# Test frontend accessibility
curl -I http://your-shop.com

# Test admin panel
curl -I http://your-shop.com/admin

# Check for PE-specific admin features
echo "Login to admin and verify:"
echo "- Multi-shop management in Master Settings"
echo "- B2B customer types"
echo "- Enhanced user management"
echo "- Professional Edition features"
```

### PE Features Validation

#### Multi-Shop Functionality:
```php
<?php
// test-multishop.php
use OxidEsales\Eshop\Core\Registry;

$config = Registry::getConfig();
$shopId = $config->getShopId();
$shopUrl = $config->getShopUrl();

echo "Current Shop ID: " . $shopId . "\n";
echo "Shop URL: " . $shopUrl . "\n";
echo "Shop Count: " . $config->getShopCount() . "\n";

// Test multi-shop configuration
$shops = $config->getShopIds();
foreach ($shops as $id) {
    echo "Shop {$id}: " . $config->getShopUrl($id) . "\n";
}
```

#### B2B Functionality:
```php
<?php
// test-b2b.php
use OxidEsales\Eshop\Application\Model\User;

$user = oxNew(User::class);

// Check for B2B user methods (PE-specific)
if (method_exists($user, 'getCompany')) {
    echo "✅ B2B functionality available\n";
} else {
    echo "❌ B2B functionality not detected\n";
}
```

## Performance Optimization

### PE-Specific Performance Features

```bash
# Enable PE performance features
./vendor/bin/oe-console oe:cache:configure --type=multishop --optimization=pe

# Configure advanced caching
echo "apc.enabled = 1" >> /etc/php/8.1/apache2/php.ini
echo "opcache.enable = 1" >> /etc/php/8.1/apache2/php.ini

# Restart web server
sudo systemctl restart apache2
```

### Database Optimization

```sql
-- PE-specific database optimizations
OPTIMIZE TABLE oxshops;
OPTIMIZE TABLE oxuser;
OPTIMIZE TABLE oxuserbaskets;

-- Update statistics for PE tables
ANALYZE TABLE oxshops;
ANALYZE TABLE oxcompany;
ANALYZE TABLE oxb2broles;
```

## Troubleshooting

### Common Upgrade Issues

#### 1. Repository Authentication Problems

```bash
# Clear authentication cache
composer config --unset http-basic.professional-edition.packages.oxid-esales.com

# Re-configure authentication
composer config http-basic.professional-edition.packages.oxid-esales.com YOUR_USERNAME YOUR_TOKEN

# Test repository access
composer show oxid-esales/oxideshop-metapackage-pe --available
```

#### 2. Metapackage Installation Conflicts

```bash
# Check for conflicting packages
composer why-not oxid-esales/oxideshop-metapackage-pe

# Remove conflicting CE packages if necessary
composer remove oxid-esales/oxideshop-metapackage-ce

# Force update with dependencies
composer update --with-dependencies
```

#### 3. Database Migration Failures

```bash
# Check detailed migration status
./vendor/bin/oe-eshop-db_migrate migrations:status --show-versions

# Execute specific failed migration
./vendor/bin/oe-eshop-db_migrate migrations:execute --up Version20240315120000

# Check migration logs
tail -f source/log/oxideshop.log | grep -i migration
```

#### 4. Multi-Shop Configuration Issues

```bash
# Reset shop configuration
./vendor/bin/oe-console oe:shop:reset 1

# Regenerate shop views
./vendor/bin/oe-eshop-db_views_generate

# Verify shop configuration files
ls -la var/configuration/shops/*/
```

#### 5. B2B Module Problems

```bash
# Check B2B module status
./vendor/bin/oe-console oe:module:show oxid-b2b --details

# Reinstall B2B modules
./vendor/bin/oe-console oe:module:deactivate oxid-b2b
./vendor/bin/oe-console oe:module:activate oxid-b2b

# Clear B2B-specific cache
rm -rf source/tmp/b2b_cache/
```

### Recovery Procedures

#### Rollback to CE

```bash
#!/bin/bash
# rollback-to-ce.sh
set -e

echo "Rolling back from PE to CE..."

# 1. Deactivate PE-specific modules
./vendor/bin/oe-console oe:module:deactivate-all

# 2. Remove PE metapackage
composer remove oxid-esales/oxideshop-metapackage-pe

# 3. Restore CE metapackage
composer require oxid-esales/oxideshop-metapackage-ce:^7

# 4. Restore database backup
mysql -u$DB_USER -p$DB_PASS $DB_NAME < backup/database-backup.sql

# 5. Clear caches
rm -rf source/tmp/*

echo "Rollback to CE completed"
```

## Best Practices

### Planning & Preparation

1. **📊 Business Requirements**: Clearly define PE feature requirements
2. **🧪 Staging Environment**: Test complete upgrade process first
3. **📋 Module Audit**: Verify all modules are PE-compatible
4. **👥 Team Training**: Train staff on PE features before go-live
5. **📝 Documentation**: Document all customizations and configurations

### Execution

1. **⏰ Maintenance Window**: Plan adequate downtime (4-6 hours recommended)
2. **🔄 Incremental Approach**: Test each step before proceeding
3. **📊 Monitoring**: Watch system performance and error logs
4. **💾 Backup Verification**: Ensure backups are complete and restorable
5. **🚨 Rollback Plan**: Have tested rollback procedures ready

### Post-Upgrade

1. **✅ Feature Testing**: Thoroughly test all PE-specific features
2. **👥 User Training**: Train users on new multi-shop and B2B features
3. **📈 Performance Monitoring**: Monitor impact on system performance
4. **🔍 Security Review**: Review new admin capabilities and access controls
5. **📝 Documentation Update**: Update operational documentation

## Next Steps After Upgrade

### Multi-Shop Configuration

1. **[Shop Management](../../system-architecture/)**: Configure additional shops
2. **Theme Customization**: Set up shop-specific themes
3. **Product Management**: Configure product visibility across shops
4. **Customer Management**: Set up customer shop assignments

### B2B Feature Implementation

1. **Company Setup**: Configure business customer accounts
2. **Pricing Models**: Implement B2B-specific pricing
3. **Quote Management**: Set up quote request workflows
4. **User Hierarchies**: Configure business user permissions

### Performance Optimization

1. **Caching Strategy**: Implement PE-specific caching
2. **Database Tuning**: Optimize for multi-shop queries
3. **CDN Integration**: Set up content delivery for multiple shops
4. **Monitoring**: Implement comprehensive performance monitoring

## Support Resources

### Professional Edition Support

- **📞 Professional Support**: Direct access to OXID PE support team
- **📚 PE Documentation**: Access to Professional Edition documentation
- **🎓 Training**: PE-specific training and certification programs
- **👥 Community**: PE customer community forums

The upgrade from Community to Professional Edition unlocks powerful multi-shop and B2B capabilities. Follow this guide carefully, test thoroughly, and leverage the enhanced features to grow your e-commerce business.