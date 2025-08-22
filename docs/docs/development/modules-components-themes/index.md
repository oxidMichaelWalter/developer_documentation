---
sidebar_position: 1
---

# Modules, Components & Themes

Project-wide development options, modules, themes, and components are the containers with which you can customize, extend, or configure OXID eShop.

## Overview

OXID eShop provides multiple ways to extend and customize the shop:

- **[Modules](module/)**: Add new functionality or modify existing behavior
- **[Themes](theme/)**: Create custom shop designs and user experiences  
- **[Components](component)**: Build reusable functionality across modules and themes
- **[Projects](project/)**: Configure and deploy complete shop solutions

## Module Development

Modules are the primary way to extend OXID eShop functionality. They allow you to:

- **Add new features** without modifying core code
- **Override existing functionality** through the chain extension system
- **Provide reusable components** that can be shared across projects
- **Maintain upgrade compatibility** by keeping customizations separate

### Getting Started with Modules

1. **[Module Structure](module/skeleton/)**: Learn the required files and directory structure
2. **[Create Your First Module](module/tutorials/create-basic-module)**: Step-by-step tutorial
3. **[Installation & Setup](module/installation-setup/)**: Deploy and configure modules
4. **[Testing Your Module](../testing/)**: Ensure quality and reliability

### Advanced Module Development

- **[Module Dependencies](module/module-dependencies)**: Manage relationships between modules
- **[Database Integration](module/using-database)**: Work with OXID's database layer
- **[Namespace Usage](module/using-namespaces-in-modules)**: Modern PHP development practices
- **[Twig Templates](module/using-twig-in-module-templates)**: Use Twig in your modules

## Theme Development

Themes control the visual appearance and user experience of your OXID shop:

### Theme Fundamentals

- **[Theme Structure](theme/)**: Understanding theme architecture
- **[Child Themes](theme/child-theme)**: Extend existing themes safely
- **[Twig Integration](theme/twig/)**: Modern template engine usage

### Template Development

- **Template Inheritance**: Build on existing designs
- **Asset Management**: Organize CSS, JavaScript, and images
- **Responsive Design**: Create mobile-friendly shops
- **Performance Optimization**: Fast-loading themes

## Project Configuration

Configure modules and themes for specific project requirements:

### Configuration Management

- **[Environment Setup](project/environment)**: Development vs. production configurations
- **[Module Configuration](project/module-configuration/)**: Project-specific module settings
- **[Parameters](project/parameters)**: Configure shop behavior
- **[Password Hashing](project/password-hashing)**: Security configurations

### Deployment Strategies

- **Development Workflow**: Set up efficient development processes
- **Testing Strategies**: Ensure quality across environments
- **Production Deployment**: Best practices for live shops
- **Update Procedures**: Maintain customizations during updates

## Quality Assurance

Maintain high code quality across all development:

### Code Standards

- **[PSR-12 Compliance](../../getting-started/ide/phpstorm/codingstyle)**: Follow PHP standards
- **OXID Conventions**: Shop-specific coding patterns
- **Documentation Standards**: Write maintainable code
- **Version Control**: Manage code changes effectively

### Testing Approaches

- **[Unit Testing](../testing/unit)**: Test individual components
- **[Integration Testing](../testing/integration)**: Test component interactions
- **[Module Testing](../testing/codeception/)**: End-to-end module testing
- **Performance Testing**: Ensure scalability

## Best Practices

### Development Workflow

1. **Plan Your Extension**: Define requirements and architecture
2. **Set Up Development Environment**: Use proper tooling and configuration
3. **Follow OXID Patterns**: Use established conventions and structures
4. **Test Thoroughly**: Implement comprehensive testing strategies
5. **Document Everything**: Create clear documentation for maintenance
6. **Consider Upgrades**: Design for long-term compatibility

### Common Patterns

#### Module Extension Pattern
```php
<?php
namespace MyVendor\MyModule\Controller;

use OxidEsales\Eshop\Application\Controller\ArticleController;

class MyArticleController extends ArticleController
{
    public function render()
    {
        $template = parent::render();
        // Add custom functionality
        return $template;
    }
}
```

#### Service Integration Pattern
```php
<?php
namespace MyVendor\MyModule\Service;

use OxidEsales\EshopCommunity\Internal\Container\ContainerFactory;

class MyCustomService
{
    public function processData($data)
    {
        $container = ContainerFactory::getInstance()->getContainer();
        $logger = $container->get('logger');
        
        // Process data with proper logging
        $logger->info('Processing custom data');
        
        return $processedData;
    }
}
```

## Development Tools

### Essential Tools

- **[OXID Console](../tell-me-about/console)**: Command-line development utilities
- **[Module Generator](module/skeleton/)**: Scaffold new modules quickly
- **[Testing Framework](../testing/)**: Comprehensive testing support
- **[Debugging Tools](../../getting-started/ide/phpstorm/)**: IDE integration and Xdebug

### Community Resources

- **Module Template**: [Official module template on GitHub](https://github.com/OXID-eSales/module-template)
- **Best Practice Examples**: Community-contributed modules
- **Development Forums**: [OXID Developer Community](https://forum.oxid-esales.com)
- **Code Examples**: Working implementations and patterns

## Architecture Considerations

### System Integration

Understanding how modules, themes, and components integrate:

- **[Unified Namespace](../../system-architecture/unified-namespace/)**: How extensions are merged
- **[Service Container](../tell-me-about/service-container)**: Dependency injection patterns
- **[Event System](../tell-me-about/event/)**: Hook into shop processes
- **[Module Chain](../../system-architecture/module-installation-activation)**: Extension ordering and conflicts

### Performance Impact

- **Loading Optimization**: Minimize module overhead
- **Database Efficiency**: Optimize queries and caching
- **Asset Management**: Efficient CSS/JS delivery
- **Caching Strategies**: Work with OXID's caching system

## Migration and Upgrades

### Maintaining Compatibility

- **Version Compatibility**: Design for multiple OXID versions
- **Upgrade Procedures**: Update modules with OXID upgrades  
- **Legacy Support**: Handle deprecated functionality
- **Testing Across Versions**: Ensure broad compatibility

## Next Steps

Choose your development path:

1. **New to OXID**: Start with [Module Basics](module/tutorials/create-basic-module)
2. **Experienced Developer**: Explore [Advanced Patterns](module/skeleton/)
3. **Theme Designer**: Begin with [Theme Development](theme/)
4. **System Integrator**: Focus on [Project Configuration](project/)

Each path provides comprehensive guidance for successful OXID eShop development.