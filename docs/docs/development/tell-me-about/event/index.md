---
sidebar_position: 1
---

# Event System

OXID eShop provides a comprehensive event system that allows you to enhance shop functionality by listening to and reacting to various application lifecycle events. This is the recommended modern approach for extending shop behavior.

:::tip YouTube Tutorial
Watch a short video tutorial: [Event Subscribers](https://www.youtube.com/watch?v=53oAt0mGH9U)
:::

## Overview

Events are fired at specific moments during shop operation - for example, when a model object is saved to the database, when a user logs in, or when a basket is modified. Each event may carry a payload containing relevant data.

### Why Use Events?

:::info Upgrade Safety
Using events is **much more secure** than traditional class extension methods. While core methods may be deprecated and refactored, **events maintain stability** across OXID eShop versions, keeping your shop upgradable.
:::

**Key advantages:**
- **Future-proof**: Events remain stable across shop updates
- **Non-invasive**: No need to modify core classes
- **Flexible**: React to multiple events with a single subscriber
- **Testable**: Easy to unit test event subscribers
- **Maintainable**: Clear separation of concerns

## How Events Work

1. **Event Trigger**: OXID eShop fires an event at a specific point (e.g., before saving an order)
2. **Event Payload**: The event carries relevant data (e.g., the order object)
3. **Event Subscriber**: Your code listens for the event and executes custom logic
4. **Payload Manipulation**: You can modify the payload to change application behavior

### Example Use Case

```php
// When an order is saved...
class OrderSecuritySubscriber implements EventSubscriberInterface
{
    public function onOrderSave(AfterModelUpdateEvent $event): void
    {
        $order = $event->getModel();
        
        if ($order instanceof Order) {
            // Check creditworthiness
            if (!$this->creditService->isWorthy($order->getUser())) {
                $order->setOrderState('pending_verification');
            }
        }
    }
}
```

## Implementation Approaches

OXID eShop uses the **Symfony Event Dispatcher** component. You can implement event handling in two ways:

### 1. Event Subscribers (Recommended)

**Advantages:**
- Self-contained class that defines which events it listens to
- Advanced and flexible approach
- Better organization for multiple events

```php
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class MyEventSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            BeforeModelUpdateEvent::class => 'onBeforeUpdate',
            AfterModelUpdateEvent::class => 'onAfterUpdate',
        ];
    }
    
    public function onBeforeUpdate(BeforeModelUpdateEvent $event): void
    {
        // Custom logic before model update
    }
}
```

### 2. Event Listeners

**Use case:** When you need simple, single-event handling

```php
class SimpleListener
{
    public function onUserLogin(UserLoginEvent $event): void
    {
        // Log user login
        $this->logger->info('User logged in', [
            'userId' => $event->getUser()->getId()
        ]);
    }
}
```

## Registration in Service Container

Register your event subscriber with the `kernel.event_subscriber` tag:

```yaml
# services.yaml
services:
  MyVendor\MyModule\EventSubscriber\MyEventSubscriber:
    tags: ['kernel.event_subscriber']
```

## Available Event Categories

### 🗃️ [Database Events](database-events/)
- Model creation, updates, and deletion
- Before/after database operations

### 🛒 [Shop General Events](shop-general-events/) 
- Request processing, basket changes, session handling
- Application lifecycle events

### 🎭 [View Events](view-events/)
- Template rendering, theme changes
- Frontend-related events

### 🔧 [Module Events](module-events/)
- Module activation/deactivation
- Configuration changes

### 🐳 [DI Container Events](di-container-events/)
- Service container modifications
- Configuration loading events

## Best Practices

### Event Subscriber Design
1. **Single Responsibility**: Each subscriber should handle related events
2. **Fail Gracefully**: Handle exceptions to avoid breaking the event chain
3. **Performance**: Keep event handlers lightweight
4. **Documentation**: Document which events your subscriber handles

### Performance Considerations
- **Avoid Heavy Operations**: Events fire during critical paths
- **Use Queues**: For time-consuming tasks, queue them for background processing
- **Early Returns**: Exit early when events don't apply to your use case

### Testing
```php
use PHPUnit\Framework\TestCase;

class MyEventSubscriberTest extends TestCase
{
    public function testHandlesOrderUpdateEvent(): void
    {
        $subscriber = new OrderSecuritySubscriber($this->mockCreditService);
        $event = new AfterModelUpdateEvent($mockOrder);
        
        $subscriber->onOrderSave($event);
        
        $this->assertEquals('pending_verification', $mockOrder->getOrderState());
    }
}
```

## Next Steps

- **[Event Examples](event-example)**: See practical implementation examples
- **[Complete Event List](list)**: Browse all available events
- **[Database Events](database-events/)**: Learn about model-related events

## Related Documentation

- **[Service Container](../service-container)**: Learn dependency injection for event subscribers
- **[Module Development](../../modules-components-themes/module/)**: How to add event subscribers to modules
- **[Symfony Event Dispatcher](https://symfony.com/doc/current/event_dispatcher.html)**: Upstream documentation