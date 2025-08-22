# menu.xml

## Menu entry

In order to provide an admin menu entry, you need to add a menu.xml in the root folder of your module.

```
.
├── composer.json
├── metadata.php
├── menu.xml
├── ...
```

This will be automatically loaded and added. The order for the admin menu structure:

1. source/Application/views/admin/menu.xml
2. source/Application/views/admin/user.xml
3. Module menu.xml

## Menu.xml Examples

The following example is introducing a new main menu point within a new submenu entry:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OX>
    <OXMENU id="NAVIGATION_ESHOPADMIN">
        <MAINMENU id="EXAMPLE_MODULE_MAINMENU">
            <SUBMENU id="EXAMPLE_MODULE_START" cl="EXAMPLE_MODULE_CONTROLLER" />
        </MAINMENU>
    </OXMENU>
</OX>
```

This example extends an already existing menu entry and list page with a new tab:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OX>
    <OXMENU id="NAVIGATION_ESHOPADMIN">
        <MAINMENU id="mxorders">
            <SUBMENU id="mxdisplayorders" cl="admin_order" list="order_list">
                <TAB id="EXAMPLE_MODULE_ORDERS" cl="EXAMPLE_MODULE_CONTROLLER" />
            </SUBMENU>
        </MAINMENU>
    </OXMENU>
</OX>
```

The next example also adds a new list within one submenu:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OX>
    <OXMENU id="NAVIGATION_ESHOPADMIN">
        <MAINMENU id="EXAMPLE_MODULE_MAINMENU">
            <SUBMENU id="EXAMPLE_MODULE_SHOW" cl="EXAMPLE_MODULE_FRAME" list="EXAMPLE_MODULE_LIST_VIEW">
                <TAB id="EXAMPLE_MODULE_MAIN" cl="EXAMPLE_MODULE_CONTROLLER"/>
                <TAB id="EXAMPLE_MODULE_DESCRIPTION" cl="EXAMPLE_MODULE_CONTROLLER"/>
            </SUBMENU>
        </MAINMENU>
    </OXMENU>
</OX>
```

## Menu translation

There are 2 ways of providing the translation for the menu entries added through the menu.xml.

### Translation files

Either add it to the admin lang files [Admin modules translation](../../../modules-components-themes/module/skeleton/structure#modules_structure_language_files_admin)

### Module options

It could also be added using `module_options.php` [Admin modules translation](../../../modules-components-themes/module/skeleton/structure#modules_structure_language_files_admin)

:::info Note
While using 'module_options.php' for translation, the translations will only be loaded while being logged in as admin.
:::