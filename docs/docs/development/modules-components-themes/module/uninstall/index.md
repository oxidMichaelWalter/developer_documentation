# Module Uninstallation

This guide explains how to uninstall OXID eShop modules completely. Uninstallation removes a module's configuration and registration while keeping the files, or completely removes the module including files.

## Uninstall Module

To uninstall a module while keeping the files, use the following command:

```bash
./vendor/bin/oe-console oe:module:uninstall <module-id>
```

:::note
The uninstall command does not remove files from the vendor directory.
:::

Unless a module is removed via Composer, it can be installed via [oe-console](/development/tell-me-about/console) again.

### What Happens During Uninstall

When uninstalling a module:

- Module is deactivated if currently active
- Module configuration is removed from shop configuration files
- Module classes are removed from extension chains
- Module event subscriptions are removed
- Module database tables may be preserved (depends on module implementation)
- Module files remain in the vendor directory

### Uninstall Examples

```bash
# Uninstall a module
./vendor/bin/oe-console oe:module:uninstall my_module

# Uninstall a module from a specific sub shop
./vendor/bin/oe-console oe:module:uninstall my_module --shop-id=2
```

## Remove Module Completely

To completely remove a module including its files, use Composer:

```bash
composer remove vendor/package
```

By executing the Composer command to remove a package, the [OXID eShop Composer Plugin](https://github.com/OXID-eSales/oxideshop_composer_plugin) performs several steps to remove module information, if the package is of type `oxideshop-module`:

1. **Deactivate the module** if it is active
2. **Remove module configurations** from shop configuration files
3. **Remove module classes** from module extension chains
4. **Clear the cache** completely
5. **Rebuild the Service Container**

After these steps, Composer will remove the module from the vendor directory and its autoloader.

## Comparison: Uninstall vs Remove

| Action | Files Removed | Config Removed | Can Reinstall | Command |
|--------|---------------|----------------|---------------|---------|
| **Uninstall** | ❌ No | ✅ Yes | ✅ Easy | `oe:module:uninstall` |
| **Remove** | ✅ Yes | ✅ Yes | ⚠️ Need Composer | `composer remove` |

## Best Practices

### Before Uninstallation

1. **Backup your data** - Create full database and file backups
2. **Test in staging** - Always test uninstallation in a staging environment
3. **Check dependencies** - Ensure no other modules depend on this module
4. **Review custom data** - Check if the module created custom data that needs to be preserved

### After Uninstallation

1. **Clear all caches** - Ensure all caches are cleared
2. **Test shop functionality** - Verify the shop works correctly
3. **Check for orphaned data** - Look for any remaining module-specific data
4. **Monitor error logs** - Watch for any errors related to the removed module

## Troubleshooting

### Common Issues

**Module cannot be uninstalled:**
- Check if other modules depend on this module
- Verify the module is properly deactivated first
- Check admin permissions

**Errors after uninstallation:**
- Clear all caches: `./vendor/bin/oe-console oe:cache:clear`
- Rebuild containers: `./vendor/bin/oe-console oe:cache:clear`
- Check for remaining database references

**Module still appears after removal:**
- Clear Composer autoloader cache: `composer dump-autoload`
- Check for duplicate installations
- Verify module directory is completely removed

## Module-Specific Cleanup

Some modules may require additional cleanup steps:

### Database Cleanup
```bash
# Check for module-specific tables
SHOW TABLES LIKE 'module_prefix_%';

# Review and clean up custom tables if needed
DROP TABLE IF EXISTS module_specific_table;
```

### Configuration Cleanup
Check for any remaining module configuration in:
- `var/configuration/shops/1/modules/`
- Custom configuration files
- Environment variables

## Re-installation

After uninstalling a module:

- **If files remain**: `./vendor/bin/oe-console oe:module:install <module-id>`
- **If completely removed**: `composer require vendor/package` then install