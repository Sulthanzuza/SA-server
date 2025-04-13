const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const instagramRoutes = require('./routes/routes');

dotenv.config();
const app = express();

// Fix allowedOrigins by removing trailing slashes
const allowedOrigins = [
  'https://sentiment-analyzer-bpkq.vercel.app',
  'https://sentiment-analyzer-bpkq-sulthanshas-projects.vercel.app',
  'https://sentiment-analyzer-bpkq-git-main-sulthanshas-projects.vercel.app'
];

// Add CORS headers directly as middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*'); // Fallback to all origins if needed
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

app.get('/',(req,res)=>{
  res.send("api running")
});

app.use('/insta', instagramRoutes);

let PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});