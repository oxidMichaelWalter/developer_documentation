---
sidebar_position: 1
---

# Unit Testing

Unit tests are the foundation of OXID eShop's testing strategy. They test individual components in isolation, providing fast feedback and ensuring code quality at the lowest level.

## What are Unit Tests?

Unit tests focus on testing individual classes, methods, or functions in isolation from external dependencies like databases, file systems, or network resources.

### Characteristics of Good Unit Tests

We should strive to write unit tests that are:

- **Easy to write**: Simple setup with minimal dependencies
- **Readable**: Clear test intentions and well-named methods
- **Reliable**: Consistent results regardless of environment
- **Fast**: Execute quickly for frequent testing cycles
- **Truly unit**: Don't access networks, databases, or file systems

## Running Unit Tests

### Basic Commands

```bash
# Run all unit tests
vendor/bin/phpunit -c phpunit.xml tests/Unit

# Run specific test class
vendor/bin/phpunit tests/Unit/Model/ArticleTest.php

# Run tests with verbose output
vendor/bin/phpunit --verbose tests/Unit

# Run tests with coverage report
vendor/bin/phpunit --coverage-text tests/Unit
```

### Advanced Options

```bash
# Run tests matching a pattern
vendor/bin/phpunit --filter="testGetPrice" tests/Unit

# Run tests with coverage HTML report
vendor/bin/phpunit --coverage-html coverage tests/Unit

# Run tests with detailed error output
vendor/bin/phpunit --debug tests/Unit

# Stop on first failure
vendor/bin/phpunit --stop-on-failure tests/Unit
```

## Unit Test Structure

### Basic Test Class Structure

```php
<?php
namespace OxidEsales\EshopCommunity\Tests\Unit\Application\Model;

use PHPUnit\Framework\TestCase;
use OxidEsales\EshopCommunity\Application\Model\Article;

/**
 * Test class for Article model
 */
class ArticleTest extends TestCase
{
    /**
     * Set up test environment before each test
     */
    protected function setUp(): void
    {
        parent::setUp();
        // Test-specific setup code
    }

    /**
     * Clean up after each test
     */
    protected function tearDown(): void
    {
        // Test-specific cleanup code
        parent::tearDown();
    }

    /**
     * Test article price calculation
     */
    public function testGetPrice()
    {
        // Arrange
        $article = new Article();
        $expectedPrice = 99.99;
        
        // Act
        $article->setPrice($expectedPrice);
        $actualPrice = $article->getPrice();
        
        // Assert
        $this->assertEquals($expectedPrice, $actualPrice);
    }
}
```

### Test Naming Conventions

Use descriptive test method names that explain what is being tested:

```php
// Good: Describes what is being tested
public function testGetPriceReturnsCorrectValueForSimpleProduct()
public function testCalculateDiscountWithValidPercentage()
public function testValidateEmailReturnsFalseForInvalidFormat()

// Avoid: Generic or unclear names
public function testPrice()
public function testMethod1()
public function testValidation()
```

## Testing Patterns

### Arrange-Act-Assert (AAA) Pattern

Structure your tests using the AAA pattern:

```php
public function testCalculateDiscountedPrice()
{
    // Arrange - Set up test data and conditions
    $article = new Article();
    $originalPrice = 100.00;
    $discountPercent = 10;
    $expectedPrice = 90.00;
    
    $article->setPrice($originalPrice);
    
    // Act - Execute the method being tested
    $actualPrice = $article->calculateDiscountedPrice($discountPercent);
    
    // Assert - Verify the expected outcome
    $this->assertEquals($expectedPrice, $actualPrice);
}
```

### Data Providers

Use data providers to test multiple scenarios:

```php
/**
 * @dataProvider priceCalculationProvider
 */
public function testCalculateDiscountedPrice($originalPrice, $discount, $expectedPrice)
{
    $article = new Article();
    $article->setPrice($originalPrice);
    
    $actualPrice = $article->calculateDiscountedPrice($discount);
    
    $this->assertEquals($expectedPrice, $actualPrice);
}

public function priceCalculationProvider()
{
    return [
        'no discount' => [100.00, 0, 100.00],
        'ten percent discount' => [100.00, 10, 90.00],
        'fifty percent discount' => [100.00, 50, 50.00],
        'full discount' => [100.00, 100, 0.00],
    ];
}
```

## Mocking and Stubbing

### Using PHPUnit Mocks

Mock external dependencies to keep tests isolated:

```php
public function testProcessOrderCallsPaymentService()
{
    // Create mock for payment service
    $paymentService = $this->createMock(PaymentServiceInterface::class);
    $paymentService->expects($this->once())
               ->method('processPayment')
               ->with($this->equalTo(99.99))
               ->willReturn(true);
    
    // Inject mock into object under test
    $orderProcessor = new OrderProcessor($paymentService);
    
    // Test that payment service is called correctly
    $result = $orderProcessor->processOrder(99.99);
    
    $this->assertTrue($result);
}
```

### Stubbing Return Values

Create stubs for dependencies that return specific values:

```php
public function testCalculateTaxUsesCorrectTaxRate()
{
    // Stub tax service to return specific rate
    $taxService = $this->createStub(TaxServiceInterface::class);
    $taxService->method('getTaxRate')
               ->willReturn(0.19); // 19% tax rate
    
    $priceCalculator = new PriceCalculator($taxService);
    
    $totalPrice = $priceCalculator->calculateTotalPrice(100.00);
    
    $this->assertEquals(119.00, $totalPrice);
}
```

## Testing OXID-Specific Components

### Testing OXID Models

```php
<?php
namespace MyVendor\MyModule\Tests\Unit\Model;

use PHPUnit\Framework\TestCase;
use MyVendor\MyModule\Model\CustomArticle;

class CustomArticleTest extends TestCase
{
    public function testCustomDiscountCalculation()
    {
        $article = new CustomArticle();
        $article->setPrice(100.00);
        $article->setCustomDiscountPercent(15);
        
        $discountedPrice = $article->getCustomDiscountedPrice();
        
        $this->assertEquals(85.00, $discountedPrice);
    }
    
    public function testCustomDiscountWithZeroPercent()
    {
        $article = new CustomArticle();
        $article->setPrice(100.00);
        $article->setCustomDiscountPercent(0);
        
        $discountedPrice = $article->getCustomDiscountedPrice();
        
        $this->assertEquals(100.00, $discountedPrice);
    }
}
```

### Testing Controllers

```php
<?php
namespace MyVendor\MyModule\Tests\Unit\Controller;

use PHPUnit\Framework\TestCase;
use MyVendor\MyModule\Controller\CustomController;

class CustomControllerTest extends TestCase
{
    public function testRenderReturnsCorrectTemplate()
    {
        $controller = new CustomController();
        
        $template = $controller->render();
        
        $this->assertEquals('custom_template.tpl', $template);
    }
    
    public function testControllerSetsCorrectTemplateVariables()
    {
        $controller = new CustomController();
        
        // Mock the view data
        $controller->addTplParam('testParam', 'testValue');
        
        $this->assertEquals('testValue', $controller->getTplParam('testParam'));
    }
}
```

### Testing Services

```php
<?php
namespace MyVendor\MyModule\Tests\Unit\Service;

use PHPUnit\Framework\TestCase;
use MyVendor\MyModule\Service\PriceCalculationService;

class PriceCalculationServiceTest extends TestCase
{
    private $service;
    
    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new PriceCalculationService();
    }
    
    public function testCalculateNetPriceFromGross()
    {
        $grossPrice = 119.00;
        $taxRate = 0.19;
        
        $netPrice = $this->service->calculateNetPrice($grossPrice, $taxRate);
        
        $this->assertEquals(100.00, $netPrice, 'Net price calculation failed', 0.01);
    }
    
    /**
     * @dataProvider invalidTaxRateProvider
     */
    public function testCalculateNetPriceThrowsExceptionForInvalidTaxRate($invalidTaxRate)
    {
        $this->expectException(\InvalidArgumentException::class);
        
        $this->service->calculateNetPrice(100.00, $invalidTaxRate);
    }
    
    public function invalidTaxRateProvider()
    {
        return [
            'negative tax rate' => [-0.1],
            'tax rate over 100%' => [1.1],
        ];
    }
}
```

## Testing Exceptions

### Testing Exception Throwing

```php
public function testInvalidDiscountThrowsException()
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Discount cannot be negative');
    
    $article = new Article();
    $article->applyDiscount(-10);
}
```

### Testing Exception Messages

```php
public function testInvalidEmailThrowsExceptionWithCorrectMessage()
{
    $validator = new EmailValidator();
    
    try {
        $validator->validate('invalid-email');
        $this->fail('Expected exception was not thrown');
    } catch (\InvalidArgumentException $e) {
        $this->assertStringContains('Invalid email format', $e->getMessage());
    }
}
```

## Test Doubles and Isolation

### Using vfsStream for File System Testing

```php
use org\bovigo\vfs\vfsStream;

public function testFileWritingOperation()
{
    // Create virtual file system
    $root = vfsStream::setup('test');
    
    $fileHandler = new FileHandler();
    $testData = 'test content';
    
    $fileHandler->writeToFile(vfsStream::url('test/output.txt'), $testData);
    
    $this->assertTrue($root->hasChild('output.txt'));
    $this->assertEquals($testData, $root->getChild('output.txt')->getContent());
}
```

### Testing Static Methods

```php
public function testUtilityFunction()
{
    $input = 'test string';
    $expected = 'TEST STRING';
    
    $result = UtilityClass::toUpperCase($input);
    
    $this->assertEquals($expected, $result);
}
```

## Code Coverage

### Generating Coverage Reports

```bash
# Generate HTML coverage report
vendor/bin/phpunit --coverage-html coverage tests/Unit

# Generate text coverage summary
vendor/bin/phpunit --coverage-text tests/Unit

# Generate Clover XML for CI
vendor/bin/phpunit --coverage-clover coverage.xml tests/Unit
```

### Coverage Annotations

Use annotations to fine-tune coverage reporting:

```php
/**
 * @covers MyVendor\MyModule\Service\PriceCalculationService::calculateNetPrice
 */
public function testCalculateNetPrice()
{
    // Test implementation
}

/**
 * @codeCoverageIgnore
 */
private function helperMethodNotTested()
{
    // This method won't count towards coverage
}
```

## Best Practices

### Test Organization

1. **One assertion per test** (when possible)
2. **Clear test names** describing what is tested
3. **Group related tests** in test classes
4. **Use setUp/tearDown** for common test preparation

### Performance Optimization

1. **Keep tests fast** - avoid heavy operations
2. **Use data providers** instead of multiple similar tests  
3. **Mock external dependencies** to avoid slow operations
4. **Run unit tests frequently** during development

### Debugging Tests

```php
public function testDebugExample()
{
    $value = $this->calculateComplexValue();
    
    // Debug output (remove before committing)
    var_dump($value);
    
    $this->assertEquals($expected, $value);
}
```

## Common Anti-Patterns to Avoid

### Testing Implementation Details

```php
// BAD: Testing internal implementation
public function testArticleUsesCorrectDatabaseQuery()
{
    $article = new Article();
    // Don't test SQL queries in unit tests
    $this->assertStringContains('SELECT * FROM oxarticles', $article->getQuery());
}

// GOOD: Testing behavior
public function testArticleReturnsCorrectPrice()
{
    $article = new Article();
    $article->setPrice(99.99);
    
    $this->assertEquals(99.99, $article->getPrice());
}
```

### Over-Mocking

```php
// BAD: Too many mocks make tests fragile
public function testOverMocked()
{
    $mock1 = $this->createMock(Service1::class);
    $mock2 = $this->createMock(Service2::class);
    $mock3 = $this->createMock(Service3::class);
    // ... many more mocks
}

// GOOD: Test only what matters
public function testEssentialBehavior()
{
    $essentialDependency = $this->createMock(PaymentService::class);
    // Focus on core functionality
}
```

## Integration with IDE

### PhpStorm Configuration

Set up unit test running in PhpStorm:

1. Go to **Run → Edit Configurations**
2. Add **PHPUnit** configuration
3. Set **Test scope** to **Directory**: `tests/Unit`
4. Set **Configuration file**: `phpunit.xml`

### VS Code Configuration

Add to `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "PHPUnit Unit Tests",
            "type": "shell",
            "command": "vendor/bin/phpunit",
            "args": ["tests/Unit"],
            "group": "test",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        }
    ]
}
```

## Next Steps

After mastering unit testing:

1. **[Integration Testing](integration)**: Test component interactions
2. **[Acceptance Testing](acceptance)**: End-to-end user workflow testing
3. **[Codeception](codeception/)**: Advanced testing framework usage
4. **[Module Testing](../modules-components-themes/module/certification/software-tests)**: Testing OXID modules specifically

Unit tests provide the foundation for reliable, maintainable OXID eShop code. Start with simple tests and gradually build comprehensive test suites for your modules and customizations.