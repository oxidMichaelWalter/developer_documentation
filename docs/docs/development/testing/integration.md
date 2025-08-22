---
sidebar_position: 2
---

# Integration Testing

Integration tests verify that different components of OXID eShop work correctly together, including interactions with the database, file system, and external services.

## What are Integration Tests?

Integration tests are more complex than unit tests because they:

1. **Interact with other components** and the database
2. **Test real workflows** involving multiple classes
3. **Require proper setup and teardown** to maintain test isolation
4. **Validate data consistency** across system boundaries

## Test Environment Setup

### Database Preparation

Integration tests require a clean database state for each test run.

#### Reset Test Database

Before running integration tests, set up the shop database:

```bash
# Reset database with console command
vendor/bin/oe-console oe:database:reset \
  --db-host=localhost \
  --db-port=3306 \
  --db-name=oxid_test \
  --db-user=oxid_test_user \
  --db-password=test_password \
  --force
```

#### Automated Database Setup

Create a script for automated database preparation:

```bash
#!/bin/bash
# setup-integration-tests.sh

# Drop and recreate test database
mysql -u root -p -e "DROP DATABASE IF EXISTS oxid_test;"
mysql -u root -p -e "CREATE DATABASE oxid_test CHARACTER SET utf8 COLLATE utf8_general_ci;"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON oxid_test.* TO 'oxid_test_user'@'localhost';"

# Initialize OXID database structure
vendor/bin/oe-console oe:database:reset \
  --db-host=localhost \
  --db-name=oxid_test \
  --db-user=oxid_test_user \
  --db-password=test_password \
  --force

echo "Integration test database ready"
```

### Test Configuration

Create separate configuration for integration tests:

```php
// tests/test_config.inc.php
<?php
$this->dbHost = 'localhost';
$this->dbName = 'oxid_test';
$this->dbUser = 'oxid_test_user';
$this->dbPwd = 'test_password';

// Test-specific settings
$this->iDebug = 0;
$this->blLogChangesInAdmin = false;
$this->blLogException = false;

// Disable caching for tests
$this->blTemplateCaching = false;
$this->blReverseProxyActive = false;
```

## Running Integration Tests

### Basic Commands

```bash
# Run all integration tests
vendor/bin/phpunit -c phpunit.xml --bootstrap tests/bootstrap.php tests/Integration

# Run specific integration test
vendor/bin/phpunit tests/Integration/Model/ArticleIntegrationTest.php

# Run with verbose output
vendor/bin/phpunit --verbose tests/Integration

# Run with coverage
vendor/bin/phpunit --coverage-text tests/Integration
```

### Testing with Active Modules

Test how your modules interact with OXID:

```bash
# Activate module before testing
vendor/bin/oe-console oe:module:activate my-module-id

# Run integration tests
vendor/bin/phpunit tests/Integration

# Run tests for specific module
vendor/bin/phpunit tests/Integration/Module/MyModuleIntegrationTest.php
```

## Integration Test Structure

### Base Test Class

Extend OXID's testing base class for integration tests:

```php
<?php
namespace MyVendor\MyModule\Tests\Integration\Model;

use OxidEsales\TestingLibrary\UnitTestCase;
use MyVendor\MyModule\Model\CustomProduct;

/**
 * Integration test for CustomProduct model
 */
class CustomProductIntegrationTest extends UnitTestCase
{
    /**
     * Set up test environment
     */
    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data in database
        $this->createTestProduct();
    }
    
    /**
     * Clean up after test
     */
    protected function tearDown(): void
    {
        // Clean up test data
        $this->cleanupTestData();
        
        parent::tearDown();
    }
    
    /**
     * Test saving product with custom fields
     */
    public function testSaveProductWithCustomFields()
    {
        $product = new CustomProduct();
        $product->setTitle('Test Product');
        $product->setCustomField('custom_value');
        
        // Save to database
        $this->assertTrue($product->save());
        $this->assertNotEmpty($product->getId());
        
        // Load from database and verify
        $loadedProduct = new CustomProduct();
        $loadedProduct->load($product->getId());
        
        $this->assertEquals('Test Product', $loadedProduct->getTitle());
        $this->assertEquals('custom_value', $loadedProduct->getCustomField());
    }
    
    /**
     * Create test product data
     */
    private function createTestProduct()
    {
        $product = new CustomProduct();
        $product->assign([
            'oxid' => 'test_product_001',
            'oxtitle' => 'Integration Test Product',
            'oxprice' => 99.99
        ]);
        $product->save();
    }
    
    /**
     * Clean up test data
     */
    private function cleanupTestData()
    {
        $product = new CustomProduct();
        if ($product->load('test_product_001')) {
            $product->delete();
        }
    }
}
```

## Database Testing Patterns

### Testing CRUD Operations

```php
public function testCompleteProductLifecycle()
{
    $product = new CustomProduct();
    
    // CREATE
    $product->assign([
        'oxid' => 'lifecycle_test_001',
        'oxtitle' => 'Lifecycle Test Product',
        'oxprice' => 149.99,
        'oxcustomfield' => 'initial_value'
    ]);
    $this->assertTrue($product->save(), 'Product creation failed');
    
    // READ
    $loadedProduct = new CustomProduct();
    $this->assertTrue($loadedProduct->load('lifecycle_test_001'), 'Product loading failed');
    $this->assertEquals('Lifecycle Test Product', $loadedProduct->getTitle());
    $this->assertEquals('initial_value', $loadedProduct->getCustomField());
    
    // UPDATE
    $loadedProduct->setTitle('Updated Product Title');
    $loadedProduct->setCustomField('updated_value');
    $this->assertTrue($loadedProduct->save(), 'Product update failed');
    
    // Verify update
    $updatedProduct = new CustomProduct();
    $updatedProduct->load('lifecycle_test_001');
    $this->assertEquals('Updated Product Title', $updatedProduct->getTitle());
    $this->assertEquals('updated_value', $updatedProduct->getCustomField());
    
    // DELETE
    $this->assertTrue($updatedProduct->delete(), 'Product deletion failed');
    
    // Verify deletion
    $deletedProduct = new CustomProduct();
    $this->assertFalse($deletedProduct->load('lifecycle_test_001'), 'Product should be deleted');
}
```

### Testing Relationships

```php
public function testProductCategoryRelationship()
{
    // Create test category
    $category = new Category();
    $category->assign([
        'oxid' => 'test_category_001',
        'oxtitle' => 'Test Category'
    ]);
    $category->save();
    
    // Create test product
    $product = new CustomProduct();
    $product->assign([
        'oxid' => 'test_product_rel_001',
        'oxtitle' => 'Product with Category',
        'oxcatnid' => 'test_category_001'
    ]);
    $product->save();
    
    // Test relationship
    $loadedProduct = new CustomProduct();
    $loadedProduct->load('test_product_rel_001');
    
    $category = $loadedProduct->getCategory();
    $this->assertInstanceOf(Category::class, $category);
    $this->assertEquals('Test Category', $category->getTitle());
    
    // Cleanup
    $loadedProduct->delete();
    $category->delete();
}
```

## Testing Module Integration

### Testing Module Extensions

```php
<?php
namespace MyVendor\MyModule\Tests\Integration\Model;

use OxidEsales\TestingLibrary\UnitTestCase;
use OxidEsales\Eshop\Application\Model\Article;

class ArticleExtensionIntegrationTest extends UnitTestCase
{
    public function testModuleExtendsArticleCorrectly()
    {
        // Create article instance (should include module extension)
        $article = new Article();
        $article->load('test_article_001');
        
        // Test that module method is available
        $this->assertTrue(method_exists($article, 'getCustomDiscount'));
        
        // Test custom functionality
        $customDiscount = $article->getCustomDiscount();
        $this->assertIsFloat($customDiscount);
        $this->assertGreaterThanOrEqual(0, $customDiscount);
    }
    
    public function testModuleChainExtension()
    {
        // Test that multiple modules can extend the same class
        $article = new Article();
        
        // Verify that all expected methods from different modules exist
        $this->assertTrue(method_exists($article, 'getCustomDiscount')); // Module 1
        $this->assertTrue(method_exists($article, 'getSpecialPrice'));   // Module 2
        
        // Test that chain calling works correctly
        $originalGetPrice = parent::getPrice();
        $enhancedPrice = $article->getPrice(); // Should include all module modifications
        
        $this->assertNotEquals($originalGetPrice, $enhancedPrice);
    }
}
```

### Testing Service Integration

```php
public function testCustomServiceIntegration()
{
    // Test that custom service is properly registered
    $container = ContainerFactory::getInstance()->getContainer();
    
    $this->assertTrue($container->has('my_vendor.my_module.custom_service'));
    
    $customService = $container->get('my_vendor.my_module.custom_service');
    $this->assertInstanceOf(CustomServiceInterface::class, $customService);
    
    // Test service functionality with database
    $result = $customService->processProductData('test_product_001');
    
    $this->assertIsArray($result);
    $this->assertArrayHasKey('processed_data', $result);
}
```

## Testing Transactions and Rollbacks

### Database Transaction Testing

```php
public function testTransactionRollback()
{
    $db = DatabaseProvider::getDb();
    
    try {
        $db->startTransaction();
        
        // Create test data
        $product = new CustomProduct();
        $product->assign([
            'oxid' => 'transaction_test_001',
            'oxtitle' => 'Transaction Test Product'
        ]);
        $product->save();
        
        // Simulate an error condition
        throw new \Exception('Simulated error for rollback test');
        
        $db->commitTransaction();
        
    } catch (\Exception $e) {
        $db->rollbackTransaction();
        
        // Verify rollback worked
        $testProduct = new CustomProduct();
        $this->assertFalse($testProduct->load('transaction_test_001'));
    }
}
```

## Testing Configuration and Settings

### Module Configuration Testing

```php
public function testModuleConfiguration()
{
    $config = Registry::getConfig();
    
    // Test that module configuration is loaded
    $moduleSettings = $config->getConfigParam('aModules');
    $this->assertArrayHasKey('MyVendor\\MyModule\\Model\\Article', $moduleSettings);
    
    // Test custom configuration values
    $customSetting = $config->getConfigParam('myModuleCustomSetting');
    $this->assertEquals('expected_value', $customSetting);
}
```

### Multi-Shop Configuration Testing

```php
public function testMultiShopConfiguration()
{
    $config = Registry::getConfig();
    
    // Test shop-specific settings
    $originalShopId = $config->getShopId();
    
    // Switch to different shop
    $config->setShopId(2);
    
    $shopSpecificSetting = $config->getConfigParam('myModuleShopSetting');
    $this->assertEquals('shop_2_value', $shopSpecificSetting);
    
    // Restore original shop
    $config->setShopId($originalShopId);
}
```

## Performance Testing

### Database Query Performance

```php
public function testQueryPerformance()
{
    $startTime = microtime(true);
    
    // Execute potentially slow operation
    $products = $this->getCustomProductList(1000);
    
    $executionTime = microtime(true) - $startTime;
    
    $this->assertLessThan(2.0, $executionTime, 'Query should complete within 2 seconds');
    $this->assertCount(1000, $products, 'Should return expected number of products');
}

private function getCustomProductList($limit)
{
    $productList = new CustomProductList();
    $productList->selectString("SELECT * FROM oxarticles LIMIT " . (int)$limit);
    
    return $productList->getArray();
}
```

## Testing External Dependencies

### API Integration Testing

```php
public function testExternalApiIntegration()
{
    // Skip test if API is not available
    $this->skipTestIfApiNotAvailable();
    
    $apiService = new ExternalApiService();
    
    $response = $apiService->fetchProductData('test_sku_001');
    
    $this->assertIsArray($response);
    $this->assertArrayHasKey('price', $response);
    $this->assertArrayHasKey('availability', $response);
}

private function skipTestIfApiNotAvailable()
{
    $config = Registry::getConfig();
    $apiEndpoint = $config->getConfigParam('externalApiEndpoint');
    
    if (!$this->isApiEndpointReachable($apiEndpoint)) {
        $this->markTestSkipped('External API is not reachable');
    }
}

private function isApiEndpointReachable($endpoint)
{
    $context = stream_context_create([
        'http' => [
            'timeout' => 5,
            'method' => 'HEAD'
        ]
    ]);
    
    return @file_get_contents($endpoint, false, $context) !== false;
}
```

## Debugging Integration Tests

### Enabling Debug Output

```php
public function testWithDebugOutput()
{
    // Enable debug mode for this test
    $config = Registry::getConfig();
    $originalDebug = $config->getConfigParam('iDebug');
    $config->setConfigParam('iDebug', 1);
    
    try {
        // Your test code here
        $result = $this->performComplexOperation();
        
        // Check log files for debug information
        $this->assertTestGeneratedExpectedLogs();
        
    } finally {
        // Restore original debug setting
        $config->setConfigParam('iDebug', $originalDebug);
    }
}
```

### Database State Inspection

```php
public function testDatabaseStateAfterOperation()
{
    $productId = 'integration_test_product';
    
    // Perform operation
    $service = new ProductUpdateService();
    $service->updateProduct($productId, ['new_field' => 'new_value']);
    
    // Inspect database state directly
    $db = DatabaseProvider::getDb();
    $result = $db->getOne("SELECT oxnewfield FROM oxarticles WHERE oxid = ?", [$productId]);
    
    $this->assertEquals('new_value', $result);
    
    // Check audit trail if implemented
    $auditCount = $db->getOne("SELECT COUNT(*) FROM oxaudit WHERE oxobjectid = ?", [$productId]);
    $this->assertEquals(1, $auditCount, 'Audit record should be created');
}
```

## Continuous Integration

### CI-Friendly Test Configuration

```yaml
# GitHub Actions example for integration tests
name: Integration Tests
on: [push, pull_request]

jobs:
  integration-tests:
    runs-on: ubuntu-latest
    
    services:
      mysql:
        image: mysql:8.0
        env:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: oxid_test
          MYSQL_USER: oxid_test_user
          MYSQL_PASSWORD: test_password
        ports:
          - 3306:3306
        options: --health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup PHP
      uses: shivammathur/setup-php@v2
      with:
        php-version: 8.1
        extensions: mysql, gd, curl, json, xml
        
    - name: Install dependencies
      run: composer install --no-progress --no-suggest
      
    - name: Setup test database
      run: |
        vendor/bin/oe-console oe:database:reset --force
        
    - name: Run integration tests
      run: vendor/bin/phpunit tests/Integration
      
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml
```

## Best Practices

### Test Data Management

1. **Use transactions** to isolate test data when possible
2. **Clean up after tests** to prevent data pollution
3. **Use meaningful test data** that represents real scenarios
4. **Avoid hardcoded IDs** that might conflict with real data

### Test Performance

1. **Group related tests** to minimize setup/teardown overhead
2. **Use database fixtures** for complex test data scenarios
3. **Mock external services** when testing integration logic
4. **Run integration tests separately** from unit tests

### Error Handling

1. **Test both success and failure scenarios**
2. **Verify error messages and exception types**
3. **Test rollback behavior** for failed operations
4. **Validate data consistency** after errors

## Next Steps

After mastering integration testing:

1. **[Acceptance Testing](acceptance)**: End-to-end user workflow testing
2. **[Codeception Testing](codeception/)**: Advanced testing framework usage
3. **[Module Certification](../modules-components-themes/module/certification/software-tests)**: Professional testing standards
4. **Performance Testing**: Load and stress testing techniques

Integration tests bridge the gap between isolated unit tests and full end-to-end testing, ensuring your OXID modules work correctly with the shop's data and services.