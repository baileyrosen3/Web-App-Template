# Web App Template

A modern full-stack web application template with automated deployments using Vercel and Railway.

## Features

- 🚀 Next.js 14 frontend with TypeScript
- 🛠 Express.js backend with TypeScript
- 🎨 Tailwind CSS for styling
- 🔒 Authentication ready
- 📦 PostgreSQL database with Prisma ORM  

## AI-Assisted Setup Guide

This template comes with built-in AI assistance capabilities to help you through the setup process. Follow these steps to enable AI assistance:

1. **Install Cursor IDE**
   - Download and install Cursor from [cursor.sh](https://cursor.sh)
   - This specialized IDE provides integrated AI assistance capabilities

2. **Configure AI Settings**
   - Open Cursor settings
   - Select Claude 3.5 Sonnet as your AI model
   - Enable Agent Mode
   - Enable git MCP server integration

3. **Use AI Setup Assistant**
   Copy and paste the following prompt to get started with the AI assistant:

   ```markdown 
   I am setting up a new project using the web-app-template (https://github.com/baileyrosen3/web-app-template). I need your assistance in completing the setup process correctly. Please help me by:

   1. Tracking my progress through the setup steps
   2. Providing detailed guidance for each step
   3. Helping troubleshoot any issues that arise
   4. Ensuring all environment variables are set correctly
   5. Verifying that each component (frontend, backend, database) is properly configured
   6. Walking through the README.md documentation step-by-step until we reach the troubleshooting section

   Here's what you need to know about my current status:

   [PLEASE FILL IN THE FOLLOWING]
   - Project Name: [Your project name]
   - Current Step: [Which setup step you're on]
   - Environment: [Your local development environment details (OS, Node version, etc.)]
   - Services Created: [List any services you've already set up (GitHub repo, Railway, Vercel, etc.)]
   - Current Issues: [Any problems you're experiencing]

   ## Documentation Progress Tracking

   Please help me work through each section of the README in order:
   1. Creating Your Own Project from This Template
   2. Setup GitHub Repository
   3. Setup Railway (Backend & Database)
   4. Setup Vercel (Frontend)
   5. Test the Setup
   6. Local Development

   For each section:
   - Explain what we're about to do
   - Provide guidance for each step
   - Verify completion before moving to next section
   - Help troubleshoot any issues that arise

   ## Your Role As Assistant

   You should:

   1. ALWAYS verify my current progress before providing next steps
   2. Keep track of completed steps and remaining tasks
   3. Provide specific, actionable guidance for each step
   4. Help troubleshoot issues by:
      - Requesting relevant error messages or logs
      - Suggesting specific diagnostic commands
      - Providing step-by-step solutions
   5. Verify environment variables and configurations
   6. Ensure security best practices are followed
   7. Help test connections between components
   8. Track our progress through the README documentation

   ## Important Checkpoints

   Please verify these critical points during setup:

   1. Repository initialization and GitHub setup
   2. Environment variables configuration
   3. Database connection and migrations
   4. Frontend-backend communication
   5. Development environment functionality
   6. Production deployment readiness

   ## Special Instructions

   1. If I encounter errors, please request:
      - Relevant error messages
      - Current environment variables (without sensitive values)
      - Log outputs
      - Results of specific diagnostic commands

   2. For security-related steps:
      - Remind me to never commit sensitive data
      - Verify proper environment variable handling
      - Ensure secure communication between services

   3. For deployment steps:
      - Help verify all necessary environment variables
      - Ensure proper service configuration
      - Guide through testing deployment success

   Please acknowledge these instructions and begin by verifying my current status and providing guidance for my next steps. Let's start with the first section of the README: "Creating Your Own Project from This Template".
   ```

4. **Working with the AI Assistant**
   - The AI will track your progress through setup
   - It will provide specific, actionable guidance
   - It can help troubleshoot issues
   - It will verify your configuration at each step
   - It maintains context through the git MCP server

5. **Best Practices**
   - Always provide clear status updates to the AI
   - Share error messages when seeking help
   - Allow the AI to verify critical checkpoints
   - Follow security recommendations
   - Use the AI to validate your configuration

The AI assistant will help ensure:
- Proper repository initialization
- Correct environment variable configuration
- Database setup and migrations
- Frontend-backend communication
- Development environment functionality
- Production deployment readiness

## Creating Your Own Project from This Template

### Step 1: Clone and Rename Project

1. Clone the repository:

   ```bash
   git clone https://github.com/baileyrosen3/web-app-template.git your-project-name
   cd your-project-name
   ```

2. Update project details:

   - Search and replace "web-app-template" with "your-project-name" in:
     - `package.json`
     - `apps/frontend/package.json`
     - `apps/backend/package.json`
     - `docker-compose.yml`
   - Update project description and author information in package.json files

3. Reinitialize git repository:
   ```bash
   rm -rf .git
   git init
   git add .
   git commit -m "Initial commit from template"
   ```

### Step 2: Setup GitHub Repository

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git remote add origin https://github.com/your-username/your-project-name.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Setup Railway (Backend & Database)

1. Create a Railway account at [railway.app](https://railway.app)
2. Create a new project in Railway
3. Add a PostgreSQL database:

   - Click "New Service" → "Database" → "PostgreSQL"
   - Save the database connection URL

4. Deploy the backend:
   - Click "New Service" → "GitHub Repo"
   - Select your repository
   - Configure deployment settings:
     - Root Directory: `apps/backend`
     - Build Command: `pnpm install && pnpm prisma generate`
     - Start Command: `pnpm start`
5. Set environment variables in Railway:
   - Copy variables from `apps/backend/.env.example`
   - Set `DATABASE_URL` to the PostgreSQL connection URL
   - Set other required environment variables

### Step 4: Setup Vercel (Frontend)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure project settings:

   - Root Directory: `apps/frontend`
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. Set environment variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add all variables from your production configuration:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_API_URL=https://your-production-backend-url.com
     ```
   - Make sure to select "Production" environment only
   - These variables will automatically override any values in `.env.production`

5. **Environment Files Explained**:
   - `.env.development` - Used automatically when running `pnpm dev`
   - `.env.production` - Used automatically when running `pnpm build` or `pnpm start`
   - Vercel environment variables take precedence over `.env.*` files
   - Never commit sensitive values in any `.env` files

6. Verify deployment:
   - Check Vercel build logs to confirm environment
   - Verify API connections in the deployed application
   - Test all environment-dependent features

7. For local production testing:
   ```bash
   # Test production build locally
   NODE_ENV=production pnpm build
   pnpm start
   ```

### Step 5: Test the Setup

1. Test backend connection:

   ```bash
   # Your Railway backend URL
   curl https://your-project-name-production.up.railway.app/api/health
   ```

2. Test frontend:
   - Visit your Vercel deployment URL
   - Verify that the frontend can communicate with the backend by running the test backend and test database buttons in the frontend
   - Test authentication if implemented by running the login and signup buttons in the frontend
   - Check database connections


If the frontend or backend is not working, please refer to the troubleshooting section below. If they are working, you are all set! Please move on to the local development section below to start developing your project.

### Local Development

#### Setup Steps

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   # Backend environment setup
   cp apps/backend/.env.example apps/backend/.env.development  # For local development
   cp apps/backend/.env.example apps/backend/.env.production   # For production

   # Frontend environment setup
   cp apps/frontend/.env.example apps/frontend/.env.development  # For local development
   cp apps/frontend/.env.example apps/frontend/.env.production   # For production
   ```
   
   Update the development variables in `apps/backend/.env.development`:
   ```
   PORT=8080
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   
   # Database Configuration
   PGHOST=localhost        # Local PostgreSQL host
   PGPORT=5432
   POSTGRES_DB=webapp_dev  # Local development database
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_local_password
   DATABASE_URL="postgresql://postgres:your_local_password@localhost:5432/webapp_dev"
   
   # Security
   JWT_SECRET=your_local_jwt_secret_key
   API_KEY=your_local_api_key
   ```

   Update the production variables in `apps/backend/.env.production`:
   ```
   PORT=8080
   NODE_ENV=production
   FRONTEND_URL=https://your-production-frontend-url.com
   
   # Database Configuration (Railway PostgreSQL)
   PGHOST=your_railway_postgres_host
   PGPORT=5432
   POSTGRES_DB=railway
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_postgres_password
   DATABASE_URL=your_railway_database_url
   
   # Security
   JWT_SECRET=your_production_jwt_secret_key
   API_KEY=your_production_api_key
   ```

   Update the development variables in `apps/frontend/.env.development`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

   Update the production variables in `apps/frontend/.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-production-backend-url.com
   ```

   The environment files will be automatically selected based on:
   - Development: `pnpm dev` uses `.env.development`
   - Production: `pnpm start` uses `.env.production`
   - Railway/Vercel: Use `.env.production` settings in their respective environment variables

3. **Initialize Database:**
   ```bash
   cd apps/backend
   pnpm prisma generate    # Generate Prisma client
   pnpm prisma migrate deploy    # Apply database migrations
   cd ../..
   ```

4. **Change the version number**
   - Change the version number in the `apps/frontend/src/lib/version.ts` file
   - Change the version number in the `apps/backend/src/lib/version.ts` file

5. **Start the Development Servers:**
   ```bash
   pnpm dev
   ```
   This will start both frontend and backend servers:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

5. **Start the Production Servers:**
   ```bash
   pnpm start
   ```
   This will start both frontend and backend servers:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

6. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Made changes to the code"
   git push -u origin main
   ```

7. **Deploy your changes:**
   - Push your changes to the main branch
   - Railway will automatically deploy your changes
   - Vercel will automatically deploy your changes
   - Check the logs to make sure the deployment is successful

8. **Test the changes:**
   - Check frontend version number
   - Check backend version number
   - Test the changes in the development and production servers
   - Check the logs to make sure the deployment is successful

9. **Make more changes**
   - Make more changes to the code
   - Commit your changes
   - Deploy your changes
   - Test the changes

#### Troubleshooting

1. **Port Conflicts:**
   If you see port conflicts, you can kill existing processes:
   ```bash
   # On macOS/Linux
   lsof -ti:3000,8080 | xargs kill -9
   ```

2. **Prisma Client Issues:**
   If you see Prisma client initialization errors:
   ```bash
   cd apps/backend
   pnpm prisma generate
   ```

3. **Database Connection Issues:**
   - Verify your database credentials in `apps/backend/.env`
   - Ensure your database is running and accessible
   - Check if migrations are up to date with `pnpm prisma migrate status`

4. **Common Issues:**
   - If the backend fails to start, check the database connection and environment variables
   - For frontend issues, verify the `NEXT_PUBLIC_API_URL` points to the correct backend URL
   - Make sure all required environment variables are set correctly

- If the backend fails to deploy, check Railway logs
- For frontend issues, verify Vercel build logs
- Ensure all environment variables are correctly set
- Check database connection string format
- Verify that the frontend API URL points to the correct backend

### Database Commands

We provide several npm scripts to manage both development and production databases:

#### Viewing & Editing Data

```bash
# Open Prisma Studio for development database
npm run db:studio:dev

# Open Prisma Studio for production database
npm run db:studio:prod
```

#### Database Synchronization

```bash
# Pull schema from production
npm run db:pull:prod

# Push schema to development
npm run db:push:dev

# Create and apply migrations (development)
npm run db:migrate:dev

# Deploy migrations to production
npm run db:migrate:prod

# Seed development database with test data
npm run db:seed:dev
```

### Best Practices

1. **Development Workflow**:

   ```bash
   # 1. Make schema changes locally
   # 2. Test in development
   npm run db:migrate:dev

   # 3. When ready, deploy to production
   npm run db:migrate:prod
   ```

2. **Team Collaboration**:

   ```bash
   # 1. Pull latest production schema
   npm run db:pull:prod

   # 2. Apply to local development
   npm run db:push:dev

   # 3. Make changes
   # 4. Test migrations
   npm run db:migrate:dev
   ```

### Important Rules

1. Never push directly to production database (use migrations)
2. Always test migrations in development first
3. Keep development database disposable
4. Use seed scripts for test data
5. Commit all migration files to version control

### Troubleshooting

1. **Connection Issues**:

   - Verify PostgreSQL is running: `brew services list`
   - Check connection URLs in environment files
   - Ensure correct credentials

2. **Migration Problems**:

   - Clear development database if needed: `dropdb webapp_dev && createdb webapp_dev`
   - Check Prisma migration history: `npx prisma migrate status`

3. **Schema Conflicts**:
   - Reset development database: `npm run db:push:dev --force`
   - Pull fresh production schema: `npm run db:pull:prod`

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
