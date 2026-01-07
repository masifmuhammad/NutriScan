# 🚀 Deployment Guide

## Step 1: Push to GitHub

```bash
cd NutriScan

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: NutriScan - Pakistani Food Nutrition Tracker"

# Add your GitHub repo (replace with your username)
git remote add origin https://github.com/masifmuhammad/NutriScan.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend (Free Options)

### Option A: Railway (Recommended - Easiest)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your NutriScan repo
5. Select the `server` folder as root
6. Add environment variable: `PORT=5000`
7. Deploy! Railway gives you a free URL like `nutriscan-production.up.railway.app`

### Option B: Render (Also Free)

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Settings:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
6. Add environment variable: `PORT=5000`
7. Deploy! You'll get a URL like `nutriscan.onrender.com`

---

## Step 3: Deploy Frontend (Vercel - Free)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your NutriScan repo
5. Settings:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
6. Add Environment Variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** Your backend URL (from Railway/Render)
7. Deploy!

---

## Step 4: Update Frontend API URL

After deployment, update the frontend to use your production backend:

1. In Vercel dashboard → Your project → Settings → Environment Variables
2. Add: `REACT_APP_API_URL=https://your-backend-url.railway.app/api`
3. Redeploy

---

## Quick Deploy Scripts

### For Railway/Render Backend:
```bash
# In server/package.json, make sure you have:
"scripts": {
  "start": "node server.js"
}
```

### For Vercel Frontend:
Vercel auto-detects React apps, but you can add `vercel.json`:

```json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "client/build"
}
```

---

## Free Hosting Comparison

| Service | Frontend | Backend | Free Tier |
|---------|----------|---------|-----------|
| **Vercel** | ✅ Perfect | ❌ No | Unlimited |
| **Railway** | ⚠️ Possible | ✅ Perfect | $5 credit/month |
| **Render** | ⚠️ Possible | ✅ Perfect | Free tier available |
| **Netlify** | ✅ Perfect | ❌ No | Unlimited |

**Best Combo:** Vercel (Frontend) + Railway (Backend)

---

## Troubleshooting

### Backend not connecting?
- Check CORS settings in `server/server.js`
- Make sure `REACT_APP_API_URL` is set correctly
- Check backend logs in Railway/Render dashboard

### Images not uploading?
- Railway/Render may need persistent storage
- Consider using Cloudinary or AWS S3 for image storage (free tiers available)

### Database issues?
- SQLite works on Railway/Render
- For production, consider PostgreSQL (Railway has free tier)

---

## Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed with correct API URL
- [ ] Environment variables set
- [ ] CORS configured for production domain
- [ ] Test image uploads work
- [ ] Database persists (check Railway/Render storage)

---

## Need Help?

Check the logs in:
- **Railway:** Project → Deployments → View Logs
- **Render:** Service → Logs
- **Vercel:** Project → Deployments → View Function Logs

