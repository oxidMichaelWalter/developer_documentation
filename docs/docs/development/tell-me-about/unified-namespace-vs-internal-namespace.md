# Unified or Concrete Class names - which to use and when?

Historically, after the introduction of the
[Symfony DependencyInjection Component (DIC)](https://symfony.com/doc/current/components/dependency_injection.html),
OXID eShop code "diverged" into 2 application areas:

- New, "DI" namespaces (e.g. `Internal`)
- "Non-DI", aka "Traditional" namespaces (e.g. `Core`, `Application`).

## DI Namespaces

:::info Note
Always use concrete class names with DIC!
:::

The Symfony DIC can manage all the "newer" namespaces
(such namespaces can be identified by the presence of `services.yaml` file in their root directory,
see `source/Internal/services.yaml` or similar).

Because DIC functionality "supersedes" the Inheritance Chain there,
we should never use `oxNew()` and Unified Namespaces and stick only to the concrete class names for all classes in DI Namespaces.

**Example** - *using the concrete interface name for the injected service*

```php
public function __contruct(
    \OxidEsales\EshopCommunity\Internal\ServiceInterface $service
) {
    $this->service = $service;
}
```

**More information:**

- [Service Container](../service-container)
- [Services](../../modules-components-themes/module/skeleton/composerjson/index)

## Non-DI Namespaces

:::warning Note
Never use concrete class names with oxNew()!
:::

In the "Traditional" code, using the concrete class names instead of the Unified Namespaces, will circumvent the creation
of the Inheritance Chain and oxNew functionality.
Therefore, using the "real" class names for extendable classes in Non-Di Namespaces is discouraged.

**Example** - *using the Unified Namespace for model instantiation*

```php
$myModel = oxNew(\OxidEsales\Eshop\Application\Model\MyModel::class);
```

**More information:**

- [Unified Namespace Generator](../../system-architecture/unified-namespace/unified-namespace-generator)
- [Inheritance chain of Unified Namespace classes](../../system-architecture/unified-namespace/unified-namespace-inheritance)