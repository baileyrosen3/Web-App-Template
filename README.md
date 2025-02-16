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

- `apps/`: Contains application-specific code
  - `backend/`: Express.js backend server with PostgreSQL
  - (Frontend directory)

## Backend Setup

The backend is built with Express.js and uses Sequelize ORM for PostgreSQL database interactions.

### Key Features

- Railway-ready deployment configuration
- PostgreSQL database integration
- Environment-based configuration
- Basic User model example

### Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Navigate to backend directory:

```bash
cd apps/backend
```

3. Copy `.env.example` to `.env` and configure your settings

4. Run in development:

```bash
pnpm dev
```

## Deployment

### Railway Deployment

- Create a new Railway project
- Add PostgreSQL service
- Set environment variables from `.env.example`
- Deploy backend and frontend services

## Technologies

### Backend

- Express.js
- Sequelize ORM
- PostgreSQL
- Cors
- Dotenv

## Documentation

- [Frontend Documentation](./apps/frontend/README.md)
- [Backend Documentation](./apps/backend/README.md)
- [API Documentation](./docs/api/README.md)
- [Development Guide](./docs/development.md)
- [Deployment Guide](./docs/deployment.md)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
