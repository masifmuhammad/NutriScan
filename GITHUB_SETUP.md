# 📦 Push to GitHub - Quick Guide

## Step 1: Initialize Git (One Time)

Open PowerShell in the NutriScan folder and run:

```powershell
cd C:\Users\masif\Desktop\NewProject\NutriScan
git init
```

## Step 2: Add All Files

```powershell
git add .
```

## Step 3: Make First Commit

```powershell
git commit -m "Initial commit: NutriScan - Pakistani Food Nutrition Tracker"
```

## Step 4: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click **"+"** → **"New repository"**
3. Name it: `NutriScan`
4. Make it **Public** (or Private if you prefer)
5. **DON'T** initialize with README (we already have one)
6. Click **"Create repository"**

## Step 5: Connect and Push

```powershell
# Add your GitHub repo (replace masifmuhammad with your username)
git remote add origin https://github.com/masifmuhammad/NutriScan.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

You'll be asked to login to GitHub - use your credentials or a Personal Access Token.

---

## ✅ Done!

Your code is now on GitHub at: `https://github.com/masifmuhammad/NutriScan`

---

## 🚀 Next: Deploy for Free

See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy:
- **Frontend** → Vercel (free)
- **Backend** → Railway or Render (free)

Then everyone can use your app! 🎉

