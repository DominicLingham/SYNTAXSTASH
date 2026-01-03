# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SyntaxStash is a full-stack coding resource management and journaling platform built with Nuxt 3, Vue 3, and PostgreSQL.
The aim is to make it simpler for those new to learning to code, or experienced developers to save external resources such as
blog posts, video tutorials/courses, online courses, docs etx OR create and store their own resources in one location.
The user will also be able to ask SyntaxStash to generate a resource in a particular written format for a specified topic relating
to software or game development.

## Development Commands

```bash
npm run dev          # Start development server with hot reload
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Check code style (ESLint with @antfu/eslint-config)
npm run lint:fix     # Auto-fix style issues
```

### Database Commands

```bash
npx drizzle-kit push     # Push schema changes to database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit studio   # Open Drizzle Studio GUI
```

## Architecture

### Tech Stack
- **Frontend**: Nuxt 3, Vue 3, Pinia, Nuxt UI, TailwindCSS
- **Backend**: Nuxt server (H3), better-auth (OAuth), Drizzle ORM
- **Database**: PostgreSQL via Neon serverless
- **Editor**: TipTap with syntax highlighting (lowlight/highlight.js)

### Key Directories
- `/server/api/` - API endpoints (H3 event handlers)
- `/lib/db/schema/` - Drizzle ORM schema definitions
- `/lib/` - Shared utilities (auth config, env validation, Zod schemas)
- `/components/` - Vue components organized by feature (auth/, diary/, resources/)
- `/stores/` - Pinia state management
- `/utils/` - Helper functions including `defineAuthenticatedEventHandler`

### Authentication Flow
- OAuth providers: GitHub, Google (configured in `/lib/auth.ts`)
- All auth routes handled by `/server/api/[...auth].ts`
- Server middleware attaches user to `event.context.user`
- Use `defineAuthenticatedEventHandler()` from `/utils/` for protected endpoints
- Client-side: `useAuthStore()` from Pinia

### Database Patterns
- Timestamps use bigint milliseconds (`Date.now()`)
- Diary and DiaryEntry tables use soft deletes (`deletedAt` field)
- TipTap content stored as JSONB in `content` columns
- User-diary relationship is one-to-one (unique userId constraint)

### Component Conventions
- All components use `<script setup lang="ts">`
- Data fetching via Nuxt's `useFetch()` composable
- Forms use Zod schemas from `/lib/zod-schemas.ts`
- Nuxt auto-imports components from `/components/`

## Environment Variables

Required in `.env`:
```
NODE_ENV=development|production
DATABASE_URL_DEV=postgresql://...
DATABASE_URL_PROD=postgresql://...
BETTER_AUTH_SECRET=<random string>
BETTER_AUTH_URL=http://localhost:3000
AUTH_GITHUB_CLIENT_ID=<github oauth id>
AUTH_GITHUB_CLIENT_SECRET=<github oauth secret>
AUTH_GOOGLE_CLIENT_ID=<google oauth id>
AUTH_GOOGLE_CLIENT_SECRET=<google oauth secret>
```

Environment variables are validated at runtime via Zod in `/lib/env.ts`.

## API Endpoint Pattern

```typescript
// Protected endpoint example
export default defineAuthenticatedEventHandler(async (event) => {
  const user = event.context.user // Always available in authenticated handlers
  // ... handler logic
})
```

## Pre-commit Hooks

Husky runs lint-staged on commits, which executes `npm run lint` on changed files.
