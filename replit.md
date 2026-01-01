# TURU REST API

## Overview

TURU REST API is a lightweight, free REST API built for simplicity and ease of use. The name "turu" means "sleep" in Javanese (Indonesian language), reflecting its philosophy of being an API for "lazy people" - focusing on minimal setup and straightforward functionality.

The API provides basic utility endpoints including greetings, mathematical calculations, and API documentation via Swagger UI. It's designed to be deployed on Cloudflare Workers with edge computing capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Web Framework
- **Framework**: Hono - A lightweight, ultrafast web framework optimized for edge computing
- **Rationale**: Hono is specifically designed for Cloudflare Workers and edge environments, providing excellent performance with minimal bundle size
- **JSX Support**: Uses Hono's JSX implementation for rendering HTML pages (configured in tsconfig.json)

### Application Structure
- **Routing Pattern**: Modular route handling with separate route files mounted to the main app
- **API Versioning**: All API endpoints are prefixed under `/api` path
- **Route Organization**:
  - `/` - Landing page (HTML)
  - `/docs` - Swagger UI documentation
  - `/openapi.json` - OpenAPI specification
  - `/api/*` - All API endpoints

### Code Quality
- **Linter/Formatter**: Biome (formerly Rome) for linting, formatting, and import organization
- **Style**: Tab indentation, double quotes for JavaScript strings
- **Testing**: Bun test runner with basic API endpoint tests

### Deployment Target
- **Platform**: Cloudflare Workers (via Wrangler CLI)
- **Edge Computing**: Application runs at the edge for low-latency responses globally

## External Dependencies

### Database Layer
- **Prisma ORM**: Used with `@prisma/client` for database operations
- **Prisma Accelerate**: Edge-compatible database connection pooling via `@prisma/extension-accelerate`
- **Edge Compatibility**: Uses `@prisma/client/edge` variant for Cloudflare Workers compatibility
- **Note**: Database URL is passed dynamically, allowing flexible database backend configuration

### Backend-as-a-Service
- **Supabase**: Integrated via `@supabase/supabase-js`
- **Configuration**: Requires `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables
- **Usage**: Client is instantiated per-request using Hono context bindings

### API Documentation
- **Swagger UI**: Interactive API documentation at `/docs` endpoint
- **OpenAPI 3.0**: Manually defined specification in `src/miscs/openapi.ts`

### Deployment & Runtime
- **Cloudflare Workers**: Production deployment target
- **Wrangler**: Cloudflare's CLI tool for deployment
- **Bun**: Local development runtime with hot reloading

### Environment Variables Required
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous/public key
- Database connection URL (for Prisma Accelerate)