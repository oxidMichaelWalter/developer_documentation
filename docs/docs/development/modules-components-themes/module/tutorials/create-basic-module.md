---
sidebar_position: 1
---

# Create Your First OXID Module

This tutorial walks you through creating a basic OXID eShop module from scratch. You'll learn the fundamental concepts and create a working module that displays a custom page in the shop.

## Learning Objectives

By the end of this tutorial, you will:

- Understand the basic OXID module structure
- Create the required metadata.php file
- Set up composer.json for dependency management
- Write a simple controller and template
- Install and test your module in OXID eShop

## Prerequisites

Before starting this tutorial, ensure you have:

- **OXID eShop 7.0+** installed and running
- **PHP 8.1+** with required extensions
- **Composer** installed and accessible
- **Basic PHP knowledge** including object-oriented programming
- **Git** for version control (recommended)
- **[IDE configured](../../../getting-started/ide/)** for OXID development

## Step 1: Plan Your Module

For this tutorial, we'll create a "Hello World" module that:

- Adds a new page to the shop frontend
- Displays a custom greeting message
- Demonstrates basic OXID module concepts

### Module Details

- **Vendor**: `MyCompany` 
- **Module Name**: `HelloWorldModule`
- **Namespace**: `MyCompany\HelloWorldModule`
- **URL**: `https://yourshop.com/hello-world`

## Step 2: Initialize Module Repository

Create a new directory for your module and initialize version control:

```bash
# Create module directory
mkdir -p source/modules/mycompany/helloworldmodule
cd source/modules/mycompany/helloworldmodule

# Initialize Git repository
git init
echo "vendor/" >> .gitignore
echo ".idea/" >> .gitignore
echo "*.log" >> .gitignore
```

:::tip Development Tip
Use lowercase directory names following OXID conventions. The namespace will use proper CamelCase.
:::

## Step 3: Create composer.json

Create the `composer.json` file for dependency management and autoloading:

```json
{
    "name": "mycompany/oxid-hello-world-module",
    "description": "Hello World module for OXID eShop",
    "type": "oxideshop-module",
    "keywords": [
        "oxid",
        "modules",
        "eShop",
        "hello-world"
    ],
    "homepage": "https://github.com/mycompany/oxid-hello-world-module",
    "license": "MIT",
    "authors": [
        {
            "name": "Your Name",
            "email": "your.email@company.com"
        }
    ],
    "require": {
        "php": "^8.1",
        "oxid-esales/oxideshop-ce": "^7.0"
    },
    "require-dev": {
        "phpunit/phpunit": "^10.0",
        "oxid-esales/testing-library": "^8.0"
    },
    "autoload": {
        "psr-4": {
            "MyCompany\\HelloWorldModule\\": ""
        }
    },
    "extra": {
        "oxideshop": {
            "target-directory": "mycompany/helloworldmodule"
        }
    }
}
```

## Step 4: Create metadata.php

The `metadata.php` file contains essential module configuration:

```php
<?php
/**
 * Metadata for Hello World Module
 */

use MyCompany\HelloWorldModule\Controller\HelloWorldController;

$sMetadataVersion = '2.1';

$aModule = [
    'id'          => 'helloworldmodule',
    'title'       => 'Hello World Module',
    'description' => [
        'de' => 'Ein einfaches Hallo-Welt-Modul für OXID eShop',
        'en' => 'A simple Hello World module for OXID eShop',
    ],
    'thumbnail'   => 'logo.png',
    'version'     => '1.0.0',
    'author'      => 'Your Company Name',
    'url'         => 'https://github.com/mycompany/oxid-hello-world-module',
    'email'       => 'support@yourcompany.com',
    'extend'      => [
        // Classes we want to extend (none for this basic example)
    ],
    'controllers' => [
        // Custom controllers
        'helloworldcontroller' => HelloWorldController::class,
    ],
    'templates'   => [
        // Custom templates
        'hello_world.tpl' => 'mycompany/helloworldmodule/views/frontend/tpl/hello_world.tpl',
    ],
    'blocks'      => [
        // Template blocks we want to modify (none for this example)
    ],
    'settings'    => [
        // Module settings
        [
            'group' => 'main',
            'name'  => 'sHelloWorldMessage',
            'type'  => 'str',
            'value' => 'Hello, World!'
        ],
    ],
];
```

## Step 5: Create the Controller

Create the directory structure and controller file:

```bash
mkdir -p Controller views/frontend/tpl
```

Create `Controller/HelloWorldController.php`:

```php
<?php

namespace MyCompany\HelloWorldModule\Controller;

use OxidEsales\Eshop\Application\Controller\FrontendController;
use OxidEsales\Eshop\Core\Registry;

/**
 * Hello World controller for frontend display
 */
class HelloWorldController extends FrontendController
{
    /**
     * Template name for this controller
     */
    protected $_sThisTemplate = 'hello_world.tpl';

    /**
     * Render the hello world page
     *
     * @return string
     */
    public function render()
    {
        // Call parent render method
        parent::render();

        // Get the hello world message from module settings
        $message = $this->getHelloWorldMessage();
        
        // Add data to template
        $this->addTplParam('helloMessage', $message);
        $this->addTplParam('currentTime', date('Y-m-d H:i:s'));

        // Set page title
        $this->getViewConfig()->setViewConfigParam('meta_title', 'Hello World');

        return $this->_sThisTemplate;
    }

    /**
     * Get the hello world message from module configuration
     *
     * @return string
     */
    protected function getHelloWorldMessage()
    {
        $config = Registry::getConfig();
        $message = $config->getConfigParam('sHelloWorldMessage');
        
        return $message ?: 'Hello, World!';
    }

    /**
     * Get breadcrumb for this page
     *
     * @return array
     */
    public function getBreadCrumb()
    {
        $paths = [];
        
        $path = [];
        $path['title'] = Registry::getLang()->translateString('HELLO_WORLD_TITLE', Registry::getLang()->getBaseLanguage(), false);
        $path['link'] = $this->getLink();
        $paths[] = $path;

        return $paths;
    }
}
```

## Step 6: Create the Template

Create the Smarty template `views/frontend/tpl/hello_world.tpl`:

```smarty
[{capture assign="template_title"}]Hello World[{/capture}]

[{include file="layout/page.tpl" title=$template_title location="PAGE_TITLE_HELLO_WORLD"}]

<div class="hello-world-container">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="hello-world-title">
                    [{$helloMessage}]
                </h1>
                
                <div class="hello-world-content">
                    <p>Welcome to your first OXID eShop module!</p>
                    <p>Current time: [{$currentTime}]</p>
                    
                    <div class="hello-world-info">
                        <h3>Module Information</h3>
                        <ul>
                            <li><strong>Module ID:</strong> helloworldmodule</li>
                            <li><strong>Version:</strong> 1.0.0</li>
                            <li><strong>Controller:</strong> HelloWorldController</li>
                        </ul>
                    </div>
                    
                    <div class="hello-world-actions">
                        <a href="[{$oViewConf->getHomeLink()}]" class="btn btn-primary">
                            Back to Shop
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.hello-world-container {
    padding: 2rem 0;
}

.hello-world-title {
    color: #333;
    text-align: center;
    margin-bottom: 2rem;
}

.hello-world-content {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 0.5rem;
    border-left: 4px solid #007bff;
}

.hello-world-info {
    background: white;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.25rem;
}

.hello-world-info ul {
    margin: 0;
    padding-left: 1.5rem;
}

.hello-world-actions {
    text-align: center;
    margin-top: 2rem;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
}

.btn:hover {
    background: #0056b3;
    color: white;
}
</style>
```

## Step 7: Add Translation Files

Create language files for multi-language support:

```bash
mkdir -p translations/de translations/en
```

Create `translations/en/lang.php`:

```php
<?php

$sLangName = 'English';
$iLangNr = 1;
$aLang = [
    'charset' => 'UTF-8',
    'HELLO_WORLD_TITLE' => 'Hello World',
];
```

Create `translations/de/lang.php`:

```php
<?php

$sLangName = 'Deutsch';
$iLangNr = 0;
$aLang = [
    'charset' => 'UTF-8',
    'HELLO_WORLD_TITLE' => 'Hallo Welt',
];
```

## Step 8: Create Module Logo (Optional)

Add a simple logo file `logo.png` (64x64 pixels) to represent your module in the admin interface.

## Step 9: Install the Module

### Via Admin Interface

1. **Access Admin Panel**: Go to your shop's admin interface (`/admin/`)
2. **Navigate to Extensions**: Go to **Extensions → Modules**
3. **Activate Module**: Find "Hello World Module" and activate it

### Via Console (Recommended)

```bash
# Navigate to shop root
cd /path/to/your/oxid-shop

# Install and activate the module
vendor/bin/oe-console oe:module:install source/modules/mycompany/helloworldmodule
vendor/bin/oe-console oe:module:activate helloworldmodule

# Clear cache
vendor/bin/oe-console oe:cache:clear
```

## Step 10: Test Your Module

### Access the Custom Page

Visit your module's page in the browser:
```
https://yourshop.com/hello-world
```

You should see:
- The "Hello, World!" message
- Current timestamp
- Module information
- Styled content with proper layout

### Verify Admin Integration

1. **Admin Module List**: Check that your module appears in **Extensions → Modules**
2. **Module Settings**: Verify you can modify the hello world message
3. **Module Status**: Ensure the module shows as "Active"

## Step 11: Testing and Debugging

### Basic Testing

Create a simple test to verify your controller works:

```bash
mkdir -p tests/Unit/Controller
```

Create `tests/Unit/Controller/HelloWorldControllerTest.php`:

```php
<?php

namespace MyCompany\HelloWorldModule\Tests\Unit\Controller;

use MyCompany\HelloWorldModule\Controller\HelloWorldController;
use PHPUnit\Framework\TestCase;

/**
 * Test for Hello World Controller
 */
class HelloWorldControllerTest extends TestCase
{
    public function testRenderReturnsCorrectTemplate()
    {
        $controller = new HelloWorldController();
        $template = $controller->render();
        
        $this->assertEquals('hello_world.tpl', $template);
    }
}
```

### Run Tests

```bash
# Install development dependencies
composer install

# Run tests
vendor/bin/phpunit tests/
```

### Debugging Tips

If your module doesn't work as expected:

1. **Check Error Logs**: Look in `log/oxideshop.log`
2. **Verify File Paths**: Ensure all files are in correct locations
3. **Check Namespace**: Verify namespace matches directory structure
4. **Clear Cache**: Always clear cache after changes
5. **Check Permissions**: Ensure web server can read module files

## Common Issues and Solutions

### Module Not Appearing in Admin

**Problem**: Module doesn't show up in Extensions → Modules

**Solutions**:
- Check `metadata.php` syntax for errors
- Verify file permissions
- Clear cache: `vendor/bin/oe-console oe:cache:clear`
- Check error logs for specific issues

### Page Not Found (404)

**Problem**: `/hello-world` URL returns 404 error

**Solutions**:
- Verify controller is registered in `metadata.php`
- Check namespace and class name match exactly
- Ensure module is activated
- Clear cache and regenerate routes

### Template Not Loading

**Problem**: Controller works but template not found

**Solutions**:
- Check template path in `metadata.php`
- Verify template file exists at correct location
- Check Smarty syntax for errors
- Ensure proper file permissions

### Settings Not Saving

**Problem**: Module settings don't save in admin

**Solutions**:
- Check settings array syntax in `metadata.php`
- Verify setting types are valid
- Clear cache after metadata changes
- Check database table `oxconfig` for settings

## Next Steps

Congratulations! You've created your first OXID module. Here's what you can do next:

### Extend Your Module

1. **Add More Controllers**: Create additional pages
2. **Extend Existing Classes**: Override shop functionality
3. **Add Database Tables**: Store custom data
4. **Create Admin Interface**: Manage module data in admin
5. **Add AJAX Functionality**: Create dynamic frontend features

### Learn Advanced Concepts

- **[Extend Shop Classes](extend-shop-class)**: Override existing functionality
- **[Frontend Development](frontend-mini-basket)**: Create complex frontend features
- **[Database Integration](multi-lang-and-shop-tables)**: Work with OXID's database
- **[Module Services](../module-services)**: Create reusable business logic

### Production Considerations

Before deploying to production:

1. **Comprehensive Testing**: Unit, integration, and manual tests
2. **Error Handling**: Add proper error handling and logging
3. **Performance**: Optimize database queries and caching
4. **Security**: Validate inputs and escape outputs
5. **Documentation**: Create user and developer documentation

### Community and Support

- **Share Your Module**: Consider open-sourcing useful modules
- **Get Feedback**: Ask for code reviews in OXID forums
- **Contribute**: Help improve OXID documentation and tools
- **Stay Updated**: Follow OXID development for new features

## Complete Module Structure

Your final module structure should look like this:

```
helloworldmodule/
├── composer.json
├── metadata.php
├── logo.png
├── Controller/
│   └── HelloWorldController.php
├── views/
│   └── frontend/
│       └── tpl/
│           └── hello_world.tpl
├── translations/
│   ├── de/
│   │   └── lang.php
│   └── en/
│       └── lang.php
└── tests/
    └── Unit/
        └── Controller/
            └── HelloWorldControllerTest.php
```

## Resources

- **[OXID Module Template](https://github.com/OXID-eSales/module-template)**: Official starting template
- **[System Architecture](../../../system-architecture/)**: Understand OXID's internals
- **[Testing Documentation](../../testing/)**: Comprehensive testing guide
- **[Community Forum](https://forum.oxid-esales.com)**: Get help from other developers

You now have a solid foundation for OXID module development. Keep experimenting and building more complex features!