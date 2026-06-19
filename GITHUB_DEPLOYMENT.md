# GitHub & Deployment Setup Guide

This guide walks you through pushing your TaskFlow application to GitHub and deploying it.

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon in the top right → "New repository"
3. Enter repository name: `taskflow`
4. Add description: "Full-stack task management application"
5. Choose "Public" (for ease of sharing) or "Private"
6. **Do NOT** initialize with README, .gitignore, or license (we have these)
7. Click "Create repository"

### Option B: Using GitHub CLI

```bash
gh repo create taskflow --public --source=. --remote=origin --push
```

---

## Step 2: Push Code to GitHub

### Terminal Commands

Navigate to your project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Full-stack task management app"

# Rename branch to main (if needed)
git branch -M main

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Verify Push

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/taskflow`
2. You should see all your files and folders

---

## Step 3: Deploy to Render

### Prerequisites
- GitHub account (with code pushed)
- Render account (free at [render.com](https://render.com))

### Deployment Steps

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Click "Get Started" 
   - Sign up with GitHub (easier auth)

2. **Create New Service**
   - From Dashboard, click "New +"
   - Select "Web Service"
   - Click "Connect account" to authorize GitHub
   - Select your `taskflow` repository

3. **Configure Service**
   - **Name**: `taskflow-api` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: Leave as suggested or use:
     ```
     npm install && npm run build
     ```
   - **Start Command**: 
     ```
     node server/dist/server.js
     ```
   - **Instance Type**: Select "Free" (if available)

4. **Set Environment Variables**
   
   Click "Advanced" and add these variables:
   
   | Key | Value |
   |-----|-------|
   | `NODE_ENV` | `production` |
   | `PORT` | `3001` |
   | `DATABASE_URL` | Leave empty for now (add database next) |
   | `JWT_ACCESS_SECRET` | Generate random string or use: `openssl rand -base64 32` |
   | `JWT_REFRESH_SECRET` | Generate random string or use: `openssl rand -base64 32` |
   | `CLIENT_URL` | Will be set to your Render domain after creation |

5. **Add PostgreSQL Database**
   
   - Scroll down to "Database"
   - Click "Create Database"
   - Name: `taskflow`
   - This auto-populates the `DATABASE_URL` variable

6. **Review & Deploy**
   
   - Review all settings
   - Click "Create Web Service"
   - Render automatically starts building and deploying

### Monitor Deployment

1. Watch the "Logs" tab for build progress
2. After successful build, you'll see the live URL
3. Your app is now live! 🎉

---

## Step 4: Verify Deployment

1. **Test Frontend**
   - Open your Render URL (e.g., `https://taskflow-api.onrender.com`)
   - You should see the TaskFlow login page

2. **Test API**
   - Open `https://your-app-url.onrender.com/api/tasks`
   - Should return an empty array or require authentication

3. **Test Database**
   - Register a new account
   - Create a task
   - Verify it persists after refresh

---

## Troubleshooting

### Build Failed
**Check logs** for error messages:
1. Click on the service in Render dashboard
2. Go to "Logs" tab
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - Node.js version mismatch (requires 20+)
   - Incorrect build/start commands

### Can't Connect to Database
- Verify `DATABASE_URL` is set in environment variables
- Check if Postgres database was successfully created
- Try redeploying: Settings → Manual Redeploy

### Frontend Not Loading
- Check `CLIENT_URL` environment variable
- Ensure CORS is properly configured in `server/src/app.ts`
- Clear browser cache and reload

### Deployment Hangs
- Check if migrations are running (can take time on first deploy)
- Monitor logs for stuck processes
- Increase timeout in Render settings if needed

---

## Updating Your Application

After making changes locally:

```bash
# Commit changes
git add .
git commit -m "Your commit message"

# Push to GitHub
git push

# Render automatically redeploys on push (if auto-deploy is enabled)
```

---

## Alternative Deployment Platforms

If you prefer other platforms:

- **Railway**: Similar to Render, excellent support
- **Heroku**: Traditional choice (now paid)
- **Vercel** (Frontend) + **Vercel/Fly.io** (Backend): Separate deployments
- **AWS/Azure/Google Cloud**: More control, steeper learning curve

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Security Notes

- **Never commit `.env` file** (it's in .gitignore)
- Change JWT secrets in production
- Use strong database passwords
- Regularly update dependencies
- Monitor logs for suspicious activity

---

## Need Help?

- Check the logs on Render dashboard
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for more details
- Visit [Render Docs](https://render.com/docs)
- Open an issue in your GitHub repository

Happy deploying! 🚀
