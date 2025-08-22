---
sidebar_position: 3
---

# Console Commands

OXID eShop uses the **Symfony Console Component** to provide a powerful CLI interface for administrative tasks, automation, and custom commands. You can both use existing commands and create your own.

:::tip YouTube Tutorial
Watch a short video tutorial: [Custom Console Commands](https://www.youtube.com/watch?v=7CvBUpR44YM)
:::

## Executing CLI Commands

### List Available Commands

```bash
# Show all available commands
./vendor/bin/oe-console

# Show commands for specific shop (Enterprise Edition)
./vendor/bin/oe-console --shop-id=2
```

:::note Shop ID
If `--shop-id` is not specified, shop 1 will be used by default.
:::

### Common Command Examples

```bash
# Module management
./vendor/bin/oe-console oe:module:activate myvendor-mymodule
./vendor/bin/oe-console oe:module:deactivate myvendor-mymodule --shop-id=2

# Cache management
./vendor/bin/oe-console oe:cache:clear

# Database operations
./vendor/bin/oe-console oe:database:reset --force

# Theme management  
./vendor/bin/oe-console oe:theme:activate mytheme
```

## Creating Custom CLI Commands

You can create custom commands for both **modules** and **components**:

### Module Commands

Commands in modules only appear when the module is **active**.

#### 1. Create Command Class

```php
<?php declare(strict_types=1);

namespace MyVendor\MyModule\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ProcessOrdersCommand extends Command
{
    protected function configure(): void
    {
        $this->setName('mymodule:process-orders')
            ->setDescription('Process pending orders')
            ->setHelp('This command processes all pending orders in the system')
            ->addArgument('status', InputArgument::OPTIONAL, 'Order status to process', 'pending')
            ->addOption('dry-run', null, InputOption::VALUE_NONE, 'Run without making changes')
            ->addOption('limit', 'l', InputOption::VALUE_REQUIRED, 'Limit number of orders', 100);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        $status = $input->getArgument('status');
        $dryRun = $input->getOption('dry-run');
        $limit = (int) $input->getOption('limit');
        
        $io->title('Order Processing Command');
        
        if ($dryRun) {
            $io->warning('DRY RUN MODE - No changes will be made');
        }
        
        // Your business logic here
        $processedCount = $this->processOrders($status, $limit, $dryRun);
        
        $io->success(sprintf('Processed %d orders with status: %s', $processedCount, $status));
        
        return Command::SUCCESS;
    }
    
    private function processOrders(string $status, int $limit, bool $dryRun): int
    {
        // Implementation...
        return 42; // Example count
    }
}
```

#### 2. Register Command as Service

Create or update `services.yaml` in your module root:

```yaml
services:
  MyVendor\MyModule\Command\ProcessOrdersCommand:
    tags:
      - { name: 'console.command' }
```

:::important Class Name Format
Do **not** add a leading backslash to the class name:
- ❌ Wrong: `class: \MyVendor\MyModule\Command\ProcessOrdersCommand`
- ✅ Correct: `class: MyVendor\MyModule\Command\ProcessOrdersCommand`
:::

#### 3. Execute Command

After module activation:

```bash
./vendor/bin/oe-console mymodule:process-orders pending --limit=50 --dry-run
```

### Advanced Module Command

With dependency injection and service container integration:

```php
<?php declare(strict_types=1);

namespace MyVendor\MyModule\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Psr\Log\LoggerInterface;
use MyVendor\MyModule\Service\OrderProcessingService;

class AdvancedOrderCommand extends Command
{
    public function __construct(
        private OrderProcessingService $orderService,
        private LoggerInterface $logger
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this->setName('mymodule:advanced-processing')
            ->setDescription('Advanced order processing with services');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        try {
            $result = $this->orderService->processAdvanced();
            
            $this->logger->info('Command executed successfully', [
                'command' => $this->getName(),
                'result' => $result
            ]);
            
            $io->success('Advanced processing completed');
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            $this->logger->error('Command failed', [
                'command' => $this->getName(),
                'error' => $e->getMessage()
            ]);
            
            $io->error('Processing failed: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
```

**Service Registration with Dependencies:**

```yaml
services:
  MyVendor\MyModule\Command\AdvancedOrderCommand:
    arguments:
      - '@MyVendor\MyModule\Service\OrderProcessingService'
      - '@Psr\Log\LoggerInterface'
    tags:
      - { name: 'console.command' }
      
  MyVendor\MyModule\Service\OrderProcessingService:
    # Service definition...
```

### Custom Command Name

Override the command name in service definition:

```yaml
services:
  MyVendor\MyModule\Command\ProcessOrdersCommand:
    tags:
      - { name: 'console.command', command: 'orders:process-pending' }
```

## Component Commands

Component commands become **active immediately** after Composer installation (no activation required).

### Component Command Example

```php
<?php declare(strict_types=1);

namespace MyVendor\MyComponent\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class MaintenanceCommand extends Command
{
    protected function configure(): void
    {
        $this->setName('maintenance:cleanup')
            ->setDescription('Perform system maintenance tasks')
            ->setHelp('This command performs various maintenance operations');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);
        
        $io->title('System Maintenance');
        
        // Maintenance tasks
        $tasks = [
            'Clearing temporary files',
            'Optimizing database',
            'Updating search index',
            'Generating thumbnails'
        ];
        
        $io->progressStart(count($tasks));
        
        foreach ($tasks as $task) {
            $io->text("Executing: $task");
            // Simulate work
            sleep(1);
            $io->progressAdvance();
        }
        
        $io->progressFinish();
        $io->success('Maintenance completed successfully!');
        
        return Command::SUCCESS;
    }
}
```

**Component Service Registration:**

```yaml
# services.yaml in component root
services:
  MyVendor\MyComponent\Command\MaintenanceCommand:
    tags:
      - { name: 'console.command' }
```

## Command Testing

Use Symfony's **CommandTester** for integration testing:

### Test Setup

```php
<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use MyVendor\MyModule\Command\ProcessOrdersCommand;

class ProcessOrdersCommandTest extends TestCase
{
    private CommandTester $commandTester;
    
    protected function setUp(): void
    {
        $application = new Application();
        $command = new ProcessOrdersCommand();
        $application->add($command);
        
        $this->commandTester = new CommandTester($command);
    }
    
    public function testCommandExecution(): void
    {
        // Execute command
        $this->commandTester->execute([
            'status' => 'pending',
            '--limit' => '10',
            '--dry-run' => true
        ]);
        
        // Assert exit code
        $this->assertEquals(Command::SUCCESS, $this->commandTester->getStatusCode());
        
        // Assert output
        $output = $this->commandTester->getDisplay();
        $this->assertStringContainsString('DRY RUN MODE', $output);
        $this->assertStringContainsString('Processed', $output);
    }
    
    public function testCommandWithInvalidArgument(): void
    {
        $this->commandTester->execute([
            'status' => 'invalid_status'
        ]);
        
        $this->assertEquals(Command::FAILURE, $this->commandTester->getStatusCode());
    }
}
```

### Interactive Testing

```php
public function testInteractiveCommand(): void
{
    // Simulate user input
    $this->commandTester->setInputs(['yes', 'confirmed']);
    
    $this->commandTester->execute([]);
    
    $output = $this->commandTester->getDisplay();
    $this->assertStringContainsString('Operation confirmed', $output);
}
```

## Best Practices

### 1. Command Design

```php
protected function configure(): void
{
    $this->setName('namespace:action')          // Use consistent naming
        ->setDescription('Clear description')    // Concise description
        ->setHelp('Detailed help text')         // Comprehensive help
        ->addArgument(...)                      // Required parameters
        ->addOption(...);                       // Optional flags
}
```

### 2. Error Handling

```php
protected function execute(InputInterface $input, OutputInterface $output): int
{
    $io = new SymfonyStyle($input, $output);
    
    try {
        // Command logic
        return Command::SUCCESS;
    } catch (ValidationException $e) {
        $io->error('Invalid input: ' . $e->getMessage());
        return Command::INVALID;
    } catch (\Exception $e) {
        $io->error('Unexpected error: ' . $e->getMessage());
        return Command::FAILURE;
    }
}
```

### 3. Progress Indicators

```php
// For long-running operations
$io->progressStart($totalItems);

foreach ($items as $item) {
    $this->processItem($item);
    $io->progressAdvance();
}

$io->progressFinish();
```

### 4. User Interaction

```php
// Confirmation prompts
if (!$io->confirm('Do you want to continue?', false)) {
    return Command::SUCCESS;
}

// Choice selection
$choice = $io->choice('Select environment', ['dev', 'prod'], 'dev');

// Input collection
$value = $io->ask('Enter value', 'default');
```

### 5. Logging Integration

```php
public function __construct(private LoggerInterface $logger)
{
    parent::__construct();
}

protected function execute(InputInterface $input, OutputInterface $output): int
{
    $this->logger->info('Command started', ['command' => $this->getName()]);
    
    // Command logic...
    
    $this->logger->info('Command completed successfully');
    return Command::SUCCESS;
}
```

## Available Command Examples

Check the [module template repository](https://github.com/OXID-eSales/module-template/blob/b-7.1.x/src/Logging/Command/ReadLogsCommand.php) for a complete working example.

## Related Topics

- **[Service Container](service-container)**: Inject dependencies into commands
- **[Module Development](../../modules-components-themes/module/)**: Creating modules with commands
- **[Components](../../modules-components-themes/component)**: Project-wide command development
- **[Symfony Console](https://symfony.com/doc/current/console.html)**: Comprehensive console documentation