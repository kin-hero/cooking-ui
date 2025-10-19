# Cooking Website

A modern cooking website built with [Next.js 15](https://nextjs.org), React 19, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables) section)

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Available Scripts

```bash
npm run dev        # Start development server with Turbopack
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript type checking
```

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

### Folder Organization

- **`app/`** - Next.js App Router pages and layouts
- **`types/`** - All TypeScript type definitions for type safety
- **`lib/`** - Shared utility functions and helpers
- **`services/`** - API calls to external services (using fetch/axios)
- **`components/`** - React components organized by purpose:
  - `ui/` - Reusable UI building blocks
  - `forms/` - Complete form components
  - `layout/` - Page structure components
  - `features/` - Business logic components
- **`hooks/`** - Custom React hooks for reusable logic
- **`actions/`** - Server Actions for form submissions and mutations
- **`config/`** - Application configuration and settings

## Environment Variables

This project uses environment files to manage configuration for different environments.

### Environment Files

- **`.env.development`** - Development environment (used with `npm run dev`)
- **`.env.production`** - Production environment (used with `npm run build`)
- **`.env*.local`** - Local overrides and secrets (git-ignored)

### Setup

1. The project includes `.env.development` and `.env.production` files (committed to git)
2. For local overrides or secrets, create a `.env.local` file (not committed)

### Environment Variables

```bash
# Public variables (exposed to browser)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Important Notes:**
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Variables without the prefix are server-side only
- Restart the dev server after changing environment variables
- `.env.local` has the highest priority and overrides all other env files

### How It Works

```bash
npm run dev     # Automatically uses .env.development
npm run build   # Automatically uses .env.production
```

Next.js automatically loads the correct environment file based on the command you run.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
- [React Documentation](https://react.dev) - React fundamentals
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Tailwind utility classes

## Github Actions

Everytime there is a PR to the `main` branch, it will trigger the lint, typecheck and build actions.
