# Extending an Active Theme Block

Learn how to extend or overwrite an active OXID eShop theme block.

## Prerequisites

* You have installed the module.  
  For more information about the module installation, see [Best practice module setup for development with composer](./module-setup).
* You have activated the [Apex theme](https://github.com/OXID-eSales/apex-theme).

## Overwriting 'Mini Basket' Actions

In the following example, replace the original mini basket display button with a new checkout button.

To accomplish this goal, extend `widget_minibasket_total.html.twig`.

**Apex theme structure**
```
├── apex // eShop theme
    └── tpl
        └── widget
            └── minibasket
                └── minibasket.html.twig // Location of the original widget
```

**Module views structure**
```
├── module-1 // The module where we want to extend the block
    └── views
        └── twig
            └── extensions
                └── themes
                    └── apex
                        └── widget
                            └── minibasket
                                └── minibasket.html.twig
```

### Procedure

1. Extend `widget/minibasket/minibasket.html.twig`, then use `dd_layout_page_header_icon_menu_minibasket_functions` block to add the new button to `minibasket`.

:::note
For more information about Twig block and extends tags, see

* [extends](https://twig.symfony.com/doc/2.x/tags/extends.html)
* [block](https://twig.symfony.com/doc/2.x/tags/block.html)
:::

```twig
{% extends 'widget/minibasket/minibasket.html.twig' %}

{% block dd_layout_page_header_icon_menu_minibasket_functions %}

    <a href="{{ seo_url({ ident: oViewConf.getSelfLink()|cat("cl=payment") }) }}" class="btn btn-outline-primary w-100">{{ translate({ ident: "CHECKOUT" }) }}

{% endblock %}
```

2. (Re)activate the module.
3. To make the basket actions visible, add at least one product to the basket.

### Result

The new button appears instead of the original one.

## Extending 'Mini Basket' Actions

In the following example, based on the previous example, keep the original button with the newly added button.

To do so, call the `parent()` method inside a block.

For more information about the method, see [parent()](https://twig.symfony.com/doc/2.x/tags/extends.html#parent-blocks).

### Procedure

Add the `parent()` method to `minibasket.html.twig`.

```twig
{% extends 'widget/minibasket/minibasket.html.twig' %}

{% block dd_layout_page_header_icon_menu_minibasket_functions %}

    {{ parent() }}

    <a href="{{ seo_url({ ident: oViewConf.getSelfLink()|cat("cl=payment") }) }}" class="btn btn-outline-primary w-100">{{ translate({ ident: "CHECKOUT" }) }}

{% endblock %}
```