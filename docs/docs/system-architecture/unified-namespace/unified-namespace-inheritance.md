---
sidebar_position: 3
---

# Inheritance Chain of Unified Namespace Classes

The unified namespace system works through a sophisticated inheritance chain where classes from different OXID eShop editions extend each other in a specific order. This creates a single, unified interface while maintaining all edition-specific functionality.

## Understanding the Inheritance Chain

The inheritance follows this pattern:

1. **Community Edition (CE)** - Base functionality
2. **Professional Edition (PE)** - Extends CE (if PE is installed)
3. **Enterprise Edition (EE)** - Extends PE (if EE is installed)
4. **Unified Namespace** - Extends the highest available edition
5. **Module Classes** - Can extend Unified Namespace classes

## Professional Edition Example

In an OXID eShop Professional Edition installation, the inheritance chain looks like this:

```mermaid
classDiagram
    class CommunityArticle["🏢 OxidEsales\EshopCommunity\Application\Model\Article"] {
        +Base Community functionality
    }
    
    class ProfessionalArticle["💼 OxidEsales\EshopProfessional\Application\Model\Article"] {
        +Professional features
    }
    
    class UnifiedArticle["🌟 OxidEsales\Eshop\Application\Model\Article"] {
        +Unified namespace interface
    }
    
    class LegacyAlias["📜 oxarticle (legacy alias)"] {
        +Backwards compatibility
    }
    
    CommunityArticle <|-- ProfessionalArticle : extends
    ProfessionalArticle <|-- UnifiedArticle : extends
    UnifiedArticle -.-> LegacyAlias : class_alias
    
    %% OXID-themed styling
    classDef oxid-community fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#1565c0
    classDef oxid-professional fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#6a1b9a
    classDef oxid-unified fill:#c02124,stroke:#a61d20,stroke-width:3px,color:#ffffff
    classDef oxid-legacy fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#e65100
    
    class CommunityArticle oxid-community
    class ProfessionalArticle oxid-professional
    class UnifiedArticle oxid-unified
    class LegacyAlias oxid-legacy
```

### Explanation:
- `OxidEsales\EshopCommunity\Application\Model\Article` - Base Community functionality
- `OxidEsales\EshopProfessional\Application\Model\Article` - Adds Professional features
- `OxidEsales\Eshop\Application\Model\Article` - Unified namespace class developers use
- `oxarticle` - Legacy class alias for backward compatibility

## Enterprise Edition Example

In an OXID eShop Enterprise Edition installation, the chain extends further:

```mermaid
classDiagram
    class CommunityArticle["🏢 OxidEsales\EshopCommunity\Application\Model\Article"] {
        +Base Community functionality
    }
    
    class ProfessionalArticle["💼 OxidEsales\EshopProfessional\Application\Model\Article"] {
        +Professional features
    }
    
    class EnterpriseArticle["🏛️ OxidEsales\EshopEnterprise\Application\Model\Article"] {
        +Enterprise features
    }
    
    class UnifiedArticle["🌟 OxidEsales\Eshop\Application\Model\Article"] {
        +Unified namespace interface
    }
    
    class LegacyAlias["📜 oxarticle (legacy alias)"] {
        +Backwards compatibility
    }
    
    CommunityArticle <|-- ProfessionalArticle : extends
    ProfessionalArticle <|-- EnterpriseArticle : extends
    EnterpriseArticle <|-- UnifiedArticle : extends
    UnifiedArticle -.-> LegacyAlias : class_alias
    
    %% OXID-themed styling
    classDef oxid-community fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#1565c0
    classDef oxid-professional fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#6a1b9a
    classDef oxid-enterprise fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#2e7d32
    classDef oxid-unified fill:#c02124,stroke:#a61d20,stroke-width:3px,color:#ffffff
    classDef oxid-legacy fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#e65100
    
    class CommunityArticle oxid-community
    class ProfessionalArticle oxid-professional
    class EnterpriseArticle oxid-enterprise
    class UnifiedArticle oxid-unified
    class LegacyAlias oxid-legacy
```

### Explanation:
- `OxidEsales\EshopCommunity\Application\Model\Article` - Base Community functionality
- `OxidEsales\EshopProfessional\Application\Model\Article` - Adds Professional features
- `OxidEsales\EshopEnterprise\Application\Model\Article` - Adds Enterprise features
- `OxidEsales\Eshop\Application\Model\Article` - Unified namespace class with all features
- `oxarticle` - Legacy class alias for backward compatibility

## Enterprise Edition with Modules

When modules are activated, they extend the unified namespace classes, creating an even longer chain:

```mermaid
classDiagram
    class CommunityArticle["🏢 OxidEsales\EshopCommunity\Application\Model\Article"] {
        +Base Community functionality
    }
    
    class ProfessionalArticle["💼 OxidEsales\EshopProfessional\Application\Model\Article"] {
        +Professional features
    }
    
    class EnterpriseArticle["🏛️ OxidEsales\EshopEnterprise\Application\Model\Article"] {
        +Enterprise features
    }
    
    class UnifiedArticle["🌟 OxidEsales\Eshop\Application\Model\Article"] {
        +Unified namespace interface
    }
    
    class Module1Article["🔧 Vendor1\Module1\Application\Model\Article"] {
        +Module 1 extensions
    }
    
    class Module2Article["🔧 Vendor1\Module2\Application\Model\Article"] {
        +Module 2 extensions
    }
    
    class LegacyAlias["📜 oxarticle (legacy alias)"] {
        +Backwards compatibility
    }
    
    CommunityArticle <|-- ProfessionalArticle : extends
    ProfessionalArticle <|-- EnterpriseArticle : extends
    EnterpriseArticle <|-- UnifiedArticle : extends
    UnifiedArticle <|-- Module1Article : extends
    Module1Article <|-- Module2Article : extends
    UnifiedArticle -.-> LegacyAlias : class_alias
    
    %% OXID-themed styling
    classDef oxid-community fill:#e3f2fd,stroke:#2196f3,stroke-width:2px,color:#1565c0
    classDef oxid-professional fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px,color:#6a1b9a
    classDef oxid-enterprise fill:#e8f5e8,stroke:#4caf50,stroke-width:2px,color:#2e7d32
    classDef oxid-unified fill:#c02124,stroke:#a61d20,stroke-width:3px,color:#ffffff
    classDef oxid-module fill:#fff8e1,stroke:#ffa000,stroke-width:2px,color:#f57c00
    classDef oxid-legacy fill:#fff3e0,stroke:#ff9800,stroke-width:2px,color:#e65100
    
    class CommunityArticle oxid-community
    class ProfessionalArticle oxid-professional
    class EnterpriseArticle oxid-enterprise
    class UnifiedArticle oxid-unified
    class Module1Article oxid-module
    class Module2Article oxid-module
    class LegacyAlias oxid-legacy
```

### Explanation:
- All previous layers remain the same
- `Vendor1\Module1\Application\Model\Article` - First module's extensions
- `Vendor1\Module2\Application\Model\Article` - Second module's extensions
- The final instantiated class includes functionality from all layers

## Important Implementation Details

### Class Resolution

When you use `oxNew(OxidEsales\Eshop\Application\Model\Article::class)`, the system:

1. Checks which edition is installed (CE/PE/EE)
2. Determines which modules are active
3. Resolves to the final class in the inheritance chain
4. Instantiates the most derived class

### Method Override Behavior

Each class in the chain can:
- **Override methods** from parent classes
- **Call parent methods** using `parent::methodName()`
- **Add new methods** specific to that layer
- **Extend existing functionality** while maintaining compatibility

### Example Method Override

```php
// In Community Edition
class Article extends BaseModel
{
    public function getPrice()
    {
        return $this->basicPriceCalculation();
    }
}

// In Professional Edition  
class Article extends \OxidEsales\EshopCommunity\Application\Model\Article
{
    public function getPrice()
    {
        $price = parent::getPrice();
        return $this->addProfessionalPriceFeatures($price);
    }
}

// In a Module
class Article extends \OxidEsales\Eshop\Application\Model\Article  
{
    public function getPrice()
    {
        $price = parent::getPrice();
        return $this->addCustomPriceLogic($price);
    }
}
```

## Critical Warning: Class Introspection

:::warning Do NOT Use get_class()
Never use PHP's `get_class()` method with unified namespace objects, as its return value depends on the currently activated modules:

```php
// WRONG - Returns the actual module class name
$article = oxNew(OxidEsales\Eshop\Application\Model\Article::class);
$className = get_class($article);
// Could return: Vendor1\Module2\Application\Model\Article

// CORRECT - Use the unified namespace class name in your code
if ($article instanceof OxidEsales\Eshop\Application\Model\Article) {
    // This works correctly regardless of modules
}
```
:::

### Why This Matters

- **Module-dependent behavior**: `get_class()` returns different values based on active modules
- **Unreliable type checking**: Code becomes unpredictable across different shop configurations  
- **Debugging issues**: Makes it harder to track down class-related problems

## Practical Implications for Developers

### Module Development

When developing modules, always:

```php
// Extend the unified namespace class
class MyModuleArticle extends \OxidEsales\Eshop\Application\Model\Article
{
    public function myCustomMethod()
    {
        // Your custom functionality
        $result = parent::someMethod();
        return $this->enhanceResult($result);
    }
}
```

### Type Hints and Declarations

Use unified namespace classes in type hints:

```php
public function processArticle(\OxidEsales\Eshop\Application\Model\Article $article): bool
{
    // This works with any class in the inheritance chain
    return $article->isVisible();
}
```

### Testing Considerations

In unit tests, mock the unified namespace classes:

```php
$articleMock = $this->createMock(\OxidEsales\Eshop\Application\Model\Article::class);
$articleMock->expects($this->once())
           ->method('getPrice')
           ->willReturn(19.99);
```

## Related Topics

- **[Unified Namespace Overview](index)**: Core concepts and benefits
- **[Unified Namespace Generator](unified-namespace-generator)**: How these inheritance chains are created
- **[Module Development](/docs/development/modules-components-themes/module/)**: Practical module development with unified namespace
- **[Autoloading](../autoloading)**: How the class loading system resolves these inheritance chains