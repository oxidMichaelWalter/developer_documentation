---
sidebar_position: 100
---

# Conventions for Writing Developer Documentation

This document outlines the conventions and guidelines for contributing to the OXID eShop Developer Documentation.

## Content Structure

### Page Organization

- **One main title per page**: Each page MUST have exactly one first-level heading as the page title
- **Logical hierarchy**: Use consistent heading levels to create a clear document structure
- **Meaningful titles**: Choose descriptive titles that clearly indicate the content

### Heading Hierarchy

Use this consistent heading structure:

```markdown
# Page Title (H1) - Only one per page

## Major Section (H2)

### Subsection (H3)

#### Minor Section (H4)

##### Detail Section (H5)
```

**Good example**:
```markdown
# Module Development Guide

## Creating Your First Module

### Module Structure

#### Directory Layout

##### Configuration Files
```

## Writing Style

### Language and Tone

- **Clear and concise**: Write in simple, direct language
- **Developer-focused**: Assume readers have basic PHP and web development knowledge
- **Action-oriented**: Use active voice and imperative mood for instructions
- **Consistent terminology**: Use OXID-specific terms consistently (see [Glossary](glossary))

### Code Examples

- **Complete examples**: Provide working, runnable code when possible
- **Proper formatting**: Use appropriate language identifiers for syntax highlighting
- **Context**: Explain what the code does and why it's needed

```php
// Good: Complete example with context
<?php
namespace MyVendor\MyModule\Controller;

use OxidEsales\Eshop\Application\Controller\FrontendController;

/**
 * Custom controller for handling special product displays
 */
class SpecialProductController extends FrontendController
{
    public function render()
    {
        $template = parent::render();
        // Add custom template variables here
        return $template;
    }
}
```

### Documentation Patterns

#### Step-by-Step Instructions

Use numbered lists for procedures:

1. **Action verb**: Start each step with a clear action
2. **One action per step**: Don't combine multiple actions
3. **Expected result**: Mention what should happen after each step

#### Code Blocks and Examples

Always specify the language for syntax highlighting:

```php
// PHP code example
$config = oxNew(\OxidEsales\Eshop\Core\Config::class);
```

```bash
# Shell commands
composer require vendor/package
```

```yaml
# Configuration files
services:
    my_service:
        class: MyVendor\MyModule\Service\MyService
```

## File Organization

### Directory Structure

Follow this structure for documentation files:

```
docs/
├── getting-started/          # Installation and basic setup
├── development/              # Development guides and tutorials
├── system-architecture/      # Core concepts and architecture  
├── update/                   # Update and migration guides
└── static/                   # Images, assets, downloads
```

### File Naming

- **Lowercase with hyphens**: `module-development.md`
- **Descriptive names**: `create-basic-module.md` not `tutorial1.md`
- **Consistent patterns**: Use similar naming for related documents

### Cross-References

Use relative links between documentation pages:

```markdown
<!-- Good: Relative links -->
See [Installation Guide](../getting-started/installation/eshop-installation) for details.

<!-- Avoid: Absolute URLs for internal content -->
See https://docs.oxid-esales.com/developer/installation for details.
```

## Content Guidelines

### OXID-Specific Conventions

#### Terminology

- **OXID eShop** (not "Oxid" or "OXID-eSales")
- **Module** (capitalized when referring to OXID modules specifically)
- **Edition** (Community Edition, Professional Edition, Enterprise Edition)
- **Template** (for Smarty/Twig templates)
- **Theme** (for complete design packages)

#### Version References

- **Be specific**: "OXID eShop 7.0+" instead of "recent versions"
- **Update regularly**: Review version references during major releases
- **Use version ranges**: "Supported in versions 6.2 - 7.1"

#### Code Standards

Follow OXID eShop coding standards:

- **PSR-12 compliance**: All PHP code examples should follow PSR-12
- **OXID conventions**: Use OXID naming patterns and structures
- **Namespace usage**: Show proper namespace usage in examples

### Technical Accuracy

#### Code Testing

- **Test all examples**: Ensure code examples actually work
- **Version compatibility**: Test with supported OXID versions
- **Complete context**: Provide enough context for examples to be usable

#### Information Accuracy

- **Current information**: Keep information up-to-date with latest OXID versions
- **Verified procedures**: Test installation and configuration procedures
- **Working links**: Regularly check external links for validity

## Formatting and Style

### Markdown Conventions

#### Admonitions

Use appropriate admonition types:

```markdown
:::note
General information that adds context.
:::

:::tip
Helpful suggestions and best practices.
:::

:::warning
Important warnings about potential issues.
:::

:::danger
Critical information about breaking changes or security.
:::

:::info
Factual information and references.
:::
```

#### Tables

Use tables for structured information:

| Component | Purpose | Required |
|-----------|---------|----------|
| metadata.php | Module configuration | Yes |
| Controller/ | Application logic | Optional |
| views/ | Templates | Optional |

#### Lists

- **Unordered lists**: For non-sequential items
- **Ordered lists**: For step-by-step procedures
- **Definition lists**: For term explanations

### Images and Media

#### Image Guidelines

- **Descriptive alt text**: Always provide meaningful alt attributes
- **Appropriate size**: Optimize images for web display
- **Consistent style**: Use similar styling for screenshots
- **Current versions**: Update screenshots when UI changes

```markdown
![OXID Admin Interface](../static/images/oxid-admin-interface.png)
```

#### File Organization

Store media files in organized directories:

```
static/
├── images/
│   ├── screenshots/
│   ├── diagrams/
│   └── logos/
└── downloads/
    └── examples/
```

## Contributing Guidelines

### Documentation Updates

#### When to Update

- **New features**: Document new OXID features and capabilities
- **API changes**: Update examples when APIs change
- **Bug fixes**: Correct inaccurate information
- **Process improvements**: Update procedures when workflows change

#### Review Process

1. **Self-review**: Check your own work for accuracy and clarity
2. **Technical review**: Have code examples reviewed by developers
3. **Editorial review**: Check language, style, and consistency
4. **User testing**: Verify procedures work as documented

### Community Contributions

#### Getting Started

1. **Read existing documentation** to understand current style and structure
2. **Check for existing issues** to avoid duplicate work
3. **Start small**: Begin with minor corrections or additions
4. **Follow conventions**: Use established patterns and styles

#### Submission Guidelines

- **Clear commit messages**: Describe what was changed and why
- **Focused changes**: Keep pull requests focused on specific improvements
- **Test your changes**: Verify that procedures and code examples work
- **Update related content**: Consider impact on other documentation pages

## Quality Standards

### Content Quality

- **Accuracy**: Information must be technically correct
- **Completeness**: Provide sufficient detail for users to succeed
- **Clarity**: Write for the intended audience level
- **Usefulness**: Focus on practical, actionable information

### Maintenance

#### Regular Reviews

- **Quarterly reviews**: Check for outdated information
- **Version updates**: Update content when new OXID versions are released
- **Link checking**: Verify external links still work
- **User feedback**: Incorporate feedback from documentation users

#### Continuous Improvement

- **Monitor usage**: Track which pages are most accessed
- **Gather feedback**: Collect input from developers using the documentation
- **Update based on questions**: Improve areas where users commonly have questions
- **Expand popular topics**: Add more detail to heavily-used sections

## Tools and Resources

### Documentation Tools

- **Docusaurus**: The platform used for this documentation
- **Markdown editors**: Any editor with Markdown support
- **Image editing**: Tools for creating and editing screenshots
- **Diagram tools**: For creating architectural diagrams

### References

- [Markdown Guide](https://www.markdownguide.org/)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [PSR-12 Coding Standard](https://www.php-fig.org/psr/psr-12/)
- [OXID GitHub Repository](https://github.com/OXID-eSales/oxideshop_ce)

---

## Questions and Support

For questions about documentation conventions or contributing:

- **GitHub Issues**: [Report documentation issues](https://github.com/OXID-eSales/developer_documentation/issues)
- **Community Forum**: [OXID eShop Forum](https://forum.oxid-esales.com)
- **Development Chat**: Join the OXID developer community discussions

Thank you for contributing to OXID eShop documentation!