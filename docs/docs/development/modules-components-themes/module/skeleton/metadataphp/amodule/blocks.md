# blocks (Smarty only)

:::note
**Extending Twig blocks**

The `blocks` section in `metadata.php` is used for *Smarty* templates only.

To find out how to extend *Twig* blocks, see [Twig template documentation for modules](../using-twig-in-module-templates.md).
:::

## Description

In this array are registered all module **Smarty** templates blocks. On module activation they are automatically inserted into database. On activating/deactivating module, all module blocks also are activated/deactivated.

## Type

Array of arrays. Sub keys can be `template`, `block`, `file` and `position`.

## Mandatory

No

## Example

```php
'blocks' => [
    [
        //It is possible to replace blocks by theme, to do so add 'theme' => '<theme_name>' key/value in here
        'template' => 'page/shop/start.tpl',
        'block' => 'start_welcome_text',
        'file' => 'views/smarty/blocks/oemt_start_welcome_text.tpl'
    ]
]
```

Differences in block file definition per shop/metadata version.

Template block `file` value holding path to your customized block should be defined using full path from module directory, earlier it was a sub path from modules `out/blocks` directory.

You can define a position of a block if a template block is extended multiple (by different modules). So you can sort the block extensions. This is done via the optional template block `position` value.

## Theme-specific blocks

To register or extend theme-specific block template, add a `'theme'` key to the block's definition:

```php
'blocks' => [
    [
        'theme' => 'shop_theme_id'
        'template' => 'name_off_shop_template_which_contains_block',
        'block' => 'name_off_shop_block',
        'file' => 'path_to_module_block_file',
    ]
]
```