---
sidebar_position: 2
---

# Upgrading from Professional to Enterprise Edition

This comprehensive guide covers upgrading your OXID eShop from Professional Edition (PE) to Enterprise Edition (EE). The Enterprise Edition provides advanced performance optimization, sophisticated multi-shop management, enhanced B2B workflows, and enterprise-grade scalability features.

## Overview

### Enterprise Edition Enhancements

The upgrade from PE to EE introduces enterprise-class capabilities:

#### 🚀 Advanced Performance & Scalability
- **Enterprise Caching**: Multi-layer caching with Redis/Memcached support
- **Database Optimization**: Advanced query optimization and connection pooling
- **CDN Integration**: Built-in Content Delivery Network support
- **Load Balancing**: Native support for clustered environments

#### 🏢 Enterprise Multi-Shop Management
- **Advanced Shop Hierarchies**: Complex organizational structures
- **Global Product Management**: Enterprise inventory and catalog management
- **Centralized User Management**: LDAP/SSO integration capabilities
- **Advanced Reporting**: Enterprise analytics and BI integration

#### 💼 Sophisticated B2B Features
- **Advanced Approval Workflows**: Multi-level purchase approval processes
- **Contract Management**: Complex pricing contracts and negotiations
- **Procurement Integration**: ERP and procurement system connectivity
- **Advanced Quote Management**: Sophisticated quote-to-order workflows

#### 🛡️ Enterprise Security & Compliance
- **Advanced Authentication**: Multi-factor authentication and SSO
- **Audit Logging**: Comprehensive audit trails and compliance reporting
- **Data Protection**: Enhanced GDPR and data privacy features
- **Security Hardening**: Enterprise security configurations

## Pre-Upgrade Assessment

### Current System Analysis

```bash
# Verify current PE installation
./vendor/bin/oe-console oe:version
# Should show "Professional Edition"

# Analyze current performance baseline
./vendor/bin/oe-console oe:performance:baseline

# Check current multi-shop configuration
./vendor/bin/oe-console oe:shop:list --details

# Assess current B2B usage
./vendor/bin/oe-console oe:b2b:analyze --usage-report
```

### Enterprise Edition Requirements

#### System Requirements (Enhanced for EE):

```bash
# Check enhanced system requirements for EE
echo "Verifying EE system requirements..."

# PHP Version (8.1+ recommended, 8.2+ for optimal performance)
php -v | grep "PHP 8"

# Memory (increased requirements for EE)
php -i | grep memory_limit  # Minimum 512MB, recommended 1GB+

# Database (enhanced requirements)
mysql --version  # MySQL 8.0+ or MariaDB 10.6+ recommended

# Redis/Memcached for enterprise caching
redis-cli --version
memcached -h | head -1

# Additional EE requirements
nginx -v  # Nginx recommended for EE performance
```

#### Infrastructure Considerations:

```bash
# Disk space assessment (EE requires more space)
df -h | grep -E "(source|var|tmp)"

# Network bandwidth (CDN and multi-server requirements)
speedtest-cli --simple

# CPU cores (EE benefits from multiple cores)
nproc

# RAM assessment (EE recommends 8GB+ for production)
free -g
```

### Enterprise License & Access

Verify Enterprise Edition entitlements:

1. **🏢 Enterprise License**: Valid Enterprise Edition license
2. **🔑 Repository Access**: EE package repository credentials
3. **🎯 Support Level**: Enterprise support agreement
4. **🔧 Professional Services**: Optional implementation services
5. **📊 Training**: Enterprise feature training programs

### Comprehensive Backup Strategy

```bash
#!/bin/bash
# enterprise-backup.sh - Enhanced backup for EE upgrade
set -e

BACKUP_DIR="/backup/oxid-pe-to-ee-$(date +%Y%m%d-%H%M%S)"
mkdir -p $BACKUP_DIR

echo "Creating enterprise-grade backup in: $BACKUP_DIR"

# 1. Multi-shop database backup
echo "Backing up multi-shop database with consistency..."
./vendor/bin/oe-console oe:backup:database \
    --consistent \
    --all-shops \
    --file=$BACKUP_DIR/database-multishop-backup.sql

# 2. Source code with PE customizations
echo "Backing up source with PE customizations..."
tar --create --gzip --file=$BACKUP_DIR/source-pe-backup.tar.gz \
    --exclude='source/tmp/*' \
    --exclude='var/cache/*' \
    source/

# 3. Multi-shop configuration backup
echo "Backing up multi-shop configurations..."
cp -r var/configuration/ $BACKUP_DIR/configuration-backup/

# 4. PE-specific data and settings
echo "Backing up PE-specific data..."
./vendor/bin/oe-console oe:export:pe-data \
    --output=$BACKUP_DIR/pe-specific-data.json

# 5. Performance and cache configurations
cp -r var/cache/config/ $BACKUP_DIR/cache-config-backup/ 2>/dev/null || true

# 6. Create restoration script
cat > $BACKUP_DIR/restore-pe.sh << 'EOF'
#!/bin/bash
set -e
echo "Restoring PE installation..."
mysql -u$DB_USER -p$DB_PASS $DB_NAME < database-multishop-backup.sql
tar -xzf source-pe-backup.tar.gz
cp -r configuration-backup/ var/configuration/
./vendor/bin/oe-console oe:import:pe-data pe-specific-data.json
echo "PE restoration completed"
EOF
chmod +x $BACKUP_DIR/restore-pe.sh

echo "Enterprise backup completed successfully"
```

## Upgrade Process

### Step 1: Configure Enterprise Repository

Add the Enterprise Edition repository with authentication:

```bash
# Add EE repository
composer config repositories.oxid-esales composer https://enterprise-edition.packages.oxid-esales.com

# Configure authentication (interactive)
composer config http-basic.enterprise-edition.packages.oxid-esales.com

# Alternative: Use auth.json for automation
cat > auth.json << 'EOF'
{
    "http-basic": {
        "enterprise-edition.packages.oxid-esales.com": {
            "username": "YOUR_EE_USERNAME",
            "password": "YOUR_EE_TOKEN"
        }
    }
}
EOF
```

### Step 2: Pre-Installation Dependency Analysis

```bash
# Analyze EE requirements and conflicts
composer why-not oxid-esales/oxideshop-metapackage-ee

# Check current PE modules for EE compatibility
./vendor/bin/oe-console oe:module:check-compatibility --target-edition=ee

# Backup current composer state
cp composer.json composer-pe-backup.json
cp composer.lock composer-pe-backup.lock
```

### Step 3: Install Enterprise Edition Metapackage

```bash
# Install EE metapackage without script execution
composer require oxid-esales/oxideshop-metapackage-ee:^7 --no-plugins --no-scripts

# Verify EE installation
composer show oxid-esales/oxideshop-metapackage-ee

# Check for EE-specific packages
composer show | grep -E "(enterprise|ee)" | head -10
```

#### EE Version Management:

```bash
# List available EE versions
composer show oxid-esales/oxideshop-metapackage-ee --available

# Install latest stable EE version
composer require oxid-esales/oxideshop-metapackage-ee:^7.1 --no-plugins --no-scripts

# Install specific EE version (production recommended)
composer require oxid-esales/oxideshop-metapackage-ee:v7.1.2 --no-plugins --no-scripts
```

### Step 4: Database Migration for Enterprise Features

Execute EE-specific database migrations:

```bash
# Check migration status
./vendor/bin/oe-eshop-db_migrate migrations:status --edition=ee

# Run EE migrations with detailed logging
./vendor/bin/oe-eshop-db_migrate migrations:migrate \
    --verbose \
    --log-file=var/log/ee-migration.log

# Verify EE-specific tables were created
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES LIKE '%enterprise%';"
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES LIKE '%performance%';"
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW TABLES LIKE '%audit%';"
```

#### EE Database Enhancements:

The migration adds:
- **Performance tables**: Advanced caching and optimization structures
- **Enterprise multi-shop**: Complex shop hierarchy management
- **Audit logging**: Comprehensive activity tracking tables
- **Advanced B2B**: Enhanced business workflow tables
- **Security**: Enhanced user authentication and authorization

### Step 5: Regenerate Database Views for Enterprise

```bash
# Generate EE-optimized database views
./vendor/bin/oe-eshop-db_views_generate --enterprise-optimization

# Verify EE-specific views
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "SHOW FULL TABLES WHERE Table_type = 'VIEW' AND Tables_in_$DB_NAME LIKE '%enterprise%';"

# Check view performance optimization
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "EXPLAIN SELECT * FROM oxv_oxarticles_1_de LIMIT 1;"
```

### Step 6: Complete Dependency Update

```bash
# Update all dependencies with EE packages
composer update

# Optimize autoloader for enterprise performance
composer dump-autoload --optimize --classmap-authoritative --apcu

# Clear all composer caches
composer clear-cache

# Verify EE package installation
composer show oxid-esales/oxideshop-ee | head -10
```

### Step 7: Clear and Initialize Enterprise Caches

```bash
# Clear all existing caches
./vendor/bin/oe-console oe:cache:clear --all

# Initialize EE-specific caches
./vendor/bin/oe-console oe:cache:initialize --enterprise

# Clear file system caches
rm -rf source/tmp/*
rm -rf var/cache/*

# Initialize enterprise performance cache
./vendor/bin/oe-console oe:performance:cache:warm-up
```

## Enterprise Configuration

### Advanced Performance Configuration

#### Redis Configuration for EE:

```bash
# Install Redis (if not already available)
sudo apt-get install redis-server

# Configure Redis for OXID EE
cat > config/redis.conf << 'EOF'
# OXID Enterprise Edition Redis Configuration
port 6379
timeout 0
tcp-keepalive 300
maxmemory 1gb
maxmemory-policy allkeys-lru
EOF

# Start Redis with EE configuration
redis-server config/redis.conf
```

#### EE Cache Configuration:

```php
<?php
// config/cache-ee.php - Enterprise cache configuration
return [
    'cache' => [
        'enterprise' => [
            'redis' => [
                'host' => 'localhost',
                'port' => 6379,
                'database' => 0,
                'password' => null,
                'prefix' => 'oxid_ee_',
                'timeout' => 2.5,
                'read_timeout' => 2.5,
            ],
            'memcached' => [
                'servers' => [
                    ['127.0.0.1', 11211, 100],
                ],
                'options' => [
                    'prefix_key' => 'oxid_ee_',
                    'serializer' => 'php',
                    'compression' => true,
                ],
            ],
        ],
    ],
];
```

### Enterprise Multi-Shop Configuration

```bash
# Configure enterprise multi-shop hierarchy
./vendor/bin/oe-console oe:shop:configure-hierarchy \
    --parent-shop=1 \
    --child-shops=2,3,4 \
    --inheritance=products,customers,categories

# Set up shop-specific performance optimization
./vendor/bin/oe-console oe:shop:optimize \
    --shop-id=1 \
    --optimization-level=enterprise

# Configure global product management
./vendor/bin/oe-console oe:products:configure-global-management \
    --master-shop=1 \
    --slave-shops=2,3,4
```

### Enterprise Security Configuration

```bash
# Enable enterprise security features
./vendor/bin/oe-console oe:security:enable-enterprise \
    --audit-logging=true \
    --advanced-authentication=true \
    --session-security=enhanced

# Configure audit logging
./vendor/bin/oe-console oe:audit:configure \
    --log-level=detailed \
    --retention-days=365 \
    --storage=database

# Set up security monitoring
./vendor/bin/oe-console oe:security:monitor:enable \
    --real-time-alerts=true \
    --threat-detection=true
```

## Post-Upgrade Verification

### Enterprise Feature Validation

```bash
# Verify EE edition activation
./vendor/bin/oe-console oe:version
# Should show "Enterprise Edition"

# Check EE-specific features
./vendor/bin/oe-console oe:features:list --enterprise-only

# Test performance enhancements
./vendor/bin/oe-console oe:performance:test \
    --benchmark=enterprise \
    --duration=60

# Verify enterprise caching
./vendor/bin/oe-console oe:cache:status --detailed
```

### Advanced Multi-Shop Testing

```php
<?php
// test-enterprise-multishop.php
use OxidEsales\Eshop\Core\Registry;
use OxidEsales\EshopEnterprise\Application\Model\ShopHierarchy;

$config = Registry::getConfig();
$shopHierarchy = oxNew(ShopHierarchy::class);

echo "=== Enterprise Multi-Shop Test ===\n";
echo "Edition: " . $config->getEdition() . "\n";
echo "Shop Count: " . $config->getShopCount() . "\n";

// Test EE-specific shop hierarchy
$hierarchy = $shopHierarchy->getHierarchy();
foreach ($hierarchy as $parentId => $children) {
    echo "Parent Shop {$parentId}:\n";
    foreach ($children as $childId) {
        echo "  - Child Shop {$childId}\n";
    }
}

// Test EE performance features
if (class_exists('\\OxidEsales\\EshopEnterprise\\Core\\PerformanceManager')) {
    echo "✅ Enterprise Performance Manager available\n";
} else {
    echo "❌ Enterprise Performance Manager not found\n";
}
```

### Enterprise B2B Validation

```php
<?php
// test-enterprise-b2b.php
use OxidEsales\EshopEnterprise\Application\Model\EnterpriseUser;
use OxidEsales\EshopEnterprise\Application\Model\ApprovalWorkflow;

$enterpriseUser = oxNew(EnterpriseUser::class);
$approvalWorkflow = oxNew(ApprovalWorkflow::class);

echo "=== Enterprise B2B Test ===\n";

// Test EE-specific B2B methods
if (method_exists($enterpriseUser, 'getEnterpriseRoles')) {
    echo "✅ Enterprise user roles available\n";
} else {
    echo "❌ Enterprise user roles not found\n";
}

if (method_exists($approvalWorkflow, 'processApprovalChain')) {
    echo "✅ Advanced approval workflows available\n";
} else {
    echo "❌ Advanced approval workflows not found\n";
}
```

### Performance Benchmarking

```bash
# Run comprehensive EE performance tests
./vendor/bin/oe-console oe:performance:benchmark \
    --test-suite=enterprise \
    --iterations=100 \
    --output=var/log/ee-performance.log

# Compare PE vs EE performance
./vendor/bin/oe-console oe:performance:compare \
    --baseline=pe \
    --target=ee \
    --metrics=response-time,memory,cache-hits

# Test enterprise caching performance
./vendor/bin/oe-console oe:cache:performance-test \
    --cache-types=redis,memcached,database \
    --test-duration=300
```

## Troubleshooting Enterprise Upgrade

### Common EE Upgrade Issues

#### 1. Repository Authentication Problems

```bash
# Clear EE repository cache
composer clear-cache

# Verify EE credentials
composer config --list | grep enterprise-edition

# Test EE repository connectivity
curl -I https://enterprise-edition.packages.oxid-esales.com

# Re-configure EE authentication
composer config --unset http-basic.enterprise-edition.packages.oxid-esales.com
composer config http-basic.enterprise-edition.packages.oxid-esales.com YOUR_USER YOUR_TOKEN
```

#### 2. EE Metapackage Conflicts

```bash
# Analyze EE dependency conflicts
composer why-not oxid-esales/oxideshop-metapackage-ee --verbose

# Check for PE package conflicts
composer show | grep professional

# Force EE installation with dependency resolution
composer require oxid-esales/oxideshop-metapackage-ee:^7 \
    --update-with-dependencies \
    --optimize-autoloader
```

#### 3. Enterprise Database Migration Issues

```bash
# Check EE migration logs
tail -100 var/log/ee-migration.log | grep -E "(ERROR|FAIL)"

# List pending EE migrations
./vendor/bin/oe-eshop-db_migrate migrations:list --pending --edition=ee

# Force specific EE migration
./vendor/bin/oe-eshop-db_migrate migrations:execute \
    --up \
    --configuration=config/migrations-ee.yml \
    Version20240315120000
```

#### 4. Enterprise Cache Configuration Problems

```bash
# Diagnose cache connectivity
redis-cli ping
echo "stats" | nc localhost 11211

# Test EE cache configuration
./vendor/bin/oe-console oe:cache:test-connectivity \
    --redis --memcached

# Reset enterprise cache configuration
./vendor/bin/oe-console oe:cache:configure \
    --reset \
    --enterprise-defaults
```

#### 5. Performance Degradation Issues

```bash
# Analyze EE performance bottlenecks
./vendor/bin/oe-console oe:performance:analyze \
    --detailed \
    --output=var/log/performance-analysis.log

# Check EE-specific performance settings
./vendor/bin/oe-console oe:config:show \
    --section=performance \
    --enterprise-only

# Optimize EE configuration
./vendor/bin/oe-console oe:performance:optimize \
    --level=enterprise \
    --auto-configure
```

### Enterprise Recovery Procedures

#### Rollback to Professional Edition

```bash
#!/bin/bash
# rollback-to-pe.sh - Enterprise to Professional rollback
set -e

echo "Rolling back from EE to PE..."

# 1. Stop enterprise services
sudo systemctl stop redis-server
sudo systemctl stop memcached

# 2. Deactivate EE-specific modules
./vendor/bin/oe-console oe:module:deactivate-all --enterprise-only

# 3. Remove EE metapackage
composer remove oxid-esales/oxideshop-metapackage-ee

# 4. Restore PE metapackage
composer require oxid-esales/oxideshop-metapackage-pe:^7

# 5. Restore PE database
mysql -u$DB_USER -p$DB_PASS $DB_NAME < backup/database-multishop-backup.sql

# 6. Restore PE configuration
cp -r backup/configuration-backup/ var/configuration/

# 7. Clear EE caches
rm -rf source/tmp/*
rm -rf var/cache/*

echo "Rollback to PE completed successfully"
```

## Enterprise Optimization

### Advanced Performance Tuning

```bash
# Configure enterprise-grade PHP settings
cat >> /etc/php/8.1/apache2/php.ini << 'EOF'
; OXID Enterprise Edition PHP Configuration
memory_limit = 1024M
max_execution_time = 300
max_input_vars = 10000
realpath_cache_size = 4096K
realpath_cache_ttl = 600
opcache.memory_consumption = 512
opcache.interned_strings_buffer = 64
opcache.max_accelerated_files = 32531
opcache.validate_timestamps = 0
opcache.file_cache = /tmp/opcache
EOF

# Configure Apache for EE performance
cat >> /etc/apache2/sites-available/oxid-ee.conf << 'EOF'
# OXID Enterprise Edition Apache Configuration
<VirtualHost *:80>
    DocumentRoot /var/www/oxid/source
    
    # Performance optimizations
    EnableSendfile On
    EnableMMAP On
    
    # Compression
    LoadModule deflate_module modules/mod_deflate.so
    SetOutputFilter DEFLATE
    
    # Caching headers
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
</VirtualHost>
EOF

# Restart services
sudo systemctl restart apache2
sudo systemctl restart php8.1-fpm
```

### Database Optimization for EE

```sql
-- Enterprise Edition database optimizations
SET GLOBAL innodb_buffer_pool_size = 2147483648; -- 2GB
SET GLOBAL innodb_log_file_size = 268435456; -- 256MB
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL query_cache_size = 268435456; -- 256MB
SET GLOBAL query_cache_type = ON;

-- Optimize EE-specific tables
OPTIMIZE TABLE oxshops;
OPTIMIZE TABLE oxenterprise_audit;
OPTIMIZE TABLE oxenterprise_cache;
OPTIMIZE TABLE oxenterprise_performance;

-- Create EE-specific indexes
CREATE INDEX idx_enterprise_shop_hierarchy ON oxshops(oxparentid, oxactive);
CREATE INDEX idx_enterprise_audit_time ON oxenterprise_audit(oxtime);
CREATE INDEX idx_enterprise_cache_key ON oxenterprise_cache(oxkey, oxshopid);
```

## Best Practices for Enterprise Deployment

### Planning & Architecture

1. **🏗️ Infrastructure Planning**: Design for scalability and redundancy
2. **📊 Performance Baseline**: Establish performance metrics before upgrade
3. **🔒 Security Architecture**: Plan enterprise security implementation
4. **📈 Monitoring Strategy**: Implement comprehensive monitoring
5. **🔄 Disaster Recovery**: Plan backup and recovery procedures

### Implementation

1. **⚡ Staged Deployment**: Deploy in phases (development → staging → production)
2. **📊 Performance Testing**: Continuous performance validation
3. **🔍 Security Testing**: Comprehensive security validation
4. **👥 Team Training**: Enterprise feature training for staff
5. **📝 Documentation**: Comprehensive operational documentation

### Operations

1. **📊 Performance Monitoring**: Real-time performance dashboards
2. **🔒 Security Monitoring**: Continuous security monitoring
3. **💾 Backup Strategy**: Enterprise-grade backup procedures
4. **🔄 Update Management**: Systematic update and patch management
5. **📞 Support Planning**: Enterprise support utilization

## Next Steps After EE Upgrade

### Enterprise Feature Implementation

1. **[Advanced Multi-Shop](../../system-architecture/)**: Implement shop hierarchies
2. **Performance Optimization**: Configure enterprise caching
3. **B2B Workflows**: Set up advanced approval processes
4. **Security Hardening**: Implement enterprise security features

### Integration & Customization

1. **ERP Integration**: Connect with enterprise systems
2. **SSO Implementation**: Set up single sign-on
3. **Advanced Analytics**: Implement BI and reporting
4. **Custom Development**: Enterprise-specific customizations

### Support & Training

- **🎓 Enterprise Training**: OXID Enterprise training programs  
- **📞 Enterprise Support**: 24/7 enterprise support access
- **👥 Community**: EE customer advisory groups
- **🔧 Professional Services**: Implementation and consulting services

The upgrade to Enterprise Edition provides the foundation for large-scale, high-performance e-commerce operations. Follow this guide carefully and leverage the enterprise features to achieve optimal results for your business.