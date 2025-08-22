---
sidebar_position: 2
---

# Testing

Automated tests are an essential part of ongoing development in large projects. Testing ensures code quality, prevents regressions, and provides confidence when making changes or updates.

## Testing Philosophy in OXID

OXID eShop follows a comprehensive testing approach with clear definitions for different types of tests:

### Test Types

- **[Unit Tests](unit)**: Test individual components in isolation
- **[Integration Tests](integration)**: Test component interactions and database operations
- **[Acceptance Tests](acceptance)**: Test complete user workflows end-to-end

### Testing Frameworks

OXID uses industry-standard testing frameworks:

- **[PHPUnit](https://phpunit.de/)**: For unit and integration testing
- **[Codeception](codeception/)**: For acceptance testing with browser automation

## Testing Strategy

### Test Pyramid Approach

OXID follows the test pyramid strategy:

```
        /\
       /  \
      / UI \ ← Acceptance Tests (Few, Slow, Expensive)
     /______\
    /        \
   / Integration \ ← Integration Tests (Some, Medium Speed)
  /______________\
 /                \
/      Unit        \ ← Unit Tests (Many, Fast, Cheap)
/__________________\
```

### Quality Goals

Well-written OXID tests should be:

- **Easy to write**: Simple test setup and clear patterns
- **Readable**: Clear test intentions and documentation
- **Reliable**: Consistent results across environments
- **Fast**: Quick execution for frequent testing
- **Isolated**: Tests don't interfere with each other

## Required Development Tools

To run all OXID eShop tests, install these development dependencies:

### PHPUnit Testing (Unit & Integration)
```bash
composer require --dev phpunit/phpunit
composer require --dev bovigo/vfsstream
composer require --dev phpspec/prophecy-phpunit
```

### Codeception Testing (Acceptance)
```bash
composer require --dev codeception/codeception
composer require --dev codeception/module-asserts
composer require --dev codeception/module-db
composer require --dev codeception/module-filesystem
composer require --dev codeception/module-webdriver
```

### OXID-Specific Testing Tools
```bash
composer require --dev oxid-esales/codeception-modules
composer require --dev oxid-esales/codeception-page-objects
composer require --dev oxid-esales/developer-tools
```

## Testing Environment Setup

### 1. Test Database Configuration

Create a separate test database to avoid conflicts:

```php
// tests/test_config.inc.php
<?php
$this->dbHost = 'localhost';
$this->dbName = 'oxid_test'; // Separate test database
$this->dbUser = 'oxid_test_user';
$this->dbPwd = 'test_password';

// Test-specific settings
$this->iDebug = 0;
$this->blLogChangesInAdmin = false;
```

### 2. PHPUnit Configuration

Ensure your `phpunit.xml` is properly configured:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/10.0/phpunit.xsd"
         bootstrap="tests/bootstrap.php"
         cacheDirectory=".phpunit.cache"
         executionOrder="depends,defects"
         requireCoverageMetadata="true"
         beStrictAboutCoverageMetadata="true"
         beStrictAboutOutputDuringTests="true"
         failOnRisky="true"
         failOnWarning="true">
    
    <testsuites>
        <testsuite name="Unit">
            <directory>tests/Unit</directory>
        </testsuite>
        <testsuite name="Integration">
            <directory>tests/Integration</directory>
        </testsuite>
    </testsuites>
    
    <source restrictDeprecations="true" restrictNotices="true" restrictWarnings="true">
        <include>
            <directory>source</directory>
        </include>
        <exclude>
            <directory>source/vendor</directory>
        </exclude>
    </source>
    
    <coverage>
        <report>
            <html outputDirectory="coverage-html" lowUpperBound="50" highLowerBound="80"/>
            <text outputFile="coverage.txt" showUncoveredFiles="false" showOnlySummary="true"/>
        </report>
    </coverage>
</phpunit>
```

### 3. Codeception Configuration

Basic `codeception.yml` setup:

```yaml
namespace: OxidEsales\EshopCommunity
actor: Tester
paths:
    tests: tests
    log: tests/_output
    data: tests/_data
    support: tests/_support
settings:
    bootstrap: _bootstrap.php
    colors: true
    memory_limit: 1024M
extensions:
    enabled:
        - Codeception\Extension\RunFailed
suites:
    acceptance:
        actor: AcceptanceTester
        modules:
            enabled:
                - WebDriver:
                    url: http://localhost
                    browser: chrome
                    window_size: 1920x1080
                - \OxidEsales\Codeception\Module\Shop
```

## Running Tests

### Quick Test Commands

```bash
# Run all unit tests
vendor/bin/phpunit tests/Unit

# Run all integration tests
vendor/bin/phpunit tests/Integration

# Run specific test class
vendor/bin/phpunit tests/Unit/Model/ArticleTest.php

# Run with coverage
vendor/bin/phpunit --coverage-html coverage tests/Unit

# Run Codeception acceptance tests
vendor/bin/codecept run acceptance

# Run Codeception with detailed output
vendor/bin/codecept run acceptance --debug
```

### Advanced Testing Options

```bash
# Run tests in parallel (with ParaTest)
vendor/bin/paratest tests/Unit

# Run tests with specific configuration
vendor/bin/phpunit -c phpunit.xml --testsuite=Unit

# Run only tests matching pattern
vendor/bin/phpunit --filter="testUserLogin" tests/

# Generate test coverage report
vendor/bin/phpunit --coverage-text --coverage-html=coverage tests/Unit
```

## Test Development Workflow

### 1. Test-Driven Development (TDD)

Follow the Red-Green-Refactor cycle:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to make it pass
3. **Refactor**: Improve code while keeping tests green

### 2. Test Categories by Development Phase

#### During Feature Development
- Start with unit tests for business logic
- Add integration tests for data operations
- Implement acceptance tests for user workflows

#### During Bug Fixing
- Write tests that reproduce the bug
- Fix the issue
- Verify tests pass and prevent regression

#### During Refactoring
- Ensure comprehensive test coverage
- Run tests frequently during changes
- Use tests to verify behavior preservation

## Module Testing Best Practices

### Testing Module Extensions

When testing modules that extend OXID functionality:

```php
<?php
namespace MyVendor\MyModule\Tests\Unit\Model;

use MyVendor\MyModule\Model\Article;
use PHPUnit\Framework\TestCase;

class ArticleTest extends TestCase
{
    public function testCustomDiscountCalculation()
    {
        $article = new Article();
        $article->setPrice(100);
        
        $discountedPrice = $article->applyCustomDiscount();
        
        $this->assertEquals(90, $discountedPrice);
    }
}
```

### Integration Testing with Database

```php
<?php
namespace MyVendor\MyModule\Tests\Integration\Model;

use OxidEsales\TestingLibrary\UnitTestCase;
use MyVendor\MyModule\Model\CustomModel;

class CustomModelTest extends UnitTestCase
{
    public function testSaveCustomData()
    {
        $model = new CustomModel();
        $model->setCustomField('test_value');
        
        $this->assertTrue($model->save());
        $this->assertNotEmpty($model->getId());
        
        // Verify data was saved
        $loadedModel = new CustomModel();
        $loadedModel->load($model->getId());
        $this->assertEquals('test_value', $loadedModel->getCustomField());
    }
}
```

## Continuous Integration

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        php-version: [8.1, 8.2]
        
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: ${{ matrix.php-version }}
        extensions: mysql, gd, curl
        
    - name: Install dependencies
      run: composer install --no-progress --no-suggest
      
    - name: Setup test database
      run: |
        mysql -e "CREATE DATABASE oxid_test;"
        vendor/bin/oe-console oe:database:reset --force
        
    - name: Run unit tests
      run: vendor/bin/phpunit tests/Unit
      
    - name: Run integration tests
      run: vendor/bin/phpunit tests/Integration
```

## Performance Testing

### Profiling Tests

Use Xdebug or Blackfire for performance analysis:

```bash
# Run tests with Xdebug profiling
php -d xdebug.mode=profile vendor/bin/phpunit tests/Unit

# Use memory limit testing
php -d memory_limit=512M vendor/bin/phpunit tests/Integration
```

### Load Testing

For acceptance testing with load:

```php
// Codeception test with performance monitoring
public function testShopPerformance(AcceptanceTester $I)
{
    $startTime = microtime(true);
    
    $I->amOnPage('/');
    $I->see('OXID eShop');
    
    $loadTime = microtime(true) - $startTime;
    $I->assertLessThan(2.0, $loadTime, 'Page should load within 2 seconds');
}
```

## Testing Resources

### Documentation Links

- **[Unit Testing Guide](unit)**: Detailed unit testing practices
- **[Integration Testing Guide](integration)**: Database and component testing
- **[Acceptance Testing Guide](acceptance)**: End-to-end testing approaches
- **[Codeception Documentation](codeception/)**: Comprehensive Codeception guide

### External Resources

- **[PHPUnit Documentation](https://phpunit.de/documentation.html)**
- **[Codeception Documentation](https://codeception.com/docs)**
- **[OXID Testing Library](https://github.com/OXID-eSales/testing-library)**
- **[Testing Best Practices](https://github.com/OXID-eSales/developer-documentation)**

### Community Support

- **[OXID Forum - Testing](https://forum.oxid-esales.com)**: Community help and discussions
- **[GitHub Issues](https://github.com/OXID-eSales/oxideshop_ce/issues)**: Report testing-related issues
- **[Stack Overflow](https://stackoverflow.com/questions/tagged/oxid-esales)**: Programming questions

## Next Steps

Choose your testing focus:

1. **New to Testing**: Start with [Unit Tests](unit)
2. **Database Testing**: Learn [Integration Tests](integration)  
3. **User Experience Testing**: Explore [Acceptance Tests](acceptance)
4. **Advanced Automation**: Master [Codeception](codeception/)

Each testing approach provides specific benefits and is essential for maintaining high-quality OXID eShop applications.