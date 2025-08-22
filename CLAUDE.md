# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Migration of OXID eShop Developer Documentation from Sphinx/reStructuredText to Docusaurus/Markdown. This is an active documentation migration project with ~120 RST files being converted to a modern Docusaurus setup.

## Architecture & Structure
- **Legacy System**: Sphinx documentation in `lagacy/` directory with hierarchical RST structure
- **Target System**: Docusaurus 3.x with TypeScript configuration
- **Docker Architecture**: Multi-service setup with docs development server, PlantUML server, and nginx production server
- **Navigation**: Complex 4-5 level hierarchical navigation structure configured in `sidebars.ts`

## Development Commands

### Docker-based Development (Primary)
```bash
make up            # Start development server in background (localhost:3000)
make down          # Stop all services  
make ps            # Show container status
make info          # Show URLs and status
make plantuml      # Start PlantUML server (localhost:8080)
make build         # Rebuild Docker images
make clean         # Clean up containers and volumes
```

### Production Build
```bash
make prod-build    # Build static production files
make prod          # Start nginx production server (localhost:8000)
```

### Package Management
```bash
make npm-install   # Install dependencies in container
make npm-audit     # Run security audit
```

### Direct Docusaurus Commands (inside container)
```bash
npm start          # Development server
npm run build      # Production build
npm run typecheck  # TypeScript checking
npm run clear      # Clear cache
npm run serve      # Serve built site locally
npm run swizzle    # Customize Docusaurus components
```

### Testing & Validation
```bash
make npm-audit     # Security audit
npm run typecheck  # TypeScript validation (must pass before commits)
```

## Key Configuration Files
- `docs/docusaurus.config.ts`: Main Docusaurus configuration with OXID branding
- `docs/sidebars.ts`: Navigation structure (developerSidebar) with 4 main sections
- `docs/package.json`: Node.js dependencies (Docusaurus 3.8.1, React 19)
- `docs/tsconfig.json`: TypeScript configuration
- `docker-compose.yml`: Multi-service Docker setup (docs, plantuml, nginx services)
- `Makefile`: Development workflow commands
- `nginx.conf`: Production server configuration

## Content Migration Context
- **Source**: `lagacy/` contains original Sphinx RST files
- **Target Structure**: 
  - `getting-started/` (installation, IDE setup)
  - `development/` (modules, testing, themes) 
  - `system-architecture/` (unified namespace, autoloading)
  - `update/` (upgrade guides)
- **Assets**: Custom OXID fonts (DINNextLTPro), logos, CSS in `static/`
- **Special Features**: PlantUML diagrams, PHP syntax highlighting, multi-version support

## Migration Status
- ✅ Phase 1: Docusaurus setup, Docker, navigation structure
- 🔄 Phase 2: Content migration (RST→Markdown conversion)
- ⏳ Phase 3-5: PlantUML integration, versioning, deployment

## Important Migration Details
- Sidebar uses `developerSidebar` (not `tutorialSidebar`) 
- URLs use kebab-case naming convention
- Complex navigation requires careful maintenance of hierarchy
- OXID corporate design includes custom fonts and colors
- PlantUML server runs on port 8080 for diagram generation
- Multiple OXID versions (6.0-7.3) will require versioning setup

## Development Workflow
- Always run `npm run typecheck` before committing changes
- Navigation structure is hierarchical (4-5 levels deep) - maintain consistency
- Test changes in development server before building production
- Use PlantUML server at localhost:8080 for diagram generation

## Special Considerations
- Always use `docker compose` (not `docker-compose`)
- Navigation changes require updating both `sidebars.ts` and creating corresponding markdown files
- Legacy RST files contain complex cross-references that need careful conversion
- PHP code highlighting is pre-configured in Docusaurus config
- Custom OXID fonts (DINNextLTPro) are included in static assets
- Development server auto-reloads on file changes (CHOKIDAR_USEPOLLING enabled)

## Troubleshooting
- If containers won't start: `make clean && make build && make up`
- For permission issues: Check Docker volume mounts in docker-compose.yml
- If TypeScript errors: Run `npm run typecheck` to see specific issues
- For PlantUML diagrams not rendering: Ensure PlantUML server is running via `make plantuml`