# Project Development

This section covers project-level development topics for OXID eShop, including configuration management, environment setup, and advanced project customization options.

## Overview

Project development in OXID eShop involves configuring and customizing the shop at the project level, beyond individual modules and themes. This includes:

- Environment configuration and management
- Security and password handling
- Parameter configuration
- Module configuration deployment
- Template engine integration

## Key Topics

### Environment & Configuration
- **[Environment Variables](environment)** - Managing environment-specific settings
- **[config.inc.php](configincphp)** - Core configuration file setup
- **[Parameters](parameters)** - Parameter handling and configuration
- **[Password Hashing](password-hashing)** - Security and password management

### Module Configuration
- **[Module Configuration](module-configuration/)** - Advanced module configuration management for projects

### Template Engine
- **[Twig Template Engine](twig-template-engine/)** - Integrating and extending the Twig template system

## Development Workflow

1. **Environment Setup**: Configure environment variables and settings
2. **Core Configuration**: Set up config.inc.php with project-specific settings
3. **Module Management**: Deploy and configure modules for your project
4. **Template Customization**: Extend and customize the template engine

## Best Practices

- Use environment variables for sensitive configuration
- Keep configuration in version control (except secrets)
- Use YAML configuration for module deployment
- Implement proper password hashing for security
- Document project-specific customizations

## Requirements

- OXID eShop 6.0 or higher
- Understanding of OXID eShop architecture
- Composer for dependency management
- Knowledge of YAML configuration syntax