# OXID eShop Developer Documentation Migration

Migration der OXID eShop Developer Documentation von Sphinx zu Docusaurus.

## Schnellstart mit Docker

### Mit Makefile (empfohlen)
```bash
make help          # Zeige alle verfügbaren Befehle
make up            # Starte Development Server
make down          # Stoppe alle Services
make ps            # Zeige laufende Container
make info          # Zeige Status und URLs
```

### Direkte Docker Compose Befehle
```bash
docker compose up docs              # Development Server
docker compose up -d plantuml       # PlantUML Server (background)
docker compose --profile production up nginx  # Production Server
```

## Lokale Entwicklung (ohne Docker)

### Voraussetzungen
- Node.js 18+
- npm

### Setup
```bash
cd docs
npm install
npm start
```

### Build
```bash
cd docs
npm run build
npm run serve
```

## Projektstruktur

- `docs/` - Docusaurus Projekt
- `lagacy/` - Original Sphinx Dokumentation
- `migration.md` - Detaillierter Migrationsplan
- `CLAUDE.md` - Projekt-Kontext für Claude
- `docker-compose.yml` - Docker Setup
- `nginx.conf` - Production Server Konfiguration

## Migration Status

✅ **Phase 1: Setup & Docker**
- [x] Docusaurus initialisiert
- [x] Docker Compose konfiguriert
- [x] OXID Branding (Logo, Farben, Fonts)
- [x] Basis-Konfiguration

🔄 **Phase 2: Content Migration**
- [ ] RST zu Markdown Konvertierung
- [ ] Navigationsstruktur
- [ ] Assets Migration

⏳ **Phase 3-5: Features & Deployment**
- [ ] PlantUML Integration
- [ ] Versionierung
- [ ] Testing & Deployment

## Makefile Befehle

| Befehl | Beschreibung |
|--------|-------------|
| `make up` | Development Server starten |
| `make down` | Alle Services stoppen |
| `make ps` | Container Status anzeigen |
| `make info` | Status und URLs anzeigen |
| `make build` | Images neu bauen |
| `make prod` | Production Server |
| `make plantuml` | PlantUML Server |
| `make clean` | Cleanup |

## Migration

Siehe `migration.md` für den detaillierten Migrationsplan.