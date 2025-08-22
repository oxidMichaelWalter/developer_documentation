# Module Deactivation

This guide explains how to deactivate OXID eShop modules using different methods. Deactivation temporarily disables a module without removing it from the system.

## By Console

To deactivate a module via [oe-console](/development/tell-me-about/console), execute the following command:

```bash
./vendor/bin/oe-console oe:module:deactivate <module-id>
```

:::note
The parameter `--shop-id` must be appended, if the module must be deactivated for a certain sub shop.
:::

### Console Examples

```bash
# Deactivate a module in the main shop
./vendor/bin/oe-console oe:module:deactivate my_module

# Deactivate a module in a specific sub shop
./vendor/bin/oe-console oe:module:deactivate my_module --shop-id=2
```

## By Administration Area

1. Open OXID eShop administration panel and go to **Extensions → Modules**.
2. Choose the module and click the **Deactivate** button.

## What Happens During Deactivation

When a module is deactivated:

- Module functionality is disabled
- Class extensions are removed from the chain
- Module templates are no longer used
- Module event subscriptions are disabled
- Module services are removed from the container
- Database tables remain intact
- Module files remain on the filesystem

## Best Practices

### Before Deactivation

1. **Check dependencies** - Ensure no other modules depend on this module
2. **Backup data** - Create backups before deactivating critical modules
3. **Test in staging** - Always test deactivation in a staging environment first

### After Deactivation

1. **Clear caches** - Clear all caches after deactivation
2. **Test functionality** - Verify that the shop works correctly without the module
3. **Monitor logs** - Check error logs for any issues related to the deactivated module

## Troubleshooting

### Common Issues

**Module cannot be deactivated:**
- Check if other modules depend on this module
- Verify admin permissions
- Check for module-specific deactivation blocks

**Errors after deactivation:**
- Clear all caches (`./vendor/bin/oe-console oe:cache:clear`)
- Check for remaining class extensions
- Review error logs for specific issues

## Re-activation

To reactivate a deactivated module, use:

```bash
./vendor/bin/oe-console oe:module:activate <module-id>
```

Or use the administration area by clicking the **Activate** button for the deactivated module.