# Deployment Guide - TaskFlow Application

This guide will help you deploy the full-stack TaskFlow application (React + Express + Prisma) to a hosting platform.

## Deployment Options

### Option 1: Deploy to Render (Recommended)

**Render** is the easiest option for full-stack deployment with free tier availability.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub account

3. **Deploy**
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the `render.yaml` configuration
   - Review environment variables:
     - `DATABASE_URL` - Auto-configured with PostgreSQL
     - `JWT_ACCESS_SECRET` - Will be auto-generated
     - `JWT_REFRESH_SECRET` - Will be auto-generated
     - `CLIENT_URL` - Will be auto-set to your Render domain
   - Click "Deploy"

4. **Database Setup**
   - Render automatically creates a PostgreSQL database
   - Prisma migrations run automatically on deploy

---

### Option 2: Deploy to Railway

**Railway** offers similar features with a clean dashboard.

#### Steps:

1. **Push to GitHub** (same as above)

2. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

3. **Deploy**
   - Create new project
   - Add service from GitHub repo
   - Add PostgreSQL database
   - Configure environment variables from `.env.example`
   - Deploy

---

### Option 3: Deploy with Docker Locally

For testing or self-hosting:

```bash
# Build Docker image
docker build -t taskflow .

# Run with environment variables
docker run -p 3001:3001 \
  -e DATABASE_URL="postgresql://user:password@db-host/dbname" \
  -e JWT_ACCESS_SECRET="your-secret-here" \
  -e JWT_REFRESH_SECRET="your-secret-here" \
  -e CLIENT_URL="https://yourdomain.com" \
  taskflow
```

---

## Environment Variables

Create a `.env` file on the hosting platform with:

```
PORT=3001
DATABASE_URL=postgresql://user:password@host/dbname
JWT_ACCESS_SECRET=<generate-a-secure-random-string>
JWT_REFRESH_SECRET=<generate-a-secure-random-string>
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
CLIENT_URL=https://your-domain.com
```

**Note:** Use strong, randomly generated secrets for JWT keys in production!

---

## Database Migration

The application automatically runs Prisma migrations on deployment:
```bash
prisma migrate deploy
```

---

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure `tsconfig.json` files are present in server and client
- Check build output logs on the hosting platform

### Database Connection Errors
- Verify `DATABASE_URL` format matches your database provider
- Ensure database is accessible from deployment environment
- Check that Prisma migrations have completed

### API/Frontend Communication Issues
- Update `CLIENT_URL` environment variable to your frontend domain
- Ensure CORS is properly configured in server code
- Check that API endpoints are correctly pointing to the backend

---

## Post-Deployment

1. **Test the application**
   - Visit your deployment URL
   - Test login/register
   - Create and manage tasks

2. **Set up monitoring**
   - Use hosting platform logs to monitor errors
   - Set up alerts for deployment failures

3. **Custom Domain**
   - Both Render and Railway allow adding custom domains
   - Follow platform-specific instructions for DNS configuration

---

## Security Checklist

- [ ] Change JWT secrets in production
- [ ] Use a strong database password
- [ ] Enable HTTPS (auto with Render/Railway)
- [ ] Review CORS configuration for allowed origins
- [ ] Set up environment-specific configurations
- [ ] Use PostgreSQL in production (not SQLite)

---

## Support

For platform-specific help:
- **Render**: https://render.com/docs
- **Railway**: https://railway.app/docs
- **Docker**: https://docs.docker.com
