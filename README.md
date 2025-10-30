# Recipify - Full-Stack Recipe Platform UI

[**View Live Demo**](https://recipify.keanesetiawan.com/) | [**Read Full Case Study**](https://keanesetiawan.com/projects/recipify)

A production-grade, modern recipe platform UI built with Next.js 15, React 19, and TypeScript. This frontend application provides a seamless user experience for creating, managing, and sharing recipes, featuring secure authentication, optimized image delivery via AWS CloudFront CDN, and a fully type-safe architecture.

## Core Features

- **Full Recipe Management:** Browse, create, edit, and delete recipes with a beautiful, intuitive interface
- **Secure Authentication UI:** Sign-up, sign-in, and session management using NextAuth.js
- **Email Verification Flow:** User-friendly email verification experience
- **Optimized Image Display:** Recipe images served globally via AWS CloudFront CDN for fast load times
- **Responsive Design:** Mobile-first design that works seamlessly across all devices
- **Type-Safe Development:** Built with TypeScript in strict mode for maximum reliability
- **Server-Side Rendering:** Optimized SEO and performance using Next.js App Router

## Tech Stack

| Area | Technology |
| --- | --- |
| **Framework** | Next.js 15 (App Router with Turbopack) |
| **UI Library** | React 19 |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | NextAuth.js |
| **Image Optimization** | Next.js Image + AWS CloudFront CDN |
| **Icons** | react-icons |
| **Fonts** | Geist Sans & Geist Mono (via next/font) |
| **Deployment** | AWS Amplify |
| **Linting** | ESLint with Next.js config |

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn, pnpm, bun)
- Access to the backend API (see case study for backend architecture)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cooking-ui
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# The project includes .env.development for local development
# For production or custom configuration, create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_CDN_URL=https://dadfsd6r1phhkgo7.cloudfront.net
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:4000](http://localhost:4000) to view the app in your browser.

**Note:** This UI runs on port **4000** by default (configured in [package.json](package.json)).

### Available Scripts

```bash
npm run dev        # Start development server with Turbopack on port 4000
npm run build      # Build for production with Turbopack
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

## Frontend Architecture

This project follows a **feature-based architecture** with clear separation between client and server code, leveraging Next.js 15 App Router patterns for optimal performance and developer experience.

## Project Structure

```
src/
├── app/                      # Next.js App Router (pages & routing)
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── global.css            # Global styles
│
├── types/                    # TypeScript type definitions
│   ├── index.ts              # Central export file
│   ├── recipe.ts             # Recipe-related types
│   └── user.ts               # User-related types
│
├── lib/                      # Utility functions
│   ├── utils.ts              # Generic helper functions
│   ├── cn.ts                 # Tailwind class merger utility
│   └── constants.ts          # App-wide constants
│
├── services/                 # API calls & external integrations
│   ├── api-client.ts         # Base API client configuration
│   └── recipe-service.ts     # Recipe-related API functions
│
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   ├── forms/                # Form components
│   │   └── recipe-form.tsx
│   ├── layout/               # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── nav.tsx
│   └── features/             # Feature-specific components
│       └── recipe-card.tsx
│
├── hooks/                    # Custom React hooks
│   ├── use-debounce.ts
│   └── use-recipes.ts
│
├── actions/                  # Next.js Server Actions
│   ├── recipe-actions.ts     # Recipe mutations
│   └── form-actions.ts       # Generic form handling
│
└── config/                   # Configuration files
    ├── site.ts               # Site metadata & navigation
    └── env.ts                # Type-safe environment variables
```

### Architecture Principles

**1. Server Components First**
- Components in `app/` are Server Components by default for optimal performance
- Use `'use client'` directive only when needed (hooks, events, browser APIs)

**2. Clear Component Boundaries**
- **`ui/`** - Generic, reusable UI primitives (Button, Input, Card)
- **`features/`** - Business-specific components (RecipeCard, RecipeList)
- **`forms/`** - Self-contained form components with state management
- **`layout/`** - Structural components (Header, Footer, Navigation)

**3. Type Safety Throughout**
- Strict TypeScript mode enabled
- Central type exports via `@/types`
- Type-safe environment variables via `@/config/env`

**4. Optimized Data Flow**
- Server Actions (`actions/`) for mutations
- API services (`services/`) for external calls
- Custom hooks (`hooks/`) for client-side state logic

### Key Folders Explained

- **`app/`** - Next.js App Router (pages, layouts, routing, metadata)
- **`types/`** - TypeScript definitions centrally exported through [index.ts](src/types/index.ts)
- **`lib/`** - Pure utility functions (no React dependencies)
- **`services/`** - API client wrappers for backend communication
- **`components/`** - React components organized by responsibility
- **`hooks/`** - Custom React hooks (must start with `use`)
- **`actions/`** - Next.js Server Actions with `'use server'` directive
- **`config/`** - App configuration and type-safe environment variables

## Environment Configuration

This project uses a **type-safe environment system** with separate configurations for development and production.

### Environment Files

| File | Purpose | Committed |
| --- | --- | --- |
| `.env.development` | Local development (port 3000 API) | Yes |
| `.env.production` | Production build (AWS API Gateway) | Yes |
| `.env.local` | Local secrets & overrides | No (git-ignored) |

### Required Variables

```bash
# Backend API endpoint
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# CloudFront CDN for optimized image delivery
NEXT_PUBLIC_CDN_URL=https://dadfsd6r1phhkgo7.cloudfront.net
```

### Type-Safe Access

**Always** access environment variables through [src/config/env.ts](src/config/env.ts):

```typescript
// ✅ Correct - Type-safe
import { env } from '@/config/env'
const apiUrl = env.apiUrl

// ❌ Avoid - Not type-safe
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

### Image Configuration

Images are served from AWS CloudFront CDN and configured in [next.config.ts](next.config.ts):

```typescript
// next.config.ts automatically allows CDN domain
remotePatterns: [
  {
    protocol: 'https',
    hostname: new URL(env.cdnImageUrl).hostname,
  }
]
```

### How It Works

```bash
npm run dev     # Auto-loads .env.development
npm run build   # Auto-loads .env.production
```

**Important Notes:**
- All public variables must be prefixed with `NEXT_PUBLIC_`
- `.env.local` overrides all other env files
- Restart dev server after changing environment variables

## Development Best Practices

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

### Component Patterns

**Server Components (default):**
```typescript
// No 'use client' needed - runs on server
export default function RecipePage() {
  return <RecipeList />
}
```

**Client Components:**
```typescript
'use client'

import { useState } from 'react'

export function RecipeForm() {
  const [title, setTitle] = useState('')
  // ...
}
```

**Server Actions:**
```typescript
'use server'

import { revalidatePath } from 'next/cache'

export async function createRecipe(formData: FormData) {
  // Validate, call API, revalidate
  revalidatePath('/recipes')
  return { success: true }
}
```

### Image Optimization

Using Next.js Image with CloudFront CDN:

```typescript
import Image from 'next/image'
import { env } from '@/config/env'

<Image
  src={`${env.cdnImageUrl}/recipes/image.jpg`}
  alt="Recipe image"
  width={500}
  height={300}
/>
```

## CI/CD Pipeline

GitHub Actions runs on every PR to `main`:

1. **ESLint** - Code quality checks (`npm run lint`)
2. **TypeScript** - Type checking (`npm run typecheck`)
3. **Build** - Production build validation (`npm run build`)

All checks must pass before merge approval.

## Deployment
- **Production:** [https://recipify.keanesetiawan.com/](https://recipify.keanesetiawan.com/)

## Learn More

### Technologies
- [Next.js Documentation](https://nextjs.org/docs) - App Router, Server Components, and API
- [React Documentation](https://react.dev) - React 19 features and hooks
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Type system and best practices
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework

### Project Resources

- [Live Demo](https://recipify.keanesetiawan.com/)
- [Full Case Study](https://keanesetiawa.com/projects/recipify) - Architecture, challenges, and solutions
- [Backend Repository](https://github.com/yourusername/recipify-api) - Fastify API with AWS Lambda
