---
sidebar_position: 4
---

# Module Installation and Activation

Understanding the module lifecycle is crucial for OXID eShop development. Modules go through several distinct states from installation to activation, each with specific requirements and capabilities. This process ensures modules are properly integrated with the shop's architecture and can safely extend core functionality.

## Module Lifecycle States

The module lifecycle follows a well-defined state machine that ensures proper integration and configuration:

```mermaid
stateDiagram-v2
    [*] --> NonExisting
    
    NonExisting : 🚫 Non Existing
    NonExisting : State where module in OXID eShop
    NonExisting : does not exist yet.
    
    Installed : 📦 Installed  
    Installed : Module assets and configuration
    Installed : in place.
    
    Configured : ⚙️ Configured
    Configured : State where the OXID eShop 
    Configured : administrator already configured 
    Configured : a module via OXID eShop admin, 
    Configured : or by editing configuration files.
    
    Active : ✅ Active
    Active : At this state module becomes
    Active : active.
    
    NonExisting --> Installed : 📥 Installation<br/>via composer install
    Installed --> Configured : ⚙️ Configure module<br/>via eShop admin<br/>or configuration files
    Configured --> Active : 🚀 Module activation<br/>via eShop admin<br/>web interface or CLI command
    
    %% OXID-themed styling
    classDef oxid-nonexisting fill:#f8d7da,stroke:#dc3545,stroke-width:2px,color:#721c24
    classDef oxid-installed fill:#fff3cd,stroke:#ffc107,stroke-width:2px,color:#856404
    classDef oxid-configured fill:#d1ecf1,stroke:#0c5460,stroke-width:2px,color:#0c5460
    classDef oxid-active fill:#c02124,stroke:#a61d20,stroke-width:3px,color:#ffffff
    
    class NonExisting oxid-nonexisting
    class Installed oxid-installed
    class Configured oxid-configured
    class Active oxid-active
```

## State 1: Non-Existing

### Description
The initial state where the module does not exist in the OXID eShop installation yet.

### Characteristics:
- Module is not present in the filesystem
- No references in Composer dependencies  
- OXID eShop is unaware of the module
- No impact on shop functionality

### Actions Available:
- **Installation** via `composer require` or `composer install`

## State 2: Installed

### Description  
Module files and basic configuration are present in the filesystem, but the module is not yet configured for the specific shop instance.

### What Happens During Installation:

1. **Composer Downloads Module**
   - Module files are placed in the appropriate directory (usually `vendor/` or `modules/`)
   - Dependencies are resolved and installed

2. **Autoloading Registration**
   - Module classes become available through [autoloading](autoloading)
   - PSR-4 namespaces are registered with Composer

3. **Metadata Discovery**
   - `metadata.php` file is detected by OXID eShop
   - Module appears in admin interface (but inactive)

### Characteristics:
- ✅ Module files present on filesystem
- ✅ Classes can be autoloaded  
- ✅ Visible in admin module list
- ❌ Not configured for current shop
- ❌ No functional impact on shop
- ❌ Extensions not active

### File Structure Example:
```
vendor/myvendor/mymodule/
├── metadata.php          # Module configuration
├── composer.json         # Composer configuration
├── Application/
│   ├── Model/
│   │   └── Article.php   # Extended classes
│   └── Controller/
└── views/
    └── admin/
```

## State 3: Configured

### Description
The shop administrator has configured the module through the OXID eShop admin interface or by editing configuration files directly.

### Configuration Process:

1. **Admin Interface Configuration**
   - Access: Admin → Extensions → Modules
   - Module-specific settings can be adjusted
   - Configuration stored in shop database

2. **File-Based Configuration** (Alternative)
   - Direct editing of configuration files
   - Useful for deployment automation
   - Changes reflected in admin interface

### What Gets Configured:

- **Module Settings**: Custom configuration options defined by the module
- **Shop Assignment**: Which shops/subshops the module applies to (in Enterprise Edition)
- **Module Dependencies**: Verification of required dependencies
- **Extension Points**: Mapping of extended classes

### Characteristics:
- ✅ Module files present
- ✅ Module settings configured
- ✅ Ready for activation
- ❌ Extensions not yet active
- ❌ No functional impact on frontend/backend

### Configuration Storage:
- **Database Tables**: `oxconfig`, `oxconfigdisplay`
- **Configuration Keys**: Module-specific settings with prefix
- **Multi-shop Support**: Separate configurations per shop in EE

## State 4: Active

### Description
The module is fully operational and its extensions are integrated into the OXID eShop runtime.

### Activation Process:

#### Via Admin Interface:
1. Navigate to Admin → Extensions → Modules
2. Select the configured module
3. Click "Activate" button
4. System performs activation checks and integration

#### Via CLI Command:
```bash
# Activate specific module
vendor/bin/oe-console oe:module:activate <module_id>

# Activate all configured modules
vendor/bin/oe-console oe:module:activate-all
```

### What Happens During Activation:

1. **Extension Chain Integration**
   - Module classes are integrated into [inheritance chains](unified-namespace/unified-namespace-inheritance)
   - Extended classes become part of the runtime system

2. **Database Schema Changes**
   - Module-specific database tables are created
   - Existing tables may be modified (columns added)
   - Migration scripts executed

3. **Template Integration**  
   - Module templates become available
   - Template inheritance chains updated
   - Block extensions registered

4. **Event Listener Registration**
   - Module event listeners are registered
   - Hook points become active

5. **Service Registration**
   - Module services registered with dependency injection container
   - Custom factories and providers available

### Characteristics:
- ✅ All extension points active
- ✅ Database schema updated
- ✅ Templates and blocks available
- ✅ Full functional integration
- ✅ Impact on frontend/backend behavior

## Technical Integration Details

### Class Extension Integration

When a module extends core classes, the activation process:

1. **Updates Extension Chains**
   ```php
   // Before activation
   OxidEsales\Eshop\Application\Model\Article
   
   // After activation  
   OxidEsales\Eshop\Application\Model\Article <- MyModule\Application\Model\Article
   ```

2. **Regenerates Unified Namespace Classes**
   - [Unified namespace generator](unified-namespace/unified-namespace-generator) runs
   - New inheritance chains created
   - Autoloader mappings updated

### Database Integration

Modules can modify the database structure:

```php
// In metadata.php
'sql' => [
    'oxarticles' => [
        'MYMODULE_FIELD' => 'VARCHAR(255) NOT NULL DEFAULT ""'
    ]
],
'tables' => [
    'mymodule_data' => 'CREATE TABLE ...'
]
```

### Template Integration

Template blocks and extensions become active:

```php
// In metadata.php
'blocks' => [
    [
        'template' => 'widget/product/details.tpl',
        'block' => 'details_productmain_title', 
        'file' => 'views/blocks/product_title.tpl'
    ]
]
```

## State Transitions and Management

### Deactivation
Modules can be deactivated, reverting to the **Configured** state:
- Extension chains are removed
- Database schema may remain (for data preservation)
- Templates and blocks become inactive
- Event listeners are unregistered

### Uninstallation  
Complete removal returns to **Non-Existing** state:
- All files removed via `composer remove`
- Configuration data cleared
- Database schema changes may need manual cleanup
- Shop functionality reverts to pre-installation state

### Troubleshooting State Issues

#### Module Stuck in Installation State:
- Check file permissions
- Verify `metadata.php` syntax
- Review Composer autoload configuration

#### Configuration Not Saving:
- Check database connectivity
- Verify admin user permissions
- Review module configuration schema

#### Activation Failures:
- Check dependency conflicts
- Review extension chain conflicts
- Verify database schema compatibility
- Check for PHP errors in logs

## Best Practices

### For Module Developers:
- **Design for all states**: Handle graceful degradation when not active
- **Database migrations**: Provide clean installation and uninstallation
- **Error handling**: Graceful failures during state transitions
- **Testing**: Test all state transitions thoroughly

### For Shop Administrators:
- **Staging deployment**: Test module states in staging environment
- **Backup before changes**: Always backup before module installation/activation
- **Monitor logs**: Watch for errors during state transitions
- **Documentation**: Maintain records of module configurations

### For Deployment:
- **Automate configuration**: Use configuration files for predictable deployments
- **State verification**: Verify expected module states after deployment
- **Rollback planning**: Plan for module deactivation/removal if needed

## Related Topics

- **[Module Development Guide](/docs/development/modules-components-themes/module/)**: Complete guide to developing OXID eShop modules
- **[Unified Namespace](unified-namespace/)**: How module extensions integrate with the unified namespace system
- **[Autoloading](autoloading)**: How module classes are discovered and loaded
- **[Module Configuration](/docs/development/modules-components-themes/project/module_configuration/)**: Detailed module configuration options