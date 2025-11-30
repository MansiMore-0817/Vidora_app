# 🚀 Deployment Guide for Render

This guide will help you deploy Vidora to Render.com successfully.

## 📋 Prerequisites

1. A Render.com account
2. MongoDB Atlas account (or your MongoDB connection string)
3. Git repository with your code

## 🔧 Step-by-Step Deployment

### 1. Environment Variables Setup

Before deploying, you'll need to set these environment variables in Render:

#### Backend Environment Variables:
- `MONGO_URI`: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- `PORT`: Render sets this automatically, but you can override if needed (default: 8000)

#### Frontend Environment Variables (Optional):
- `VITE_API_BASE_URL`: Only needed if frontend and backend are on different domains
- `VITE_BACKEND_URL`: Only needed if frontend and backend are on different domains

**Note**: If frontend and backend are served from the same domain (recommended), you don't need to set these - the app will automatically use the same origin.

### 2. Deploy on Render

#### Option A: Single Service (Recommended - Frontend + Backend together)

1. **Create a new Web Service** on Render
2. **Connect your repository**
3. **Configure the service:**
   - **Name**: `vidora-app` (or your preferred name)
   - **Root Directory**: `Vidora_app` (or leave blank if root is Vidora_app)
   - **Environment**: `Node`
   - **Build Command**: `npm install` (or `npm run postinstall` if using root package.json)
   - **Start Command**: `npm start` (runs from root, which starts the backend)
   - **Plan**: Choose based on your needs (Free tier available)

4. **Add Environment Variables:**
   - `MONGO_URI`: Your MongoDB connection string
   - `NODE_ENV`: `production`

5. **Deploy!**

The root `package.json` will:
- Install backend dependencies
- Install frontend dependencies  
- Build the frontend
- Start the backend server (which serves the built frontend)

#### Option B: Separate Services (Frontend and Backend)

If you want to deploy frontend and backend separately:

**Backend Service:**
- Root Directory: `Vidora_app/Backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables: `MONGO_URI`, `PORT`

**Frontend Service (Static Site):**
- Root Directory: `Vidora_app/Frontend/Vidora`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables: `VITE_API_BASE_URL`, `VITE_BACKEND_URL` (point to your backend URL)

### 3. MongoDB Atlas Configuration

1. **Network Access:**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow connections from anywhere (or restrict to Render IPs)

2. **Database User:**
   - Create a database user with read/write permissions
   - Use this user in your `MONGO_URI`

### 4. Post-Deployment Checklist

- [ ] Verify backend is running (check logs)
- [ ] Verify frontend is accessible
- [ ] Test user registration/login
- [ ] Test video call functionality
- [ ] Test socket.io connections
- [ ] Check MongoDB connection in logs

### 5. Troubleshooting

#### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version (Render uses Node 18+ by default)
- Check build logs for specific errors

#### Frontend Not Loading
- Verify the `dist` folder path in `Backend/src/app.js` is correct
- Check that frontend build completed successfully
- Verify static file serving is working

#### Socket.IO Connection Issues
- Ensure CORS is properly configured (currently allows all origins)
- Check that WebSocket connections are enabled on Render
- Verify `VITE_BACKEND_URL` is set correctly if using separate services

#### MongoDB Connection Fails
- Verify `MONGO_URI` is set correctly
- Check MongoDB Atlas network access settings
- Ensure database user has correct permissions

#### API Calls Fail
- Verify `VITE_API_BASE_URL` is set if using separate services
- Check CORS configuration
- Verify backend is running and accessible

### 6. Render-Specific Notes

- **Free Tier**: Services may spin down after 15 minutes of inactivity
- **WebSocket Support**: Render supports WebSockets, but ensure your service type is "Web Service"
- **HTTPS**: Render provides HTTPS automatically
- **Custom Domain**: You can add a custom domain in Render dashboard

### 7. Production Optimizations (Optional)

1. **Enable CORS restrictions** in production:
   - Update `Backend/src/app.js` to restrict CORS to your domain
   - Update `Backend/src/controllers/socketManager.js` to restrict Socket.IO origins

2. **Add error monitoring** (e.g., Sentry)

3. **Set up logging** (e.g., Winston, Morgan)

4. **Add rate limiting** for API endpoints

## 📝 Quick Reference

**Root Directory**: `Vidora_app`  
**Backend Start**: `npm --prefix Backend start`  
**Frontend Build**: `npm --prefix Frontend/Vidora run build`  
**Frontend Dist**: `Vidora_app/Frontend/Vidora/dist`  
**Backend Port**: Uses `process.env.PORT` (Render sets this automatically)

## 🆘 Need Help?

If you encounter issues:
1. Check Render build logs
2. Check Render runtime logs
3. Verify environment variables are set
4. Test locally first to ensure everything works

Good luck with your deployment! 🎉

