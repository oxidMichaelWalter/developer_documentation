# Environment Variables

OXID eShop supports loading environment variables via a `.env` file.

This feature simplifies the management of sensitive configuration values and environment-specific settings.

## Feature Overview

Define environment variables in a `.env` file located in the root directory of your project.

These variables can then be accessed using:

* The `getenv()` PHP function
* Injection into container parameters

## Using Environment Variables

### 1. Create a `.env` file

Create a `.env` file in the root directory of your project. Define your environment variables in the following format:

```ini
# .env
OXID_ENV=production
AI_EMBEDDINGS_DATABASE=mysql://user:password@127.0.0.1:3306/db_name
API_KEY=your_api_key_here
```

### 2. Access the loaded environment variables

You can access environment variables in two ways:

#### Use `getenv()` in your PHP code:

```php
<?php

$environment = getenv('OXID_ENV');
echo "Current environment: $environment";
```

#### Define environment variables in `services.yaml`:

Define the environment variables in your `services.yaml` configuration file to be used in services:

```yaml
parameters:
    app.env: '%env(OXID_ENV)%'
    embeddings.db: '%env(AI_EMBEDDINGS_DATABASE)%'
    api.key: '%env(API_KEY)%'

services:
    App\Service\SomeService:
        arguments:
            $env: '%app.env%'
            $dbUrl: '%embeddings.db%'
```

## Implementing Best Practices

* **Security**: To prevent sensitive data from being pushed to version control, do not commit the `.env` file. Instead, add it to your `.gitignore` file.
* **Documentation**: To help other developers set up their local environment, provide a `.env.dist` file with default values.

## Example `.env.dist` File

```ini
# .env.dist - Example environment configuration
# Copy this file to .env and update with your values

# Environment mode
OXID_ENV=development

# Database configuration
DB_HOST=localhost
DB_NAME=oxid_db
DB_USER=root
DB_PASSWORD=

# API Keys (obtain from respective services)
API_KEY=your_api_key_here
SECRET_KEY=your_secret_here

# Debug settings
DEBUG_MODE=true
LOG_LEVEL=debug
```

## Common Use Cases

### Database Configuration
```ini
DATABASE_URL=mysql://user:pass@localhost:3306/oxid_shop
```

### API Integration
```ini
PAYMENT_API_KEY=sk_live_xxxxx
PAYMENT_API_SECRET=xxxxx
```

### Feature Flags
```ini
FEATURE_NEW_CHECKOUT=true
FEATURE_AI_RECOMMENDATIONS=false
```

### Development vs Production
```ini
# Development
OXID_ENV=development
DEBUG=true
CACHE_ENABLED=false

# Production  
OXID_ENV=production
DEBUG=false
CACHE_ENABLED=true
```