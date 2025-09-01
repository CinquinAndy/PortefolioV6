# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Core development:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

**Code quality:**

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run prettier` - Format code with Prettier

**Testing:**

- `pnpm run cypress:run` - Run Cypress e2e tests

## Architecture Overview

This is a Next.js 15 portfolio application with internationalization (i18n) support for French and English.

**Key architectural patterns:**

- **App Router Structure**: Uses Next.js App Router with locale-based routing (`src/app/[locale]/`)
- **Domain-based i18n**: Middleware handles locale switching based on domain (French for main domain, English for alternate)
- **Component Architecture**: Organized into reusable components in `src/components/` with Global, blog, and UI subfolders
- **API Integration**: Connects to Strapi CMS backend for blog and portfolio content
- **Email Service**: Uses Mailgun for contact form functionality

**Directory Structure:**

```
src/
├── app/[locale]/           # App Router pages with internationalization
├── components/             # Reusable components
│   ├── Global/            # Global components (animations, cursor, etc.)
│   ├── blog/              # Blog-specific components
│   └── ui/                # UI components
├── services/              # External service integrations
├── pages/api/             # API routes for server-side functionality
├── lib/                   # Utility libraries
├── styles/                # Global styles
└── utils/                 # Utility functions
```

**i18n Configuration:**

- Locales: `['fr', 'en']`
- Default locale determined by domain via middleware
- Uses `next-i18n-router` for routing

**Styling:**

- TailwindCSS for styling
- Framer Motion for animations
- Headless UI for accessible components
- Custom gradient backgrounds and Lottie animations

**Code Quality:**

- ESLint with strict configuration including perfectionist plugin for import sorting
- Prettier for code formatting
- Husky + lint-staged for pre-commit hooks
- React Strict Mode enabled

## Important Notes

- Uses package manager flexibility (pnpm/npm/yarn) but avoid pushing lock files
- Environment variables required for domain-based locale switching
- Images configured to accept remote patterns from any hostname
- Custom webpack configuration for HeadlessUI compatibility
