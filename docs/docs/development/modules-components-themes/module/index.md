---
sidebar_position: 1
---

# Module Development

In this section you'll find all the necessary information to use modules, understand how they work, and how to write a module yourself.

## What are OXID Modules?

OXID modules are extensions that add new functionality or modify existing behavior in OXID eShop without changing the core code. They provide a safe, upgrade-friendly way to customize your shop.

### Key Benefits

- **Upgrade Safety**: Modules don't modify core files, ensuring compatibility with OXID updates
- **Reusability**: Share modules across different shop installations
- **Maintainability**: Keep customizations organized and manageable
- **Community**: Leverage modules created by the OXID community

## Getting Started

A first step in developing your own module is the tutorial: **[Steps for creating a basic module](tutorials/create-basic-module)**.

## Module Development Sections

The following sections cover all aspects of module development:

### Core Concepts

#### [Module Structure & Skeleton](skeleton/)
Learn the required files and directory structure for OXID modules:
- **[metadata.php](skeleton/metadataphp/)**: Module configuration and metadata
- **[composer.json](skeleton/composerjson/)**: Dependency management and autoloading
- **Directory Structure**: Organize your module files properly

#### [Installation & Setup](installation-setup/)
Deploy and configure modules in OXID eShop:
- **Installation Process**: How modules are installed and activated
- **Configuration Options**: Set up module behavior
- **Troubleshooting**: Common installation issues and solutions

### Practical Development

#### [Module Tutorials](tutorials/)
Step-by-step guides for common module development tasks:
- **[Create Basic Module](tutorials/create-basic-module)**: Your first OXID module
- **[Extend Shop Classes](tutorials/extend-shop-class)**: Override existing functionality
- **[Frontend Development](tutorials/frontend-mini-basket)**: Custom frontend components
- **[Database Integration](tutorials/multi-lang-and-shop-tables)**: Work with OXID's database

#### [Advanced Features](using-database)
Deep dive into module development:
- **[Database Usage](using-database)**: Interact with OXID's database layer
- **[Namespace Integration](using-namespaces-in-modules)**: Modern PHP development
- **[Twig Templates](using-twig-in-module-templates)**: Use Twig templating engine
- **[Module Services](module-services)**: Create and use services
- **[Module Settings](module-settings)**: Configuration management

### Module Lifecycle

#### [Dependencies & Compatibility](module-dependencies)
Manage relationships between modules and OXID versions:
- **Module Dependencies**: Define required modules and versions
- **Version Compatibility**: Support multiple OXID versions
- **Conflict Resolution**: Handle incompatible modules

#### [Database Migrations](database-migration/)
Handle database schema changes:
- **Migration Scripts**: Update database schema safely
- **Data Migrations**: Transform existing data
- **Rollback Procedures**: Undo database changes

#### [Module Deactivation](deactivation/) & [Uninstallation](uninstall/)
Properly clean up when modules are removed:
- **Deactivation Process**: Temporarily disable modules
- **Uninstallation**: Completely remove module data
- **Cleanup Procedures**: Leave the shop in a clean state

### Quality Assurance

#### [Module Certification](certification/)
Prepare modules for OXID certification:
- **[Documentation Requirements](certification/documentation)**: Document your module properly
- **[Software Quality](certification/software-quality)**: Code quality standards
- **[Testing Standards](certification/software-tests)**: Required testing approaches
- **[Inter-module Compatibility](certification/inter-module-compatibility)**: Work with other modules

## Module Development Patterns

### Basic Module Structure

Every OXID module follows this basic structure:

```
MyModule/
├── composer.json           # Composer configuration
├── metadata.php           # Module metadata
├── Controller/            # Custom controllers
├── Model/                # Data models
├── Service/              # Business logic services
├── translations/         # Language files
├── views/               # Templates and assets
│   ├── admin/          # Admin interface templates
│   ├── frontend/       # Shop frontend templates  
│   └── blocks/        # Template blocks
└── tests/              # Unit and integration tests
```

### Common Development Tasks

#### Extending Existing Classes

```php
<?php
namespace MyVendor\MyModule\Model;

class Article extends \OxidEsales\Eshop\Application\Model\Article
{
    /**
     * Override existing functionality
     */
    public function getPrice()
    {
        $price = parent::getPrice();
        // Add custom price calculation
        return $this->applyCustomDiscount($price);
    }
    
    /**
     * Add new functionality
     */
    public function applyCustomDiscount($price)
    {
        // Custom discount logic
        return $price * 0.9; // 10% discount
    }
}
```

#### Creating Controllers

```php
<?php
namespace MyVendor\MyModule\Controller;

use OxidEsales\Eshop\Application\Controller\FrontendController;

class CustomPageController extends FrontendController
{
    /**
     * Template name
     */
    protected $_sThisTemplate = 'mymodule_custom_page.tpl';
    
    /**
     * Render the custom page
     */
    public function render()
    {
        parent::render();
        
        // Add custom data to template
        $this->addTplParam('customData', $this->getCustomData());
        
        return $this->_sThisTemplate;
    }
    
    /**
     * Get custom data for template
     */
    protected function getCustomData()
    {
        // Fetch and return custom data
        return ['message' => 'Hello from my custom module!'];
    }
}
```

### Integration with OXID Services

#### Using the Service Container

```php
<?php
namespace MyVendor\MyModule\Service;

use OxidEsales\EshopCommunity\Internal\Container\ContainerFactory;
use Psr\Log\LoggerInterface;

class MyCustomService
{
    /**
     * @var LoggerInterface
     */
    private $logger;
    
    public function __construct()
    {
        $container = ContainerFactory::getInstance()->getContainer();
        $this->logger = $container->get(LoggerInterface::class);
    }
    
    public function processData($data)
    {
        $this->logger->info('Processing custom data in MyModule');
        
        // Process the data
        $result = $this->performCustomLogic($data);
        
        $this->logger->info('Custom data processing completed');
        
        return $result;
    }
    
    private function performCustomLogic($data)
    {
        // Your custom business logic here
        return array_map('strtoupper', $data);
    }
}
```

## Development Best Practices

### Code Organization

1. **Follow PSR-12**: Use consistent coding standards
2. **Namespace Properly**: Use descriptive, vendor-specific namespaces
3. **Separate Concerns**: Keep controllers, models, and services separate
4. **Document Everything**: Write clear docblocks and README files

### Testing Strategy

1. **Unit Tests**: Test individual classes and methods
2. **Integration Tests**: Test module interaction with OXID
3. **Frontend Tests**: Use Codeception for end-to-end testing
4. **Manual Testing**: Test in real shop environments

### Performance Considerations

1. **Minimize Database Queries**: Use efficient data access patterns
2. **Cache Appropriately**: Work with OXID's caching system
3. **Optimize Templates**: Keep frontend rendering fast
4. **Profile Module Impact**: Monitor performance impact

## Resources and Tools

### Development Tools

- **[OXID Module Template](https://github.com/OXID-eSales/module-template)**: Official starting point
- **[OXID Console](../../tell-me-about/console)**: Command-line tools for development
- **[Testing Framework](../../testing/)**: Comprehensive testing support
- **[IDE Setup](../../../getting-started/ide/)**: Configure your development environment

### Documentation Resources

- **[System Architecture](../../../system-architecture/)**: Understand OXID's core concepts
- **[Conventions](../../../conventions)**: Documentation and coding standards
- **[Community Forum](https://forum.oxid-esales.com)**: Get help from other developers

### Example Modules

Study existing modules to learn patterns and best practices:

- **Payment Modules**: Learn integration patterns
- **Shipping Modules**: Understand service integration
- **Content Modules**: See template and block usage
- **API Modules**: Learn external service integration

## Next Steps

Choose your learning path:

1. **Beginner**: Start with [Create Basic Module](tutorials/create-basic-module)
2. **Structure Focus**: Learn [Module Skeleton](skeleton/)
3. **Practical Examples**: Explore [Module Tutorials](tutorials/)
4. **Advanced Topics**: Study [Database Integration](using-database)

Each section provides detailed guidance to help you become proficient in OXID module development.