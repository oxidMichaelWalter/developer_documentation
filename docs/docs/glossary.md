---
sidebar_position: 101
---

# Glossary

This glossary collects terms typical for the OXID eShop world. Terms are organized alphabetically and described as clearly and simply as possible.

## A

### Activation

The process of enabling a module in OXID eShop after installation. Activation makes the module's functionality available in the shop.

For more information, see [Module Installation and Activation](system-architecture/module-installation-activation).

### Admin Interface

The backend administration area of OXID eShop, accessible via `/admin/`. Used for shop configuration, product management, order processing, and module administration.

## B

### B2B Edition

Business-to-Business edition of OXID eShop, designed for companies selling to other businesses. Includes features like customer-specific pricing, approval workflows, and bulk ordering.

### Bootstrap

1. **Application Bootstrap**: The initialization process that starts OXID eShop
2. **Testing Bootstrap**: Configuration file that sets up the testing environment (`tests/bootstrap.php`)

## C

### Chain Extension

OXID's mechanism for extending existing classes through the module system. Multiple modules can extend the same class, creating a "chain" of extensions.

### Community Edition (CE)

The free, open-source edition of OXID eShop. Provides core e-commerce functionality and serves as the foundation for other editions.

### Component

A reusable piece of functionality in OXID eShop that can be shared across multiple modules or themes.

### Composer

PHP dependency manager used by OXID eShop for package management and autoloading. All OXID installations and modules use Composer.

### Controller

PHP classes that handle HTTP requests and coordinate between models and views. In OXID, controllers extend `FrontendController` or `AdminController`.

## D

### DI Container

Dependency Injection Container used in OXID eShop for managing service dependencies and configuration.

## E

### Edition

A variant of the OXID eShop product family, differentiated by feature sets:

- **Community Edition (CE)**: Open-source base version
- **Professional Edition (PE)**: Commercial version with additional features  
- **Enterprise Edition (EE)**: Advanced commercial version for large installations
- **B2B Edition**: Specialized version for business-to-business commerce

### Enterprise Edition (EE)

The most advanced commercial edition of OXID eShop, designed for large-scale e-commerce installations with high performance requirements.

### Event

A mechanism in OXID eShop that allows modules to hook into specific points in the application lifecycle to execute custom code.

## F

### Frontend Controller

Base class for controllers that handle shop frontend requests. Located in the customer-facing part of the application.

## G

### Generation

The process of creating unified namespace classes that combine core OXID classes with module extensions.

## I

### Installation

The process of deploying OXID eShop or module files to a server. Installation covers only file operations, not configuration or activation.

For modules, installation is separate from [activation](#activation).

### Inheritance Chain

The sequence of class extensions created when multiple modules extend the same OXID class. Managed by the unified namespace system.

## M

### Metadata

Configuration information about a module stored in `metadata.php`. Includes module name, version, dependencies, and file locations.

### Migration

1. **Data Migration**: Process of moving data between different systems or versions
2. **Database Migration**: Updating database schema between OXID versions
3. **Version Migration**: Upgrading from one OXID version to another

### Module

An extension package that adds functionality to OXID eShop. Modules can modify existing behavior or add completely new features.

### Module Chain

See [Chain Extension](#chain-extension).

## N

### Namespace

PHP namespace organization used in OXID eShop. The unified namespace system creates a single namespace that combines core and module classes.

## O

### OXID Console

Command-line tool (`vendor/bin/oe-console`) for performing common OXID eShop maintenance and development tasks.

### OXID Facts

Service that provides information about the current OXID installation, including version, edition, and configuration details.

## P

### Professional Edition (PE)

Commercial edition of OXID eShop that extends the Community Edition with additional business features and professional support.

### PSR-12

PHP coding standard followed by OXID eShop for consistent code formatting and style.

## S

### Service Container

System for managing dependencies and services in OXID eShop, based on Symfony's dependency injection container.

### Shop

1. **Shop Instance**: A single OXID eShop installation
2. **Multi-Shop**: OXID's capability to run multiple shops from one installation

### Smarty

Template engine used in OXID eShop themes for separating presentation logic from PHP code.

## T

### Template

View files that define the HTML structure and presentation of shop pages. OXID supports both Smarty and Twig templates.

### Theme

A complete design package for OXID eShop that includes templates, CSS, JavaScript, and images to define the shop's appearance.

### Twig

Modern template engine supported in newer versions of OXID eShop as an alternative to Smarty.

## U

### Unified Namespace

OXID's system for creating a single namespace (`\OxidEsales\Eshop`) that combines core OXID classes with all active module extensions.

### Update

The process of upgrading OXID eShop to a newer version while maintaining existing data and configuration.

## V

### Vendor

1. **Package Vendor**: The organization or developer that creates and maintains a module or package
2. **Vendor Directory**: The `vendor/` directory where Composer installs dependencies

### View

The presentation layer in OXID's MVC architecture, responsible for displaying data to users through templates.

## W

### Widget

A reusable component that can be embedded in templates to display specific functionality, such as product lists or promotional content.

---

## Need More Information?

If you can't find a term in this glossary:

- **Search the documentation** using the search function
- **Check the [OXID Forum](https://forum.oxid-esales.com)** for community discussions
- **Review the [system architecture](system-architecture/)** documentation for technical concepts
- **Contribute to this glossary** by suggesting new terms or improvements

## Contributing to the Glossary

Help improve this glossary by:

1. **Suggesting new terms** that should be included
2. **Improving existing definitions** for clarity
3. **Adding cross-references** between related terms
4. **Reporting errors** or outdated information

See our [conventions guide](conventions) for how to contribute to the documentation.