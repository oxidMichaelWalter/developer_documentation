---
sidebar_position: 4
---

# Database Migrations

OXID eShop uses **Doctrine Migrations** to handle database schema changes safely and consistently across different environments. This ensures that database updates can be applied reliably during shop upgrades and development.

## Overview

Database migrations in OXID eShop are used for:

- **eShop edition upgrades** (Community → Professional → Enterprise)
- **Project-specific migrations** for custom database changes
- **Module migrations** for module-specific schema modifications
- **Development workflow** to synchronize database changes across teams

## Infrastructure

### Core Components

OXID eShop's migration system consists of:

1. **[Doctrine Migrations](https://www.doctrine-project.org/projects/migrations.html)** - The underlying migration framework
2. **[OXID eShop Doctrine Migration Wrapper](https://github.com/OXID-eSales/oxideshop-doctrine-migration-wrapper)** - Multi-namespace migration orchestration
3. **[OXID eShop Facts](https://github.com/OXID-eSales/oxideshop-facts)** - Shop environment detection

### Migration Wrapper Purpose

The Doctrine Migration Wrapper was created because Doctrine Migrations (prior to v3.0) couldn't:
- Collect migrations from multiple folders/namespaces
- Specify dependencies between migration suites
- Handle complex multi-edition environments

The wrapper gathers essential information:
- **Active OXID eShop edition** (CE/PE/EE)
- **Database credentials** from configuration
- **Module installation status**

## Using Migrations

### Running Migrations

The migration script is installed in Composer's `bin` directory:

```bash
vendor/bin/oe-eshop-db_migrate <Doctrine_Command> [Suite_Type]
```

### Common Migration Commands

#### Execute All Pending Migrations

```bash
# Run all migrations for current environment
vendor/bin/oe-eshop-db_migrate migrations:migrate
```

This command executes migrations in the correct order:
1. **Community Edition** migrations (always)
2. **Professional Edition** migrations (when PE/EE is installed)
3. **Enterprise Edition** migrations (when EE is installed)
4. **Project-specific** migrations (always)
5. **Module migrations** (when modules with migrations are active)

#### Check Migration Status

```bash
# View current migration status
vendor/bin/oe-eshop-db_migrate migrations:status

# Show detailed migration information
vendor/bin/oe-eshop-db_migrate migrations:list
```

#### Generate New Migrations

```bash
# Generate migration for all suites
vendor/bin/oe-eshop-db_migrate migrations:generate

# Generate migration for specific suite
vendor/bin/oe-eshop-db_migrate migrations:generate PR
vendor/bin/oe-eshop-db_migrate migrations:generate mymodule
```

## Suite Types

### Project Development (PR)

**Use case**: Custom project-specific database changes

```bash
# Generate project migration
vendor/bin/oe-eshop-db_migrate migrations:generate PR

# Location: source/migration/project_data/
```

**Example Project Migration:**

```php
<?php declare(strict_types=1);

namespace OxidEsales\EshopCommunity\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20241122000001 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql("
            CREATE TABLE custom_analytics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(32) NOT NULL,
                event_type VARCHAR(50) NOT NULL,
                event_data JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_user_event (user_id, event_type)
            ) ENGINE=InnoDB
        ");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("DROP TABLE IF EXISTS custom_analytics");
    }
}
```

### Module Development

**Use case**: Module-specific database schema changes

```bash
# Generate module migration
vendor/bin/oe-eshop-db_migrate migrations:generate myvendor-mymodule

# Location: modules/myvendor/mymodule/migration/
```

**Example Module Migration:**

```php
<?php declare(strict_types=1);

namespace MyVendor\MyModule\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20241122000001 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // Add module-specific tables
        $this->addSql("
            CREATE TABLE mymodule_settings (
                setting_key VARCHAR(255) PRIMARY KEY,
                setting_value TEXT,
                module_id VARCHAR(100) NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB
        ");
        
        // Add foreign key constraints
        $this->addSql("
            ALTER TABLE oxuser 
            ADD COLUMN mymodule_preferences JSON DEFAULT NULL
        ");
    }

    public function down(Schema $schema): void
    {
        $this->addSql("ALTER TABLE oxuser DROP COLUMN mymodule_preferences");
        $this->addSql("DROP TABLE IF EXISTS mymodule_settings");
    }
}
```

### Edition Migrations (CE/PE/EE)

:::caution Product Development Only
**CE**, **PE**, and **EE** suite types are **for OXID eShop product development only**. Do not use these for project or module development.
:::

## Advanced Usage

### Direct Doctrine Migration Calls

For specific scenarios, bypass the wrapper and call Doctrine Migrations directly:

```bash
# Execute specific migration
vendor/bin/doctrine-migrations execute \
    --up \
    'OxidEsales\EshopCommunity\Migrations\Version1234567890' \
    --db-configuration 'vendor/oxid-esales/oxideshop-doctrine-migration-wrapper/src/migrations-db.php' \
    --configuration source/migration/migrations.yml

# Rollback to specific version
vendor/bin/doctrine-migrations migrate \
    'OxidEsales\EshopCommunity\Migrations\Version1234567890' \
    --configuration source/migration/migrations.yml
```

### Programmatic Migration Usage

Use the Migration Wrapper in PHP code:

```php
use OxidEsales\DoctrineMigrationWrapper\MigrationsBuilder;

// Create migrations object
$migrationsBuilder = new MigrationsBuilder();
$migrations = $migrationsBuilder->build();

// Execute migrations programmatically
$migrations->execute('migrations:migrate', 'PR');

// Execute with specific parameters
$migrations->execute('migrations:status', null, ['--show-versions' => true]);
```

## Best Practices

### 1. Migration Design

```php
final class Version20241122000001 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add customer loyalty points tracking table';
    }
    
    public function up(Schema $schema): void
    {
        // Check if table exists before creating
        if (!$schema->hasTable('loyalty_points')) {
            $this->addSql("CREATE TABLE loyalty_points ...");
        }
        
        // Use platform-agnostic SQL when possible
        $platform = $this->connection->getDatabasePlatform();
        if ($platform->getName() === 'mysql') {
            $this->addSql("ALTER TABLE ...");
        }
    }
    
    public function down(Schema $schema): void
    {
        // Always provide rollback
        $this->addSql("DROP TABLE IF EXISTS loyalty_points");
    }
}
```

### 2. Safe Migration Patterns

```php
public function up(Schema $schema): void
{
    // 1. Add columns as nullable first
    $this->addSql("ALTER TABLE oxuser ADD COLUMN new_field VARCHAR(255) NULL");
    
    // 2. Populate data
    $this->addSql("UPDATE oxuser SET new_field = 'default_value' WHERE new_field IS NULL");
    
    // 3. Make NOT NULL if needed (in separate migration)
    // $this->addSql("ALTER TABLE oxuser MODIFY new_field VARCHAR(255) NOT NULL");
}
```

### 3. Data Migrations

```php
public function up(Schema $schema): void
{
    // Schema changes first
    $this->addSql("ALTER TABLE ...");
    
    // Then data transformations
    $this->addSql("
        UPDATE oxarticles 
        SET oxprice = oxprice * 1.19 
        WHERE oxshopid = 1 AND oxprice > 0
    ");
}
```

### 4. Module Migration Integration

In your module's `metadata.php`:

```php
$aModule = [
    'id' => 'myvendor-mymodule',
    // ... other metadata
    'events' => [
        'onActivate' => 'MyVendor\\MyModule\\Module\\Events::onActivate',
    ],
];
```

Module activation event:

```php
namespace MyVendor\MyModule\Module;

class Events
{
    public static function onActivate(): void
    {
        // Run module migrations on activation
        exec('vendor/bin/oe-eshop-db_migrate migrations:migrate myvendor-mymodule');
    }
}
```

### 5. Testing Migrations

```php
use PHPUnit\Framework\TestCase;
use Doctrine\DBAL\Connection;

class MigrationTest extends TestCase
{
    private Connection $connection;
    
    public function testMigrationAddsTable(): void
    {
        // Run migration
        exec('vendor/bin/oe-eshop-db_migrate migrations:migrate PR');
        
        // Verify table exists
        $schemaManager = $this->connection->getSchemaManager();
        $this->assertTrue($schemaManager->tablesExist(['custom_analytics']));
        
        // Verify table structure
        $table = $schemaManager->listTableDetails('custom_analytics');
        $this->assertTrue($table->hasColumn('user_id'));
        $this->assertTrue($table->hasIndex('idx_user_event'));
    }
}
```

## Troubleshooting

### Common Issues

1. **Migration Fails**
   ```bash
   # Check current status
   vendor/bin/oe-eshop-db_migrate migrations:status
   
   # Mark migration as executed (if manually fixed)
   vendor/bin/oe-eshop-db_migrate migrations:version <version> --add
   ```

2. **Module Migration Not Found**
   - Ensure module is activated
   - Check migration file location
   - Verify module ID matches exactly

3. **Database Connection Issues**
   - Verify `config.inc.php` settings
   - Check database permissions
   - Ensure database exists

### Recovery Commands

```bash
# Mark specific migration as executed
vendor/bin/oe-eshop-db_migrate migrations:version Version20241122000001 --add

# Mark migration as not executed  
vendor/bin/oe-eshop-db_migrate migrations:version Version20241122000001 --delete

# Execute specific migration manually
vendor/bin/doctrine-migrations execute --up Version20241122000001
```

## Related Topics

- **[Module Development](../../modules-components-themes/module/)**: Creating modules with migrations
- **[Console Commands](console)**: Custom migration commands
- **[Service Container](service-container)**: Migration service integration
- **[Doctrine Migrations Documentation](https://www.doctrine-project.org/projects/doctrine-migrations/en/current/index.html)**: Complete reference