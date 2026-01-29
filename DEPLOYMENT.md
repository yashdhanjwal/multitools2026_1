# Deployment Guide for Hostingial (cPanel)

This guide explains how to deploy "Free Online Tools by Yash Dhanjwal" to Hostingial using the cPanel Node.js Selector.

## 1. Prepare the Frontend
Run the build command in the `frontend` directory:
```bash
npm run build
```
The output will be in the `frontend/dist` directory.

## 2. Upload Files to cPanel
For the best results on cPanel, we recommend the following structure:
1. Create a folder named `backend` (or similar) in your home directory or `public_html`.
2. Upload all contents of the `backend` directory into this folder.
3. Upload the `dist` folder (from `frontend/dist`) into that same `backend` folder.
   - Your structure should look like:
     ```
     backend/
       dist/ (contains index.html, assets, etc.)
       node_modules/
       server.js
       package.json
     ```

## 3. Setup Node.js in cPanel
1. Log in to cPanel and open **Setup Node.js App**.
2. Click **Create Application**.
3. **Node.js version**: Select 18.x or higher (22.x is also fine).
4. **Application mode**: Production.
5. **Application root**: The path to your `backend` folder (e.g., `public_html/backend`).
6. **Application URL**: Select your domain/subdomain.
7. **Application startup file**: `server.js`.
8. Click **Create**.

## 4. Install Dependencies
1. Once the app is created, click the **Run NPM Install** button.
2. If you see an error about "Return code None", don't worry yet. This often happens during the initial check.
3. Refresh the page and check if the application is "Started".

## 5. Troubleshooting "Return code None"
If the application fails to start:
- **Port Conflict**: The application is configured to use `process.env.PORT`. cPanel/Passenger manages this automatically.
- **Missing Dist**: Ensure the `dist` folder is correctly uploaded inside your application root.
- **Node.js Version**: If 22.x fails, try 18.x or 20.x as they are more mature in some hosting environments.
- **Permissions**: Ensure the `uploads` folder can be created or create it manually with 755 permissions.

## 6. Environment Variables
In the Node.js App setup page, you can add:
- `NODE_ENV`: `production`
- `PORT`: (Usually not needed as cPanel provides it, but you can set to 3000 if required).
