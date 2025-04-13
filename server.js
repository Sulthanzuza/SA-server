const express = require('express');
const dotenv = require('dotenv');
const instagramRoutes = require('./routes/routes');

dotenv.config();
const app = express();

// Simple CORS middleware - more permissive approach
app.use((req, res, next) => {
  // Allow your Vercel domains (without trailing slashes)
  const allowedOrigin = 'https://sentiment-analyzer-olive.vercel.app';
  
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API running");
});

app.use('/insta', instagramRoutes);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});