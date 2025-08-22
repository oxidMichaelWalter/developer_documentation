# OXID Codeception Step Objects

Step Objects provide reusable test steps for common e-commerce workflows in OXID eShop.

## Available Step Objects

Step Objects encapsulate complex multi-step operations:

### User Management Steps
- **UserRegistration** - Complete user registration workflow
- **UserLogin** - User authentication steps  
- **UserProfile** - Profile management operations

### Shopping Steps
- **ProductPurchase** - End-to-end purchase workflow
- **BasketOperations** - Add/remove/modify basket items
- **CheckoutProcess** - Complete checkout flow

### Admin Steps
- **ProductManagement** - Product creation and editing
- **OrderManagement** - Order processing workflows
- **UserAdministration** - User management operations

## Usage Example

```php
use OxidEsales\Codeception\Step\ProductPurchase;

public function testCompleteOrderProcess(AcceptanceTester $I)
{
    $purchaseSteps = new ProductPurchase($I);
    
    $purchaseSteps
        ->loginAsUser('customer@example.com', 'password')
        ->addProductToBasket('product-123')  
        ->proceedToCheckout()
        ->fillShippingAddress($addressData)
        ->selectPaymentMethod('paypal')
        ->completeOrder();
        
    $I->see('Order completed successfully');
}
```

## Creating Custom Step Objects

```php
namespace MyModule\Tests\Step;

class CustomWorkflow
{
    private $tester;
    
    public function __construct(\AcceptanceTester $I)
    {
        $this->tester = $I;
    }
    
    public function performComplexWorkflow()
    {
        $this->tester->amOnPage('/admin');
        // ... complex multi-step operations
        return $this;
    }
}
```

Step Objects help maintain clean, readable tests by encapsulating complex workflows.