# Version 2.0

:::note
Watch a short video tutorial on YouTube: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA).
:::

## Changes compared to version 1.1

* New Section Controllers: To be able to use namespaces for module controllers, we introduce
  module's metadata.php version 2.0 with a new section `controllers`.
  The support for `files` was dropped in Module's metadata version 2.0. Classes in a namespace will be found by the autoloader.
  If you use your own namespace, [register it in the module's composer.json file](../composerjson/module-via-composer.md).

:::warning Important
Module classes without namespaces can not be register as controllers in the metadata.
:::

## Structure

On the top level of the PHP file metadata.php, there have to be exactly 2 variables:
`$sMetadataVersion (String)` and `$aModule (Array)`. No other variables or code are allowed.

```php
<?php

$sMetadataVersion = '2.0';
$aModule = [
    'id' => ...
    ...
]
```

The array `$aModule` can contain multiple sub keys:

- [id](amodule/id.md)
- [title](amodule/title.md)
- [description](amodule/description.md)
- [lang](amodule/lang.md)
- [thumbnail](amodule/thumbnail.md)
- [version](amodule/version.md)
- [author](amodule/author.md)
- [url](amodule/url.md)
- [email](amodule/email.md)
- [extend](amodule/extend.md)
- [controllers](amodule/controllers.md)
- [blocks](amodule/blocks.md)
- [settings](amodule/settings.md)
- [templates](amodule/templates.md)
- [events](amodule/events.md)

## Example of metadata.php

Here is an example of a module metadata file:

```php title="Example for module using namespaces"
<?php
/**
 * Metadata version
 */
$sMetadataVersion = '2.0';
/**
 * Module information
 */
$aModule = array(
    'id'           => 'myvendor_mytestmodule',
    'title'        => 'Test metadata controllers feature',
    'description'  => '',
    'thumbnail'    => 'picture.png',
    'version'      => '2.0',
    'author'       => 'OXID eSales AG',
    'controllers'  => [
        'myvendor_mytestmodule_MyModuleController' => MyVendor\mytestmodule\MyModuleController::class,
        'myvendor_mytestmodule_MyOtherModuleController' => MyVendor\mytestmodule\MyOtherModuleController::class,
    ],
    'templates' => [
        'mytestmodule.tpl' => 'mytestmodule.tpl',
        'mytestmodule_other.tpl' => 'test_module_controller_routing_other.tpl'
    ]
);
```