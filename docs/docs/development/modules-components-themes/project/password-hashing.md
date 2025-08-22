# Configure Password Hashing

## How does OXID eShop hash passwords?

By default, OXID eShop hashes passwords with the bcrypt algorithm. On a users login, OXID eShop converts all password hashes with the current algorithm and options.

:::note
The password salt is included by default in the database table `oxuser` in the column `OXPASSWORD`. It is not stored separately in the column `OXPASSSALT` any more.
:::

## Why should I configure password hashing?

Security is only a relative term. You should make sure that your system is as secure as possible. For password hashing, security is dependent e.g. on the performance of your server hardware and the PHP version. See the section below for details.

## How can I configure password hashing?

In this section we describe how to choose an already implemented password hashing algorithms and configure it.

Currently there are two different algorithms for hashing passwords available in the OXID eShop:

* **Bcrypt** (Supported from PHP 7.0 on)
* **Argon2I** (Support from PHP 7.2 on)

Choose the best hash algorithm supported by your PHP version. 

### Bcrypt Configuration

Bcrypt has the configuration option `oxid_esales.authentication.service.password_hash.bcrypt.cost`. The minimum cost is 4, maximum cost 31.

### Argon2I Configuration

Argon2I has the configuration options:
- `oxid_esales.authentication.service.password_hash.argon2.memory_cost`
- `oxid_esales.authentication.service.password_hash.argon2.time_cost`
- `oxid_esales.authentication.service.password_hash.argon2.threads`

The options are directly coupled to the options of the PHP method `password_hash`. See the [PHP documentation for details on the options](https://www.php.net/manual/en/function.password-hash.php).

Configure the options to require as much computing time as possible but not so much as to annoy a user when logging in.

### Example: Configure Argon2I

An example how to change the algorithm to Argon2I and configure its options:

```yaml title="var/configuration/configurable_services.yaml"
parameters:
  oxid_esales.authentication.service.password_hash.argon2.memory_cost: 1024
  oxid_esales.authentication.service.password_hash.argon2.time_cost: 2
  oxid_esales.authentication.service.password_hash.argon2.threads: 2

services:
  OxidEsales\EshopCommunity\Internal\Utility\Hash\Service\PasswordHashServiceInterface:
    class: OxidEsales\EshopCommunity\Internal\Utility\Hash\Service\Argon2IPasswordHashService
    arguments:
      - '@OxidEsales\EshopCommunity\Internal\Utility\Authentication\Policy\PasswordPolicyInterface'
      - '%oxid_esales.authentication.service.password_hash.argon2.memory_cost%'
      - '%oxid_esales.authentication.service.password_hash.argon2.time_cost%'
      - '%oxid_esales.authentication.service.password_hash.argon2.threads%'
```

After changing the configuration, you have to delete the container cache.

## How can I hash passwords by my own implementation?

If you want to implement password hashing by your own, you have to implement the interfaces:

- `OxidEsales\EshopCommunity\Internal\Utility\Hash\Service\PasswordHashServiceInterface`
- `OxidEsales\EshopCommunity\Internal\Domain\Authentication\Service\PasswordVerificationServiceInterface`

Then use the guide on replacing OXID eShop services to override the OXID eShop default services.

## Best Practices

1. **Use the strongest algorithm** available for your PHP version
2. **Tune the cost parameters** to balance security and performance
3. **Regularly review** and update your password hashing configuration
4. **Test performance impact** before deploying to production
5. **Monitor login times** after configuration changes

## Security Recommendations

### Cost Factor Guidelines

For Bcrypt:
- Minimum recommended cost: 10
- Production recommended: 12-14
- High security: 15+

For Argon2I:
- Memory cost: At least 1024 KB
- Time cost: At least 2 iterations  
- Threads: Match your server CPU cores

### Performance Testing

Test your configuration with this approach:

1. Measure average login time with current settings
2. Increase cost parameters incrementally
3. Aim for 0.5-1 second hashing time
4. Balance security vs user experience