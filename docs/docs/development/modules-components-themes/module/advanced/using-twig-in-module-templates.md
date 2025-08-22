# Using Twig in module templates

Just by following the directory structure conventions, the Twig template engine allows you to

 * register custom (original) module templates
 * extend existing templates

So, having directory structure conventions means you don't have to register Twig templates or template extensions in the in `metadata.php` file explicitly.

## Registering a new module's template

To register new Twig templates, simply put them into the corresponding directory structure inside your module:

```
└── module-1
    └── views
        └── twig
            ├── module_1_own_template.html.twig
            └── page
                └── module_1_own_template.html.twig
```

After module activation, the templates will be automatically registered with the namespace matching the module's ID:

```shell
@<module-id>/modules_own_template.html.twig
@<module-id>/page/modules_own_template.html.twig
```

:::important
**Terminology**

The expression `extensions`, when used in the following directory structure, is reserved for *template* extensions (see [Extending existing templates](#extending-existing-templates)).

```
└── module-1
        └── views
            └── twig
                └── extensions
                    └── // <- special location for templates that extend other templates
```

Do not use it to register original (non-extending) *module* templates.
:::

## Extending existing templates

:::note
Watch a short video tutorial on YouTube: [Template Extensions](https://www.youtube.com/watch?v=oE7Jrz0eC8k).
:::

In addition to the out-of-box Twig functionality for template inheritance and reuse
(see [Twig documentation for extends tag](https://twig.symfony.com/doc/3.x/tags/extends.html)),
OXID eSales supports *multiple inheritance* for Twig templates.

This allows you to have more than one `{% extends %}` tag called per rendering.

*Multiple inheritance* is an advanced feature that you can use to combine modifications added to a certain template
from multiple modules into an "inheritance chain".

:::caution
**No dynamic and conditional inheritance**

Multiple inheritance with
[dynamic](https://twig.symfony.com/doc/3.x/tags/extends.html#dynamic-inheritance) or
[conditional inheritance](https://twig.symfony.com/doc/3.x/tags/extends.html#conditional-inheritance)
is *not* implemented.

Do not use these Twig features in OXID eShop templates.
:::

Depending on the type of the original template, a module template extension can be of one of the following types:

 * module extension for OXID eShop templates
 * module extension of OXID module templates

Identify the template extension type easily by examining its directory structure (see the examples under [Module extensions for OXID eShop templates](#module-extensions-for-oxid-eshop-templates) and [Module extensions for OXID module templates](#module-extensions-for-oxid-module-templates)).

In addition, under the [Tutorials and recipes](../tutorials/index.md) section, find some practical examples.

### Module extensions for OXID eShop templates

This type of template extensions is located in the `themes/` sub folder of the `extensions/` directory:

```
├── module-1
   └── views
       └── twig
           ├── extensions
              └── themes
                  ├── default
                     └── shop-template.html.twig //put theme-unaware templates here
                  └── some-twig-theme
                      └── shop-template.html.twig //put theme-specific templates here
```

In the example above, the result of rendering `shop-template.html.twig` depends on the active theme's ID:

* If `some-twig-theme` theme is active, the `extensions/themes/some-twig-theme/shop-template.html.twig` template is used in the template chain.

* If the `some-other-twig-theme` theme is active, the `extensions/themes/default/shop-template.html.twig template` is used in the template chain.

:::caution
The following paths are reserved:

    * `extensions/themes`
    * `extensions/themes/default`

They have a special meaning inside of OXID eShop application.

To avoid running into problems with template inheritance, make sure not to use `default` as your
theme ID.
:::

:::note
Inheritance for **admin templates** is similar to the theme-specific inheritance, because `admin` is a theme as well.

When creating admin template extensions (`admin_twig`, for example), just use a corresponding ID.
:::

### Module extensions for OXID module templates

When your module needs to extend a template that originates in another module, place the extension template in
the `modules/` sub folder of the `extensions/` folder:

```
├── module-1 // module-1 file structure
   └── views
       └── twig
           ├── module_1_template.html.twig // original module-1 template
           └── page
               └── module_1_template.html.twig // original module-1 template


└── module-2  // module-2 file structure
    └── views
        └── twig
            └── extensions
                └── modules
                    └── module-1
                        ├── module_1_template.html.twig // extension of module-1 template
                        └── page
                            └── module_1_template.html.twig // extension of module-1 template
```

:::note
For shop templates, we can make theme-specific template extensions (similar to [Module extensions for OXID eShop templates](#module-extensions-for-oxid-eshop-templates)), but for module templates it's not supported.
:::

## Fine-tuning the template inheritance process

Controlling a template rendering engine that utilizes multiple inheritance can be a daunting task by itself.

The situation might get even more complicated if you face the necessity to control the order in which each module template
joins the inheritance chain.

:::note
By default, the module template loading order (template chain) is defined by filesystem and is formed by sorting module IDs
in alphabetical order.
:::

**Example**

For 3 modules with IDs: `module-1`, `module-2`, `module-3`, all extending the same shop template `page/some-template.html.twig`,
the chain will be rendered as:

```
get the "PARENT" template: shop/page/some-template.html.twig
  extended it by module-3/page/some-template.html.twig
    extended it by module-2/page/some-template.html.twig
      extended it by template module-1/page/some-template.html.twig
```

The template that closes the inheritance chain has highest priority because it can go as far as to stop the contents of "parent" templates from being displayed.

If the inheritance chain is not rendered as expected, adjust it in the corresponding `template_extension_chain.yaml` file.

**Example**

```yaml
# Values in var/configuration/shops/<shop-id>/template_extension_chain.yaml file
page/some-template.html.twig: //name of the extended template
    - module-id-3 //highest-priority module ID (the template will be loaded last in the chain)
    - module-id-2
    - module-id-4 //lowest-priority module ID (the template will be loaded earlier in the chain)
```

For this example, having an OXID eShop application with 4 modules active and extending the same eShop template `page/some-template.html.twig` results in the following template chain:

```
* CHAIN START
* shop-template
* module-1-template
* module-4-template
* module-2-template
* module-3-template*
* CHAIN END
```

Templates for modules whose IDs are not specified in the `template_extension_chain` (`module-1-template`, in our example) will be put to the chain start.
They have the lowest priority.