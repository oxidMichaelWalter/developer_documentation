---
sidebar_position: 2
---

# Install OXID eShop

There are two ways to install OXID eShop: using the graphical setup wizard in your browser or command-line tools for quick installation.

:::info User Documentation
More information can be found in the [User documentation](https://docs.oxid-esales.com/eshop/en/7.0/installation/index.html).
This page provides additional developer-specific information.
:::

## Installation Overview

The installation process involves several steps:

1. **Deploy source code** using Composer
2. **Configure database** connection
3. **Run setup wizard** or command-line installation
4. **Verify installation** and configure development settings

## Composer Installation

### Standard Installation

```bash
# Create project directory
composer create-project oxid-esales/oxideshop-project oxid-shop --no-dev
cd oxid-shop
```

### Development Installation (Recommended for Developers)

```bash
# Install with development dependencies
composer create-project oxid-esales/oxideshop-project oxid-shop
cd oxid-shop

# Install additional development tools
composer install
```

## Providing Shop Files

Composer automatically handles several important tasks:

1. **Downloads source files** of the specified OXID eShop version and edition
2. **Installs dependencies** with fixed versions as defined in the meta package
3. **Generates unified namespace classes** (`\OxidEsales\Eshop`)
4. **Sets up directory structure** and permissions

:::warning Watch for Errors
**Always watch for error messages during the installation process.**
If errors occur, see our [troubleshooting section](troubleshooting) for solutions.
:::

## Database Setup

### Create Database

```sql
-- MySQL/MariaDB
CREATE DATABASE oxid_shop CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'oxid_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON oxid_shop.* TO 'oxid_user'@'localhost';
FLUSH PRIVILEGES;
```

### Database Configuration

Create or edit the configuration file:

```php
// config.inc.php
<?php
$this->dbHost = 'localhost';
$this->dbName = 'oxid_shop';
$this->dbUser = 'oxid_user';
$this->dbPwd = 'secure_password';
$this->dbType = 'pdo_mysql';
$this->sShopURL = 'http://localhost/oxid-shop/';
$this->sSSLShopURL = null;
$this->sAdminSSLURL = null;
$this->sShopDir = '/path/to/oxid-shop/';
$this->sCompileDir = '/path/to/oxid-shop/tmp/';
```

## Setup Methods

### Web-based Setup Wizard

1. **Navigate to shop URL** in your browser
2. **Follow setup wizard** steps:
   - Database connection
   - Admin user creation
   - Shop configuration
   - Sample data installation (optional)

### Command-line Installation

For faster, automated installation:

```bash
# Basic installation
./vendor/bin/oe-console oe:setup:shop \
    --db-host=localhost \
    --db-name=oxid_shop \
    --db-user=oxid_user \
    --db-password=secure_password \
    --shop-url=http://localhost/oxid-shop/ \
    --shop-directory=/path/to/oxid-shop/ \
    --compile-directory=/path/to/oxid-shop/tmp/

# With admin user creation
./vendor/bin/oe-console oe:setup:shop \
    # ... database parameters ... \
    --admin-email=admin@example.com \
    --admin-password=admin_password
```

## Post-Installation Configuration

### Development Settings

```php
// config.inc.php - Development additions
$this->iDebug = 1; // Enable debug mode
$this->blLogging = true; // Enable logging
$this->blLogChangesInAdmin = true; // Log admin changes
$this->blCheckTemplates = true; // Check template modifications
```

### File Permissions

```bash
# Set correct permissions
chmod -R 755 out/pictures/
chmod -R 755 out/media/
chmod -R 755 log/
chmod -R 755 tmp/
chmod -R 755 var/
```

## Unified Namespace Generation

During installation, OXID generates the [unified namespace](../../system-architecture/unified-namespace/) classes:

```bash
# Regenerate if needed
./vendor/bin/oe-console oe:oxideshop:generate-unified-namespace
```

## Known Issues

### macOS with MAMP

If you encounter database connection issues on macOS with MAMP:

```
[PDOException]
SQLSTATE[HY000] [2002] No such file or directory
```

**Solution:**

```bash
sudo mkdir /var/mysql
sudo ln -s /Applications/MAMP/tmp/mysql/mysql.sock /var/mysql/mysql.sock
sudo chown _mysql /var/mysql/mysql.sock
sudo chmod 777 /var/mysql/mysql.sock
```

### Composer Plugin Issues

Always use Composer's `--no-plugins` switch if you encounter plugin-related issues:

```bash
composer install --no-plugins
composer update --no-plugins
```

## Verification

After installation, verify your setup:

1. **Frontend**: Visit your shop URL
2. **Admin**: Access `/admin/` with your admin credentials
3. **Console**: Test console commands:

```bash
./vendor/bin/oe-console list
```

## Next Steps

After successful installation:

- **[Configure your IDE](../ide/)** for OXID development
- **[Create your first module](../../development/modules-components-themes/module/tutorials/create-basic-module)**
- **[Set up testing environment](../../development/testing/)**
- **[Understand the architecture](../../system-architecture/)**

## Alternative Installation

If Composer installation fails on your server, see [Installation without Composer](eshop-installation-without-composer) for alternative deployment methods.