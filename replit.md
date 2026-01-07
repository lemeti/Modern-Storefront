# Labrador Retriever Puppies Website

## Overview

This is a full-stack web application for selling and showcasing puppies. The site has two main modules:

1. **Public/Client Side** - Visitors can browse available puppies, view details, and learn about the breeding service
2. **Admin Module** - Authenticated administrators can create, update, and delete puppy listings

The application is built with a React frontend and Express backend, using PostgreSQL for data persistence and Replit Auth for authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (compiled with TSX for development, esbuild for production)
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas
- **Development**: Vite dev server with HMR proxied through Express

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains all database table definitions
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL via connect-pg-simple
- **Implementation**: Located in `server/replit_integrations/auth/`
- **Protection**: Admin routes require authentication via `isAuthenticated` middleware

### Build System
- **Frontend Build**: Vite outputs to `dist/public`
- **Backend Build**: esbuild bundles server to `dist/index.cjs`
- **Development**: `npm run dev` runs both frontend and backend with hot reload

## External Dependencies

### Database
- PostgreSQL database (connection via `DATABASE_URL` environment variable)
- Required tables: `puppies`, `sessions`, `users`

### Authentication Provider
- Replit OpenID Connect (`ISSUER_URL` defaults to `https://replit.com/oidc`)
- Requires `REPL_ID` and `SESSION_SECRET` environment variables

### Third-Party Libraries
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe database queries
- **passport**: Authentication middleware
- **openid-client**: OIDC authentication flow
- **framer-motion**: Animation library
- **zod**: Runtime type validation

### Development Tools
- Replit-specific Vite plugins for cartographer and dev banner
- Runtime error overlay for development debugging