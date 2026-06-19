#!/bin/sh

# Startup script for TaskFlow API
# Handles Prisma migrations and starts the server

set -e  # Exit on error

echo "🚀 Starting TaskFlow API..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set!"
  echo "Please set the DATABASE_URL environment variable before running."
  exit 1
fi

# Navigate to server directory
cd server

# Run Prisma migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy || {
  echo "⚠️  Migration warning, continuing startup..."
}

# Go back to app root
cd ..

# Start the application
echo "✅ Starting Node.js server..."
exec node server/dist/server.js
