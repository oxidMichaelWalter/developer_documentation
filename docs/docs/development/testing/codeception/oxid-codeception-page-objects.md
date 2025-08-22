# OXID Codeception Page Objects

OXID eShop provides pre-built Page Objects for common shop pages to speed up test development.

## Available Page Objects

The [OXID Codeception Page Objects](https://github.com/OXID-eSales/codeception-page-objects) package includes:

### Frontend Pages
- **Home Page** - Shop home/start page
- **Product Details** - Product detail pages  
- **Basket** - Shopping cart functionality
- **Checkout** - Order process pages
- **User Account** - Login, registration, user account pages
- **Contact** - Contact form page

### Backend Pages  
- **Admin Login** - Backend login page
- **Admin Dashboard** - Admin area navigation
- **Product Admin** - Product management
- **User Admin** - User management

## Usage Example

```php
use OxidEsales\Codeception\Page\Home;
use OxidEsales\Codeception\Page\Details\ProductDetails;

public function testProductPurchase(AcceptanceTester $I)
{
    $homePage = new Home($I);
    $I->amOnPage($homePage->URL);
    
    $productDetails = new ProductDetails($I);
    $productDetails->openDetailsPage('product-id')
                  ->addToBasket();
                  
    $I->see('Product added to basket');
}
```

## Installation

```bash
composer require --dev oxid-esales/codeception-page-objects
```

For detailed usage examples, see the [Page Objects documentation](https://github.com/OXID-eSales/codeception-page-objects).