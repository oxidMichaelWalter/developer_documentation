# Migration Plan: Sphinx zu Docusaurus

## Übersicht
Diese Migration konvertiert die bestehende OXID eShop Developer Documentation von Sphinx/reStructuredText zu Docusaurus/Markdown.

## Analysierte Struktur
- **Aktuelles System**: Sphinx mit Read the Docs Theme
- **Inhalt**: ~120 RST-Dateien mit hierarchischer Struktur
- **Features**: PlantUML-Diagramme, PHP-Syntax-Highlighting, Versionierung
- **Assets**: Logos, Icons, CSS, Bilder, Schriftarten

## Migrations-Phasen

### Phase 1: Docusaurus Setup & Dockerisierung
- [x] Docusaurus-Projekt initialisieren
- [x] Docker Compose für Development Setup
- [x] Basis-Konfiguration für OXID Branding
- [x] PlantUML Plugin Integration
- [x] Versionierung konfigurieren

### Phase 2: Content Migration
- [ ] RST zu Markdown Konvertierung automatisieren
- [ ] Bilder und Assets übertragen
- [ ] Interne Links korrigieren
- [ ] Code-Syntax anpassen (RST → MDX)
- [ ] Navigationsstruktur übertragen

### Phase 3: Styling & Branding
- [ ] OXID Corporate Design anwenden
- [ ] Fonts (DINNextLTPro) einbinden
- [ ] Logo und Favicon
- [ ] Custom CSS für OXID-spezifische Styles

### Phase 4: Features & Funktionalität
- [ ] PlantUML-Diagramme migrieren
- [ ] Versioning für verschiedene OXID Versionen
- [ ] Search-Funktionalität testen
- [ ] GitHub Integration konfigurieren

### Phase 5: Deployment & Testing
- [ ] Build-Prozess testen
- [ ] Performance optimieren
- [ ] Links und Navigation validieren
- [ ] Responsive Design prüfen

## Technische Anforderungen

### Docker Setup
- Node.js 18+ für Docusaurus
- PlantUML für Diagramm-Generation
- nginx für Production Serving

### Konvertierungs-Tools
- `pandoc` für RST → Markdown Konvertierung
- Custom Scripts für Link-Korrektur
- Asset-Pipeline für Medien

### Wichtige Dateien
- `docusaurus.config.js` - Hauptkonfiguration
- `sidebars.js` - Navigation
- `src/css/custom.css` - OXID Styling
- `static/` - Assets (Bilder, Fonts, etc.)

## Herausforderungen
1. **Komplexe Navigationsstruktur** - 4-5 Ebenen tief
2. **PlantUML Integration** - Diagramme in reStructuredText
3. **Versionierung** - Multiple OXID Versionen (6.0-7.3)
4. **PHP Code Highlighting** - Spezielle Pygments Konfiguration
5. **Custom CSS** - OXID-spezifische Styles

## Vorgeschlagene Ordnerstruktur

```
docs/                           # Docusaurus root
├── docs/                       # Dokumentation
│   ├── getting-started/        # Migration von legacy/getting_started/
│   ├── development/           # Migration von legacy/development/
│   ├── system-architecture/   # Migration von legacy/system_architecture/
│   └── update/               # Migration von legacy/update/
├── static/                   # Assets
│   ├── img/                 # Bilder
│   ├── fonts/              # DINNextLTPro Fonts
│   └── css/               # Legacy CSS falls nötig
├── src/
│   └── css/
│       └── custom.css     # OXID Styling
├── versioned_docs/       # Versions-spezifische Docs
├── docker-compose.yml    # Development Setup
├── Dockerfile           # Production Build
└── package.json        # Dependencies
```

## Zeitschätzung
- **Phase 1**: 1-2 Tage (Setup)
- **Phase 2**: 3-4 Tage (Content Migration)
- **Phase 3**: 2-3 Tage (Styling)
- **Phase 4**: 2-3 Tage (Features)
- **Phase 5**: 1-2 Tage (Testing)

**Gesamt**: ~2 Wochen

## Nächste Schritte
1. Docusaurus Grundsetup mit Docker
2. Test-Migration eines kleinen Bereichs
3. Automatisierungs-Scripts entwickeln
4. Iterative Migration der Hauptbereiche