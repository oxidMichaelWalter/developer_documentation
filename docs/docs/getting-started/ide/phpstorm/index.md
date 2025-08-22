---
sidebar_position: 1
---

# JetBrains PhpStorm Setup

PhpStorm is the recommended IDE for OXID eShop development. This guide shows you how to configure PhpStorm for optimal OXID development experience.

## Prerequisites

- **[OXID eShop installed](../../installation/)** and running
- **PhpStorm** (Community or Professional edition)
- **PHP 8.1+** with required extensions
- **Composer** installed and accessible

## Initial Project Setup

### 1. Open OXID Project

1. **Start PhpStorm**
2. **Open Directory** → Navigate to your OXID eShop installation
3. **Wait for indexing** to complete (this may take a few minutes for large projects)

### 2. Configure PHP Interpreter

#### Local Development

1. Go to **File → Settings** (or **PhpStorm → Preferences** on macOS)
2. Navigate to **Languages & Frameworks → PHP**
3. Set **PHP language level** to **8.1** or higher
4. Set **CLI Interpreter** to your PHP installation path
5. Verify required extensions are loaded

#### Docker Development

1. Go to **Languages & Frameworks → PHP**
2. Click **...** next to CLI Interpreter
3. Click **+** → **From Docker, Vagrant, VM, WSL, Remote...**
4. Choose **Docker Compose**
5. Configure:
   - **Configuration files**: `docker-compose.yml`
   - **Service**: `docs` (or your PHP service name)
   - **PHP executable**: `/usr/local/bin/php` (adjust to your container)

#### Remote Development (VM/Server)

1. Go to **Languages & Frameworks → PHP**
2. Click **...** next to CLI Interpreter
3. Click **+** → **From Docker, Vagrant, VM, WSL, Remote...**
4. Choose **SSH Credentials** or **Vagrant**
5. Configure connection details

### 3. Configure Path Mappings

For remote development, set up path mappings:

1. **Deployment → Connection** (for SSH) or **Docker** settings
2. Map local paths to remote paths:
   - Local: `/path/to/local/oxid-shop`
   - Remote: `/var/www/oxideshop` (or container path)

## OXID-Specific Configuration

### 1. Include Paths

Add OXID source directories to include paths:

1. **Languages & Frameworks → PHP**
2. **Include paths** → Add:
   - `vendor/oxid-esales/oxideshop-ce/source`
   - `vendor/oxid-esales/oxideshop-facts/src`
   - `source` (if using unified namespace)

### 2. Namespace Configuration

PhpStorm should automatically detect OXID's PSR-4 autoloading from `composer.json`, but verify:

1. **Languages & Frameworks → PHP → Composer**
2. Ensure **Synchronize IDE settings with composer.json** is enabled
3. Check that OXID namespaces are recognized

### 3. Smarty/Twig Template Support

Enable template support for OXID themes:

1. **Languages & Frameworks → Template Data Languages**
2. Add template directories:
   - `out/[theme]/tpl` (for Smarty templates)
   - `views/twig` (for Twig templates)

## Development Features Setup

### 1. Xdebug Configuration

Enable debugging for OXID development:

#### PHP Configuration (php.ini)
```ini
zend_extension=xdebug
xdebug.mode=develop,debug
xdebug.start_with_request=yes
xdebug.client_host=localhost
xdebug.client_port=9003
xdebug.idekey=PHPSTORM
```

#### PhpStorm Configuration
1. **Languages & Frameworks → PHP → Debug**
2. Set **Xdebug port**: `9003`
3. Enable **Can accept external connections**
4. **Run → Start Listening for PHP Debug Connections**

#### Docker Xdebug
For Docker development, set:
```ini
xdebug.client_host=host.docker.internal  # macOS/Windows
# OR
xdebug.client_host=172.17.0.1  # Linux
```

### 2. Database Integration

Connect to OXID database:

1. **Database** tool window → **+** → **Data Source**
2. Choose **MySQL** or **MariaDB**
3. Configure connection details from OXID's `config.inc.php`
4. Test connection and apply

### 3. Version Control Integration

Set up Git integration:

1. **Version Control → Git**
2. Configure Git executable path
3. Set up GitHub/GitLab integration if needed
4. Review OXID's `.gitignore` patterns

## Code Quality Tools

### 1. Coding Standards Setup

Configure PSR-12 compliance (see [detailed guide](codingstyle)):

1. **Editor → Code Style → PHP**
2. **Set from → Predefined Style → PSR12**
3. Configure **PHP Code Sniffer** integration

### 2. Static Analysis

Enable PHPStan or Psalm:

1. Install via Composer: `composer require --dev phpstan/phpstan`
2. **Tools → External Tools** → Configure analysis tools
3. Create configuration files for OXID-specific rules

## Testing Integration

Configure testing frameworks (see [detailed guide](tests)):

1. **Languages & Frameworks → PHP → Test Frameworks**
2. Add **PHPUnit by Remote Interpreter** (for Docker)
3. Configure paths:
   - **PHPUnit**: `vendor/bin/phpunit`
   - **Configuration file**: `phpunit.xml`
   - **Bootstrap file**: `tests/bootstrap.php`

## Useful Plugins

Recommended PhpStorm plugins for OXID development:

### Essential Plugins
- **PHP Toolbox**: Enhanced PHP support
- **Symfony Plugin**: For dependency injection features
- **Twig**: Template support
- **Database Tools and SQL**: Advanced database features

### Optional Plugins
- **GitLink**: Quick GitHub/GitLab navigation
- **String Manipulation**: Text processing tools
- **Key Promoter X**: Learn keyboard shortcuts
- **Rainbow Brackets**: Better bracket matching

## Keyboard Shortcuts for OXID Development

Essential shortcuts for efficient OXID development:

| Action | Windows/Linux | macOS |
|--------|---------------|--------|
| Navigate to class | `Ctrl+N` | `Cmd+O` |
| Find in files | `Ctrl+Shift+F` | `Cmd+Shift+F` |
| Navigate to file | `Ctrl+Shift+N` | `Cmd+Shift+O` |
| Go to declaration | `Ctrl+B` | `Cmd+B` |
| Find usages | `Alt+F7` | `Opt+F7` |
| Refactor → Rename | `Shift+F6` | `Shift+F6` |
| Generate code | `Alt+Insert` | `Cmd+N` |

## Performance Optimization

For large OXID projects, optimize PhpStorm performance:

1. **Appearance & Behavior → System Settings → Memory Settings**
   - Increase heap size to at least 2048 MB
2. **Editor → General**
   - Disable unnecessary inspections for vendor directories
3. **Directories**
   - Mark `vendor` as **Excluded** (but keep OXID sources)
   - Mark `tmp`, `log` directories as **Excluded**

## Troubleshooting

### Common Issues

**PhpStorm doesn't recognize OXID classes**
- Check include paths configuration
- Verify Composer integration
- Rebuild project index: **File → Invalidate Caches and Restart**

**Xdebug not connecting**
- Verify Xdebug configuration in `php.ini`
- Check firewall settings
- Test with simple `xdebug_info()` call

**Templates not highlighting properly**
- Install Smarty/Twig plugins
- Configure template data languages
- Check file associations

### Performance Issues
- Exclude unnecessary directories
- Increase memory allocation
- Disable unused plugins
- Clear caches regularly

## Next Steps

1. **[Configure coding standards](codingstyle)** for PSR-12 compliance
2. **[Set up testing](tests)** for development workflow
3. **[Create your first module](../../../development/modules-components-themes/module/tutorials/create-basic-module)** using your configured IDE
4. Explore [OXID's system architecture](../../../system-architecture/) to understand the codebase structure