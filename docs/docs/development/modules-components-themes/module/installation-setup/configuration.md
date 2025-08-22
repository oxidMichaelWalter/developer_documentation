---
sidebar_position: 2
---

# Module Configuration

After successful module installation, configuration is the next critical step to make your module operational. This guide covers both admin interface configuration and advanced deployment-ready configuration methods.

:::tip YouTube Tutorial
Watch a short video tutorial: [Module Installation & Configuration](https://www.youtube.com/watch?v=WGeHtJCHmyA)
:::

## Overview

Module configuration involves:

1. **Basic Settings**: Configure essential module parameters
2. **Feature Toggles**: Enable/disable specific functionality 
3. **Integration Setup**: Connect with external services or APIs
4. **Environment-Specific Settings**: Different configs for dev/staging/production
5. **Validation**: Ensure configuration is correct and complete

## Configuration Methods

### Method 1: Admin Interface (Recommended for Manual Setup)

**Best for**: Initial setup, simple configurations, non-technical users

#### Access Module Configuration

1. **Navigate to Admin**: Login to OXID eShop admin panel
2. **Go to Extensions**: Extensions → Modules
3. **Select Module**: Find your module in the list
4. **Open Settings**: Click on module name or "Settings" tab

#### Configuration Interface

```
Extensions → Modules → [Module Name] → Settings

📂 Main Settings
├── ✅ Enable Module
├── 🔑 API Key: [input field]
├── 🌍 Environment: [dropdown: sandbox|live]
└── ⏱️ Timeout: [number field] seconds

📂 Advanced Settings  
├── 🔧 Debug Mode: [checkbox]
├── 📝 Log Level: [dropdown: error|warning|info|debug]
├── 🌐 Allowed Countries: [multi-select]
└── 💰 Currency Settings: [checkbox group]

📂 Integration Settings
├── 🔗 Webhook URL: [input field]
├── 🔐 Secret Key: [password field]
└── 📊 Analytics Enabled: [checkbox]
```

#### Example Configuration Process

```
1. Enable Module: ✅ Check "Enable Module"
2. API Configuration:
   - API Key: "sk_test_123456789abcdef"
   - Environment: "Sandbox"
   - Timeout: "30 seconds"
   
3. Feature Settings:
   - Debug Mode: ✅ (for development)
   - Log Level: "Info"
   - Analytics: ✅
   
4. Save Configuration: Click "Save"
5. Test Functionality: Verify module works
```

### Method 2: Programmatic Configuration

**Best for**: Deployment automation, complex setups, CI/CD pipelines

#### Using Module Settings Service

```php
use OxidEsales\Eshop\Core\Registry;
use OxidEsales\EshopCommunity\Internal\Container\ContainerFacade;
use OxidEsales\EshopCommunity\Internal\Framework\Module\Setting\SettingDaoInterface;

// Get module settings service
$container = ContainerFacade::getContainer();
$settingDao = $container->get(SettingDaoInterface::class);

// Configure module settings
$moduleId = 'myvendor-mymodule';
$shopId = 1;

// Basic settings
$settingDao->save($moduleId, 'enabled', true, $shopId);
$settingDao->save($moduleId, 'api_key', 'sk_live_123456789abcdef', $shopId);
$settingDao->save($moduleId, 'environment', 'live', $shopId);
$settingDao->save($moduleId, 'timeout', 30, $shopId);

// Advanced settings
$settingDao->save($moduleId, 'debug_mode', false, $shopId);
$settingDao->save($moduleId, 'log_level', 'warning', $shopId);
$settingDao->save($moduleId, 'allowed_countries', ['DE', 'AT', 'CH'], $shopId);
```

#### Configuration Script Example

```php
#!/usr/bin/env php
<?php
/**
 * Module Configuration Script
 * Usage: php configure-module.php --env=production
 */

require_once 'bootstrap.php';

$environment = $argv[1] ?? 'development';
$moduleId = 'myvendor-paymentmodule';
$shopId = 1;

$settings = [
    'development' => [
        'enabled' => true,
        'api_key' => 'sk_test_123456789abcdef',
        'environment' => 'sandbox',
        'debug_mode' => true,
        'log_level' => 'debug',
        'timeout' => 60,
    ],
    'production' => [
        'enabled' => true,
        'api_key' => getenv('PAYMENT_API_KEY'),
        'environment' => 'live',
        'debug_mode' => false,
        'log_level' => 'error',
        'timeout' => 30,
    ]
];

$config = $settings[$environment];
$settingDao = ContainerFacade::getContainer()->get(SettingDaoInterface::class);

foreach ($config as $key => $value) {
    $settingDao->save($moduleId, $key, $value, $shopId);
    echo "Set {$key} = {$value}\n";
}

echo "Module configured for {$environment} environment\n";
```

### Method 3: Configuration Files

**Best for**: Version control, environment management, team deployments

#### YAML Configuration

Create `config/modules/myvendor-mymodule.yaml`:

```yaml
# Module configuration for different environments
myvendor-mymodule:
  development:
    enabled: true
    api_key: "sk_test_123456789abcdef"
    environment: "sandbox"
    debug_mode: true
    log_level: "debug"
    timeout: 60
    allowed_countries: ["DE", "AT", "CH"]
    
  staging:
    enabled: true
    api_key: "${STAGING_API_KEY}"
    environment: "sandbox"
    debug_mode: false
    log_level: "info"
    timeout: 45
    allowed_countries: ["DE", "AT", "CH", "NL", "BE"]
    
  production:
    enabled: true
    api_key: "${PRODUCTION_API_KEY}"
    environment: "live"
    debug_mode: false
    log_level: "error"
    timeout: 30
    allowed_countries: ["DE", "AT", "CH", "NL", "BE", "FR", "IT"]
```

#### Environment Variable Configuration

```bash
# .env file for environment-specific settings
PAYMENT_MODULE_ENABLED=true
PAYMENT_API_KEY=sk_live_123456789abcdef
PAYMENT_ENVIRONMENT=live
PAYMENT_DEBUG_MODE=false
PAYMENT_LOG_LEVEL=error
PAYMENT_TIMEOUT=30
PAYMENT_ALLOWED_COUNTRIES=DE,AT,CH,NL,BE
```

## Configuration Categories

### 1. Basic Module Settings

#### Enable/Disable Module

```php
// Via admin interface: Enable Module checkbox
// Via code:
$settingDao->save($moduleId, 'enabled', true, $shopId);
```

#### Module Information Display

```php
// Display current configuration
$settings = Registry::getConfig()->getModuleSettings($moduleId);
foreach ($settings as $key => $value) {
    echo "{$key}: " . print_r($value, true) . "\n";
}
```

### 2. API Integration Settings

#### API Credentials

```php
// Secure API key storage
$settingDao->save($moduleId, 'api_key', $apiKey, $shopId);
$settingDao->save($moduleId, 'api_secret', $apiSecret, $shopId);

// Environment selection
$settingDao->save($moduleId, 'environment', 'live', $shopId); // sandbox|live
```

#### Connection Parameters

```php
// Timeout settings
$settingDao->save($moduleId, 'connection_timeout', 30, $shopId);
$settingDao->save($moduleId, 'read_timeout', 60, $shopId);

// Retry logic
$settingDao->save($moduleId, 'max_retries', 3, $shopId);
$settingDao->save($moduleId, 'retry_delay', 1000, $shopId); // milliseconds
```

### 3. Feature Configuration

#### Feature Toggles

```php
// Enable specific features
$settingDao->save($moduleId, 'enable_logging', true, $shopId);
$settingDao->save($moduleId, 'enable_analytics', false, $shopId);
$settingDao->save($moduleId, 'enable_webhooks', true, $shopId);
```

#### Operational Parameters

```php
// Business logic settings
$settingDao->save($moduleId, 'minimum_order_amount', 10.00, $shopId);
$settingDao->save($moduleId, 'maximum_order_amount', 5000.00, $shopId);
$settingDao->save($moduleId, 'supported_currencies', ['EUR', 'USD', 'GBP'], $shopId);
```

### 4. Debug and Logging

#### Debug Configuration

```php
// Debug mode settings
$settingDao->save($moduleId, 'debug_mode', true, $shopId);
$settingDao->save($moduleId, 'debug_log_requests', true, $shopId);
$settingDao->save($moduleId, 'debug_log_responses', true, $shopId);
```

#### Log Level Management

```php
// Logging configuration
$settingDao->save($moduleId, 'log_level', 'info', $shopId);
$settingDao->save($moduleId, 'log_to_file', true, $shopId);
$settingDao->save($moduleId, 'log_file_path', 'logs/mymodule.log', $shopId);
```

## Multi-Shop Configuration

### Enterprise Edition: Per-Shop Settings

```php
// Configure different settings per shop
$shops = [1, 2, 3]; // Shop IDs

foreach ($shops as $shopId) {
    $config = getShopSpecificConfig($shopId);
    
    foreach ($config as $key => $value) {
        $settingDao->save($moduleId, $key, $value, $shopId);
    }
}

function getShopSpecificConfig($shopId) {
    $configs = [
        1 => [ // Main shop - Germany
            'api_key' => 'sk_live_de_123456',
            'currency' => 'EUR',
            'language' => 'de',
            'allowed_countries' => ['DE', 'AT']
        ],
        2 => [ // UK shop
            'api_key' => 'sk_live_uk_789012',
            'currency' => 'GBP', 
            'language' => 'en',
            'allowed_countries' => ['GB', 'IE']
        ],
        3 => [ // US shop
            'api_key' => 'sk_live_us_345678',
            'currency' => 'USD',
            'language' => 'en',
            'allowed_countries' => ['US', 'CA']
        ]
    ];
    
    return $configs[$shopId];
}
```

### Shop-Specific Configuration Console

```bash
# Configure specific shop
./vendor/bin/oe-console oe:module:configure myvendor-mymodule --shop-id=2

# Configure all shops
for shop_id in 1 2 3; do
    ./vendor/bin/oe-console oe:module:configure myvendor-mymodule \
        --shop-id=$shop_id \
        --config=/path/to/shop-${shop_id}-config.json
done
```

## Configuration Validation

### Settings Validation

```php
class ModuleConfigValidator
{
    public function validate(array $settings): array
    {
        $errors = [];
        
        // Validate API key format
        if (empty($settings['api_key']) || !preg_match('/^sk_[a-z]+_[a-zA-Z0-9]+$/', $settings['api_key'])) {
            $errors[] = 'Invalid API key format';
        }
        
        // Validate timeout range
        if ($settings['timeout'] < 5 || $settings['timeout'] > 300) {
            $errors[] = 'Timeout must be between 5 and 300 seconds';
        }
        
        // Validate environment
        if (!in_array($settings['environment'], ['sandbox', 'live'])) {
            $errors[] = 'Environment must be either sandbox or live';
        }
        
        // Validate currency codes
        $validCurrencies = ['EUR', 'USD', 'GBP', 'CHF'];
        foreach ($settings['supported_currencies'] as $currency) {
            if (!in_array($currency, $validCurrencies)) {
                $errors[] = "Invalid currency code: {$currency}";
            }
        }
        
        return $errors;
    }
}

// Usage
$validator = new ModuleConfigValidator();
$errors = $validator->validate($moduleSettings);

if (!empty($errors)) {
    foreach ($errors as $error) {
        echo "Configuration Error: {$error}\n";
    }
    exit(1);
}
```

### Configuration Testing

```php
class ModuleConfigTester
{
    public function testConfiguration(string $moduleId): bool
    {
        $settings = Registry::getConfig()->getModuleSettings($moduleId);
        
        // Test API connectivity
        if (!$this->testApiConnection($settings['api_key'], $settings['environment'])) {
            return false;
        }
        
        // Test required features
        if ($settings['enabled'] && !$this->testModuleFeatures()) {
            return false;
        }
        
        return true;
    }
    
    private function testApiConnection(string $apiKey, string $environment): bool
    {
        $endpoint = $environment === 'live' 
            ? 'https://api.provider.com/test'
            : 'https://sandbox-api.provider.com/test';
            
        $response = $this->makeApiCall($endpoint, $apiKey);
        return $response['status'] === 'success';
    }
    
    private function testModuleFeatures(): bool
    {
        // Test module-specific functionality
        return true;
    }
}
```

## Configuration Best Practices

### 1. Security

```php
// ✅ Good: Use environment variables for sensitive data
$apiKey = getenv('PAYMENT_API_KEY');

// ❌ Bad: Hardcode sensitive information
$apiKey = 'sk_live_123456789abcdef';

// ✅ Good: Validate and sanitize input
$timeout = max(5, min(300, (int)$userInput));

// ❌ Bad: Use input directly
$timeout = $userInput;
```

### 2. Environment Management

```php
// ✅ Good: Environment-specific configuration
$config = [
    'development' => ['debug' => true, 'log_level' => 'debug'],
    'production' => ['debug' => false, 'log_level' => 'error']
];

// ❌ Bad: Same config for all environments
$config = ['debug' => true, 'log_level' => 'debug'];
```

### 3. Documentation

```php
/**
 * Module Configuration Settings
 * 
 * @param string $api_key API key from payment provider (required)
 * @param string $environment 'sandbox'|'live' (default: 'sandbox')
 * @param int $timeout Connection timeout in seconds (5-300, default: 30)
 * @param bool $debug_mode Enable debug logging (default: false)
 * @param array $allowed_countries ISO country codes (default: ['DE'])
 */
```

## Deployment Configuration

### CI/CD Configuration

```yaml
# .github/workflows/configure-module.yml
name: Configure Module
on:
  deployment:
    
jobs:
  configure:
    runs-on: ubuntu-latest
    steps:
      - name: Configure Module
        env:
          API_KEY: ${{ secrets.PAYMENT_API_KEY }}
          ENVIRONMENT: ${{ github.event.deployment.environment }}
        run: |
          php configure-module.php \
            --api-key="$API_KEY" \
            --environment="$ENVIRONMENT" \
            --shop-id=1
```

### Docker Configuration

```bash
# Environment-specific Docker configuration
docker run -e PAYMENT_API_KEY=sk_live_123 \
           -e PAYMENT_ENVIRONMENT=live \
           -e PAYMENT_DEBUG_MODE=false \
           myshop:latest
```

## Troubleshooting Configuration

### Common Issues

1. **Settings Not Saved**
   ```bash
   # Check file permissions
   ls -la var/configuration/
   
   # Clear cache
   rm -rf source/tmp/*
   ```

2. **Invalid Configuration Values**
   ```php
   // Check current settings
   $settings = Registry::getConfig()->getModuleSettings('mymodule');
   var_dump($settings);
   ```

3. **Multi-Shop Configuration Issues**
   ```bash
   # Verify shop-specific settings
   ./vendor/bin/oe-console oe:module:show mymodule --shop-id=2
   ```

## Next Steps

After successful configuration:

1. **[Module Setup](setup)**: Complete final setup steps
2. **[Module Activation](../../../system-architecture/module-installation-activation)**: Activate the module
3. **[Troubleshooting](troubleshooting)**: Resolve any configuration issues
4. **[Advanced Project Configuration](../../project/module-configuration/)**: Enterprise configuration management