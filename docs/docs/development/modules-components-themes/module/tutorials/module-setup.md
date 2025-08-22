# Best Practice Module Setup for Development with Composer

There are several ways how to setup your module development environment with OXID eShop. The most common way is to register path in project `composer.json` file.

## Module Installation Steps

### 1. Install the Module

```bash
vendor/bin/oe-console oe:module:install <module sourcecode path>
```

### 2. Register Module Package in Project composer.json

```bash
cd <shop_directory>
composer config repositories.<package-name> path <module sourcecode path>
composer require <package-name>:*
```

Where:
- `<package-name>` - Is your module name, which is being used in `composer.json` file, for example "oxid-esales/module-template".

If all steps have been completed, module files will be autoloaded and you will be able to introduce modifications to the module in `<module sourcecode path>` directory.

:::important
Autoloading could fail if the autoload directory in the module `composer.json` is not set to the composer vendor directory.
Code snippet how to do this can be found in the [module autoload section](../skeleton/metadataphp/amodule/module-autoload).
:::

More useful information about module development can be found in the [Create Basic Module](./create-basic-module) tutorial.

## Dealing with Other Libraries

If your module has dependencies to other libraries they need to be registered in module `composer.json` file by modifying it:

```json
{
    "require": {
        "<package-name>": "<version>"
    }
}
```

And run update command in project root directory:

```bash
composer update
```