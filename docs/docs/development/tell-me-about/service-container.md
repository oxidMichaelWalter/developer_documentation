---
sidebar_position: 2
---

# Service Container

OXID eShop uses the **Symfony Dependency Injection Container** to manage services, providing a modern approach to dependency management and inversion of control.

:::tip YouTube Tutorial
Watch a short video tutorial: [Components & Services](https://www.youtube.com/watch?v=tgopDKPiUZE)
:::

## Overview

The Service Container is a central registry for all services in OXID eShop. It handles:
- **Service instantiation** and lifecycle management
- **Dependency injection** for constructors and methods
- **Service configuration** through YAML files
- **Service replacement** for customization

For comprehensive information, see the [Symfony DI Container documentation](https://symfony.com/doc/current/components/dependency_injection.html).

## Available Services

You can use services from:
- **[Module Services](../../modules-components-themes/module/module-services)** - Services provided by modules
- **[OXID eShop Components](../../modules-components-themes/component)** - Core framework services
- **Custom Services** - Your own service implementations

## Creating Services

### In Modules

Follow the **[step-by-step module services guide](../../modules-components-themes/module/module-services)** for detailed instructions.

**Requirements:**
- Modules must be **activated** for their services to be available
- Services are defined in the module's `services.yaml` file

### In Components

Components follow the same pattern as modules but:
- Only need to be **installed via Composer** (no activation required)
- Services become available immediately after installation

### Basic Service Definition

```yaml
# services.yaml
services:
  MyVendor\MyPackage\Service\CustomService:
    arguments:
      - '@Psr\Log\LoggerInterface'
      - '%shop.setting.value%'
    tags:
      - 'my.custom.tag'
```

## Getting Services

### 1. Constructor Injection (Recommended)

**Use this approach whenever possible** - inside other services or controllers:

```php
class MyService
{
    public function __construct(
        private LoggerInterface $logger,
        private ModuleActivationBridgeInterface $moduleActivation
    ) {}
    
    public function doSomething(): void
    {
        $this->logger->info('Service called');
        // Use injected services...
    }
}
```

### 2. Service Locator Pattern

When constructor injection isn't possible, use the `ContainerFacade`:

```php
use OxidEsales\EshopCommunity\Internal\Container\ContainerFacade;

// Service must be marked as 'public'
$moduleActivationService = ContainerFacade::get(ModuleActivationBridgeInterface::class);
```

:::warning Service Visibility
The service you want to retrieve must be marked as **public** in the service definition.
:::

## Replacing OXID eShop Services

### Project-Wide Service Replacement

For changing system service behavior across the entire project, create or modify:

**File:** `var/configuration/configurable_services.yaml`

```yaml
services:
  Psr\Log\LoggerInterface:
    class: MyProject\CustomLogger
    
  OxidEsales\Eshop\Core\Email:
    class: MyProject\Email\CustomEmailService
    arguments:
      - '@Psr\Log\LoggerInterface'
```

### Shop-Specific Service Replacement

For multi-shop setups, override services per shop:

**File:** `var/configuration/shops/[SHOP_ID]/configurable_services.yaml`

```yaml
services:
  MyVendor\PaymentService:
    class: MyVendor\PaymentService\ShopSpecificPayment
    arguments:
      - '@payment.gateway.interface'
      - '%shop.specific.config%'
```

:::important Service Visibility Rules
When replacing existing services:
- **Maintain the same visibility** (public/private)
- If the original service is public, the replacement must also be public
- This ensures existing code that depends on the service continues to work
:::

### Service Replacement Best Practices

1. **Use Components**: Create replacements in **[Components](../../modules-components-themes/component)**, not modules
2. **Interface Compatibility**: Ensure your replacement implements the same interface
3. **YAML Format**: Always use `.yaml` extension, not `.yml`
4. **Stable Services Only**: Prefer replacing services marked with `@stable` annotation

## Working with Stable Core Services

:::caution Internal Services
Avoid using or overwriting services in the `internal` directory unless they have the **`@stable`** annotation. Non-stable services may change in future releases.
:::

### Identifying Stable Services

```php
/**
 * @stable
 * This service is part of the public API
 */
interface StableServiceInterface
{
    // Safe to use and implement
}

/**
 * Internal service - may change
 */
interface InternalServiceInterface 
{
    // Avoid direct usage
}
```

**Guidelines:**
- **Use stable services** for long-term compatibility
- **Check the `README.md`** in the internal directory for service stability information
- **Prefer public interfaces** over concrete implementations

## Service Container Cache

### Cache Location
The container cache is stored at: `tmp/container_cache.php`

### Cache Behavior
- **Cache Hit**: Container loads from cached file for performance
- **Cache Miss**: Container builds fresh from configuration files
- **Auto-Generation**: Cache regenerates when missing

### Manual Cache Clearing

When you modify container configuration:

```bash
# Delete the cache file to force regeneration
rm tmp/container_cache.php

# Or use the console command (if available)
php bin/oe-console cache:clear
```

**When to clear cache:**
- After adding new services
- After modifying service definitions
- After changing service parameters
- When services don't appear as expected

## Advanced Service Configuration

### Service Parameters

```yaml
# Define parameters
parameters:
  app.email.sender: 'noreply@oxid-esales.com'
  app.cache.ttl: 3600

services:
  MyVendor\EmailService:
    arguments:
      - '%app.email.sender%'
      - '%app.cache.ttl%'
```

### Service Tags

```yaml
services:
  MyVendor\EventSubscriber:
    tags:
      - { name: 'kernel.event_subscriber' }
      
  MyVendor\Twig\Extension:
    tags:
      - { name: 'twig.extension' }
```

### Factory Services

```yaml
services:
  MyVendor\ComplexService:
    factory: ['@MyVendor\ServiceFactory', 'createComplexService']
    arguments:
      - '%complex.config%'
```

## Troubleshooting

### Common Issues

1. **Service Not Found**
   - Check if service is defined and public
   - Verify module is activated (for module services)
   - Clear container cache

2. **Circular Dependencies**
   - Review service dependencies
   - Consider using setter injection or lazy loading

3. **Configuration Not Applied**
   - Clear container cache
   - Check YAML syntax
   - Verify file location and permissions

### Debugging Services

```php
// List all available services (in development)
$container = ContainerFacade::getContainer();
$serviceIds = $container->getServiceIds();

// Check if service exists
$hasService = $container->has(MyServiceInterface::class);
```

## Related Topics

- **[Module Services](../../modules-components-themes/module/module-services)**: Creating services in modules
- **[Event System](event/)**: Using services in event subscribers  
- **[Components](../../modules-components-themes/component)**: Project-wide service development
- **[Symfony DI Documentation](https://symfony.com/doc/current/service_container.html)**: Upstream reference