# events

## Description

The specified event handler class should be registered in medatata files array.

## Type

Associative array. Keys can be `onActivate` and `onDeactivate`

## Mandatory

No

## Example

```php
'events' => [
    'onActivate' => '\OxidEsales\ModuleTemplate\Core\ModuleEvents::onActivate',
    'onDeactivate' => '\OxidEsales\ModuleTemplate\Core\ModuleEvents::onDeactivate'
],
```

:::warning
If you want to use your module services in the `onActivate` method the `ContainerFactory` should not be used for getting your services, because they aren't included in the container from the `ContainerFactory` during the activation process. You have to get a new container from the `ContainerBuilderFactory`. See an example below:

```php
public static function onActivate(): void
{
    $container = (new ContainerBuilderFactory())->create()->getContainer();
    $container->compile();

    $myService = $container->get('<service-id>');
    $myService->doSomething();
}
```
:::