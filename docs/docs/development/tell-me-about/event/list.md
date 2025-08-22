# Available Events

This page provides a comprehensive overview of all available events in OXID eShop organized by category.

## Event Categories

### 🔧 [Module Events](./module-events/)
Events related to module lifecycle and configuration:
- BeforeModuleDeactivationEvent
- FinalizingModuleActivationEvent  
- FinalizingModuleDeactivationEvent
- ModuleClassExtensionChainChangedEvent
- ModuleConfigurationChangedEvent
- SettingChangedEvent
- ShopConfigurationChangedEvent

### 🗃️ [Database Events](./database-events/)  
Events fired during database operations:
- BeforeModelDeleteEvent
- AfterModelDeleteEvent
- BeforeModelUpdateEvent
- AfterModelUpdateEvent
- AfterModelInsertEvent

### 🐳 [DI Container Events](./di-container-events/)
Events related to dependency injection container:
- ServicesYamlConfigurationErrorEvent
- ProjectYamlChangedEvent

### 🎭 [View Events](./view-events/)
Events related to template rendering and themes:
- ThemeSettingChangedEvent
- ViewRenderedEvent

### 🛒 [Shop General Events](./shop-general-events/)
General shop lifecycle and request processing events:
- AfterRequestProcessedEvent
- AllCookiesRemovedEvent
- ApplicationExitEvent
- BasketChangedEvent
- BeforeHeadersSendEvent
- BeforeSessionStartEvent