# Running Codeception Tests {#running-codeception-tests}

To run all Codeception tests of your module:

```bash
MODULE_IDS=<moduleId-1>,<moduleId-2> \
  vendor/bin/codecept run Acceptance \
  -c <vendor_name>/<module_name>/tests/codeception.yml
```

## Run with PHPStorm

The description how to setup Codeception on PHPStorm you can find [here](https://www.jetbrains.com/help/phpstorm/using-codeception-framework.html).

**Note:** The default configuration file for the test runner is located in `<shop_dir>/tests/codeception.yml`.