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
- Docker Compose
- Git

### Development Setup

#### Local Development without Docker

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

#### Local Development with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/baileyrosen3/web-app-template.git
   cd web-app-template
   ```

2. Build and start services:

   ```bash
   # Build images
   docker compose build

   # Start services
   docker compose up
   ```

3. Access the application:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:3001](http://localhost:3001)
   - PostgreSQL: `localhost:5432`

### Docker Development Workflow

- **Hot Reloading**: Changes to frontend or backend code will automatically trigger rebuilds
- **Persistent Database**: PostgreSQL data is stored in a named volume
- **Environment Isolation**: All services run in isolated containers

#### Useful Docker Commands

```bash
# Stop all services
docker compose down

# Rebuild services
docker compose build

# View logs
docker compose logs -f

# Access a specific service's shell
docker compose exec frontend /bin/sh
docker compose exec backend /bin/sh
```

## Project Structure

- `apps/`: Contains application-specific code
  - `backend/`: Express.js backend server with PostgreSQL
  - `frontend/`: Next.js frontend application
- `docker-compose.yml`: Docker Compose configuration
- `apps/*/Dockerfile`: Individual service Dockerfiles

## Docker Configuration

- **Frontend Dockerfile**:
  - Uses Node.js 18 Alpine
  - Installs pnpm
  - Builds and runs Next.js application
- **Backend Dockerfile**:
  - Uses Node.js 18 Alpine
  - Installs pnpm
  - Generates Prisma client
  - Runs Express.js backend
- **docker-compose.yml**:
  - Configures PostgreSQL, frontend, and backend services
  - Sets up development watch mode
  - Manages service dependencies

## Technologies

### Backend

- Express.js
- Sequelize ORM
- PostgreSQL
- Cors
- Dotenv

### Docker

- Docker Compose
- Multi-stage builds
- Development watch mode
- Service isolation

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

## Deployment Guide

### Prerequisites for Deployment

- GitHub account
- Vercel account
- Railway account
- Cursor AI agent (optional but recommended)

### Deployment Workflow

#### 1. Prepare Your Repository

1. Ensure your project is pushed to a GitHub repository
2. Verify all environment variables are properly configured
3. Check that all dependencies are correctly specified in `package.json`

#### 2. Railway Deployment (Backend & Database)

##### Manual Deployment

1. Go to [Railway](https://railway.app/)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository

##### Recommended Configuration

- **Service Type**: Web Service (Backend)

  - Root Directory: `apps/backend`
  - Build Command: `pnpm install && pnpm prisma generate`
  - Start Command: `pnpm start`

- **Database Service**: PostgreSQL
  - Automatically generates connection URL
  - Add as `DATABASE_URL` environment variable

##### Cursor AI Deployment Assistant

```bash
# Cursor can help generate deployment configuration
/deploy railway --project-name=web-app-template
```

#### 3. Vercel Deployment (Frontend)

##### Manual Deployment

1. Go to [Vercel](https://vercel.com/)
2. Click "New Project"
3. Import Git Repository
4. Configure Project Settings:
   - Root Directory: `apps/frontend`
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

##### Environment Variables

Set the following in Vercel:

- `NEXT_PUBLIC_API_URL`: Backend Railway URL
- Other frontend-specific environment variables

##### Cursor AI Deployment Assistant

```bash
# Cursor can help configure Vercel deployment
/deploy vercel --project-name=web-app-template
```

#### 4. Connecting Services

1. Copy the Railway backend URL
2. Set `NEXT_PUBLIC_API_URL` in Vercel environment variables
3. Ensure database connection is configured

#### Automated Deployment Checklist

- [ ] GitHub repository is set up
- [ ] Railway backend service configured
- [ ] PostgreSQL database created
- [ ] Vercel frontend deployment configured
- [ ] Environment variables synchronized
- [ ] Prisma schema deployed
- [ ] Initial database migrations run

### Troubleshooting Deployment

#### Common Issues

- Ensure matching Node.js versions across services
- Verify pnpm is used consistently
- Check environment variable compatibility
- Validate Prisma schema and migrations

#### Debugging Deployment

```bash
# Cursor can help diagnose deployment issues
/diagnose deployment --service=railway,vercel
```

### Continuous Deployment (CD)

#### GitHub Actions

- Automatic deployments configured in `.github/workflows/ci.yml`
- Runs tests, linting, and deployment checks

#### Deployment Monitoring

- Vercel provides real-time deployment logs
- Railway offers service monitoring
- GitHub Actions show CI/CD pipeline status

### Best Practices

1. Use environment-specific configurations
2. Keep sensitive data in environment variables
3. Implement proper error handling
4. Set up monitoring and logging
5. Regularly update dependencies

### Recommended Tools

- **Deployment**: Vercel, Railway
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, LogRocket
- **Performance**: Vercel Analytics

### Next Steps After Deployment

1. Set up custom domain
2. Configure SSL certificates
3. Set up staging environments
4. Implement comprehensive monitoring

## Deployment Troubleshooting

If you encounter issues during deployment, Cursor's AI agent can help:

```bash
# Get deployment assistance
/help deployment-issues
```

For specific error diagnostics:

```bash
# Diagnose specific deployment problems
/diagnose deployment-error --context=railway,vercel
```
