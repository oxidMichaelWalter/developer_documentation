# Database Migration

Modules can have their own migrations. To get comprehensive information about migrations in OXID eShop, check the database migrations documentation under [Migrations](../../../tell-me-about/migrations).

## Configuration

Put the migration configuration file into the `migration` folder inside the module's root directory:

```bash
├── migration
     └── migrations.yml
```

### Example of `migrations.yml`:

```yaml
table_storage:
  table_name: oxmigrations_ddoewysiwyg
migrations_paths:
  'OxidEsales\WysiwygModule\Migrations': data
```

:::tip
To prevent database table name conflicts, include your module's ID in `table_name`.
:::

## Migration Classes

Most recent information on requirements and structure of Migration Classes can be found in [Doctrine Migrations documentation](https://www.doctrine-project.org/projects/doctrine-migrations/en/current/reference/migration-classes.html).

Module migrations can also be generated and executed via [OXID eShop Doctrine Migration Wrapper](https://github.com/OXID-eSales/oxideshop-doctrine-migration-wrapper).

:::warning SQL Transactions
When planning your Migration's structure, remember that certain [SQL statements](https://mariadb.com/kb/en/sql-statements-that-cause-an-implicit-commit) will issue [Implicit commits](https://www.doctrine-project.org/projects/doctrine-migrations/en/current/explanation/implicit-commits.html) which will affect the transaction functionality and may have unexpected side-effects.
:::

## Usage

To generate migration versions for a specific module, we must use module_id for `<Suite_Type>` parameter. Then all the module migration versions will be generated based on the configuration from migrations.yml file in migration folder of the given module.

### Example:

```bash
vendor/bin/oe-eshop-db_migrate migrations:generate ddoewysiwyg
```

In this case it will be generated only for WYSIWYG module.

## Directory Structure

A complete module with database migrations should have this structure:

```bash
my_module/
├── migration/
│   ├── migrations.yml
│   └── data/
│       └── Version20240101120000.php
├── metadata.php
├── composer.json
└── src/
    └── ...
```

## Migration Commands

### Generate Migrations

```bash
# Generate a new migration for a specific module
vendor/bin/oe-eshop-db_migrate migrations:generate <module_id>

# Example for wysiwyg module
vendor/bin/oe-eshop-db_migrate migrations:generate ddoewysiwyg
```

### Execute Migrations

```bash
# Execute all pending migrations for a module
vendor/bin/oe-eshop-db_migrate migrations:migrate <module_id>

# Execute migrations up to a specific version
vendor/bin/oe-eshop-db_migrate migrations:migrate <module_id> --to=Version20240101120000
```

### Migration Status

```bash
# Check migration status for a module
vendor/bin/oe-eshop-db_migrate migrations:status <module_id>

# List all available migrations for a module
vendor/bin/oe-eshop-db_migrate migrations:list <module_id>
```

## Best Practices

### Migration Configuration

1. **Use unique table names** - Include your module ID in migration table names
2. **Organize migrations** - Keep migration files in a dedicated directory
3. **Version control** - Always commit migration files to version control

### Migration Classes

1. **Idempotent operations** - Ensure migrations can be run multiple times safely
2. **Rollback support** - Implement proper `down()` methods for reverting changes
3. **Data preservation** - Be careful when modifying existing data
4. **Test thoroughly** - Always test migrations in a staging environment

### Example Migration Class

```php
<?php

namespace OxidEsales\MyModule\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240101120000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create custom module table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql(
            'CREATE TABLE my_module_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )'
        );
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE IF EXISTS my_module_data');
    }
}
```

## Troubleshooting

### Common Issues

**Migration table conflicts:**
- Use unique table names with module ID prefix
- Check for existing table names in the database

**Migration execution failures:**
- Check database permissions
- Review SQL syntax and constraints
- Test in staging environment first

**Rollback issues:**
- Ensure `down()` methods are properly implemented
- Test rollback procedures before deploying

### Migration Debugging

```bash
# Dry run to see what SQL will be executed
vendor/bin/oe-eshop-db_migrate migrations:migrate <module_id> --dry-run

# Execute with verbose output
vendor/bin/oe-eshop-db_migrate migrations:migrate <module_id> -v
```