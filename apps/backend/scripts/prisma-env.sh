#!/bin/bash

# Check if environment parameter is provided
if [ -z "$1" ]; then
    echo "Usage: ./prisma-env.sh [dev|prod]"
    exit 1
fi

# Set the environment file based on parameter
if [ "$1" = "dev" ]; then
    ENV_FILE=".env.development"
elif [ "$1" = "prod" ]; then
    ENV_FILE=".env"
else
    echo "Invalid environment. Use 'dev' or 'prod'"
    exit 1
fi

# Execute Prisma command with the correct environment
NODE_ENV=$1 npx prisma "$2" --schema=./prisma/schema.prisma 