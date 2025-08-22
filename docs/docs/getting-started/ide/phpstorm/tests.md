---
sidebar_position: 3
---

# Testing Integration

PhpStorm provides excellent integration with PHP testing frameworks. This guide shows you how to configure PhpStorm to run OXID eShop tests efficiently.

## Overview

PhpStorm testing integration provides:

- **Visual test runners** for PHPUnit and Codeception
- **Debugging support** for failing tests
- **Code coverage analysis** to identify untested code
- **Test result visualization** with detailed reporting
- **Integration with OXID's testing structure**

## Prerequisites

Before configuring testing in PhpStorm:

1. **[OXID eShop installed](../../installation/)** and properly configured
2. **[PhpStorm configured](index)** with correct PHP interpreter
3. **Testing frameworks installed** (usually included with OXID)

## PHPUnit Configuration

### 1. Verify PHPUnit Installation

OXID eShop includes PHPUnit in its development dependencies:

```bash
# Check PHPUnit version
vendor/bin/phpunit --version

# Verify OXID test configuration
ls -la phpunit.xml
```

### 2. Configure PHPUnit in PhpStorm

#### For Local Development

1. **Open Settings**: **File → Settings** (or **PhpStorm → Preferences** on macOS)

2. **Navigate to Test Frameworks**:
   - Go to **Languages & Frameworks → PHP → Test Frameworks**

3. **Add PHPUnit Configuration**:
   - Click **+** → **PHPUnit Local**
   - **PHPUnit library**: Choose **Path to phpunit.phar**
   - **Path to script**: `[project-root]/vendor/bin/phpunit`

4. **Configure Test Runner**:
   - **Default configuration file**: `[project-root]/phpunit.xml`
   - **Default bootstrap file**: `[project-root]/tests/bootstrap.php`

#### For Docker Development

1. **Add Remote PHPUnit**:
   - Click **+** → **PHPUnit by Remote Interpreter**
   - **Choose remote interpreter**: Select your Docker configuration

2. **Configure Paths**:
   - **Path to script**: `/var/www/html/vendor/bin/phpunit` (adjust to container path)
   - **Default configuration file**: `/var/www/html/phpunit.xml`
   - **Default bootstrap file**: `/var/www/html/tests/bootstrap.php`

3. **Set Path Mappings**:
   - Map local project root to container path
   - Ensure proper file synchronization

#### For Remote/VM Development

1. **Configure Remote Interpreter**:
   - Set up SSH or Vagrant connection
   - Configure path mappings between local and remote

2. **PHPUnit Configuration**:
   - **Path to script**: `/var/www/oxideshop/vendor/bin/phpunit`
   - **Configuration file**: `/var/www/oxideshop/phpunit.xml`
   - **Bootstrap file**: `/var/www/oxideshop/tests/bootstrap.php`

### 3. Test PHPUnit Configuration

1. **Verify Setup**:
   - Click **Test** button in PHPUnit configuration
   - Should show PHPUnit version and available tests

2. **Run Sample Test**:
   - Right-click on any test file
   - Select **Run [TestName]**
   - Verify test execution works properly

:::important Version Detection
Be sure to refresh the detection of the PHPUnit version with the refresh button every time the version changes. Otherwise, PhpStorm might call PHPUnit with wrong parameters.
:::

## Codeception Configuration

### 1. Verify Codeception Installation

Check if Codeception is available in your OXID installation:

```bash
# Check Codeception
vendor/bin/codecept --version

# List available test suites
vendor/bin/codecept list
```

### 2. Configure Codeception in PhpStorm

1. **Add Codeception Framework**:
   - **Languages & Frameworks → PHP → Test Frameworks**
   - Click **+** → **Codeception Local** (or by Remote Interpreter)

2. **Configure Paths**:
   - **Codeception executable**: `vendor/bin/codecept`
   - **Configuration file**: `codeception.yml`

3. **Test Suites**:
   - PhpStorm should automatically detect available suites
   - Common OXID suites: `unit`, `integration`, `acceptance`

## Running Tests in PhpStorm

### Individual Test Execution

#### Run Single Test Method
1. **Open test file** in editor
2. **Click green arrow** next to test method
3. **Or right-click** → **Run [testMethod]**

#### Run Test Class
1. **Right-click on test class** in editor or project tree
2. **Select Run [TestClass]**

#### Run Test Directory
1. **Right-click on test directory** in project tree
2. **Select Run Tests in [directory]**

### Test Configuration Templates

Create run configurations for common test scenarios:

#### Unit Tests Configuration
1. **Run → Edit Configurations**
2. **+ → PHPUnit**
3. **Name**: "OXID Unit Tests"
4. **Test Runner**:
   - **Defined in the configuration file**: Check
   - **Use alternative configuration file**: `phpunit.xml`
5. **Test Scope**: **Defined in the configuration file**

#### Integration Tests Configuration
1. **Create new PHPUnit configuration**
2. **Name**: "OXID Integration Tests"
3. **Test Scope**: **Directory**
4. **Directory**: `tests/Integration`

#### Acceptance Tests (Codeception)
1. **Run → Edit Configurations**
2. **+ → Codeception**
3. **Name**: "OXID Acceptance Tests"
4. **Test Suite**: `acceptance`

### Keyboard Shortcuts for Testing

| Action | Windows/Linux | macOS | Description |
|--------|---------------|--------|-------------|
| Run test at cursor | `Ctrl+Shift+F10` | `Cmd+Shift+R` | Run current test |
| Run last test | `Shift+F10` | `Shift+F10` | Re-run last test |
| Debug test | `Ctrl+Shift+F9` | `Cmd+Shift+D` | Debug current test |
| Run with coverage | `Ctrl+Shift+F10` then `Ctrl+Alt+F6` | `Cmd+Shift+R` then coverage | Run with coverage |

## Debugging Tests

### 1. Enable Xdebug

Ensure Xdebug is properly configured (see [PhpStorm setup guide](index#xdebug-configuration)):

```ini
; php.ini
zend_extension=xdebug
xdebug.mode=develop,debug,coverage
xdebug.start_with_request=yes
xdebug.client_host=localhost
xdebug.client_port=9003
```

### 2. Debug Test Execution

1. **Set breakpoints** in test code or application code
2. **Right-click on test** → **Debug [TestName]**
3. **Use debugging controls**:
   - Step through code
   - Inspect variables
   - Evaluate expressions

### 3. Debug Remote Tests

For Docker/remote development:

1. **Configure remote debugging** in Xdebug
2. **Set path mappings** correctly
3. **Start listening** for debug connections in PhpStorm
4. **Run debug configuration** for remote tests

## Code Coverage Analysis

### 1. Enable Coverage Support

1. **Run → Edit Configurations**
2. **Select PHPUnit configuration**
3. **Code Coverage tab**:
   - **Enable coverage**: Check
   - **Coverage engine**: Xdebug (or PCOV if available)

### 2. Generate Coverage Reports

1. **Run test with coverage**: `Ctrl+Shift+F10` then choose coverage option
2. **View coverage in editor**: Highlighted lines show coverage status
3. **Coverage tool window**: Shows detailed coverage statistics

### 3. Coverage Configuration

Create `phpunit.xml` section for coverage:

```xml
<phpunit>
    <coverage>
        <include>
            <directory suffix=".php">source</directory>
            <directory suffix=".php">modules</directory>
        </include>
        <exclude>
            <directory>vendor</directory>
            <directory>tests</directory>
            <file>source/bootstrap.php</file>
        </exclude>
        <report>
            <html outputDirectory="coverage-html" lowUpperBound="50" highLowerBound="80"/>
            <xml outputDirectory="coverage-xml"/>
        </report>
    </coverage>
</phpunit>
```

## OXID-Specific Testing Features

### 1. Test Database Configuration

OXID tests often use a separate test database:

```php
// tests/bootstrap.php or test configuration
$this->dbHost = 'localhost';
$this->dbName = 'oxid_test'; // Separate test database
$this->dbUser = 'oxid_test_user';
$this->dbPwd = 'test_password';
```

### 2. Module Testing

For testing OXID modules:

1. **Configure module-specific test suites**
2. **Set up proper autoloading** for module classes
3. **Mock OXID framework components** as needed

### 3. Integration with OXID Console

Use OXID console commands in test configurations:

```bash
# Reset test database before tests
vendor/bin/oe-console oe:database:reset --force

# Clear cache before tests
vendor/bin/oe-console oe:cache:clear
```

## Test Templates and Live Templates

### Create Test Templates

1. **File → Settings → Editor → File and Code Templates**
2. **Create new template** for OXID test classes:

```php
<?php

namespace ${NAMESPACE};

use PHPUnit\Framework\TestCase;

class ${CLASS_NAME} extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        // OXID test setup
    }
    
    protected function tearDown(): void
    {
        // OXID test cleanup
        parent::tearDown();
    }
    
    public function testExample(): void
    {
        $this->assertTrue(true);
    }
}
```

### Live Templates for Tests

Create live templates for common test patterns:

1. **File → Settings → Editor → Live Templates**
2. **Add new template group**: "OXID Tests"
3. **Common templates**:
   - `test` - Basic test method
   - `setup` - setUp method
   - `mock` - Mock object creation

## Continuous Integration

### Configure CI-friendly Test Runs

For headless test execution in CI/CD:

```bash
# PHPUnit with JUnit XML output
vendor/bin/phpunit --log-junit phpunit-results.xml

# Codeception with XML output
vendor/bin/codecept run --xml phpunit-results.xml
```

### PhpStorm Test Results

Import CI test results into PhpStorm:

1. **Tools → External Tools**
2. **Configure test result parsers**
3. **Import test results** from CI systems

## Troubleshooting

### Common Issues

**PHPUnit not found**:
- Verify installation: `vendor/bin/phpunit --version`
- Check interpreter configuration
- Refresh PhpStorm caches

**Tests not running**:
- Check `phpunit.xml` configuration
- Verify bootstrap file path
- Check file permissions

**Coverage not working**:
- Ensure Xdebug is installed with coverage support
- Check PHP configuration
- Verify include/exclude paths in `phpunit.xml`

**Remote tests failing**:
- Verify path mappings
- Check network connectivity
- Test interpreter connection

### Performance Optimization

For faster test execution:

1. **Use PCOV instead of Xdebug** for coverage (if available)
2. **Optimize test database** setup
3. **Use test doubles** instead of real dependencies
4. **Parallel test execution** with ParaTest

## Next Steps

1. **[Write your first OXID module test](../../../development/modules-components-themes/module/tutorials/create-basic-module)** using configured testing
2. **[Learn OXID testing patterns](../../../development/testing/)** and best practices
3. **[Set up continuous integration](../../../development/testing/codeception/)** for automated testing
4. **[Understand OXID architecture](../../../system-architecture/)** to write better tests