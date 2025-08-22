# OXID eShop Developer Documentation - Docker Management
# =======================================================

.PHONY: help up down build rebuild logs ps clean dev prod plantuml test

# Default target
help: ## Show this help message
	@echo "OXID eShop Developer Documentation - Docker Commands"
	@echo "======================================================"
	@echo ""
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Development commands
up: ## Start development server (docs)
	docker compose up -d docs

down: ## Stop all services
	docker compose down

ps: ## Show running containers
	docker compose ps

logs: ## Show logs from all services
	docker compose logs -f

logs-docs: ## Show logs from docs service only
	docker compose logs -f docs

# Build commands
build: ## Build all services
	docker compose build

rebuild: ## Rebuild all services (no cache)
	docker compose build --no-cache

# Production commands
prod: ## Build and start production server
	docker compose --profile production up nginx

prod-build: ## Build production version
	docker compose --profile build run --rm docs-build

# Additional services
plantuml: ## Start PlantUML server
	docker compose up -d plantuml

plantuml-logs: ## Show PlantUML logs
	docker compose logs -f plantuml

# Testing
test: ## Test development setup
	docker compose up --build docs

# Maintenance
clean: ## Clean up containers and images
	docker compose down --rmi all --volumes --remove-orphans

prune: ## Remove unused Docker resources
	docker system prune -af

# Package management (inside container)
npm-install: ## Install npm packages inside container
	docker compose run --rm docs npm install

npm-audit: ## Run npm audit inside container  
	docker compose run --rm docs npm audit

npm-update: ## Update npm packages inside container
	docker compose run --rm docs npm update

# Quick development workflow
dev: down up ## Restart development environment

# Container access
shell: ## Get shell access to docs container
	docker compose exec docs sh

shell-run: ## Run shell in new docs container
	docker compose run --rm docs sh

# Status and info
status: ps ## Alias for ps

info: ## Show container information
	@echo "=== Container Status ==="
	@docker compose ps
	@echo ""
	@echo "=== Network Info ==="
	@docker compose ps --format "table {{.Name}}{{.Status}}{{.Ports}}"
	@echo ""
	@echo "=== Useful URLs ==="
	@echo "Development: http://localhost:3000/developer/"
	@echo "PlantUML:    http://localhost:8080/"
	@echo "Production:  http://localhost:8000/ (when running prod)"