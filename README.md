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
   I need your assistance in completing the setup process correctly.

   Please help me work through each section of the README.md in order:

   For each section:
   - Explain what we're about to do
   - Provide guidance for each step
   - Verify completion before moving to next section
   - Help troubleshoot any issues that arise

   Here's what you need to know about my current status:

   [PLEASE FILL IN THE FOLLOWING]
   - Project Name: [Your project name]
   - Current Step: [Which setup step you're on]
   - Environment: [Your local development environment details (OS, Node version, etc.)]
   - Services Created: [List any services you've already set up (GitHub repo, Railway, Vercel, etc.)]
   - Current Issues: [Any problems you're experiencing]

   ## Documentation Progress Tracking


   ## Your Role As Assistant

   ## Important Checkpoints

   Please verify these critical points during setup:

   1. Every new section of the README.md should be completed before moving on to the next section.
   2. Stop to check in after every major step.
   3. If I encounter errors, please request:
      - Relevant error messages
      - Current environment variables (without sensitive values)
      - Log outputs
      - Results of specific diagnostic commands
   4. For security-related steps:
      - Remind me to never commit sensitive data
      - Verify proper environment variable handling
      - Ensure secure communication between services

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


### Step 3: Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up Prisma and Database**:
   ```bash
   # Generate Prisma Client
   pnpm prisma generate

   # Create and apply database migrations
   pnpm prisma migrate dev --name init

   # Optional: Seed the database with initial data
   pnpm prisma db seed
   ```

   **Prisma Database Management Commands**:
   ```bash
   # Open Prisma Studio to view/edit database data
   pnpm prisma studio

   # Create a new migration after schema changes
   pnpm prisma migrate dev

   # Push schema changes to database (be careful in production)
   pnpm db push

   # Reset development database
   pnpm prisma migrate reset
   ```

   **Prisma Best Practices**:
   - Always run `prisma generate` after schema changes
   - Use migrations for schema updates in production
   - Never modify the database directly; use Prisma migrations
   - Keep your `schema.prisma` file version controlled

3. **Environment Configuration**:
   ### Environment File Setup

   ```bash
   # Backend environment setup
   cp apps/backend/.env.example apps/backend/.env

   # Frontend environment setup
   cp apps/frontend/.env.example apps/frontend/.env
   ```

   ### Local Development Environment

   #### 1. PostgreSQL Setup
   ```bash
   # Install PostgreSQL (macOS)
   brew install postgresql
   brew services start postgresql

   # Create development database and user
   createdb web-app-template_dev
   psql postgres
   ```

   PostgreSQL Configuration Commands:
   ```sql
   -- In PostgreSQL prompt
   CREATE USER web-app-template_dev_user WITH PASSWORD 'web-app-template_dev_password';
   CREATE DATABASE web-app-template_dev;
   GRANT ALL PRIVILEGES ON DATABASE web-app-template_dev TO web-app-template_dev_user;
   ```

   #### 2. Environment Variable Configuration

   **Development Environment (`apps/backend/.env.development`):**
   ```
   # Database Configuration
   NODE_ENV=development
   DATABASE_PUBLIC_URL=postgresql://localhost:5432/web-app-template_dev
   DATABASE_URL=postgresql://localhost:5432/web-app-template_dev
   PGDATA=/var/lib/postgresql/data
   PGDATABASE=web-app-template_dev
   PGHOST=localhost
   PGPASSWORD=web-app-template_dev_password
   PGPORT=5432
   PGUSER=web-app-template_dev_user
   POSTGRES_DB=web-app-template_dev
   POSTGRES_PASSWORD=web-app-template_dev_password
   POSTGRES_USER=web-app-template_dev_user

   # Security Configuration
   JWT_SECRET=dev_jwt_secret_change_in_production
   FRONTEND_URL=http://localhost:3000
   CORS_ORIGIN=http://localhost:3000
   SSL_CERT_DAYS=365
   ```

   **Frontend Development Environment (`apps/frontend/.env.development`):**
   ```
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NODE_ENV=development
   ```

   ### Security Best Practices

   1. **Never commit `.env` files to version control**
      - Add `.env*` to your `.gitignore`
      - Use environment-specific configurations

   2. **Secure Secrets**
      - Use unique JWT secrets for development and production
      - Rotate secrets periodically
      - Never share or expose secret keys

   3. **Database Security**
      - Use strong, unique passwords
      - Limit database user privileges
      - Use environment-specific database users

   ### Generating Secure Secrets

   ```bash
   # Generate a secure JWT secret
   openssl rand -base64 32
   ```

   ### Environment Selection

   The application automatically selects environment files based on:
   - Development: `pnpm dev` uses `.env.development`
   - Production: `pnpm start` uses `.env.production`
   - Railway/Vercel: Use `.env.production` settings

4. **Start the Development Servers:**
   ```bash
   pnpm dev
   ```
   This initialize the development database and will start both frontend and backend servers:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Made changes to the code"
   git push -u origin main
   ```

6. **Deploy your changes:**
   - Push your changes to the main branch
   - Once you have Railway deployed, Railway will automatically deploy your changes
   - Once you have Vercel deployed, Vercel will automatically deploy your changes
   - Check the logs to make sure the deployment is successful

7. **Make more changes**
   - Make more changes to the code
   - Commit your changes
   - Deploy your changes
   - Test the changes


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
5. Set environment variables in Railway:
   - Copy variables from PostgreSQL service dashboard in Railway
   - Add JWT_SECRET 
      Create a secure JWT secret in terminal using:
     ```bash
     openssl rand -base64 32
     ```
   - Add NODE_ENV=production
   - Add FRONTEND_URL=your_frontend_url  # Set based on environment:
                                    # Development: http://localhost:3000
                                    # Production: https://your-frontend-domain.com
   - Add CORS_ORIGIN=your_cors_origin  # Set based on environment:
                                  # Development: http://localhost:3000
                                  # Production: https://your-frontend-domain.com
   - Add SSL_CERT_DAYS=365  # Validity period for SSL certificate
   - List of required environment variables:
     ```
     # PostgreSQL Shared Database Variables
     DATABASE_PUBLIC_URL=your_public_database_url
     DATABASE_URL=your_private_database_url
     PGDATA=/var/lib/postgresql/data
     PGDATABASE=your_database_name
     PGHOST=your_database_host
     PGPASSWORD=your_database_password
     PGPORT=5432
     PGUSER=your_database_user
     POSTGRES_DB=your_database_name
     POSTGRES_PASSWORD=your_database_password
     POSTGRES_USER=your_database_user
     
     # Custom Environment Variables
     NODE_ENV=production
     JWT_SECRET=your_jwt_secret  # Generate using: openssl rand -base64 32
            - Generate a secure JWT secret by running:
            ```bash
            openssl rand -base64 32
            ```
     FRONTEND_URL=your_frontend_url  # Set based on environment:
                                    # Development: http://localhost:3000
                                    # Production: https://your-frontend-domain.com
     CORS_ORIGIN=your_cors_origin  # Set based on environment:
                                  # Development: http://localhost:3000
                                  # Production: https://your-frontend-domain.com
     SSL_CERT_DAYS=365  # Validity period for SSL certificate
       ```
   - Never commit these values to version control

### Step 4: Setup Vercel (Frontend)

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure project settings:

   - Root Directory: `apps/frontend`

4. Set environment variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add all variables from your production configuration:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_API_URL=https://project-name-production.up.railway.app
     ```
   - Make sure to select "Production" environment only

### Step 5: Test the Remote Setup

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
