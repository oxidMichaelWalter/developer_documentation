---
sidebar_position: 1
---

# Unified Namespace Classes

The **Unified Namespace** (`OxidEsales\Eshop`) provides an edition-independent namespace for module and core developers. Regardless of whether the shop edition is CE (Community Edition), PE (Professional Edition), or EE (Enterprise Edition), the Unified Namespace class name should be used in code (both core and modules).

## What is the Unified Namespace?

The Unified Namespace is a key architectural concept in OXID eShop that abstracts away the differences between different shop editions. Instead of writing edition-specific code, developers can use the unified namespace classes which automatically map to the appropriate edition-specific implementations.

## Key Benefits

- **Edition Independence**: Write code once that works across all OXID eShop editions
- **Module Compatibility**: Modules work seamlessly across CE/PE/EE installations
- **Future Proof**: Code remains compatible as the shop evolves
- **Simplified Development**: No need to handle edition-specific class names

## How It Works

The Unified Namespace system works through a sophisticated inheritance chain where:

1. Community Edition classes form the base layer
2. Professional Edition classes extend Community classes (if available)
3. Enterprise Edition classes extend Professional classes (if available)
4. Unified Namespace classes extend the highest available edition class
5. Module classes can extend Unified Namespace classes

## Example Usage

Instead of using edition-specific class names:

```php
// DON'T DO THIS - Edition specific
$article = new OxidEsales\EshopCommunity\Application\Model\Article();
$article = new OxidEsales\EshopProfessional\Application\Model\Article();
$article = new OxidEsales\EshopEnterprise\Application\Model\Article();
```

Always use the Unified Namespace:

```php
// CORRECT - Edition independent
$article = new OxidEsales\Eshop\Application\Model\Article();
// or using the factory method
$article = oxNew(OxidEsales\Eshop\Application\Model\Article::class);
```

## Core Components

The Unified Namespace system consists of several key components:

### [Unified Namespace Generator](unified-namespace-generator)
Learn how the unified namespace classes are automatically generated and when this process is triggered.

### [Inheritance Chain](unified-namespace-inheritance)
Understand the sophisticated inheritance chain that makes edition independence possible, including visual diagrams of how classes extend each other.

## Important Notes

:::warning Class Introspection
Do NOT use PHP's `get_class()` method with unified namespace objects, as its return value depends on the currently activated modules:

```php
// This returns the actual module class, not the unified namespace class
$className = get_class(oxNew(OxidEsales\Eshop\Application\Model\Article::class));
// Could return: Vendor1\Module2\Application\Model\Article
```

Instead, use the unified namespace class name directly in your code.
:::

## Backward Compatibility

The system also maintains backward compatibility with legacy class names through class aliases:

```php
// Legacy class names still work
$article = oxNew('oxarticle');
// Maps to: OxidEsales\Eshop\Application\Model\Article
```

## Related Topics

- **[Module Development](/docs/development/modules-components-themes/module/)**: How to extend unified namespace classes in modules
- **[Autoloading](../autoloading)**: How the class loading system discovers and loads unified namespace classes
- **[Service Container](/docs/development/tell-me-about/service-container)**: Dependency injection with unified namespace classes