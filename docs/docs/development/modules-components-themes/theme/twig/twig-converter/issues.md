# Known Issues

When converting Smarty templates to Twig using the converter tool, several known issues may arise. Understanding these limitations helps plan for manual adjustments after automated conversion.

## Variable Escaping

In Twig by default all variables are escaped. Some variables should be filtered with `|raw` filter to avoid this.

**Issue**: Variables that contain HTML or should not be escaped will be double-escaped.
**Solution**: Add the `|raw` filter where appropriate.

```twig
{# Before #}
{{ htmlContent }}

{# After #}
{{ htmlContent|raw }}
```

## Variable Scope

In Twig variables declared in templates have scopes limited by blocks (`{% block %}`, `{% for %}` and so on). Some variables should be declared outside these blocks if they are used outside.

**Issue**: Variables declared inside blocks are not accessible outside.
**Solution**: Move variable declarations to appropriate scope level.

```twig
{# Problem #}
{% for item in items %}
    {% set counter = counter + 1 %}
{% endfor %}
{{ counter }} {# counter is not accessible here #}

{# Solution #}
{% set counter = 0 %}
{% for item in items %}
    {% set counter = counter + 1 %}
{% endfor %}
{{ counter }}
```

## Re-declaring Blocks

Re-declaring blocks is forbidden in Twig.

**Issue**: Multiple block definitions with the same name cause errors.
**Solution**: Use unique block names or extend/append patterns.

## Array Access Syntax

Access to array item `$myArray.$itemIndex` should be manually translated to `myArray[itemIndex]`.

**Issue**: Dynamic property access doesn't convert properly.
**Solution**: Manual conversion required.

```twig
{# Smarty #}
[{$myArray.$itemIndex}]

{# Twig - needs manual conversion #}
{{ myArray[itemIndex] }}
```

## Non-existing Property Checks

Problem with checking non-existing (null) properties. E.g. we want to check the value of non-existing property `oxarticles__oxunitname`. Twig checks with `isset` if this property exists and it's not, so Twig assumes that property name is function name and tries to call it.

**Issue**: Undefined property access may be treated as function calls.
**Solution**: Use proper existence checks or default filters.

```twig
{# Problem #}
{{ object.nonExistentProperty }}

{# Solution #}
{{ object.nonExistentProperty|default('') }}
{# or #}
{% if object.nonExistentProperty is defined %}
    {{ object.nonExistentProperty }}
{% endif %}
```

## Regular Expressions

Uses of regex strings in templates - the tool can break or work incorrectly on complex cases. It's safer to manually copy & paste regular expressions.

**Issue**: Complex regex patterns may not convert correctly.
**Solution**: Manual review and adjustment of regex patterns.

## Section Loop Detection

`[{section}]` - `loop` is array or integer - different behaviors. The tool is not able to detect variable type.

**Issue**: Section conversion depends on loop variable type but cannot be auto-detected.
**Solution**: Manual review of section conversions based on actual variable types.

```twig
{# Array loop #}
{% for item in arrayVariable %}
    {# content #}
{% endfor %}

{# Integer loop #}
{% for i in 1..integerVariable %}
    {# content #}
{% endfor %}
```

## Best Practices for Manual Review

1. **Test thoroughly**: Always test converted templates in your application
2. **Check escaping**: Review variables that should use `|raw` filter
3. **Validate blocks**: Ensure no duplicate block names exist
4. **Review conditionals**: Check property existence patterns
5. **Test with data**: Use real data to validate array access patterns