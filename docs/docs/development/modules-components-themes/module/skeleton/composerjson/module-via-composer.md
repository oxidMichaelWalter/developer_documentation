# Composer.json for an OXID eShop Module {#copy_module_via_composer-20170217}

:::tip YouTube Tutorial
Watch a short video tutorial on YouTube: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

OXID eShop modules with [metadata version greater 2.0](../metadataphp/index) are installed via Composer by using the
[OXID eShop Composer Plugin](https://github.com/OXID-eSales/oxideshop_composer_plugin).

To install a module correctly, this plugin requires four fields to be described in module `composer.json` file:

- [name](#module_name-20170926)
- [type](#module_type-20160524)
- [require](#module_require-20170926)
- [autoload](#module_autoload-20170926)

## Template module example

```json
{
    "name": "oxid-esales/module-template",
    "description": "",
    "type": "oxideshop-module",
    "keywords": [
        "oxid",
        "modules",
        "eShop"
    ],
    "license": [
        "GPL-3.0"
    ],
    "prefer-stable": true,
    "prefer-dist": true,
    "require": {
        "php": "^8.0 | ^8.1"
    },
    "minimum-stability": "dev",
    "require-dev": {
        "phpstan/phpstan": "^1.9.14",
        "squizlabs/php_codesniffer": "3.*",
        "phpmd/phpmd": "^2.11",
        "oxid-esales/oxideshop-ce": "dev-b-7.0.x"
    },
    "conflict": {
        "oxid-esales/oxideshop-ce": "<7.0"
    },
    "autoload": {
        "psr-4": {
            "OxidEsales\\ModuleTemplate\\": "src/",
            "OxidEsales\\ModuleTemplate\\Tests\\": "tests/"
        }
    },
    "scripts": {
        "phpcs": "phpcs --standard=tests/phpcs.xml",
        "phpcbf": "phpcbf --standard=tests/phpcs.xml",

        "phpstan": "phpstan -ctests/PhpStan/phpstan.neon analyse src/",
        "phpstan-report": "phpstan -ctests/PhpStan/phpstan.neon analyse src/ --error-format=json > phpstan.report.json",

        "phpmd": "phpmd src ansi tests/PhpMd/standard.xml",
        "phpmd-excludestaticaccess": "phpmd src ansi tests/PhpMd/exclude-static-access-rule.xml",
        "phpmd-report": "phpmd src json tests/PhpMd/standard.xml --reportfile tests/reports/phpmd.report.json",

        "static": [
            "@phpcs",
            "@phpstan",
            "@phpmd"
        ]
    },
    "config": {
        "allow-plugins": {
            "oxid-esales/oxideshop-composer-plugin": true,
            "oxid-esales/oxideshop-unified-namespace-generator": true
        }
    }
}
```

## name {#module_name-20170926}

This is the name the OXID eShop module will be publicly known and installable.
E.g. in our example you could type

```bash
composer require oxid-esales/module-template
```

## type {#module_type-20160524}

Module must have `oxideshop-module` value defined as a type.
This defines how the repository should be treated by the installer.

## require {#module_require-20170926}

Here you must define all dependencies your module has.

You must define:

* a minimum PHP version. In the example PHP >=8.0 is required
* the required PHP extension and their versions, if applicable. In the example the PHP extensions curl and openssl must be activated
* the required composer components, if applicable. In the example the are no requirements defined

## Autoload {#module_autoload-20170926}

Composer autoloader is used to load classes. In order to load module classes
the module needs to register it's namespace to the root module path:

```json
"autoload": {
  "psr-4": {
    "<vendor>\\<module-name>\\": ""
  }
}
```