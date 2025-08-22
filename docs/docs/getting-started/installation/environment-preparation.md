---
sidebar_position: 1
---

# Environment Preparation

Before installing OXID eShop, you need to prepare your development environment and verify system compatibility.

## System Requirements

We encourage developers to stick to our recommendations for dependencies to ensure a hassle-free OXID eShop experience.

:::info Server Requirements
For detailed information about system requirements for the latest release, see [Server and system requirements](https://docs.oxid-esales.com/eshop/en/latest/installation/new-installation/server-and-system-requirements.html)
:::

## Essential Components

### PHP Requirements
- **PHP Version**: PHP 8.1 or higher
- **Required Extensions**:
  - MySQL/MySQLi
  - GD or ImageMagick
  - cURL
  - JSON
  - XML
  - ZIP
  - BCMath
  - Multibyte String (mbstring)

### Database
- **MySQL**: 5.7.7+ or 8.0+
- **MariaDB**: 10.2+

### Web Server
- **Apache**: 2.4+ (with mod_rewrite)
- **Nginx**: 1.14+

### Development Tools
- **Composer**: 2.0+
- **Git**: For version control
- **Node.js**: For asset compilation (optional)

## Development Environment Setup

### Using Docker (Recommended)

For a consistent development environment across different systems:

```bash
# Clone OXID eShop
git clone https://github.com/OXID-eSales/oxideshop_ce.git oxid-shop
cd oxid-shop

# Use Docker Compose for development
docker-compose up -d
```

### Local Development Setup

#### Ubuntu/Debian
```bash
# Install PHP and required extensions
sudo apt update
sudo apt install php8.1 php8.1-cli php8.1-mysql php8.1-gd php8.1-curl php8.1-json php8.1-xml php8.1-zip php8.1-bcmath php8.1-mbstring

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Install MySQL/MariaDB
sudo apt install mysql-server
```

#### macOS
```bash
# Using Homebrew
brew install php@8.1 composer mysql

# Or use MAMP for an all-in-one solution
# Download from https://www.mamp.info/
```

#### Windows
- Install [XAMPP](https://www.apachefriends.org/) or [WAMP](http://www.wampserver.com/)
- Install [Composer](https://getcomposer.org/download/)
- Ensure PHP extensions are enabled in php.ini

## Environment Verification

### Check PHP Configuration

Create a PHP file to verify your setup:

```php
<?php
phpinfo();
?>
```

Verify these settings in your PHP configuration:

```ini
memory_limit = 1024M
max_execution_time = 300
max_input_vars = 3000
upload_max_filesize = 64M
post_max_size = 64M
```

### Test Database Connection

```php
<?php
$mysqli = new mysqli("localhost", "username", "password");
if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}
echo 'Connected successfully';
?>
```

## Composer Configuration

### Global Composer Settings

```bash
# Set minimum stability for OXID packages
composer config -g minimum-stability dev
composer config -g prefer-stable true
```

### Memory Limits

If you encounter memory issues:

```bash
# Increase PHP memory limit for Composer
php -d memory_limit=2048M /usr/local/bin/composer install
```

## File Permissions

Ensure proper file permissions for web server access:

```bash
# Set ownership (adjust www-data to your web server user)
chown -R www-data:www-data /path/to/oxid-shop

# Set permissions
find /path/to/oxid-shop -type d -exec chmod 755 {} \;
find /path/to/oxid-shop -type f -exec chmod 644 {} \;
```

## Next Steps

Once your environment is prepared:

1. **[Install OXID eShop](eshop-installation)** using Composer
2. Configure your web server virtual host
3. Create a database for your OXID installation
4. Run the setup wizard

## Troubleshooting

Common environment preparation issues:

- **PHP Extensions Missing**: Use `php -m` to list installed extensions
- **Composer Issues**: Clear cache with `composer clear-cache`
- **Permission Problems**: Check file ownership and permissions
- **Memory Limits**: Increase PHP memory_limit in php.ini

For more detailed troubleshooting, see the [troubleshooting guide](troubleshooting).