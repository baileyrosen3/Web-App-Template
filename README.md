# Web App Template

A modern full-stack web application template with automated deployments using Vercel and Railway.

## Features

- 🚀 Next.js 14 frontend with TypeScript
- 🛠 Express.js backend with TypeScript
- 🎨 Tailwind CSS for styling
- 🔒 Authentication ready
- 📦 PostgreSQL database with Prisma ORM
- 🧪 Comprehensive testing setup
- 📱 Responsive design
- 🔄 CI/CD with GitHub Actions
- 📊 API documentation
- 🐳 Docker support

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm
- Docker
- Git

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/baileyrosen3/web-app-template.git
   cd web-app-template
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp apps/frontend/.env.example apps/frontend/.env
   cp apps/backend/.env.example apps/backend/.env
   ```

4. Start the development environment:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
web-app-template/
├── apps/
│   ├── frontend/        # Next.js frontend
│   └── backend/         # Express.js backend
├── packages/
│   ├── eslint-config/   # Shared ESLint configuration
│   ├── typescript-config/ # Shared TypeScript configuration
│   └── ui/              # Shared UI components
├── docker/              # Docker configuration
└── docs/               # Documentation
```

## Documentation

- [Frontend Documentation](./apps/frontend/README.md)
- [Backend Documentation](./apps/backend/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/development.md)
- [Deployment Guide](./docs/deployment.md)

## Contributing

Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
