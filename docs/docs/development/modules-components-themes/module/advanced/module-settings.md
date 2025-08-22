# Module Settings

:::note
Watch a short video tutorial on YouTube: [Module Settings](https://www.youtube.com/watch?v=2gLrhrEZ83M).
:::

OXID eShop module functionality has a feature which allows easily configure module settings via admin web interface.

## Using module settings

To use module settings feature you need to define module settings in your module `metadata.php` file. How
the settings structure looks please check
[settings documentation page](../skeleton/metadataphp/amodule/settings.md).

When settings are described, module configuration must be installed, the command can be found in
[module development document](../tutorials/module-setup.md).

In OXID eShop admin backend settings will be displayed in:
**Extensions → Modules**, please select your module and click **Settings**.

## Changing settings in non standard way

In case there is a need to change module setting not through the standard way (see section above), but a custom way.
For example you want to have custom settings page for your module.
To achieve this you still need to define all of the settings in `metadata.php`
file. If you don't want that these settings would be displayed in **Settings** page, don't add
[group](../skeleton/metadataphp/amodule/settings.md#hiding-settings).
To save settings OXID eShop has settings service which allows to save them:

```php
use OxidEsales\EshopCommunity\Internal\Framework\Module\Facade\ModuleSettingServiceInterface;

$moduleSettingService = ContainerFacade::get(ModuleSettingServiceInterface::class);
$moduleSettingService->saveString('setting-name', 'value', 'module-id');
```

ModuleSettingServiceInterface has multiple methods for different data types (string, bool, int, collection/array)
which should be used depending on type of your setting.
Settings service will persist setting into the configuration yaml
file. More info about configuration files please read in
[module configuration documentation](../installation-setup/configuration.md).

## Receiving module setting

In OXID eShop backend to receive module setting please use settings service. Example below:

```php
use OxidEsales\EshopCommunity\Internal\Framework\Module\Facade\ModuleSettingServiceInterface;

$moduleSettingService = ContainerFacade::get(ModuleSettingServiceInterface::class);
$moduleSettingService->getString('setting-name', 'module-id');
```

The service will return cached value from the configuration file.

:::important
Since v7.0 shop doesn't store module settings in the database. You can't receive a module setting
from Config class or oxconfig table.
:::