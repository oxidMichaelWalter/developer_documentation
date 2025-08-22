# Converted plugins and syntax pieces

Here is list of plugins and syntax pieces with basic examples how it is converted. Note that these examples are only to show how it is converted and doesn't cover all possible cases as additional parameters, block nesting, repetitive calls (as for counter and cycle functions) etc.

## Core Smarty

### assign => set

**Converter name**: `assign`

| Smarty | Twig |
|--------|------|
| `[{assign var="name" value="Bob"}]` | `{% set name = "Bob" %}` |

### block => block

**Converter name**: `block`

| Smarty | Twig |
|--------|------|
| `[{block name="title"}]Default Title[{/block}]` | `{% block title %}Default Title{% endblock %}` |

### capture => set

**Converter name**: `CaptureConverter`

| Smarty | Twig |
|--------|------|
| `[{capture name="foo" append="var"}] bar [{/capture}]` | `{% set foo %}{{ var }} bar {% endset %}` |

### Comments

**Converter name**: `comment`

| Smarty | Twig |
|--------|------|
| `[{* foo *}]` | `{# foo #}` |

### counter => set

**Converter name**: `counter`

| Smarty | Twig |
|--------|------|
| `[{counter}]` | `{% set defaultCounter = ( defaultCounter \| default(0) ) + 1 %}` |

### cycle => smarty_cycle

**Converter name**: `cycle`

| Smarty | Twig |
|--------|------|
| `[{cycle values="val1,val2,val3"}]` | `{{ smarty_cycle(["val1", "val2", "val3"]) }}` |

### foreach => for

**Converter name**: `for`

| Smarty | Twig |
|--------|------|
| `[{foreach $myColors as $color}]foo[{/foreach}]` | `{% for color in myColors %}foo{% endfor %}` |

### if => if

**Converter name**: `if`

| Smarty | Twig |
|--------|------|
| `[{if !$foo or $foo->bar or $foo\|bar:foo["hello"]}]foo[{/if}]` | `{% if not foo or foo.bar or foo\|bar(foo["hello"]) %}foo{% endif %}` |

### include => include

**Converter name**: `include`

| Smarty | Twig |
|--------|------|
| `[{include file='page_header.tpl'}]` | `{% include 'page_header.tpl' %}` |

### insert => include

**Converter name**: `insert`

| Smarty | Twig |
|--------|------|
| `[{insert name="oxid_tracker" title="PRODUCT_DETAILS"\|oxmultilangassign product=$oDetailsProduct cpath=$oView->getCatTreePath()}]` | `{% include "oxid_tracker" with {title: "PRODUCT_DETAILS"\|oxmultilangassign, product: oDetailsProduct, cpath: oView.getCatTreePath()} %}` |

### mailto => mailto

**Converter name**: `mailto`

| Smarty | Twig |
|--------|------|
| `[{mailto address='me@example.com'}]` | `{{ mailto('me@example.com') }}` |

### math => core Twig math syntax

**Converter name**: `math`

| Smarty | Twig |
|--------|------|
| `[{math equation="x + y" x=1 y=2}]` | `{{ 1 + 2 }}` |

### Variable conversion

**Converter name**: `variable`

| Smarty | Twig |
|--------|------|
| `[{$var}]` | `{{ var }}` |
| `[{$contacts.fax}]` | `{{ contacts.fax }}` |
| `[{$contacts[0]}]` | `{{ contacts[0] }}` |
| `[{$contacts[2][0]}]` | `{{ contacts[2][0] }}` |
| `[{$person->name}]` | `{{ person.name }}` |
| `[{$oViewConf->getImageUrl($sLangImg)}]` | `{{ oViewConf.getImageUrl(sLangImg) }}` |
| `[{$_cur->link\|oxaddparams:$oView->getDynUrlParams()}]` | `{{ _cur.link\|oxaddparams(oView.getDynUrlParams()) }}` |
| `[{($a && $b) \|\| $c}]` | `{{ (a and b) or c }}` |

### Other

**Converter name**: `misc`

| Smarty | Twig |
|--------|------|
| `[{ldelim}]foo[{ldelim}]` | `foo` |
| `[{literal}]foo[{/literal}]` | `{# literal #}foo{# /literal #}` |
| `[{strip}]foo[{/strip}]` | `{% spaceless %}foo{% endspaceless %}` |

## OXID custom extensions

### oxcontent => include content

**Converter name**: `oxcontent`

| Smarty | Twig |
|--------|------|
| `[{oxcontent ident='oxregisteremail'}]` | `{% include_content 'oxregisteremail' ignore missing %}` |

To ensure that Twig ignores the include statement if the template to be included does not exist, mark the include with `ignore missing`.

For more information, see the [Twig documentation](https://twig.symfony.com/doc/2.x/tags/include.html).

### oxeval => include(template_from_string())

**Converter name**: `OxevalConverter`

| Smarty | Twig |
|--------|------|
| `[{oxeval var=$variable}]` | `{{ include(template_from_string(variable)) }}` |

### oxgetseourl => seo_url

**Converter name**: `oxgetseourl`

| Smarty | Twig |
|--------|------|
| `[{oxgetseourl ident=$oViewConf->getSelfLink()\|cat:"cl=basket"}]` | `{{ seo_url({ ident: oViewConf.getSelfLink()\|cat("cl=basket") }) }}` |

### oxhasrights => hasrights

**Converter name**: `oxhasrights`

| Smarty | Twig |
|--------|------|
| `[{oxhasrights object=$edit readonly=$readonly}]foo[{/oxhasrights}]` | `{% hasrights { "object": "edit", "readonly": "readonly", } %}foo{% endhasrights %}` |

### oxid_include_dynamic => include_dynamic

**Converter name**: `oxid_include_dynamic`

| Smarty | Twig |
|--------|------|
| `[{oxid_include_dynamic file="form/formparams.tpl"}]` | `{% include_dynamic "form/formparams.tpl" %}` |

### oxid_include_widget => include_widget

**Converter name**: `oxid_include_widget`

| Smarty | Twig |
|--------|------|
| `[{oxid_include_widget cl="oxwCategoryTree" cnid=$oView->getCategoryId() deepLevel=0 noscript=1 nocookie=1}]` | `{{ include_widget({ cl: "oxwCategoryTree", cnid: oView.getCategoryId(), deepLevel: 0, noscript: 1, nocookie: 1 }) }}` |

### oxifcontent => ifcontent

**Converter name**: `oxifcontent`

| Smarty | Twig |
|--------|------|
| `[{oxifcontent ident="TOBASKET" object="aObject"}]foo[{/oxifcontent}]` | `{% ifcontent ident "TOBASKET" set aObject %}foo{% endifcontent %}` |

### oxinputhelp => include "inputhelp.tpl"

**Converter name**: `oxinputhelp`

| Smarty | Twig |
|--------|------|
| `[{oxinputhelp ident="foo"}]` | `{% include "inputhelp.tpl" with {'sHelpId': getSHelpId(foo), 'sHelpText': getSHelpText(foo)} %}` |

### oxmailto => oxmailto

**Converter name**: `oxmailto`

| Smarty | Twig |
|--------|------|
| `[{oxmailto address='me@example.com'}]` | `{{ mailto('me@example.com') }}` |

### oxmultilang => translate

**Converter name**: `oxmultilang`

| Smarty | Twig |
|--------|------|
| `[{oxmultilang ident="ERROR_404"}]` | `{{ translate({ ident: "ERROR_404" }) }}` |

### oxprice => format_price

**Converter name**: `oxprice`

| Smarty | Twig |
|--------|------|
| `[{oxprice price=$basketitem->getUnitPrice() currency=$currency}]` | `{{ format_price(basketitem.getUnitPrice(), { currency: currency }) }}` |

### oxscript => script

**Converter name**: `oxscript`

| Smarty | Twig |
|--------|------|
| `[{oxscript include="js/pages/details.min.js" priority=10}]` | `{{ script({ include: "js/pages/details.min.js", priority: 10, dynamic: __oxid_include_dynamic }) }}` |

### oxstyle => style

**Converter name**: `oxstyle`

| Smarty | Twig |
|--------|------|
| `[{oxstyle include="css/libs/chosen/chosen.min.css"}]` | `{{ style({ include: "css/libs/chosen/chosen.min.css" }) }}` |

### section => for

**Converter name**: `section`

| Smarty | Twig |
|--------|------|
| `[{section name=picRow start=1 loop=10}]foo[{/section}]` | `{% for picRow in 1..10 %}foo{% endfor %}` |

## Filters

| Smarty | Twig |
|--------|------|
| `smartwordwrap` | `smart_wordwrap` |
| `date_format` | `date_format` |
| `oxaddparams` | `add_url_parameters` |
| `oxaddslashes` | `add_slashes` |
| `oxenclose` | `enclose` |
| `oxfilesize` | `file_size` |
| `oxformattime` | `format_time` |
| `oxformdate` | `format_date` |
| `oxmultilangassign` | `translate` |
| `oxmultilangsal` | `translate_salutation` |
| `oxnubmerformat` | `format_currency` |
| `oxtruncate` | `truncate` |
| `oxwordwrap` | `wordwrap` |