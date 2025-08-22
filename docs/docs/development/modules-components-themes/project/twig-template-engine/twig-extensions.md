# Custom OXID extensions

All extensions can be found in `src\Extensions` directory of the [OXID eShop twig component](https://github.com/OXID-eSales/twig-component).

## Tags

### HasRights

This extension introduces the `{% hasrights %}` tag which covers the Right and Roles functionality.

All parameters are passed as associative array right after the keyword `hasrights`.

Example:

```twig
{% hasrights { "object": "edit", "readonly": "readonly" } %}
    Lorem ipsum
{% endhasrights %}
```

### IfContent

This extension introduces the `{% ifcontent %}` tag which covers the content loading functionality.

Opening tag syntax:

```twig
{% ifcontent ident|oxid ... set ... %}
```

Example:

```twig
{% ifcontent ident "TOBASKET" set aObject %}
    Lorem ipsum
{% endifcontent %}
```

ifcontent can work with ident or oxid - depends on word after `ifcontent` keyword and sets variable which is named
after `set` keyword.

### IncludeDynamic

This extension introduces the `{% include_dynamic %}` which renders or leaves dynamic parts with parameters in templates
used by content caching algorithm.

The syntax is similar to the Twig `{% include %}` tag:

```twig
{% include_dynamic ... with { ... } %}
```

Example:

```twig
{% include_dynamic "widget/product/compare_links.html.twig" with {type: "compare", anid: altproduct } %}
```

## Functions

### FormatPriceExtension

This extension introduces the `format_price` function which outputs price in string format.

The first argument is the price, and all other parameters are passed in an associative array.

Example:

```twig
{{ format_price(VATitem, { currency: 'EUR' }) }}
```

### IncludeWidgetExtension

This extension introduces the `include_widget` function which sets params and renders widget.

All parameters are passed in an associative array as first argument.

Example:

```twig
{{ include_widget({ cl: "oxwCategoryTree", cnid: oView.getCategoryId(), deepLevel: 0, noscript: 1, nocookie: 1 }) }}
```

### InputHelpExtension

This extension introduces 2 helper functions: `get_help_id` and `get_help_text` which outputs help popup icon and
help text.

Example:

```twig
{% include "inputhelp.tpl" with {'sHelpId': get_help_id("foo"), 'sHelpText': get_help_text("foo")} %}
```

### MailtoExtension

This extension introduces the `mailto` function which covers send email functionality.

The address as a mandatory parameter is passed as the first argument, all other parameters are passed as the second argument in an array.

Example:

```twig
{{ mailto('me@example.com', { text: 'send me some mail' }) }}
```

### MathExtension

This extension introduces math functions that do not exist by default: cos, sin, tan, exp, log, log10, pi, sqrt:

```twig
{{ cos(2*pi())/log(3) }}
```

### PhpFunctionExtension

This extension introduces PHP functions that do not exist by default: count, empty, isset.

Example:

```twig
{{ (isset(myArray) and not empty(myArray)) ? count(myArray) : "Array is not set or it's empty" }}
```

These functions are deprecated and it's better to use `length` filter and `is defined` Twig test.

### ScriptExtension

This extension introduces the `script` function which collects given javascript includes/calls, but includes/calls them
at the bottom of the page.

All parameters are passed in an associative array as the first argument.

Example:

```twig
{{ script({ include: "js/pages/details.min.js", priority: 10, dynamic: __oxid_include_dynamic }) }}
```

### StyleExtension

This extension introduces the `style` function which collects given css files but includes them only at the top of
the page.

All parameters are passed in associative array as a first argument.

Example:

```twig
{{ style({ include: "css/ie8.css", if: "IE 8" }) }}
```

### TranslateExtension

This extension introduces the `translate` function which is responsible for translation functionality.

All parameters are passed in associative array as first argument.

Example:

```twig
{{ translate({ ident: "ERROR_404" }) }}
```

### UrlExtension

This extension introduces the `seo_url` function and the `add_url_parameters` filter which output an SEO style url.

For both, all parameters are passed in an associative array as first argument and `add_url_parameters` must operate on
string.

Example:

```twig
{{ seo_url({ ident: oViewConf.getSelfLink() }) }}
{{ _lng.link|add_url_parameters(oView.getDynUrlParams()) }}
```

## Filters

### CatExtension

This extension introduces the `cat` filter which concatenates two strings.

Example:

```twig
{{ varA|cat(varB) }}
```

This filter is deprecated.

Use the Twig syntax instead:

```twig
{{ varA ~ varB }}
```

### DateFormatExtension

This extension introduces the `date_format` filter which is responsible for formatting the date into a string.

Example:

```twig
{{ review.getCreatedAt()|date_format("%Y-%m- % d") }}
```

### EncloseExtension

This extension introduces the `enclose` filter.

Example:

```twig
{{ article.oxarticles__oxartnum.value|enclose("encl") }}
```

### FileSizeExtension

This extension introduces the `file_size` filter which converts an integer file size into a readable format.

Example:

```twig
{{ oOrderFile.getFileSize()|file_size }}
```

### FormatTimeExtension

This extension introduces the `format_time` filter which converts time into a readable format.

Example:

```twig
{{ oViewConf.getBasketTimeLeft()|format_time }}
```

### FormatDateExtension

This extension introduces the `format_date` filter which converts date to readable format.

Example:

```twig
{{ edit.oxorder__oxsenddate|format_date('datetime', true) }}
```

### FormatCurrencyExtension

This extension introduces the `format_currency` filter which formats currency in defined form.

Example:

```twig
{{ 'EUR@ 1.00@ .@ ,@ EUR@ 2'|number_format(25000000.5584) }}
```

### SmartWordwrapExtension

This extension introduces the `smart_wordwrap` filter which wraps a string of text at a given length and row count.

Example:

```twig
{{ 'Lorem ipsum'|smart_wordwrap(20) }}
```

### TranslateExtension (Filter)

This extension introduces the `translate` filter which is responsible for translation functionality.

Example:

```twig
{{ 'QUESTIONS_ABOUT_THIS_PRODUCT'|translate }}
```

### TranslateSalutationExtension

This extension introduces the `translate_salutation` filter which is responsible for salutation translation functionality.

Example:

```twig
{{ order.oxorder__oxbillsal.value|translate_salutation }}
```

### TruncateExtension

This extension introduces the `truncate` filter which truncates a string to a certain length if necessary, optionally
splitting in the middle of a word, and appending the 'etc' string or inserting 'etc' into the middle.

Example:

```twig
{{ review.getObjectTitle()|truncate(60) }}
```

### WordwrapExtension

This extension introduces the `wordwrap` filter which wraps a string of text at a given length.

Example:

```twig
{{ sQuery|wordwrap(100, "<br>", true) }}
```

### Escape

Escape is internal Twig filter but it can be extended and so it is done in OXID.

The following custom escapers have been introduced:
`decentity`, `hexentity`, `hex`, `htmlall`, `mail`, `nonstd`, `quotes`, `urlpathinfo`.

All escapers can be found in the `source\Internal\Twig\Escaper` directory.

Example:

```twig
{{ 'example@me.com'|escape('mail') }}
```