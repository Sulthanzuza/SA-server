const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const instagramRoutes = require('./routes/routes');


dotenv.config();
const app = express();

const allowedOrigins = [
  'https://sentiment-analyzer-bpkq.vercel.app/',
  'https://sentiment-analyzer-bpkq-sulthanshas-projects.vercel.app/',
  'https://sentiment-analyzer-bpkq-git-main-sulthanshas-projects.vercel.app/'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"  
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/',(req,res)=>{
  res.send("api running")
})

app.use('/insta', instagramRoutes);


let PORT =process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
