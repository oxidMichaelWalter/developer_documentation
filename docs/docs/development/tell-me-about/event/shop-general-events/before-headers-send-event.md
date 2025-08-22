# BeforeHeadersSendEvent

**Namespace:**

```php
OxidEsales\EshopCommunity\Internal\Transition\ShopEvents\BeforeHeadersSendEvent
```

This event will be dispatched before the shop sends the headers.

:::info Note
Modules should only register headers in:

```php
\OxidEsales\Eshop\Core\Registry::get(\OxidEsales\Eshop\Core\Header::class);
```

but leave actual sending of headers to shop.
:::

**Usage example:** reverse proxy (varnish) uses this event to set its cookies and decide if
reverse proxy functionality should be used for this response or not.