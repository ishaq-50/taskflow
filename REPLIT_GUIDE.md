# Replit Deployment Guide for TaskFlow

## Quick Start (2 minutes)

1. **Go to Replit**
   - Open https://replit.com
   - Sign up/Login (use GitHub for easier auth)

2. **Import Your Repository**
   - Click **Create** → **Import from GitHub**
   - Paste: `https://github.com/ishaq-50/taskflow`
   - Name it: `taskflow`
   - Click **Import**

3. **Wait for Setup**
   - Replit auto-detects `.replit` and `replit.nix` files
   - Dependencies install automatically (~2-3 minutes)
   - Build runs automatically

4. **Click Run Button**
   - Green **Run** button at top
   - Your app starts!
   - Live URL appears in browser: `https://taskflow-[username].repl.co`

---

## What's Included

✅ Node.js 20 environment
✅ PostgreSQL (optional, uses SQLite by default)
✅ Auto-build and deploy
✅ Always-on free tier
✅ Live sharing link
✅ Built-in debugger

---

## Features

- **Auto-rebuild**: Push to GitHub → Replit auto-deploys
- **Live URL**: Share your app with anyone
- **Free hosting**: No credit card needed
- **Always running**: 24/7 uptime on free tier

---

## Testing Locally First (Optional)

Want to test locally before deploying? Run:

```bash
npm run install:all
npm run build
npm start
```

Then open: http://localhost:3001

---

## Troubleshooting

**Build timeout?**
- Replit free tier has memory limits
- Be patient during initial build (5-10 minutes)

**Can't access the app?**
- Wait for "Run" to complete
- Check browser console for errors
- Refresh the page

**Database issues?**
- Default: SQLite (file-based, no setup needed)
- To use PostgreSQL: Add connection string to environment

---

## Share Your App

Once running, you get a live URL like:
```
https://taskflow-yourusername.repl.co
```

Share this with anyone! They can access your app from anywhere.

---

## Next Steps

1. Go to https://replit.com
2. Import from GitHub: `https://github.com/ishaq-50/taskflow`
3. Click Run
4. Done! 🎉

Your app will be live in 5-10 minutes!
