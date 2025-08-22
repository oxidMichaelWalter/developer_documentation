# Theme Development

OXID eShop supports creating custom themes and extending existing ones. This section covers theme development fundamentals, from creating themes from scratch to implementing child themes that inherit from parent themes.

## Overview

Themes in OXID eShop control the visual presentation and user interface of your shop. You can:

- Create completely custom themes
- Develop child themes that inherit from parent themes  
- Install themes via Composer for easy distribution
- Use Twig templating with sandbox security
- Extend themes through modules

## What You'll Learn

This section covers:

- **Theme via Composer**: Creating installable theme packages
- **Child Themes**: Inheritance-based theme development
- **Twig Integration**: Modern templating with security features
- **Asset Management**: Handling CSS, JavaScript, and images
- **Template Conversion**: Migrating from legacy templating

## Theme Types

### Standalone Themes
Complete theme packages with all templates, assets, and configurations.

### Child Themes  
Themes that inherit from a parent theme, allowing selective customization while maintaining parent theme updates.

### Module-Based Theme Extensions
Extending existing themes through modules for specific functionality.

## Getting Started

1. Start with [**Theme via Composer**](theme-via-composer) to understand theme packaging
2. Learn [**Child Theme Creation**](child-theme) for inheritance-based development
3. Explore [**Twig Integration**](twig/) for modern templating approaches

## Requirements

- OXID eShop 6.0 or higher
- Composer for package management
- Basic knowledge of HTML, CSS, and Twig templating
- Understanding of OXID eShop structure