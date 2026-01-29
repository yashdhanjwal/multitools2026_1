const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists with error handling
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (err) {
  console.error('Failed to create uploads directory:', err);
}

app.use(cors());
app.use(express.json());

// Serve static assets from frontend/dist if it exists
let frontendDistPath = path.join(__dirname, 'dist');
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(__dirname, '../frontend/dist');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Cleanup job: Delete files in uploads folder every 30 minutes
const CLEANUP_INTERVAL = 30 * 60 * 1000; // 30 minutes
setInterval(() => {
  if (!fs.existsSync(uploadsDir)) return;

  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      console.error('Error reading uploads directory:', err);
      return;
    }
    const now = Date.now();
    files.forEach((file) => {
      const filePath = path.join(uploadsDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (now - stats.mtimeMs > CLEANUP_INTERVAL) {
          fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        }
      });
    });
  });
}, CLEANUP_INTERVAL);

// Explicit root route for cPanel availability checks
app.get('/', (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send('<h1>Free Online Tools API</h1><p>Frontend build not found. Please ensure <code>frontend/dist</code> exists.</p>');
  }
});

// Static files
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// Catch-all for SPA routing
app.get('*', (req, res) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({ message: "API is running. Requested resource or frontend build not found." });
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Error handling for server
server.on('error', (err) => {
  console.error('Server error:', err);
});
