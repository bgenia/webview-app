.NOTPARALLEL:

.RECIPEPREFIX := >
.DEFAULT_GOAL := default

.PHONY: default
default: release

# Setup web project
.PHONY: web/setup
web/setup:
>	pnpm install

# Build web project
.PHONY: web
web: web/setup
>	pnpm build

# Build release executable
.PHONY: release
release: web
>	xmake config -m release
>	xmake build

# Build debug executable
.PHONY: debug
debug: web
>	xmake config -m debug
>	xmake build

# Generate clangd configuration
.PHONY: configure/clangd
configure/clangd:
>	xmake project --kind=compile_commands --lsp=clangd

# Lint all project files
.PHONY: lint
lint:
>	trunk check --all --no-fix

# Fix all auto-fixable problems in all project files
.PHONY: fix
fix:
>	trunk check --all --fix

# Format all project files
.PHONY: format
format:
>	trunk fmt --all

# Execute application
.PHONY: run
run:
>	xmake run
