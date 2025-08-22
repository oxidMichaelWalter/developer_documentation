---
sidebar_position: 2
---

# Unified Namespace Generator

The **[unified-namespace-generator](https://github.com/OXID-eSales/oxideshop-unified-namespace-generator)** component generates the classes of the namespace `OxidEsales\Eshop`, which are called [unified namespace classes](index). This generation happens automatically on the fly, for example, when you install or update OXID eShop.

## When Are Unified Namespace Classes Generated?

The unified namespace generator implements both a Composer plugin and a standalone script. It generates the unified namespace classes automatically during various Composer operations:

### Automatic Generation Triggers

The generation of unified namespace classes is triggered by running:

- **`composer create-project`** with the OXID eShop metapackage
- **`composer install`**
- **`composer update`** 
  :::tip Safe Update Process
  To avoid errors with old generator versions, first run:
  ```bash
  composer update --no-plugins --no-scripts
  composer update
  ```
  If you encounter errors on direct `composer update`, simply run the command again.
  :::
- **`composer require`**
  :::tip Safe Require Process
  To ensure no errors occur:
  ```bash
  composer require <package> --no-update
  composer update
  ```
  :::
- **`reset-shop`** command
- **Manual execution**: `vendor/bin/oe-eshop-unified_namespace_generator`

## Mode of Operation

Let's trace through what happens when you run a typical installation command:

```bash
composer create-project --no-dev oxid-esales/oxideshop-project my_oxid_eshop_project
```

:::note
The exact branch name may vary depending on the OXID version you're installing.
:::

### Generation Process Steps

The unified namespace generation follows these steps:

1. **Download and Install Libraries**
   - All required libraries are downloaded and installed to the `vendor/` folder

2. **Composer Event Trigger**
   - The `oxideshop-unified-namespace-generator` is executed by the Composer `POST_INSTALL` event

3. **Collect Class Maps**
   - Collects `Core/Autoload/UnifiedNamespaceClassMap.php` files from each installed edition
   - Collects `Core/Autoload/BackwardsCompatibilityClassMap.php` from OXID eShop Community Edition

4. **Generate Classes**
   - Generates the unified namespace classes and writes them to:
   - `vendor/oxid-esales/oxideshop-unified-namespace-generator/generated/`
   - Creates one unified namespace class for every class in the OXID eShop edition

## Generated Files Structure

After generation, you'll find files like:

```
vendor/oxid-esales/oxideshop-unified-namespace-generator/generated/
├── OxidEsales/
│   └── Eshop/
│       ├── Application/
│       │   ├── Model/
│       │   │   ├── Article.php
│       │   │   ├── User.php
│       │   │   └── ...
│       │   └── Controller/
│       │       └── ...
│       └── Core/
│           └── ...
```

Each generated file contains a class that extends the appropriate edition-specific class according to the [inheritance chain](unified-namespace-inheritance).

## Troubleshooting

If you encounter errors during generation or receive messages about missing unified namespace classes:

### Error Example
```bash
Class OxidEsales\Eshop\Core\ConfigFile not found in bootstrap.php on line 18
```

### Troubleshooting Steps

1. **Check Generated Directory**
   - Inspect: `vendor/oxid-esales/oxideshop-unified-namespace-generator/generated`
   - Verify unified namespace classes exist and have correct namespaces
   - Ensure they [extend the correct edition class](unified-namespace-inheritance)

2. **Verify Permissions**
   - Ensure the directory has write permissions for the web server/CLI user

3. **Manual Generation**
   - Execute: `vendor/bin/oe-eshop-unified_namespace_generator`
   - Look for error messages in the output

4. **Check Prerequisites**
   - Verify all requirements from the [Mode of Operation](#mode-of-operation) section are fulfilled
   - Ensure all required packages are properly installed

5. **Clean Regeneration**
   - Delete the generated directory
   - Run `composer update` to regenerate everything

## Integration with Development Workflow

### During Development

The generator typically runs automatically, but you may need manual regeneration when:

- Installing new modules that extend core classes
- Switching between different shop editions
- After significant updates to core packages
- When debugging class loading issues

### Best Practices

- **Don't edit generated files** - They will be overwritten on next generation
- **Include generation in deployment** - Ensure your deployment process triggers class generation
- **Monitor for errors** - Watch for generation errors in your CI/CD pipeline
- **Test after updates** - Verify unified namespace classes work correctly after Composer operations

## Related Topics

- **[Inheritance Chain](unified-namespace-inheritance)**: Understand how the generated classes fit into the inheritance hierarchy
- **[Unified Namespace Overview](index)**: Core concepts and usage patterns
- **[Autoloading](../autoloading)**: How generated classes are discovered and loaded