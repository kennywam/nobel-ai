# Nobel AI Monorepo

This is a monorepo for the Nobel AI project, containing both frontend and backend applications.

## Repository Structure

```
nobel-ai/
├── packages/
│   ├── frontend-app/  # Next.js frontend application
│   └── backend-api/   # NestJS backend API
├── package.json       # Root package.json for monorepo management
└── pnpm-workspace.yaml # PNPM workspace configuration
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [PNPM](https://pnpm.io/) (v8 or later)

### Installation

```bash
# Install dependencies for all packages
pnpm install
```

### Development

```bash
# Start the backend in development mode
pnpm start:backend

# Start the frontend in development mode
pnpm start:frontend
```

### Building

```bash
# Build both frontend and backend
pnpm build

# Build only the backend
pnpm build:backend

# Build only the frontend
pnpm build:frontend
```

## Scripts

The following scripts are available from the root:

- `pnpm start:backend` - Start the backend in development mode
- `pnpm start:frontend` - Start the frontend in development mode
- `pnpm build` - Build all packages
- `pnpm build:backend` - Build only the backend
- `pnpm build:frontend` - Build only the frontend
- `pnpm lint` - Run linting for all packages
- `pnpm migrate:dev` - Run Prisma migrations in development
- `pnpm generate:dev` - Generate Prisma client
- `pnpm seed` - Run database seeding
- `pnpm studio` - Open Prisma Studio
- `pnpm email:dev` - Start email development server
- `pnpm generate-types` - Generate TypeScript types for the frontend
- `pnpm prisma:generate` - Generate Prisma client

## Version Control

This repository uses conventional commits for versioning. When creating a commit, please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
