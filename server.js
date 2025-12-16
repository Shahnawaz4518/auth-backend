require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware setup (before database connection)
app.use(express.json());
app.use(cookieParser());

// Request logging middleware (for debugging)
// app.use((req, res, next) => {
//   console.log(`📌 ${req.method} ${req.path}`);
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   next();
// });

const allowedOrigins = [
  "http://localhost:4200",
  "https://bikerwala.vercel.app",
];

// app.use(cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (Postman, server-to-server)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//   })
// );


app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
}));

app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));



// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/products', require('./routes/productRoutes'));

// Test route to verify server is working
app.get('/', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await connectDB();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
