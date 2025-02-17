# System Patterns

## Architecture
- Monorepo structure using pnpm workspaces
- Frontend and backend as separate applications
- Clear separation of concerns between layers

## Key Technical Decisions
1. Frontend:
   - Next.js 14 for modern React development
   - TypeScript for type safety
   - Tailwind CSS for styling
   
2. Backend:
   - Express.js with TypeScript
   - PostgreSQL database
   - Prisma ORM for database operations
   
3. Development:
   - pnpm for package management
   - Environment-specific configurations
   - AI-assisted development with Cursor IDE

## Architecture Patterns
1. API Design:
   - RESTful endpoints
   - Type-safe API contracts
   - Proper error handling

2. Database:
   - Migration-based schema management
   - Environment-specific connections
   - Secure credential handling

3. Deployment:
   - Automated CI/CD
   - Environment variable management
   - Separate frontend/backend deployments

## Directory Structure

```
src/
├── app/             # App Router pages and layouts
├── components/      # Reusable React components
├── lib/            # Utility functions and shared logic
├── styles/         # Global styles and Tailwind config
└── types/          # TypeScript type definitions
```

## Best Practices

- Use TypeScript for all components and functions
- Implement proper error boundaries
- Follow React Server Component patterns
- Use proper loading and error states
- Implement responsive design with Tailwind
- Follow ESLint rules for consistent code style
