# Configuration file config.inc.php

:::warning Deprecation Notice
The `config.inc.php` file and its related static options are deprecated and will be removed in the next major version, 8.0.
:::

## Database Connection

### dbType

The built-in Doctrine DBAL driver implementation to use. Default is "pdo_mysql": A MySQL driver that uses the pdo_mysql PDO extension.

```php
$this->dbType = 'pdo_mysql';
```

:::warning
We cannot guarantee all shop functionality will work if this value is changed.
:::

### dbCharset

The charset used when connecting to the database. It is highly related with dbType used.

```php
$this->dbCharset = 'utf8';
```

:::warning
We cannot guarantee all shop functionality will work if this value is changed.
:::

### Other Database Connection Variables

```php
$this->dbHost = 'localhost'; // database host name
$this->dbPort  = 3306; // tcp port to which the database is bound
$this->dbName = 'oxid'; // database name
$this->dbUser = 'oxid'; // database user name
$this->dbPwd  = 'oxid'; // database user password
```

## Debugging

### sLogLevel

```php
$this->sLogLevel = 'warning';
```

You can set the log level to one of the levels defined by [PsrLogLevel](https://www.php-fig.org/psr/psr-3). This level will be used by the default PSR-3 logging implementation of OXID eShop.

:::note
Keep in mind that this is the minimum level to be logged and lower levels would not be logged, even if those log levels are used in the code.

The message in the following code example will not be logged to any logging channel, if sLogLevel is set to `warning`. You would have to set sLogLevel to `debug` to see something in the error log file.

```php
$logger->debug('Some debug message', [__CLASS__, __FUNCTION__]);
```

Like this you are able to change the log level temporarily even in productive environments to see more information in your log file.
:::

### iDebug

```php
/**
 * Enable debug mode for template development or bug fixing
 * -1 = Log more messages and throw exceptions on errors (not recommended for production)
 * 0 = off
 * 5 = Delivery Cost calculation info
 * 6 = SMTP Debug Messages
 */
$this->iDebug = 0; // default setting 0
```

The different values do not reflect log levels but rather, which part of the OXID eShop functionality should be logged.

:::note
This setting is for debugging purposes during development ONLY. It prints out a lot of information directly to the front page and is not suitable for a productive environment.
:::

### blSeoLogging

Configure if requests, coming via stdurl and not redirected to seo url be logged to seologs db table.

```php
$this->blSeoLogging = false;
```

:::note
This is only active in productive mode, as the eShop in non productive more will always log such urls
:::

## Timezone Configuration

Shop timezone can be set with `date_default_timezone_set`. Europe/Berlin is default value.

```php
date_default_timezone_set('Europe/Berlin');
```

## Admin Configuration

### sAdminEmail

Force admin email. Offline warnings are sent with high priority to this address.

```php
$this->sAdminEmail = '';
```

### offlineWarningInterval

Defines the time interval in seconds warnings are sent during the shop is offline. 5 minutes is default interval.

```php
$this->offlineWarningInterval = 60 * 5;
```

### blCheckForUpdates

Shop will be checked for version in admin home page only if this option is checked

### sAuthOpenIdRandSource

Define 'Auth_OpenID_RAND_SOURCE' (filename for a source of random bytes)

```php
$this->sAuthOpenIdRandSource  = '/dev/urandom';
```

## Shop Behavior

### blUseTimeCheck

Additionally checks if "oxactivefrom > current date < oxactiveto"

### blUseStock

If value is TRUE checks stock state "( oxstock > 0 or ( oxstock &lt;= 0 and ( oxstockflag = 1 or oxstockflag = 4 ) ) )"

### sCustomTheme

Is a global config parameter which activates a template override system for an easier design customization and defines custom theme directory name in 'views' folder. The structure of this custom theme has to be the same as main theme. The shop will look up if there is an adapted file in your custom folder; if not it will return to the main folder.

### blLogChangesInAdmin

Log all modifications performed in Admin (to oxadmin.log in shop log dir)

```php
$this->blLogChangesInAdmin = false;
```

### blMallSharedBasket

Common cart for subshops use together with option in main shop configurations (Mall tab): "Allow users from other shops"

### blSeoMode

Switch off SEO URLs

```php
$this->blSeoMode = false;
```

### blUseCron

Enables or disables the use of cron jobs in config.inc.php

Implemented with OXID eShop version 4.6.0

```php
$this->blUseCron = true;
```

### iCreditRating

Sets the default value of credit rating

Implemented with OXID eShop version 4.7.3

```php
$this->iCreditRating = 1000;
```

### blEnterNetPrice

Prices will be entered without tax

### blDemoShop

Enables shop demo mode

```php
$this->blDemoShop= true;
```

### iBasketReservationCleanPerRequest

Works only if basket reservations feature is enabled in admin.

The number specifies how many expired basket reservations are cleaned per one request (to the eShop). Cleaning a reservation basically means returning the reserved stock to the articles.

```php
$this->iBasketReservationCleanPerRequest = 200;
```

:::note
Keeping this number too low may cause article stock being returned too slowly, while too high value may have spiking impact on the performance.
:::

### aUserComponentNames

To override FrontendController::$_aUserComponentNames use this array option: array keys are component(class) names and array values defines if component is cacheable (true/false) E.g. array('user_class' => false);

### aMultiLangTables

Additional multi language tables list.

### blDelSetupDir

Control removal of the Setup directory. It will be removed right after the setup is completed, if configuration is true.

```php
$this->blDelSetupDir = false;
```

## PHP Handling in Smarty

If you use Smarty, avoid using PHP, if possible.

If PHP is enabled in Smarty, anyone with admin rights can do anything, and can, for example, bypass security measures.

To disable PHP in Smarty, you have the following options:

* **Recommended**: To achieve maximum security, disable Smarty with the `deactivateSmartyForCmsContent` parameter (see below). With this option, Smarty is applied only in templates, not in content blocks.

* Disable PHP execution with the `iSmartyPhpHandling` parameter (see below). With this option, Smarty is applied, but PHP code cannot be executed in content blocks. The remaining risks that a content editor would be able to display variables and values and to modify data.

### deactivateSmartyForCmsContent

If possible, deactivate Smarty for CMS content.

To deactivate Smarty and make sure that CMS content (descriptions of products and categories, CMS pages, for example) is not processed by Smarty, set the `deactivateSmartyForCmsContent` parameter to `true`.

By default, Smarty is active (parameter value = `false`).

Example:

```php
$this->deactivateSmartyForCmsContent = true;
```

### iSmartyPhpHandling

Deactivate PHP execution in Smarty without deactivating Smarty.

By default, PHP code is executed in Smarty (value = `3`).

To deactivate PHP execution, choose one of the following options:

* Value = `0`: Recommended: Output code in HTML source (not displayed)
* Value = `1`: Display code with PHP tags
* Value = `2`: Display code without PHP tags

```php
$this->iSmartyPhpHandling = <value>;
```

Example:

```php
$this->iSmartyPhpHandling = 0;
```

## Modules

### blDoNotDisableModuleOnError

Disable module auto deactivation

Implemented with OXID eShop versions 5.1.2/4.8.2 and 5.0.11/4.7.11

```php
$this->blDoNotDisableModuleOnError = false;
```

### aModules

Some classes can be overloaded, but only by setting up this information in config.inc.php directly

```php
$this->aModules = array(
    'oxutilsobject' => 'my_oxutilsobject'
);
```

## Uploads and Images

### aAllowedUploadTypes

File type whitelist for file uploads

```php
$this->aAllowedUploadTypes = array('jpg', 'gif', 'png', 'pdf', 'mp3', 'avi', 'mpg', 'mpeg', 'doc', 'xls', 'ppt');
```

### sShopLogo

Add your own logo image file, upload it to /out/azure/img/.

Implemented with OXID eShop version 4.8

```php
$this->sShopLogo = 'your_own_image.jpg'
```

### iPicCount

Change number of item pictures

```php
$this->iPicCount = 12;
```

### sAltImageDir / sSSLAltImageUrl

Use external CDN to deliver images.

```php
$this->sSSLAltImageUrl = "https://[path_to_images_dir_on_server]/"; //for HTTPS URLS
$this->sAltImageDir = "http://[path_to_images_dir_on_server]/"; //for HTTP URLS
```

If value set, affected images (for Products, Categories, Promotions, Vendors, Manufacturers, etc.) will build their paths relative to `path_to_images_dir_on_server`.

For example:

```php
$this->sSSLAltImageUrl = 'https://www.mycdn-server.com/myshop-data/';
// Resulting product URL:
// https://www.mycdn-server.com/myshops-data/generated/product/1/390_245_75/nopic.jpg
```

instead of:

```php
$this->sSSLAltImageUrl = '';
// Resulting product URL:
// https://www.myshop.com/out/pictures/generated/product/1/390_245_75/nopic.jpg
```

:::note
You will require additional OXID component to be able to upload images affected by this setting from the Admin area to a remote storage (see [OXID eShop Cloud Storage component](https://github.com/OXID-eSales/cloud-storage-component) for configuring Amazon Simple Storage Service, or similar).
:::

## Import/Export

### sCSVSign

Separator for Import/Export

### sGiCsvFieldEncloser

Encloser for Import/Export

## Robots

### aRobots

List of all Search-Engine Robots

```php
$this->aRobots = [
    'googlebot',
    'ultraseek',
    'crawl',
    'spider',
    'fireball',
    'robot',
    'slurp',
    'fast',
    'altavista',
    'teoma',
    'msnbot',
    'bingbot',
    'yandex',
    'gigabot',
    'scrubby'
];
```

### aRobotsExcept

Deactivate Static URL's for the Robots listed in this array

```php
$this->aRobotsExcept = array();
```

## Session and Cookies

### blForceSessionStart

Force session start on first page view and for users whose browsers do not accept cookies, append sid parameter to URLs. By default it is turned off.

```php
$this->blForceSessionStart = false;
```

### blSessionUseCookies

Use browser cookies to store session id (no sid parameter in URL)

```php
$this->blSessionUseCookies = true;
```

### aCookieDomains

In case you setup different subdomain for SSL/non-SSL pages cookies may not be shared between them. This setting allows to define the domain that the cookie is available in format: array(_SHOP_ID_ => _DOMAIN_);

```php
$this->aCookieDomains = [
    1 => 'mydomainexample.com'
];
```

:::note
Check setcookie() documentation for more details: https://php.net/manual/de/function.setcookie.php
:::

### aCookiePaths

The path on the server in which the cookie will be available on: array(_SHOP_ID_ => _PATH_);

possibility to define path on the server in which the cookie will be available on.

```php
$this->aCookiePaths = [
    1 => '/dev/urandom'
];
```

:::note
Check setcookie() documentation for more details: https://php.net/manual/de/function.setcookie.php
:::

### aTrustedIPs

Defines IP addresses, for which session + cookie id match and user agent change checks are off.

### aRequireSessionWithParams

This configuration array specifies additional request parameters, which, if received, forces a new session being started.

This is the default array with the request parameters and their values, which forces a new session:

```php
array(
    'cl' => array(
        'register' => true,
        'account'  => true,
    ),
    'fnc' => array(
        'tobasket' => true,
        'login_noredirect' => true,
        'tocomparelist'    => true,
    ),
    '_artperpage' => true,
    'ldtype'      => true,
    'listorderby' => true,
);
```

If you want to extend this array include in config.inc.php file this option:

```php
$this->aRequireSessionWithParams = array(
    'parameter_name' => array(
        'parameter_value' => true,
    )
);
```

The keys of the array are the names of parameters and the values of the arrays are the parameter values that lead to the session being started, e.g:

```php
$this->aRequireSessionWithParams = array(
    'fnc' => array(
        'login_noredirect' => true,
    ),
    'new_sid' => true
);
```

## Views

### blSkipViewUsage

If you can't log in to the admin panel, try setting the parameter blSkipViewUsage temporarily to "true".

Implemented with OXID eShop version 4.7

```php
$this->blSkipViewUsage = false;
```

:::warning
We cannot guarantee all shop functionality will work if this value is changed and we strongly recommend to use this parameter only for accessing the admin panel, in case the View tables are broken.
:::

### blShowUpdateViews

Show "Update Views" button in admin

```php
$this->blShowUpdateViews = true;
```

## Password Hashing

### passwordHashingAlgorithm

Supported values are the strings PASSWORD_BCRYPT, PASSWORD_ARGON2I and PASSWORD_ARGON2ID. Some of the hashing algorithms may not be available on your system depending on your PHP version.

```php
$this->passwordHashingAlgorithm = 'PASSWORD_BCRYPT';
```

### Algorithm Configuration

See https://php.net/manual/en/function.password-hash.php for options and values

Examples:

```php
$this->passwordHashingBcryptCost =  10; // Minimum cost is 4, maximum cost is 31
$this->passwordHashingArgon2MemoryCost =  1024;
$this->passwordHashingArgon2TimeCost =  2;
$this->passwordHashingArgon2Threads =  2;
```

## Enterprise Edition Options

Enterprise Edition related config options. These options have no effect on Community/Professional Editions.

### iDebugSlowQueryTime

Time limit in ms to be notified about slow queries

```php
$this->iDebugSlowQueryTime = 20;
```

### blUseRightsRoles

Enables Rights and Roles engine. Possible values:

* 0 - off
* 1 - only in admin
* 2 - only in shop
* 3 - both

```php
$this->blUseRightsRoles = 3;
```

### aMultishopArticleFields

Define oxarticles fields which could be edited individually in subshops.

```php
$this->aMultishopArticleFields = array("OXPRICE", "OXPRICEA", "OXPRICEB", "OXPRICEC", "OXUPDATEPRICE", "OXUPDATEPRICEA", "OXUPDATEPRICEB", "OXUPDATEPRICEC", "OXUPDATEPRICETIME");
```

:::important
Do not forget to add these fields to oxfield2shop table.
:::

:::note
The field names are case sensitive here
:::

### aSlaveHosts

Database master-slave configuration. Variable contains the list of slave hosts.

```php
$this->aSlaveHosts = array('localhost', '10.2.3.12');
```