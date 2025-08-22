---
sidebar_position: 2
---

# Logging

OXID eShop provides a **PSR-3 compatible logging mechanism** based on Monolog, giving you powerful and flexible logging capabilities for debugging, monitoring, and auditing your e-commerce application.

## Quick Start

### Basic Usage

```php
use OxidEsales\Eshop\Core\Registry;

// Get the logger instance
$logger = Registry::getLogger();

// Log at different levels
$logger->emergency('Shop is down');
$logger->alert('Payment gateway unavailable');  
$logger->critical('Database connection failed');
$logger->error('Order processing failed', ['orderId' => $orderId]);
$logger->warning('Low stock warning', ['productId' => $productId]);
$logger->notice('User login from new location');
$logger->info('Order placed successfully');
$logger->debug('Cache miss for product data');
```

### With Context

Always provide context for better debugging:

```php
$logger = Registry::getLogger();
$logger->warning('Some message...', [
    'class' => __CLASS__,
    'method' => __FUNCTION__,
    'userId' => $this->getUser()->getId(),
    'additional_data' => $contextArray
]);
```

## Configuration

### Log Levels and Output

**Default behavior:**
- Messages of level **`error`** or higher → `source/log/oxideshop.log`
- Log level configurable via `source/config.inc.php`

### Configuration Variables

In `source/config.inc.php`:

```php
// Set minimum log level (error, warning, info, debug)
$this->sLogLevel = 'error';

// Debug mode affects logging behavior  
$this->iDebug = 0; // 0=off, 1=on, -1=verbose
```

:::tip Include Warning Messages
OXID eShop logs some important messages at `warning` level. To see these in your log file, set `sLogLevel` to `'warning'` in `config.inc.php`.
:::

## Log File Format

OXID eShop uses **Monolog** with `LineFormatter` including stack traces. Log entries follow the standard [Monolog message structure](https://github.com/Seldaek/monolog/blob/master/doc/message-structure.md).

### Example Log Entry

```
[2018-05-09 12:05:50] OXID Logger.ERROR: EXCEPTION_SYSTEMCOMPONENT_CLASSNOTFOUND MyVendor\MyModule\Application\Foo ["[object] (OxidEsales\\Eshop\\Core\\Exception\\SystemComponentException(code: 0): EXCEPTION_SYSTEMCOMPONENT_CLASSNOTFOUND MyVendor\\MyModule\\Application\\Foo at /var/www/oxideshop/source/Core/UtilsObject.php:222)
[stacktrace]
#0 /var/www/oxideshop/source/oxfunctions.php(101): OxidEsales\\EshopCommunity\\Core\\UtilsObject->oxNew('MyVendor\\\\MyModu...')
#1 /var/www/oxideshop/source/Application/Controller/ArticleDetailsController.php(208): oxNew('MyVendor\\\\MyModu...')
#2 /var/www/oxideshop/source/Core/ViewConfig.php(955): OxidEsales\\EshopCommunity\\Application\\Controller\\ArticleDetailsController->getNavigationParams()
...
```

**Entry Components:**
- **Timestamp**: `[2018-05-09 12:05:50]`
- **Channel**: `OXID Logger`
- **Level**: `ERROR`
- **Message**: Exception description
- **Context**: JSON-encoded additional data
- **Stack Trace**: Full call stack for debugging

## Advanced Logging

### Custom Logger Implementation

For specific requirements (different channels, formats, or destinations), you can implement a **[custom logger](custom-logger-implementation)**:

```php
use Psr\Log\LoggerInterface;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Handler\RotatingFileHandler;

class CustomLogger implements LoggerInterface
{
    private Logger $logger;
    
    public function __construct()
    {
        $this->logger = new Logger('custom');
        
        // Multiple handlers for different levels
        $this->logger->pushHandler(
            new RotatingFileHandler('logs/error.log', 0, Logger::ERROR)
        );
        $this->logger->pushHandler(
            new StreamHandler('logs/debug.log', Logger::DEBUG)
        );
    }
    
    // Implement PSR-3 methods...
}
```

### Service Container Integration

Register your custom logger:

```yaml
# var/configuration/configurable_services.yaml
services:
  Psr\Log\LoggerInterface:
    class: MyProject\Logging\CustomLogger
```

## Best Practices

### 1. Structured Logging

Always include relevant context:

```php
$logger->info('Order created', [
    'order_id' => $order->getId(),
    'user_id' => $order->getUserId(),
    'total' => $order->getTotal(),
    'payment_method' => $order->getPaymentType(),
    'timestamp' => time()
]);
```

### 2. Appropriate Log Levels

**Error Levels Guide:**
- **`emergency`**: System is unusable (entire shop down)
- **`alert`**: Action must be taken immediately (payment system down)
- **`critical`**: Critical conditions (database corruption)
- **`error`**: Runtime errors that don't require immediate action
- **`warning`**: Exceptional occurrences that are not errors
- **`notice`**: Normal but significant events
- **`info`**: Informational messages (successful operations)
- **`debug`**: Detailed debug information

### 3. Performance Considerations

```php
// Bad - expensive operation always executed
$logger->debug('User data: ' . json_encode($this->loadExpensiveUserData()));

// Good - check log level first
if ($logger->isHandling(Logger::DEBUG)) {
    $logger->debug('User data: ' . json_encode($this->loadExpensiveUserData()));
}

// Better - use lazy evaluation
$logger->debug('User data: {data}', [
    'data' => function() { return json_encode($this->loadExpensiveUserData()); }
]);
```

### 4. Sensitive Data Protection

```php
// Bad - logging sensitive data
$logger->info('User login', ['password' => $password]);

// Good - log only non-sensitive data
$logger->info('User login attempt', [
    'username' => $username,
    'ip' => $request->getClientIp(),
    'success' => $success
]);
```

### 5. Module-Specific Logging

For modules, create dedicated loggers:

```php
class MyModuleService
{
    private LoggerInterface $logger;
    
    public function __construct(LoggerInterface $logger)
    {
        $this->logger = $logger;
    }
    
    public function processPayment(): void
    {
        $this->logger->info('Processing payment', [
            'module' => 'MyModule',
            'action' => 'processPayment'
        ]);
    }
}
```

## Debugging and Monitoring

### Development Environment

```php
// Enable debug logging
$this->sLogLevel = 'debug';
$this->iDebug = 1;

// Log database queries
$logger->debug('SQL Query', [
    'query' => $sql,
    'parameters' => $params,
    'execution_time' => $time
]);
```

### Production Environment

```php
// Conservative logging
$this->sLogLevel = 'warning';
$this->iDebug = 0;

// Business-critical events only
$logger->error('Payment failed', [
    'order_id' => $orderId,
    'error_code' => $errorCode,
    'gateway_response' => $response
]);
```

### Log Analysis

Use tools for log analysis:

```bash
# View recent errors
tail -f source/log/oxideshop.log | grep ERROR

# Count error types
grep -o 'ERROR: [^"]*' source/log/oxideshop.log | sort | uniq -c

# Search for specific patterns
grep "EXCEPTION_SYSTEMCOMPONENT_CLASSNOTFOUND" source/log/oxideshop.log
```

## Integration Examples

### Event Subscriber Logging

```php
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class OrderEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private LoggerInterface $logger) {}
    
    public function onOrderCreated(OrderCreatedEvent $event): void
    {
        $this->logger->info('Order created via event', [
            'order_id' => $event->getOrder()->getId(),
            'event_timestamp' => time()
        ]);
    }
}
```

### Controller Logging

```php
class PaymentController extends FrontendController
{
    public function processPayment(): void
    {
        $logger = Registry::getLogger();
        
        try {
            // Payment processing logic
            $result = $this->paymentService->process($order);
            
            $logger->info('Payment processed successfully', [
                'order_id' => $order->getId(),
                'amount' => $order->getTotal()
            ]);
            
        } catch (PaymentException $e) {
            $logger->error('Payment processing failed', [
                'order_id' => $order->getId(),
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            throw $e;
        }
    }
}
```

## Related Topics

- **[Custom Logger Implementation](custom-logger-implementation)**: Create specialized logging solutions
- **[Service Container](../service-container)**: Inject loggers via DI
- **[PSR-3 Logger Interface](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md)**: Official PSR-3 specification
- **[Monolog Documentation](https://github.com/Seldaek/monolog)**: Underlying logging library