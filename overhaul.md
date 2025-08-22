# Module Documentation Overhaul Checklist

Diese Checkliste umfasst alle Dateien im Verzeichnis `docs/docs/development/modules-components-themes/module/` zur Überprüfung und Überarbeitung.

## 📋 Überarbeitungskriterien
- [ ] Inhalt auf Aktualität prüfen (OXID 7.x Kompatibilität)
- [ ] Code-Beispiele validieren und testen
- [ ] Markdown-Syntax und Formatierung überprüfen
- [ ] Links und Referenzen testen
- [ ] Screenshots/Bilder aktualisieren falls nötig
- [ ] Rechtschreibung und Grammatik korrigieren
- [ ] Navigation und Querverweise prüfen

## 🔍 Anleitung zur Code-Validierung

### Voraussetzung: OXID Installation
Für die Validierung der Dokumentation gegen den tatsächlichen OXID-Code muss eine OXID eShop Installation vorhanden sein.

#### Installation via Docker (einmaliger Befehl):
```bash
# OXID eShop CE installieren
docker run --rm -v /path/to/oxideshop:/app -w /app oxidesales/oxideshop-docker-php:8.2 \
  composer require oxid-esales/oxideshop-metapackage-ce
```

### Wichtige Verzeichnisse für die Analyse
Nach der Installation befinden sich die relevanten Dateien in:
- **Source Code:** `/source/Application/`
- **Unified Namespace:** `/vendor/oxid-esales/oxideshop-unified-namespace-generator/generated/`
- **Templates:** `/source/Application/views/[theme_name]/tpl/`
- **Module:** `/source/modules/`

### Zu prüfende Aspekte
1. **Namespace-Struktur:** Unified Namespace vs. Community Namespace
2. **Template-Engine:** Twig (.html.twig) vs. Smarty (.tpl)
3. **Controller-Vererbung:** Basis-Controller-Klassen
4. **Metadata-Struktur:** Aktuelle metadata.php Format-Version

---

## 🎯 Module Development (51 Dateien)

### Main Module Documentation
- [ ] `index.md` - Hauptübersichtsseite für Module

### 🚀 Installation & Setup (5 Dateien)
- [ ] `installation-setup/index.md` - Übersicht Installation & Setup
- [ ] `installation-setup/installation.md` - Installationsanleitung
- [ ] `installation-setup/setup.md` - Setup-Konfiguration
- [ ] `installation-setup/configuration.md` - Konfiguration
- [ ] `installation-setup/troubleshooting.md` - Fehlerbehebung

### 🔧 Advanced Topics (6 Dateien)
- [ ] `advanced/module-dependencies.md` - Modul-Abhängigkeiten
- [ ] `advanced/module-services.md` - Service-Container Integration
- [ ] `advanced/module-settings.md` - Modul-Einstellungen
- [ ] `advanced/using-database.md` - Datenbankzugriff
- [ ] `advanced/using-namespaces-in-modules.md` - Namespace-Verwendung
- [ ] `advanced/using-twig-in-module-templates.md` - Twig Templates

### 🏗️ Module Skeleton (19 Dateien)

#### Skeleton Overview
- [ ] `skeleton/index.md` - Skeleton Übersicht
- [ ] `skeleton/structure.md` - Verzeichnisstruktur
- [ ] `skeleton/menu-xml.md` - Menu XML Konfiguration

#### Composer.json Configuration (2 Dateien)
- [ ] `skeleton/composerjson/index.md` - Composer.json Übersicht
- [ ] `skeleton/composerjson/module-via-composer.md` - Modul via Composer

#### Metadata.php Configuration (14 Dateien)
- [ ] `skeleton/metadataphp/index.md` - Metadata.php Übersicht
- [ ] `skeleton/metadataphp/version-20.md` - Version 2.0 Format
- [ ] `skeleton/metadataphp/version-21.md` - Version 2.1 Format
- [ ] `skeleton/metadataphp/version-compatibility.md` - Versionskompatibilität

#### aModule Configuration (10 Dateien)
- [ ] `skeleton/metadataphp/amodule/index.md` - aModule Übersicht
- [ ] `skeleton/metadataphp/amodule/author.md` - Autor-Konfiguration
- [ ] `skeleton/metadataphp/amodule/blocks.md` - Block-Definitionen
- [ ] `skeleton/metadataphp/amodule/controllers.md` - Controller-Mapping
- [ ] `skeleton/metadataphp/amodule/description.md` - Beschreibungen
- [ ] `skeleton/metadataphp/amodule/email.md` - E-Mail-Konfiguration
- [ ] `skeleton/metadataphp/amodule/events.md` - Event-Handler
- [ ] `skeleton/metadataphp/amodule/extend.md` - Klassen-Extensions
- [ ] `skeleton/metadataphp/amodule/id.md` - Modul-ID
- [ ] `skeleton/metadataphp/amodule/lang.md` - Sprachdateien
- [ ] `skeleton/metadataphp/amodule/settings.md` - Einstellungen
- [ ] `skeleton/metadataphp/amodule/smarty-plugin-directories.md` - Smarty Plugins
- [ ] `skeleton/metadataphp/amodule/templates.md` - Template-Zuordnung
- [ ] `skeleton/metadataphp/amodule/thumbnail.md` - Thumbnail-Bild
- [ ] `skeleton/metadataphp/amodule/title.md` - Modul-Titel
- [ ] `skeleton/metadataphp/amodule/url.md` - Modul-URL
- [ ] `skeleton/metadataphp/amodule/version.md` - Versionsnummer

### 📖 Tutorials (8 Dateien)
- [ ] `tutorials/index.md` - Tutorial Übersicht
- [ ] `tutorials/create-basic-module.md` - Basis-Modul erstellen
- [ ] `tutorials/extend-shop-class.md` - Shop-Klasse erweitern
- [ ] `tutorials/frontend-mini-basket.md` - Frontend Mini-Warenkorb
- [ ] `tutorials/frontend-user-forms.md` - Frontend Benutzerformulare
- [ ] `tutorials/module-setup.md` - Modul-Setup
- [ ] `tutorials/multi-lang-and-shop-tables.md` - Mehrsprachigkeit & Shop-Tabellen
- [ ] `tutorials/override-functionality.md` - Funktionalität überschreiben

### ✅ Certification (6 Dateien)
- [ ] `certification/index.md` - Zertifizierung Übersicht
- [ ] `certification/documentation.md` - Dokumentationsanforderungen
- [ ] `certification/inter-module-compatibility.md` - Modul-Kompatibilität
- [ ] `certification/software-quality.md` - Software-Qualität
- [ ] `certification/software-tests.md` - Software-Tests
- [ ] `certification/terms-conditions-checklist.md` - AGB-Checkliste

### 🔄 Lifecycle Management (3 Dateien)
- [ ] `database-migration/index.md` - Datenbank-Migration
- [ ] `deactivation/index.md` - Modul-Deaktivierung
- [ ] `uninstall/index.md` - Modul-Deinstallation

---

---

## 🏢 Components & Themes (30 Dateien)

### 🧩 Components & General (5 Dateien)
- [ ] `development/modules-components-themes/index.md` - Hauptübersicht
- [ ] `development/modules-components-themes/component.md` - Komponenten
- [ ] `development/modules-components-themes/contribution.md` - Beitrag leisten
- [ ] `development/modules-components-themes/licenses.md` - Lizenzen
- [ ] `development/modules-components-themes/quality.md` - Qualitätsstandards

### 🎨 Theme Development (12 Dateien)
- [ ] `theme/index.md` - Theme Übersicht
- [ ] `theme/child-theme.md` - Child Themes
- [ ] `theme/theme-via-composer.md` - Theme via Composer
- [ ] `theme/twig-sandbox.md` - Twig Sandbox

#### Twig Integration (8 Dateien)
- [ ] `theme/twig/index.md` - Twig Übersicht
- [ ] `theme/twig/loading-dynamic-content.md` - Dynamische Inhalte
- [ ] `theme/twig/twig-converter/index.md` - Twig Converter
- [ ] `theme/twig/twig-converter/examples.md` - Converter Beispiele
- [ ] `theme/twig/twig-converter/issues.md` - Bekannte Probleme
- [ ] `theme/twig/twig-converter/usage.md` - Converter Nutzung

### ⚙️ Project Configuration (13 Dateien)
- [ ] `project/index.md` - Projekt Übersicht
- [ ] `project/configincphp.md` - config.inc.php
- [ ] `project/environment.md` - Environment-Konfiguration
- [ ] `project/parameters.md` - Parameter
- [ ] `project/password-hashing.md` - Passwort-Hashing

#### Module Configuration (4 Dateien)
- [ ] `project/module-configuration/index.md` - Modul-Konfiguration
- [ ] `project/module-configuration/deployment.md` - Deployment
- [ ] `project/module-configuration/environment-configuration.md` - Umgebungskonfiguration
- [ ] `project/module-configuration/installation.md` - Installation

#### Twig Template Engine (4 Dateien)
- [ ] `project/twig-template-engine/index.md` - Twig Engine Übersicht
- [ ] `project/twig-template-engine/extending.md` - Twig erweitern
- [ ] `project/twig-template-engine/installation.md` - Twig Installation
- [ ] `project/twig-template-engine/twig-extensions.md` - Twig Extensions

---

## 💡 Tell Me About (39 Dateien)

### Core Concepts (6 Dateien)
- [ ] `tell-me-about/index.md` - Übersicht
- [ ] `tell-me-about/console.md` - Console
- [ ] `tell-me-about/controller-as-service.md` - Controller als Service
- [ ] `tell-me-about/migrations.md` - Migrationen
- [ ] `tell-me-about/service-container.md` - Service Container
- [ ] `tell-me-about/unified-namespace-vs-internal-namespace.md` - Namespace-Vergleich

### 📢 Event System (30 Dateien)

#### Event Basics (3 Dateien)
- [ ] `tell-me-about/event/index.md` - Event Übersicht
- [ ] `tell-me-about/event/event-example.md` - Event Beispiele
- [ ] `tell-me-about/event/list.md` - Event Liste

#### Database Events (6 Dateien)
- [ ] `tell-me-about/event/database-events/index.md` - Database Events Übersicht
- [ ] `tell-me-about/event/database-events/after-model-delete-event.md`
- [ ] `tell-me-about/event/database-events/after-model-insert-event.md`
- [ ] `tell-me-about/event/database-events/after-model-update-event.md`
- [ ] `tell-me-about/event/database-events/before-model-delete-event.md`
- [ ] `tell-me-about/event/database-events/before-model-update-event.md`

#### DI Container Events (3 Dateien)
- [ ] `tell-me-about/event/di-container-events/index.md` - DI Events Übersicht
- [ ] `tell-me-about/event/di-container-events/project-yaml-changed-event.md`
- [ ] `tell-me-about/event/di-container-events/services-yaml-configuration-error-event.md`

#### Module Events (8 Dateien)
- [ ] `tell-me-about/event/module-events/index.md` - Module Events Übersicht
- [ ] `tell-me-about/event/module-events/before-module-deactivation-event.md`
- [ ] `tell-me-about/event/module-events/finalizing-module-activation-event.md`
- [ ] `tell-me-about/event/module-events/finalizing-module-deactivation-event.md`
- [ ] `tell-me-about/event/module-events/module-class-extension-chain-changed-event.md`
- [ ] `tell-me-about/event/module-events/module-configuration-changed-event.md`
- [ ] `tell-me-about/event/module-events/setting-changed-event.md`
- [ ] `tell-me-about/event/module-events/shop-configuration-changed-event.md`

#### Shop General Events (7 Dateien)
- [ ] `tell-me-about/event/shop-general-events/index.md` - Shop Events Übersicht
- [ ] `tell-me-about/event/shop-general-events/after-request-processed-event.md`
- [ ] `tell-me-about/event/shop-general-events/all-cookies-removed-event.md`
- [ ] `tell-me-about/event/shop-general-events/application-exit-event.md`
- [ ] `tell-me-about/event/shop-general-events/basket-changed-event.md`
- [ ] `tell-me-about/event/shop-general-events/before-headers-send-event.md`
- [ ] `tell-me-about/event/shop-general-events/before-session-start-event.md`

#### View Events (3 Dateien)
- [ ] `tell-me-about/event/view-events/index.md` - View Events Übersicht
- [ ] `tell-me-about/event/view-events/theme-setting-changed-event.md`
- [ ] `tell-me-about/event/view-events/view-rendered-event.md`

### 📝 Logging (3 Dateien)
- [ ] `tell-me-about/logging/index.md` - Logging Übersicht
- [ ] `tell-me-about/logging/custom-logger-implementation.md` - Custom Logger
- [ ] `tell-me-about/logging/logger-usage.md` - Logger-Nutzung

---

## 🧪 Testing (13 Dateien)

### Testing Basics (4 Dateien)
- [ ] `testing/index.md` - Testing Übersicht
- [ ] `testing/acceptance.md` - Acceptance Tests
- [ ] `testing/integration.md` - Integration Tests
- [ ] `testing/unit.md` - Unit Tests

### Codeception (9 Dateien)
- [ ] `testing/codeception/index.md` - Codeception Übersicht
- [ ] `testing/codeception/introduction.md` - Einführung
- [ ] `testing/codeception/create-own-page-objects.md` - Page Objects erstellen
- [ ] `testing/codeception/example-module-test.md` - Beispiel Modul-Test
- [ ] `testing/codeception/oxid-codeception-modules.md` - OXID Codeception Module
- [ ] `testing/codeception/oxid-codeception-page-objects.md` - OXID Page Objects
- [ ] `testing/codeception/oxid-codeception-step-objects.md` - OXID Step Objects
- [ ] `testing/codeception/running-tests.md` - Tests ausführen
- [ ] `testing/codeception/write-new-test.md` - Neue Tests schreiben

---

## 🏗️ System Architecture (7 Dateien)

### Core Architecture (4 Dateien)
- [ ] `system-architecture/index.md` - Architektur Übersicht
- [ ] `system-architecture/autoloading.md` - Autoloading
- [ ] `system-architecture/module-installation-activation.md` - Modul Installation & Aktivierung
- [ ] `system-architecture/multilingual-system.md` - Mehrsprachigkeit

### Unified Namespace (3 Dateien)
- [ ] `system-architecture/unified-namespace/index.md` - Unified Namespace Übersicht
- [ ] `system-architecture/unified-namespace/unified-namespace-generator.md` - Namespace Generator
- [ ] `system-architecture/unified-namespace/unified-namespace-inheritance.md` - Namespace Vererbung

---

## 🔄 Update & Upgrade (5 Dateien)

### Standard Updates (2 Dateien)
- [ ] `update/index.md` - Update Übersicht
- [ ] `update/standard-update.md` - Standard Update

### Version Upgrades (3 Dateien)
- [ ] `update/upgrade/index.md` - Upgrade Übersicht
- [ ] `update/upgrade/upgrade-from-ce-to-pe.md` - CE zu PE Upgrade
- [ ] `update/upgrade/upgrade-from-pe-to-ee.md` - PE zu EE Upgrade

---

## 🚀 Getting Started (10 Dateien)

### Installation (6 Dateien)
- [ ] `getting-started/index.md` - Getting Started Übersicht
- [ ] `getting-started/installation/index.md` - Installation Übersicht
- [ ] `getting-started/installation/environment-preparation.md` - Umgebungsvorbereitung
- [ ] `getting-started/installation/eshop-installation.md` - eShop Installation
- [ ] `getting-started/installation/eshop-installation-without-composer.md` - Installation ohne Composer
- [ ] `getting-started/installation/troubleshooting.md` - Fehlerbehebung

### IDE Setup (4 Dateien)
- [ ] `getting-started/ide/index.md` - IDE Übersicht
- [ ] `getting-started/ide/phpstorm/index.md` - PHPStorm Übersicht
- [ ] `getting-started/ide/phpstorm/codingstyle.md` - Coding Style
- [ ] `getting-started/ide/phpstorm/tests.md` - Tests in PHPStorm

---

## 📚 Root Documentation (3 Dateien)
- [ ] `conventions.md` - Konventionen
- [ ] `glossary.md` - Glossar
- [ ] `intro.md` - Einführung

---

## 📊 Gesamtfortschritt
- **Gesamt:** 161 Dateien (komplettes docs/docs Verzeichnis)
  - Module Development: 51 Dateien
  - Components & Themes: 30 Dateien
  - Tell Me About: 39 Dateien
  - Testing: 13 Dateien
  - System Architecture: 7 Dateien
  - Update & Upgrade: 5 Dateien
  - Getting Started: 10 Dateien
  - Root Documentation: 3 Dateien
  - Development Index: 1 Datei
- **Bearbeitet:** 0/161 (0%)
- **Status:** Bereit zur Überarbeitung