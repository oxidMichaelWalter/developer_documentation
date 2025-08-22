---
sidebar_position: 2
---

# Setting Up Your IDE

To develop with OXID eShop effectively, we highly recommend working with an Integrated Development Environment (IDE). A properly configured IDE will significantly improve your development experience with features like:

- **Code completion** for OXID classes and methods
- **Syntax highlighting** for PHP, Twig, and Smarty templates
- **Integrated debugging** with Xdebug
- **Code quality tools** integration (PSR-12, CodeSniffer)
- **Testing framework** integration (PHPUnit, Codeception)

## Recommended IDEs

### JetBrains PhpStorm (Highly Recommended)

[PhpStorm](https://www.jetbrains.com/phpstorm/) is the most popular PHP IDE and offers excellent support for OXID eShop development:

- **[PhpStorm Setup Guide](phpstorm/)** - Complete configuration guide
- **[Coding Style Configuration](phpstorm/codingstyle)** - PSR-12 setup
- **[Testing Integration](phpstorm/tests)** - PHPUnit and Codeception setup

### Alternative IDEs

Other IDEs that work well with OXID eShop:

#### Visual Studio Code
- Free and lightweight
- Excellent PHP extensions available
- Good Docker integration
- Extensions: PHP Intellisense, PHP Debug, PHP CodeSniffer

#### Eclipse PDT
- Free and open source
- Good for teams already using Eclipse
- Requires more manual configuration

#### Sublime Text
- Fast and lightweight
- Good for experienced developers
- Requires package installation for PHP support

## Prerequisites

Before configuring your IDE, ensure you have:

1. **[OXID eShop installed](../installation/)** and running
2. **PHP interpreter** accessible from your IDE
3. **Xdebug extension** installed for debugging
4. **Composer** available for dependency management

## Development Environment Integration

### Local Development
Configure your IDE to work with your local OXID installation:
- Set PHP interpreter to match OXID requirements (PHP 8.1+)
- Configure project root to OXID eShop directory
- Set up proper include paths for OXID sources

### Docker Development
If using Docker for OXID development:
- Configure remote PHP interpreter inside Docker container
- Set up path mappings between local and container paths
- Configure Xdebug for remote debugging

### Virtual Machine Development
For VM-based development (deprecated OXVM):
- Configure remote PHP interpreter on VM
- Set up SSH connections
- Configure file synchronization

## Essential IDE Features for OXID

### Code Intelligence
- **Namespace awareness**: Understanding OXID's unified namespace system
- **Class inheritance**: Navigation through OXID's inheritance chains
- **Template support**: Smarty and Twig template editing

### Debugging
- **Xdebug integration**: Step-by-step debugging
- **Remote debugging**: For Docker/VM setups
- **Variable inspection**: Examine OXID objects and arrays

### Testing Integration
- **PHPUnit**: Unit and integration testing
- **Codeception**: Acceptance testing
- **Test runners**: Execute tests from IDE

### Code Quality
- **PSR-12 compliance**: OXID follows PSR-12 coding standards
- **CodeSniffer**: Automatic code style checking
- **Static analysis**: PHPStan or Psalm integration

## Next Steps

1. **[Configure PhpStorm](phpstorm/)** (recommended) or your preferred IDE
2. **[Set up coding standards](phpstorm/codingstyle)** to follow OXID conventions
3. **[Configure testing](phpstorm/tests)** for development workflow
4. **[Create your first module](../../development/modules-components-themes/module/tutorials/create-basic-module)** to test your setup

## Additional Resources

- [OXID Coding Standards](../../conventions)
- [Testing Documentation](../../development/testing/)
- [Module Development Guide](../../development/modules-components-themes/module/)
- [System Architecture Overview](../../system-architecture/)

## Community Tools

The OXID community has created several tools that integrate well with IDEs:

- **OXID Console**: Command-line tool for common development tasks
- **Module Skeleton Generator**: Quick module scaffolding
- **Database Migration Tools**: Schema management utilities