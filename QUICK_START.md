# Quick Start - Deploy to GitHub & Render

## 1️⃣ Push to GitHub (5 minutes)

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Initialize git
git init

# Add all files
git add .

# Create commit
git commit -m "Initial commit: TaskFlow app"

# Set main branch
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git

# Push to GitHub
git push -u origin main
```

Then verify at: `https://github.com/YOUR_USERNAME/taskflow`

---

## 2️⃣ Deploy to Render (2 minutes)

1. Go to [render.com](https://render.com) → Sign up with GitHub
2. Dashboard → "New +" → "Web Service"
3. Select your `taskflow` repository
4. Configure:
   - **Name**: `taskflow-api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Click "Advanced" and add environment variables:
   - `NODE_ENV` = `production`
   - `JWT_ACCESS_SECRET` = (generate random: `openssl rand -base64 32`)
   - `JWT_REFRESH_SECRET` = (generate random: `openssl rand -base64 32`)
6. Add Database:
   - Click "Create Database"
   - Name: `taskflow`
   - This auto-sets `DATABASE_URL`
7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. **Done!** Your app is live! 🎉

---

## 3️⃣ Test Your Deployment

- Open your Render URL (e.g., `taskflow-api.onrender.com`)
- Register a new account
- Create a task
- Everything should work!

---

## 📝 Files Created for You

| File | Purpose |
|------|---------|
| `Dockerfile` | Docker containerization |
| `.dockerignore` | Docker build optimization |
| `render.yaml` | Render deployment config |
| `DEPLOYMENT.md` | Detailed deployment guide |
| `GITHUB_DEPLOYMENT.md` | Step-by-step GitHub & Render setup |
| `README.md` | Project documentation |
| `package.json` (updated) | Added build/start scripts |
| `server/src/app.ts` (updated) | Added static file serving |

---

## ⚠️ Important Notes

- **Never commit `.env`** - It's in .gitignore for security
- **Change JWT secrets** - Use `openssl rand -base64 32` for strong random strings
- **Database**: Render auto-creates PostgreSQL
- **Auto-redeploy**: Push to GitHub → Render auto-deploys
- **Free tier**: Render has free tier options

---

## 🆘 Need Help?

- **Build failed?** Check logs on Render dashboard
- **Can't push to GitHub?** Ensure you've [set up SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- **Database connection error?** Verify environment variables
- See `GITHUB_DEPLOYMENT.md` for detailed troubleshooting

---

**You're all set! Go deploy! 🚀**
