---
sidebar_position: 4
---

# Installation Troubleshooting

This section covers common installation issues and their solutions.

## Common Installation Issues

### Composer Installation Problems

#### Memory Limit Errors

**Problem**: Composer runs out of memory during installation

**Solution**:
```bash
# Increase memory limit for Composer
php -d memory_limit=2048M /usr/local/bin/composer install

# Or set globally in php.ini
memory_limit = 2048M
```

#### Timeout Issues

**Problem**: Composer times out during package downloads

**Solution**:
```bash
# Increase timeout
composer config --global process-timeout 2000

# Alternative: use archive format
composer install --prefer-dist
```

#### Plugin Conflicts

**Problem**: Composer plugin errors during installation

**Solution**:
```bash
# Disable plugins during installation
composer install --no-plugins

# Clear composer cache
composer clear-cache
```

### Database Connection Issues

#### Connection Refused

**Problem**: Cannot connect to database during setup

**Symptoms**:
```
SQLSTATE[HY000] [2002] Connection refused
```

**Solution**:
1. Verify MySQL/MariaDB is running:
   ```bash
   # Check MySQL status
   sudo systemctl status mysql
   # Start if not running
   sudo systemctl start mysql
   ```

2. Check connection parameters:
   ```bash
   # Test connection manually
   mysql -h localhost -u oxid_user -p
   ```

3. Verify user permissions:
   ```sql
   SHOW GRANTS FOR 'oxid_user'@'localhost';
   ```

#### Socket Issues (macOS/MAMP)

**Problem**: Socket connection errors on macOS with MAMP

**Symptoms**:
```
SQLSTATE[HY000] [2002] No such file or directory
```

**Solution**:
```bash
sudo mkdir /var/mysql
sudo ln -s /Applications/MAMP/tmp/mysql/mysql.sock /var/mysql/mysql.sock
sudo chown _mysql /var/mysql/mysql.sock
sudo chmod 777 /var/mysql/mysql.sock
```

### File Permission Issues

#### Permission Denied Errors

**Problem**: Web server cannot write to directories

**Symptoms**:
- Setup wizard cannot create configuration files
- Images cannot be uploaded
- Template compilation fails

**Solution**:
```bash
# Set correct ownership (adjust www-data to your web server user)
sudo chown -R www-data:www-data /path/to/oxid-shop

# Set correct permissions
find /path/to/oxid-shop -type d -exec chmod 755 {} \;
find /path/to/oxid-shop -type f -exec chmod 644 {} \;

# Ensure writable directories
chmod -R 775 out/pictures/
chmod -R 775 out/media/
chmod -R 775 log/
chmod -R 775 tmp/
chmod -R 775 var/
```

### Web Server Configuration

#### Apache .htaccess Issues

**Problem**: URLs not working, 404 errors for admin or shop pages

**Solution**:
1. Enable mod_rewrite:
   ```bash
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

2. Check .htaccess files exist in:
   - Shop root directory
   - `/admin/` directory

3. Verify Apache configuration allows .htaccess:
   ```apache
   <Directory /path/to/oxid-shop>
       AllowOverride All
   </Directory>
   ```

#### Nginx Configuration

**Problem**: Nginx not serving OXID correctly

**Basic Nginx configuration**:
```nginx
server {
    listen 80;
    server_name localhost;
    root /path/to/oxid-shop;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location /admin/ {
        try_files $uri $uri/ /admin/index.php?$args;
    }
}
```

### PHP Configuration Issues

#### Missing Extensions

**Problem**: Required PHP extensions not installed

**Check installed extensions**:
```bash
php -m | grep -E "(mysql|gd|curl|json|xml|zip|bcmath|mbstring)"
```

**Install missing extensions (Ubuntu/Debian)**:
```bash
sudo apt install php8.1-mysql php8.1-gd php8.1-curl php8.1-json php8.1-xml php8.1-zip php8.1-bcmath php8.1-mbstring
sudo systemctl restart apache2
```

#### PHP Configuration Issues

**Common php.ini settings that may cause problems**:

```ini
; Increase these values if needed
memory_limit = 1024M
max_execution_time = 300
max_input_vars = 3000
upload_max_filesize = 64M
post_max_size = 64M

; Enable required extensions
extension=mysqli
extension=gd
extension=curl
extension=json
extension=xml
extension=zip
extension=bcmath
extension=mbstring
```

### Unified Namespace Issues

#### Class Generation Failures

**Problem**: Unified namespace classes not generated properly

**Solution**:
```bash
# Clear cache and regenerate
rm -rf tmp/*
./vendor/bin/oe-console oe:oxideshop:generate-unified-namespace
```

#### Chain Extension Problems

**Problem**: Module chain extensions not working

**Solution**:
1. Check module activation:
   ```bash
   ./vendor/bin/oe-console oe:module:list
   ```

2. Regenerate namespace:
   ```bash
   ./vendor/bin/oe-console oe:oxideshop:generate-unified-namespace
   ```

### Setup Wizard Issues

#### Wizard Not Loading

**Problem**: Setup wizard shows blank page or errors

**Solution**:
1. Check PHP error logs:
   ```bash
   tail -f /var/log/php_errors.log
   ```

2. Enable PHP error display temporarily:
   ```php
   // Add to top of index.php temporarily
   ini_set('display_errors', 1);
   error_reporting(E_ALL);
   ```

3. Verify file permissions and ownership

#### Configuration File Issues

**Problem**: Configuration not saved properly

**Solution**:
1. Check if config.inc.php is writable
2. Manually create configuration file with proper settings
3. Verify database credentials

### Module Installation Issues

#### Module Activation Failures

**Problem**: Modules cannot be activated after shop installation

**Solution**:
```bash
# Check module dependencies
./vendor/bin/oe-console oe:module:list

# Reinstall module
./vendor/bin/oe-console oe:module:uninstall module_id
./vendor/bin/oe-console oe:module:install module_path
./vendor/bin/oe-console oe:module:activate module_id
```

## Debugging Tools

### Enable Debug Mode

Add to config.inc.php for development:
```php
$this->iDebug = 1;
$this->blLogging = true;
$this->blLogChangesInAdmin = true;
```

### Log Files

Check these log files for errors:
- `log/oxideshop.log` - General OXID errors
- `/var/log/apache2/error.log` - Apache errors
- `/var/log/php_errors.log` - PHP errors

### Console Commands for Debugging

```bash
# Check system status
./vendor/bin/oe-console oe:oxideshop:facts

# List available commands
./vendor/bin/oe-console list

# Clear all caches
./vendor/bin/oe-console oe:cache:clear
```

## Getting Help

If you cannot resolve your installation issues:

1. **Check the logs** for specific error messages
2. **Search the [OXID Forum](https://forum.oxid-esales.com)** for similar issues
3. **Review system requirements** in [Environment Preparation](environment-preparation)
4. **Ask for help** in the OXID community forums with:
   - Your system specifications
   - Complete error messages
   - Steps you've already tried

## Prevention

To avoid common installation issues:

- Always use recommended PHP versions and extensions
- Test your environment before installation
- Keep Composer updated
- Use proper file permissions from the start
- Follow the installation guide step by step