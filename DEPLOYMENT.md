# Deployment Guide for Hostingial.com

This guide explains how to deploy "Free Online Tools by Yash Dhanjwal" to Hostingial.com.

## 1. Prepare the Frontend
Run the build command in the `frontend` directory:
```bash
npm run build
```
The output will be in the `frontend/dist` directory.

## 2. Prepare the Backend
The backend is a standard Node.js Express application located in the `backend` directory.

## 3. Hostingial Deployment Steps

### Option A: Static + API (Recommended)
1. **Frontend**: Upload the contents of `frontend/dist` to your public HTML folder or use the Static Site hosting feature on Hostingial.
2. **Backend**:
   - Create a new "Node.js Application" in your Hostingial control panel.
   - Upload the `backend` folder contents (excluding `node_modules` and `uploads`).
   - Set the startup file to `server.js`.
   - Run `npm install` via the Hostingial console/terminal.
   - Note the API URL (e.g., `https://api.ft1.yashdhanjwal.com`).

### Option B: Single Server (Unified)
1. Ensure the `frontend` and `backend` folders are uploaded as siblings in your server directory.
2. Run `npm run build` in the `frontend` folder.
3. The `backend/server.js` is already configured to detect and serve the `frontend/dist` build automatically.
4. Upload the folders to your Node.js application slot on Hostingial.

## 4. Environment Configuration
Ensure the following environment variables are set in your Hostingial dashboard:
- `PORT`: Usually provided by the host (default 5000).
- `NODE_ENV`: `production`

## 5. Security & Privacy
- The application includes an automatic cleanup job that deletes uploaded files every 30 minutes.
- Ensure the `uploads/` directory has write permissions on the server.
