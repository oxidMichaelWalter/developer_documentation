# Configuration Parameters

:::note
The container cache must be rebuilt after changing the value of a parameter.

Use the following command to easily and safely clear the cache:

```bash
./vendor/bin/oe-console oe:cache:clear
```
:::

## E-mail Configuration

### Disabling Order Notification E-mails

By default, when a new order is received, the system sends an e-mail to the customer and the shop owner.

If required, deactivate the sending of these e-mail notifications.

Disabling e-mail notifications can be useful, for example, if your ERP is responsible for sending out order confirmations. In this case, a log entry is created.

#### Procedure

To disable order e-mail notifications, in the `source/Internal/Utility/Email/services.yaml` file, set the `oxid_esales.email.disable_order_emails` to `true`.

```yaml title="var/configuration/configurable_services.yaml"
parameters:
  oxid_esales.email.disable_order_emails: true
```

#### Result

If order notification e-mails are disabled, in `source/log/oxideshop.log` the following notice messages are logged to the system for informational purposes:

* "Order email not sent to user due to disabled configuration option."
* "Order email not sent to owner due to disabled configuration option."

:::note
The default log level is *error*.

To have the notice messages logged, in the `config.inc.php` file, set the log level parameter `$this->sLogLevel` to `notice`.
:::

## Common Configuration Parameters

### Service Container Parameters

Configuration parameters are stored in the service container and can be defined in YAML configuration files:

```yaml
parameters:
  shop.parameter_name: 'value'
  another.parameter: 123
```

### Accessing Parameters in Services

Parameters can be injected into services through the service configuration:

```yaml
services:
  App\Service\MyService:
    arguments:
      $configValue: '%shop.parameter_name%'
```

### Environment-Specific Parameters

Use environment variables to define parameters that change between environments:

```yaml
parameters:
  database_url: '%env(DATABASE_URL)%'
  api_key: '%env(API_KEY)%'
```

## Best Practices

1. **Always clear cache** after changing parameters
2. **Use environment variables** for sensitive data
3. **Document custom parameters** in your project
4. **Use semantic parameter names** that describe their purpose
5. **Group related parameters** with common prefixes