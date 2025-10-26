# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern cooking website built with Next.js 15 App Router, React 19, TypeScript (strict mode), and Tailwind CSS v4. The project uses a feature-based architecture with clear separation between client and server code.

## Development Commands

```bash
npm run dev        # Start dev server with Turbopack on port 4000
npm run build      # Build production with Turbopack
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript type checking
```

**Note:** Dev server runs on port 4000, not the default 3000.

## Architecture Patterns

### Next.js App Router Structure
- **Server Components by default** - Components in `app/` are Server Components unless marked with `'use client'`
- **Client Components** - Mark with `'use client'` directive when using hooks, event handlers, or browser APIs
- **Server Actions** - Functions in `actions/` must use `'use server'` directive for mutations and form handling
- **Route handlers** - API routes go in `app/api/` directories as `route.ts` files

### Code Organization Philosophy

```
src/
├── app/              # Pages, layouts, and routing (Next.js App Router)
├── types/            # TypeScript definitions, re-exported through index.ts
├── lib/              # Pure utility functions (no React dependencies)
├── services/         # External API calls (fetch/axios wrappers)
├── components/       # React components
│   ├── ui/           # Generic reusable components (Button, Input, Card)
│   ├── forms/        # Complete form components
│   ├── layout/       # Page structure (Header, Footer, Nav)
│   └── features/     # Business logic components (RecipeCard)
├── hooks/            # Custom React hooks (must start with 'use')
├── actions/          # Next.js Server Actions ('use server')
└── config/           # App configuration and type-safe env vars
```

**Component Placement Rules:**
- `ui/` - Generic, reusable across any feature (e.g., Button, Input)
- `features/` - Business-specific components (e.g., RecipeCard, UserProfile)
- `forms/` - Complete form components that handle their own state
- `layout/` - Structural components (Header, Footer, Sidebar)

### Import Patterns

Always use path aliases and destructured imports:

```typescript
// ✅ Correct
import { Recipe } from '@/types'
import { useState, useEffect } from 'react'

// ❌ Avoid
import * as React from 'react'
import Recipe from '@/types/recipe'
```

### Type Safety

- **Strict mode enabled** - All TypeScript code must pass strict type checking
- **Central type exports** - Import types from `@/types`, not individual files
- **Prefer `type` over `interface`** - Use `type` for unions/intersections, `interface` for objects that extend
- **No `any`** - Use `unknown` and type guards instead

### Environment Variables

- Development uses `.env.development` (port 3000 API default, CloudFront CDN)
- Production uses `.env.production` (AWS API Gateway, production CDN)
- Local secrets go in `.env.local` (git-ignored)
- All public variables must be prefixed with `NEXT_PUBLIC_`
- **Always access via `src/config/env.ts`** for type safety - import `env` object, never use `process.env` directly

**Current Variables:**
```bash
NEXT_PUBLIC_API_URL      # Backend API endpoint
NEXT_PUBLIC_CDN_URL      # CloudFront/S3 URL for images
```

**Image Configuration:**
- `next.config.ts` uses `NEXT_PUBLIC_CDN_URL` to configure Next.js Image component allowed domains
- Images are served from CloudFront CDN backed by S3
- Add new remote image domains by updating `remotePatterns` in `next.config.ts`

## CI/CD

GitHub Actions runs on PRs to `main`:
1. ESLint (`npm run lint`)
2. TypeScript check (`npm run typecheck`)
3. Production build (`npm run build`)

All checks must pass before merge.

## Key Technical Decisions

- **Turbopack** - Used for both dev and build for faster compilation
- **React 19** - Latest React features available
- **Font optimization** - Geist Sans and Geist Mono loaded via `next/font/google`
- **Global layout** - Header/Footer in root layout, persistent across routes
- **Path aliases** - `@/*` maps to `src/*`
- **Icons** - `react-icons` library provides Font Awesome, Simple Icons, etc.
- **Image hosting** - CloudFront CDN for optimized image delivery

## Common Patterns

### Creating a Server Action

```typescript
'use server'

import { revalidatePath } from 'next/cache'

export async function createRecipe(formData: FormData) {
  // 1. Validate input
  // 2. Make external API call
  // 3. Revalidate affected paths
  revalidatePath('/recipes')
  return { success: true }
}
```

### Creating a Custom Hook

```typescript
'use client'

import { useState, useEffect } from 'react'

export function useRecipes() {
  // Hook logic here
  return { recipes, loading, error }
}
```

### API Client Setup

Use `src/services/api-client.ts` to configure fetch wrapper or axios instance with base URL from `src/config/env.ts`.

### Using Next.js Image Component

```typescript
import Image from 'next/image'
import { env } from '@/config/env'

// Images from CDN (pre-configured in next.config.ts)
<Image
  src={`${env.cdnImageUrl}/path/to/image.jpg`}
  alt="Description"
  width={500}
  height={300}
/>
```

The CDN hostname is automatically allowed in `next.config.ts` via `remotePatterns`.
