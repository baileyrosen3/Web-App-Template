# Railway Backend Server

## Overview

This is a Node.js Express backend server with PostgreSQL database integration, designed to be deployed on Railway.

## Prerequisites

- Node.js (v18+)
- pnpm
- Railway account

## Setup

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Copy `.env.example` to `.env` and fill in your configuration

## Development

```bash
pnpm dev  # Run in development mode
```

## Production

```bash
pnpm start  # Run in production mode
```

## Deployment

This backend is configured to be deployed on Railway. Ensure all environment variables are set in the Railway project settings.

## Technologies

- Express.js
- Sequelize ORM
- PostgreSQL
- Cors
- Dotenv
