---
sidebar_position: 2
---

# Coding Style Configuration

OXID eShop follows PSR-12 coding standards. This guide shows you step-by-step how to configure PhpStorm to automatically check and enforce these coding standards.

## Overview

Proper coding style configuration in PhpStorm provides:

- **Real-time validation** of coding standards
- **Automatic formatting** according to PSR-12
- **Integration with PHP_CodeSniffer** for detailed analysis
- **Consistent code quality** across your OXID projects

## 1. PHP_CodeSniffer Installation

PhpStorm uses PHP_CodeSniffer to detect coding style warnings and errors.

### Verify Installation

When installing OXID eShop, PHP_CodeSniffer is installed by Composer automatically (unless you used the `--no-dev` switch). Verify this:

```bash
# In your OXID project directory
vendor/bin/phpcs --version
```

You should see output like:
```
PHP_CodeSniffer version 3.7.1 (stable) by Squiz (http://www.squiz.net)
```

### Manual Installation

If PHP_CodeSniffer is not available:

```bash
# Install in your OXID project
composer require --dev squizlabs/php_codesniffer

# Or install globally
composer global require squizlabs/php_codesniffer
```

## 2. Configure PhpStorm to Use PHP_CodeSniffer

### Basic Configuration

1. **Open Settings**: **File → Settings** (or **PhpStorm → Preferences** on macOS)

2. **Navigate to PHP_CodeSniffer**:
   - Go to **Languages & Frameworks → PHP → Quality Tools → PHP_CodeSniffer**

3. **Configure PHP_CodeSniffer Path**:
   
   **For local installation**:
   - Click **...** next to **Configuration**
   - Set **PHP_CodeSniffer path** to: `[project-root]/vendor/bin/phpcs`
   - Click **Validate** to verify the configuration

   **For Docker development**:
   - Choose **Remote** configuration
   - Select your Docker interpreter
   - Set **PHP_CodeSniffer path** to: `/var/www/html/vendor/bin/phpcs` (adjust path as needed)

   **For global installation**:
   - Set path to global Composer bin directory (usually `~/.composer/vendor/bin/phpcs`)

### Advanced Configuration

4. **Test Configuration**:
   - Click **Validate** button
   - You should see PHP_CodeSniffer version information
   - Verify that PSR12 standard is available in the list

## 3. Enable Code Inspection

### Configure Inspection Profile

1. **Open Settings**: **File → Settings**

2. **Navigate to Inspections**:
   - Go to **Editor → Inspections**
   - Select **Profile: Project Default**

3. **Enable PHP_CodeSniffer Validation**:
   - Navigate to **PHP → Quality Tools**
   - Check **PHP_CodeSniffer validation**
   - Click on **PHP_CodeSniffer validation** to configure details

4. **Configure Coding Standard**:
   - **Coding standard**: Select **PSR12**
   - **Severity**: Choose **Warning** or **Error** as preferred
   - **Scope**: Select **Project Files** to exclude vendor directories

5. **Additional Options**:
   - Check **Show warnings as** → **weak warnings** (optional)
   - Configure **Options**: Add any specific PHP_CodeSniffer options if needed

### Custom Configuration

For OXID-specific rules, you can create a custom `phpcs.xml` configuration:

```xml
<?xml version="1.0"?>
<ruleset name="OXID Coding Standard">
    <description>OXID eShop coding standard based on PSR-12</description>
    
    <!-- Use PSR12 as base -->
    <rule ref="PSR12"/>
    
    <!-- Additional OXID-specific rules -->
    <rule ref="Generic.Arrays.DisallowLongArraySyntax"/>
    <rule ref="Generic.Files.LineLength">
        <properties>
            <property name="lineLimit" value="120"/>
            <property name="absoluteLineLimit" value="150"/>
        </properties>
    </rule>
    
    <!-- Exclude vendor and cache directories -->
    <exclude-pattern>*/vendor/*</exclude-pattern>
    <exclude-pattern>*/tmp/*</exclude-pattern>
    <exclude-pattern>*/log/*</exclude-pattern>
    <exclude-pattern>*/out/pictures/*</exclude-pattern>
    
    <!-- Include source and module directories -->
    <file>source</file>
    <file>modules</file>
    <file>tests</file>
</ruleset>
```

Then update PhpStorm to use this configuration:
- **Coding standard**: **Custom**
- **Ruleset**: Browse to your `phpcs.xml` file

## 4. Configure Code Style in Editor

### Set PSR-12 Code Style

1. **Open Settings**: **File → Settings**

2. **Navigate to Code Style**:
   - Go to **Editor → Code Style → PHP**

3. **Set Predefined Style**:
   - Click **Set from → Predefined Style → PSR12**
   - Click **Apply**

4. **Verify Settings**:
   - **Scheme**: Should be **Project** or create a new scheme
   - **Tabs and Indents**: 4 spaces, no tabs
   - **Spaces**: Configure according to PSR-12
   - **Wrapping and Braces**: PSR-12 brace style

### Fine-tune OXID-Specific Settings

Adjust specific settings for OXID development:

#### Tabs and Indents
```
Tab size: 4
Indent: 4
Continuation indent: 8
Use tab character: ☐ (unchecked)
```

#### Spaces
Enable these space options:
- **Before parentheses**: ☑ Method declaration, ☑ Method call
- **Around operators**: ☑ Assignment, ☑ Logical, ☑ Equality
- **Before left brace**: ☑ Function, ☑ Class

#### Wrapping and Braces
- **Braces placement**: End of line (PSR-12 style)
- **Force braces**: Always (for if, for, while, etc.)

## 5. Real-time Validation

### Enable On-the-fly Inspection

1. **Editor → General**
2. Enable **Highlight on the fly**
3. **Code inspection** should be enabled by default

### Customize Error Display

1. **Editor → Color Scheme → General**
2. Configure colors for:
   - **Errors**: Red underline/background
   - **Warnings**: Yellow underline/background
   - **Weak warnings**: Gray underline

## 6. Keyboard Shortcuts and Quick Actions

### Useful Shortcuts for Code Style

| Action | Windows/Linux | macOS | Description |
|--------|---------------|--------|-------------|
| Reformat Code | `Ctrl+Alt+L` | `Cmd+Opt+L` | Auto-format according to PSR-12 |
| Optimize Imports | `Ctrl+Alt+O` | `Cmd+Opt+O` | Remove unused imports |
| Code Cleanup | `Ctrl+Alt+Shift+L` | `Cmd+Opt+Shift+L` | Apply all formatting rules |
| Show Reformat Dialog | `Ctrl+Alt+Shift+L` | `Cmd+Opt+Shift+L` | Choose formatting options |

### Quick Fixes

PhpStorm can automatically fix many PSR-12 violations:

1. **Place cursor** on highlighted error/warning
2. **Press** `Alt+Enter` (or `Opt+Enter` on macOS)
3. **Select** appropriate quick fix from the menu

## 7. Integration with Git

### Pre-commit Hooks

Set up automatic code style checking before commits:

```bash
# Create .git/hooks/pre-commit
#!/bin/sh
vendor/bin/phpcs --standard=PSR12 --extensions=php source/

if [ $? -ne 0 ]; then
    echo "Fix code style errors before committing."
    exit 1
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

### Code Style in Diffs

Configure Git to show code style issues in diffs:

```bash
# Configure Git to use PHP_CodeSniffer for diffs
git config diff.phpcs.textconv 'vendor/bin/phpcs --report=diff'
```

## 8. Team Configuration

### Share Configuration

To ensure consistent coding standards across your team:

1. **Export Settings**:
   - **File → Manage IDE Settings → Export Settings**
   - Include **Code Style schemes** and **Inspections**

2. **Version Control Settings**:
   - Include `.idea/codeStyles/` in version control
   - Add `phpcs.xml` to your project root

3. **EditorConfig Support**:
   Create `.editorconfig` file in project root:
   ```ini
   root = true
   
   [*.php]
   charset = utf-8
   end_of_line = lf
   insert_final_newline = true
   trim_trailing_whitespace = true
   indent_style = space
   indent_size = 4
   ```

## 9. Troubleshooting

### Common Issues

**PHP_CodeSniffer not found**:
- Verify installation: `vendor/bin/phpcs --version`
- Check path configuration in PhpStorm settings
- For Docker: ensure path mapping is correct

**PSR12 standard not available**:
- Update PHP_CodeSniffer: `composer update squizlabs/php_codesniffer`
- Clear PhpStorm caches: **File → Invalidate Caches and Restart**

**Inspections not working**:
- Check that **Highlight on the fly** is enabled
- Verify inspection profile is configured correctly
- Ensure project scope includes your source files

**Performance issues with large projects**:
- Exclude vendor directories from inspection scope
- Adjust inspection severity levels
- Configure only essential rules for real-time checking

## 10. Advanced Features

### Custom Sniffs

Create custom PHP_CodeSniffer sniffs for OXID-specific conventions:

```php
// Custom sniff example for OXID module structure
class ModuleStructureSniff implements PHP_CodeSniffer_Sniff
{
    public function register()
    {
        return [T_CLASS];
    }
    
    public function process(PHP_CodeSniffer_File $file, $stackPtr)
    {
        // Custom validation logic for OXID modules
    }
}
```

### Integration with CI/CD

Configure automated code style checks in your build pipeline:

```yaml
# GitHub Actions example
- name: Check Coding Standards
  run: |
    vendor/bin/phpcs --standard=PSR12 --report=junit --report-file=phpcs-report.xml source/
```

## Next Steps

1. **[Configure testing integration](tests)** to maintain code quality
2. **[Learn OXID conventions](../../../conventions)** for project-specific standards
3. **[Start module development](../../../development/modules-components-themes/module/tutorials/create-basic-module)** with proper coding standards
4. **Set up code review processes** using the configured standards