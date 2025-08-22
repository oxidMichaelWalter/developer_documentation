# ApplicationExitEvent

**Namespace:**

```php
OxidEsales\EshopCommunity\Internal\Transition\ShopEvents\ApplicationExitEvent
```

This event will be dispatched when the shop is preparing for emergency exit.

:::info Note
Modules should only register headers in:

```php
\OxidEsales\Eshop\Core\Registry::get(\OxidEsales\Eshop\Core\Header::class);
```

but leave actual sending of headers to shop.
:::

**Usage example:** reverse proxy (varnish) can use this event to ensure all headers and cookies needed by the module
are in place for the next request.