# Using the Twig Sandbox Extension

Twig offers a [Sandbox extension](https://twig.symfony.com/doc/3.x/api.html#sandbox-extension) that enables the use of the `{% sandbox %}` tag with the `{% include %}` and `{% include_content %}` tags.

This extension is particularly useful for controlling which tags, filters, and functions are allowed within templates, enhancing security during dynamic template rendering.

To configure and use the Twig Sandbox extension in your OXID eShop, perform the following steps.

## Setup Procedure

### 1. Create a sandbox extension factory

```php
class SandboxExtensionFactory
{
    public static function getExtension(): Twig\Extension\SandboxExtension
    {
        $policy = new Twig\Sandbox\SecurityPolicy(
            allowedTags: ['for'],
            allowedFilters: ['escape', 'raw'],
            allowedFunctions: ['range'],
        );
        return new Twig\Extension\SandboxExtension($policy);
    }
}
```

### 2. Register the sandbox extension

To register the sandbox extension, define the necessary services in your component's or module's `services.yaml` file as follows:

```yaml
ACME\Twig\Extensions\SandboxExtensionFactory:
  class: ACME\Twig\Extensions\SandboxExtensionFactory

Twig\Extension\SandboxExtension:
  factory: ['ACME\Twig\Extensions\SandboxExtensionFactory', 'getExtension']
  tags: [ 'twig.extension' ]
```

### 3. Clear the cache

```bash
vendor/bin/oe-console oe:cache:clear
```

### 4. Enforce the sandbox policy

To enforce the sandbox policy, wrap template includes with the `{% sandbox %}` tag.

```twig
{% sandbox %}
    {% include 'user.html.twig' %}
{% endsandbox %}

# Or

{% sandbox %}
    {% include_content "sandbox_test" %}
{% endsandbox %}
```

### 5. Security enforcement

Templates that do not comply with the defined sandbox policy will trigger a `Twig\Sandbox\SecurityError` exception.

## Security Policy Configuration

The `SecurityPolicy` class allows you to define:

- **allowedTags**: Which Twig tags are permitted
- **allowedFilters**: Which filters can be used
- **allowedFunctions**: Which functions are available
- **allowedMethods**: Which object methods can be called
- **allowedProperties**: Which object properties can be accessed

This granular control ensures that dynamically included templates cannot execute unauthorized operations.