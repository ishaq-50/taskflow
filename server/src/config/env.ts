import dotenv from 'dotenv';
dotenv.config();

// Generate random secrets if not provided
const generateRandomSecret = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const env = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || generateRandomSecret(),
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || generateRandomSecret(),
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

// Log warnings
if (env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not set, using SQLite (not recommended for production)');
  }
  if (!process.env.JWT_ACCESS_SECRET) {
    console.warn('⚠️  JWT_ACCESS_SECRET not provided, using generated secret (not persistent across restarts)');
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    console.warn('⚠️  JWT_REFRESH_SECRET not provided, using generated secret (not persistent across restarts)');
  }
}
