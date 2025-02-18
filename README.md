# Web App Template

A modern full-stack web application template with automated deployments using Vercel and Railway.

## Features

- 🚀 Next.js 14 frontend with TypeScript
- 🛠 Express.js backend with TypeScript
- 🎨 Tailwind CSS for styling
- 🔒 Authentication ready
- 📦 PostgreSQL database with Prisma ORM  

## AI-Assisted Setup Guide

1. **Install Cursor IDE**
   - Download and install Cursor from [cursor.sh](https://cursor.sh)
   - This specialized IDE provides integrated AI assistance capabilities

2. **Configure AI Settings**
   - Open Cursor settings
   - Select Claude 3.5 Sonnet as your AI model
   - Enable Agent Mode
   - Enable git MCP server integration

3. **Working with the AI Assistant**
   - The AI will track your progress through setup
   - It will provide specific, actionable guidance
   - It can help troubleshoot issues
   - It will verify your configuration at each step
   - It maintains context through the git MCP server

4. **Best Practices**
   - Always provide clear status updates to the AI
   - Share error messages when seeking help
   - Allow the AI to verify critical checkpoints
   - Follow security recommendations
   - Use the AI to validate your configuration

## Creating Your Own Project from This Template

### Step 1: Clone and Rename Project

1. Clone the repository:
   Change your project name to your desired project name:
   ```bash
   git clone https://github.com/baileyrosen3/web-app-template.git your-project-name
   ```

3. Update project details:
   - Ask AI assistant to update project details. Make sure you have agent mode enabled. Paste the following into the AI assistant:
   
   ```markdown
   Hello, I am a helpful assistant. I can help you update the project details. Ask me the user project name and I will update the project details for you.
      - Search and replace "web-app-template" with "your-project-name" in all files
      - Update project description and author information in package.json files *
   ```

4. Reinitialize git repository:
   - Ask AI assistant to reinitialize the git repository. Make sure you have agent mode enabled and git MCP server integration enabled. Paste the following into the AI assistant:
   ```markdown
   Hello, I am a helpful assistant. I can help you reinitialize the git repository. Make sure you have agent mode enabled and git MCP server integration enabled. Paste the following into the AI assistant:
      ```bash
      rm -rf .git
      git init
      git add .
      git commit -m "Initial commit from template"
      git remote add origin https://github.com/your-username/your-project-name.git
      git branch -M main
      git push -u origin main
      ```
   ```

### Step 2: Local Development

1. **Docker Setup:**
   -Everything needed to run the development servers is in the `docker-compose.yml` and `Dockerfile` files. The `docker-compose.yml` file will start the development database, frontend, and backend servers. The `Dockerfile` file will build the development servers. This will allow you to run the development servers without having to install the dependencies on your machine.
      - Run `docker compose build` to build the development servers
      - Run `docker compose up` to start the development servers
      - Run `docker compose up --build` to start the development servers and rebuild the images
      - Run `docker compose down` to stop the development servers
      - Run `docker compose down -v` to stop the development servers and remove the volumes

   This will initialize the development database and will start both frontend and backend servers:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)

### Step 3: Setup Railway (Backend & Database)

**Do the following steps in Railway. Not through AI assistant.**

1. Create a Railway account at [railway.app](https://railway.app)
2. Create a new project in Railway
3. Add a PostgreSQL database:
   - Click "New Service" → "Database" → "PostgreSQL"
   - Save the database connection URL
4. Deploy the backend:
   - In dashboard where postgres service is running, click "+Create" → "GitHub Repo"
   - Select your repository
   - Go to "GitHub Repo" → "Settings" → "Source Repo" → "Add Route Directory"
     - Root Directory: `apps/backend`
     - Select checkmark to confirm
     - Go tp "Networking" → "Public Networking" → "Generate Domain"
     - Add port 8080
     - Copy domain so we can add to Vercel
5. Set environment variables in Railway:
   - Go to "GitHub Repo" → "Variables"
   - Copy variables from PostgreSQL service dashboard in Railway, should be 11 variables
   - Add JWT_SECRET 
      Create a secure JWT secret in terminal using:
     ```bash
     openssl rand -base64 32
     ```
   - Add NODE_ENV=production
   - Add SSL_CERT_DAYS=365  # Validity period for SSL certificate
   - Click "Deploy" on main page
   - List of required environment variables:

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
     JWT_SECRET=your_jwt_secret 
     SSL_CERT_DAYS=365  # Validity period for SSL certificate

     # Frontend Variables - will fill these out later in vercel section
     FRONTEND_URL=your_frontend_url  
     CORS_ORIGIN=your_cors_origin  

   - Never commit these values to version control
6. Change name of project in Railway to your project name to match "*project-name*-backend" by going to "Settings" in top right corner of dashboard
7. Click "Deploy" on main page

### Step 4: Setup Vercel (Frontend)

**Do the following steps in Vercel. Not through AI assistant.**

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Add new and import your GitHub repository
3. Configure project settings:
   - Root Directory: `apps/frontend` should be selected automatically
   - Select "Production" environment

4. Set environment variables in Vercel:
   - Go to Project Settings > Environment Variables
   - Add all variables from your production configuration, make sure to change project-name to your project name

     NODE_ENV=production
     NEXT_PUBLIC_API_URL=https://{project-name-backend-production.up.railway.app} (value you copied from Railway, make sure to include https://)

   - Make sure to select "Production" environment only

5. Go back to Railway and add your vercel app domain to the following variables to the project in the "GitHub Repo" → "Variables":
   - Add FRONTEND_URL=your_frontend_url  #  https://your-frontend-domain.com (From Vercel)
   - Add CORS_ORIGIN=your_cors_origin  # https://your-frontend-domain.com (From Vercel)
   - Click "Deploy" on main page

6. Go to apps/backend/server.js and change the FRONTEND_URL to your Vercel app domain
origin: [
    'http://localhost:3000',
    'https://web-app-template-frontend-three.vercel.app'
  ],

### Step 5: Test the Remote Setup

1. Push your changes to the main branch
2. Wait for Railway and Vercel to deploy your changes.
3. Test frontend by going to your Vercel deployment URL
4. Test backend by going to your Railway deployment URL
5. Verify that the frontend can communicate with the backend by running the test backend and test database buttons in the frontend
6. Test authentication if implemented by running the login and signup buttons in the frontend
7. Check database connections

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
