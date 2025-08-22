# Converting Smarty templates to Twig

Converting tool located at [GitHub](https://github.com/OXID-eSales/oxideshop-to-twig-converter) allows to convert existing Smarty template files to Twig syntax. The tool besides standard Smarty syntax is adjusted to handle custom OXID modifications and extensions.

## Overview

The OXID Smarty to Twig converter is a specialized tool designed to migrate legacy Smarty templates to modern Twig syntax. This converter handles:

- Standard Smarty syntax conversion
- OXID-specific template modifications
- Custom OXID extensions and functions
- Database content conversion

## Topics Covered

- **[Usage](usage)** - Command-line usage and parameters
- **[Issues](issues)** - Common conversion problems and solutions  
- **[Examples](examples)** - Practical conversion examples

## Key Features

### File and Directory Conversion
Convert individual files or entire directory structures with customizable file extensions.

### Database Content Conversion
Convert template content stored in database fields, particularly useful for CMS content.

### Selective Conversion
Choose specific converters to apply or exclude certain conversion rules.

### Dry Run Mode
Preview changes before applying them to ensure accuracy.

## Getting Started

1. Install the converter tool from the GitHub repository
2. Review the [usage documentation](usage) for command-line options
3. Check [common issues](issues) for troubleshooting
4. Study [conversion examples](examples) for practical guidance

## Requirements

- PHP 7.4 or higher
- Access to OXID eShop template files
- Understanding of both Smarty and Twig syntax