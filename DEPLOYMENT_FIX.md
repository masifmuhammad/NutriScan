# 🔧 Deployment Fix Guide

## The Problem
Build fails because `react-scripts` is not found - dependencies aren't installed before build.

## ✅ Solution: Updated Deployment Instructions

### For Vercel (Frontend)

1. **Go to Vercel Dashboard** → Your Project → Settings
2. **Build & Development Settings:**
   - **Root Directory:** `client`
   - **Build Command:** `npm install && npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`
   - **Framework Preset:** Create React App

3. **Environment Variables:**
   - `REACT_APP_API_URL` = Your backend URL (e.g., `https://nutriscan.railway.app/api`)

4. **Redeploy**

---

### For Railway (Backend)

1. **Go to Railway Dashboard** → Your Project → Settings
2. **Root Directory:** Set to `server`
3. **Build Command:** Leave empty (Railway auto-detects)
4. **Start Command:** `npm start`
5. **Environment Variables:**
   - `PORT` = `5000` (or leave empty, Railway auto-assigns)
   - `FRONTEND_URL` = Your Vercel URL (e.g., `https://nutriscan.vercel.app`)

---

### For Render (Backend Alternative)

1. **Go to Render Dashboard** → New → Web Service
2. **Settings:**
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
3. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render uses this)
   - `FRONTEND_URL` = Your Vercel URL

---

## Quick Test Locally

Before deploying, test the build:

```bash
# Test frontend build
cd client
npm install
npm run build

# Test server
cd ../server
npm install
npm start
```

If these work locally, deployment should work too!

---

## Common Issues

### Issue: "react-scripts: not found"
**Fix:** Make sure build command includes `npm install` first:
```
npm install && npm run build
```

### Issue: "Cannot find module"
**Fix:** Check that Root Directory is set correctly:
- Frontend: `client`
- Backend: `server`

### Issue: CORS errors
**Fix:** Set `FRONTEND_URL` environment variable in backend to your Vercel URL

---

## Updated Build Commands

### Vercel (Frontend)
```
Build Command: npm install && npm run build
Output Directory: build
```

### Railway/Render (Backend)
```
Build Command: npm install
Start Command: npm start
Root Directory: server
```

