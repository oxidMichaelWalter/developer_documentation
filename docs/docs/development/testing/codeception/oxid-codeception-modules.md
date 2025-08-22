# OXID Codeception modules and helpers {#codeception-modules}

> "All actions and assertions that can be performed by the Tester object (`AcceptanceTester $I`) in a class are defined in modules.
> You can extend the testing suite with your own actions and assertions by writing them into a custom module."

The [Codeception documentation](https://codeception.com/docs/06-ModulesAndHelpers) gives detailed information
about how Codeception modules work and how you can create your own Codeception modules.

To be able to use a Codeception module in a test suite it should be registered in the respective suite configuration yaml file.
In our case when writing Codeception tests for a module, this is the `accceptance.suite.yml` file.

```yaml
modules:
    enabled:
        - <module_class_goes_here>
```

At the moment, following [OXID's Codeception helper modules](https://github.com/OXID-eSales/codeception-modules.git)
are available:

## Oxideshop Module

This module will be used for some common actions like clean up database, clear cache, wait for page load,
waiting for ajax etc.

:::info Note
This codeception module needs the WebDriver and the Db module to be enabled as well.
WebDriver and Db module are standard Codeception modules. They need some parameters like the shop url or database
credentials to work. Parameters can be supplied in `<myvendor>/<mymodule>/Tests/Codeception/Config/params.php`.
:::

```yaml
modules:
    enabled:
        - \OxidEsales\Codeception\Module\Oxideshop:
            depends: 
                - WebDriver
                - Db
```

## Translation Module

This module provides translations for test assertions and interactions.

## Database Module

Standard Codeception Db module for database operations during testing.

For complete configuration examples, see the [OXID eShop testing documentation](https://github.com/OXID-eSales/codeception-modules).