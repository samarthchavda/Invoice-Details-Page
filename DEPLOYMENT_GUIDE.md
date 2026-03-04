# 🚀 Deployment Guide

## Prerequisites
- GitHub repository: https://github.com/samarthchavda/Invoice-Details-Page
- MongoDB Atlas database (already configured)
- Vercel account (for frontend)
- Render account (for backend)

---

## 📦 Part 1: Deploy Backend on Render

### Step 1: Sign up/Login to Render
1. Go to https://render.com
2. Sign up or login with GitHub

### Step 2: Create New Web Service
1. Click **"New +"** button → Select **"Web Service"**
2. Connect your GitHub repository: `samarthchavda/Invoice-Details-Page`
3. Grant Render access to the repository

### Step 3: Configure Web Service
Fill in the following settings:

**Basic Settings:**
- **Name:** `invoice-backend` (or any name you prefer)
- **Region:** Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Environment Variables:**
Click **"Advanced"** → Add the following environment variables:

1. **MONGODB_URI**
   ```
   mongodb+srv://StudyPoint:Cb3oog9A97jZO6cH@cluster0.whyvvvy.mongodb.net/invoice_management?retryWrites=true&w=majority
   ```

2. **JWT_SECRET**
   ```
   your-super-secret-jwt-key-change-this-in-production
   ```

3. **NODE_ENV**
   ```
   production
   ```

4. **PORT** (Optional - Render sets this automatically)
   ```
   3001
   ```

### Step 4: Deploy
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment
3. Once deployed, you'll get a URL like: `https://invoice-backend-xxxx.onrender.com`
4. Test it: `https://your-backend-url.onrender.com/api/health`

**Copy your backend URL** - you'll need it for frontend deployment!

---

## 🌐 Part 2: Deploy Frontend on Vercel

### Step 1: Sign up/Login to Vercel
1. Go to https://vercel.com
2. Sign up or login with GitHub

### Step 2: Import Project
1. Click **"Add New"** → **"Project"**
2. Import your GitHub repository: `samarthchavda/Invoice-Details-Page`
3. Select the repository

### Step 3: Configure Project
**Framework Preset:** Vite

**Root Directory:** Click **"Edit"** → Enter `frontend`

**Build Settings:**
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

### Step 4: Environment Variables
Click **"Environment Variables"** → Add:

**Variable Name:** `VITE_API_BASE_URL`  
**Value:** `https://your-backend-url.onrender.com/api`  
(Replace with your actual Render backend URL from Part 1)

**Example:**
```
VITE_API_BASE_URL=https://invoice-backend-xxxx.onrender.com/api
```

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 1-2 minutes for build and deployment
3. Once deployed, you'll get URLs like:
   - Production: `https://your-project.vercel.app`
   - Preview: `https://your-project-git-main.vercel.app`

### Step 6: Update Backend CORS (Important!)
After getting your Vercel URL, you need to update backend CORS settings:

1. Go back to your code editor
2. Open `backend/server.js`
3. Update CORS configuration:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-project.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

4. Commit and push changes:
```bash
git add backend/server.js
git commit -m "Update CORS for production"
git push origin main
```

5. Render will automatically redeploy with new CORS settings

---

## ✅ Verification Steps

### Test Backend (Render)
Visit these URLs (replace with your backend URL):
- Health check: `https://your-backend.onrender.com/api/health`
- Get invoice: `https://your-backend.onrender.com/api/invoices/69a7d1aece46855d78919b0f`

### Test Frontend (Vercel)
1. Open your Vercel URL: `https://your-project.vercel.app`
2. Navigate to invoice details: `/invoices/69a7d1aece46855d78919b0f`
3. Try adding a payment
4. Test archive/restore functionality
5. Download PDF (if implemented)

---

## 🔧 Troubleshooting

### Backend Issues:

**Problem:** MongoDB connection failed  
**Solution:** Double-check MONGODB_URI in Render environment variables

**Problem:** 502 Bad Gateway  
**Solution:** Check Render logs → Make sure npm start command is correct

**Problem:** CORS errors  
**Solution:** Update CORS origin in server.js to include Vercel URL

### Frontend Issues:

**Problem:** API calls failing  
**Solution:** Check VITE_API_BASE_URL is correct (must end with `/api`)

**Problem:** Routes not working (404)  
**Solution:** Make sure `vercel.json` is in frontend folder with rewrites

**Problem:** Environment variable not working  
**Solution:** Rebuild in Vercel (variables only apply to new builds)

---

## 📝 Post-Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Backend health endpoint working
- [ ] Frontend deployed on Vercel
- [ ] Frontend can fetch invoices
- [ ] Add payment functionality works
- [ ] Archive/restore works
- [ ] PDF download works (if applicable)
- [ ] CORS configured for production
- [ ] MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- [ ] All environment variables set correctly

---

## 🎉 Your Live URLs

After deployment, update your README.md with:

**Live Application:**
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-backend.onrender.com`

**Sample Invoice:**
`https://your-project.vercel.app/invoices/69a7d1aece46855d78919b0f`

---

## 💡 Tips

1. **Free Tier Limitations:**
   - Render: Backend sleeps after 15 mins of inactivity (takes ~30s to wake up)
   - Vercel: Unlimited serverless function invocations

2. **Custom Domain:**
   - Both Render and Vercel support custom domains in settings

3. **Automatic Deployments:**
   - Every push to `main` branch auto-deploys on both platforms

4. **Environment Variables:**
   - Never commit `.env` files to GitHub
   - Always use platform's environment variable settings

5. **Logs:**
   - Render: Check "Logs" tab for backend errors
   - Vercel: Check "Functions" or "Deployments" → "View Logs"

---

## 🔄 Redeployment

**Backend (Render):**
- Auto-deploys on git push to main
- Manual: Dashboard → "Manual Deploy" → "Deploy latest commit"

**Frontend (Vercel):**
- Auto-deploys on git push to main
- Manual: Dashboard → "Deployments" → Click ⋯ → "Redeploy"

---

Need help? Check:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
