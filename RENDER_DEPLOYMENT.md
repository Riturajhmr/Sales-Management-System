# Render Backend Deployment Settings

## Render Web Service Configuration

When creating a new Web Service on Render, use these exact settings:

### Basic Settings

- **Name**: `truestate-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users (e.g., `Oregon (US West)`)

### Build & Deploy Settings

- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Environment Variables

Add these in the **Environment** tab:

- `DATABASE_URL` - Your PostgreSQL connection string (from Render PostgreSQL service)
- `NODE_ENV` - `production`
- `PORT` - Render sets this automatically (you can leave it or set to `10000`)

---

## Step-by-Step Deployment

### 1. Create PostgreSQL Database

1. Go to Render Dashboard
2. Click **New +** → **PostgreSQL**
3. Name it (e.g., `truestate-db`)
4. Select plan (Free tier available)
5. Click **Create Database**
6. **Important**: Copy the **Internal Database URL** (you'll need this)

### 2. Create Web Service

1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Fill in the settings:

   ```
   Name: truestate-backend
   Environment: Node
   Region: (choose closest)
   Branch: main (or your default branch)
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

4. Click **Advanced** and verify:
   - **Auto-Deploy**: Yes (deploys on every push)
   - **Health Check Path**: `/` (optional)

### 3. Add Environment Variables

In your Web Service → **Environment** tab, add:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | (Internal Database URL from PostgreSQL service) |
| `NODE_ENV` | `production` |

**To get DATABASE_URL:**
- Go to your PostgreSQL service
- Copy the **Internal Database URL**
- Paste it as the value for `DATABASE_URL`

### 4. Deploy

1. Click **Create Web Service**
2. Render will:
   - Install dependencies (`npm install`)
   - Start the server (`npm start`)
   - Your backend will be live at: `https://your-service-name.onrender.com`

### 5. Import CSV Data

After deployment, import your sales data:

1. Go to your Web Service on Render
2. Click on **Shell** tab (or use SSH)
3. Run:
   ```bash
   npm run import:csv
   ```

---

## Summary

**Root Directory**: `backend`  
**Build Command**: `npm install`  
**Start Command**: `npm start`

---

## Update Frontend

After your backend is deployed:

1. Copy your Render backend URL (e.g., `https://truestate-backend.onrender.com`)
2. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
3. Update `VITE_API_URL` to your Render backend URL
4. Redeploy frontend

---

## Troubleshooting

### Build Fails
- Check that Root Directory is set to `backend`
- Verify `package.json` exists in `backend/` folder
- Check build logs for specific errors

### Database Connection Issues
- Ensure `DATABASE_URL` uses the **Internal Database URL** (not external)
- Verify PostgreSQL service is running
- Check connection string format

### Server Not Starting
- Verify `npm start` command works locally
- Check that `src/index.js` is the entry point
- Review server logs in Render dashboard

