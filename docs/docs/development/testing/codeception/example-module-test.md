# Example Module test

Let's assume the [example module](#codeception_example_module) is installed in your shop,
[Codeceptions initialization](#codeception_initialization)
is done as described and you'd like to write a Codeception acceptance test verifying that
you see a "Hello, my shopid is 1" on the shop's start page with activated module.

## Create a Cest

You can create a Cest by running the following command from inside the module `Tests` directory (`<vendor_name>/<module_name>/Tests`):

```bash
<shop_dir>/vendor/bin/codecept generate:cest Acceptance CheckShopFrontend
```

The empty `<vendor_name>/<module_name>/Tests/Codeception/Acceptance/CheckShopFrontendCest.php` Cest will be
automatically created.

```php
<?php

class CheckShopFrontendCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    // tests
    public function checkShopStartPageWorks(AcceptanceTester $I)
    {
        $homePage = new \OxidEsales\Codeception\Page\Home($I);
        $I->amOnPage($homePage->URL);
        $I->see("Hello, my shopid is 1");
    }
}
```

For a complete working test example please refer to the 
[OXID eShop Module Template](https://github.com/OXID-eSales/module-template) repository.