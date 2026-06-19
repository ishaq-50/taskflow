import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'dev-access-secret-change-me',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-me',
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || '15m',
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
};

// Validate required variables in production
if (env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not set, using SQLite');
  }
  if (!process.env.JWT_ACCESS_SECRET || env.JWT_ACCESS_SECRET === 'dev-access-secret-change-me') {
    throw new Error('❌ JWT_ACCESS_SECRET is required in production');
  }
  if (!process.env.JWT_REFRESH_SECRET || env.JWT_REFRESH_SECRET === 'dev-refresh-secret-change-me') {
    throw new Error('❌ JWT_REFRESH_SECRET is required in production');
  }
}
