# Portfolio Application

## Overview

This is a modern full-stack portfolio application built with React and Express, showcasing a personal portfolio for "Pheonix" - a web developer, Python developer, and logo designer. The application features a sleek dark theme with flame-colored accents and smooth animations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom flame-themed color palette
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and bundling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: TSX for TypeScript execution
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Design System
- **Theme**: Dark mode with flame orange accents (#FF5722)
- **Typography**: Poppins for headings, Inter for body text
- **Component Library**: Fully accessible components from Radix UI
- **Icons**: Font Awesome and Lucide React icons

## Key Components

### Frontend Components
1. **Navigation**: Fixed header with smooth scroll navigation
2. **HeroSection**: Main landing area with typewriter effect
3. **AboutSection**: Skills showcase with hover animations
4. **ContactSection**: Contact methods with social links
5. **Typewriter**: Custom animated text component

### Backend Components
1. **Storage Interface**: Abstracted data layer with in-memory implementation
2. **Route Registration**: Modular route setup system
3. **Vite Integration**: Development server with HMR support
4. **Error Handling**: Centralized error middleware

### Database Schema
- **Users Table**: Basic user structure with username and password
- **Validation**: Zod schemas for type-safe data validation
- **Migrations**: Drizzle-managed database migrations

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with error handling middleware
5. **State Updates**: TanStack Query manages caching and re-fetching

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, ReactDOM
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **UI Components**: Multiple Radix UI primitives
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **Forms**: React Hook Form with Hookform Resolvers
- **Utilities**: date-fns, embla-carousel-react

### Backend Dependencies
- **Server**: Express.js
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Development**: tsx, esbuild
- **Session Management**: connect-pg-simple
- **Validation**: Zod, drizzle-zod

### Development Tools
- **Build System**: Vite with React plugin
- **Development**: Replit integration plugins
- **TypeScript**: Full type checking across the stack
- **Linting/Formatting**: ESLint and Prettier configurations

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs development server with hot reload
- **Port**: Configurable through environment
- **Database**: Requires DATABASE_URL environment variable
- **Assets**: Served through Vite development server

### Production Build
- **Frontend Build**: `vite build` - Creates optimized static assets
- **Backend Build**: `esbuild` - Bundles server code for Node.js
- **Output**: `dist/` directory with static files and server bundle
- **Start Command**: `npm start` - Runs production server

### Database Configuration
- **Provider**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle with PostgreSQL dialect
- **Migrations**: `npm run db:push` for schema synchronization
- **Schema**: Located in `shared/schema.ts` for type sharing

## Changelog

```
Changelog:
- July 08, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```