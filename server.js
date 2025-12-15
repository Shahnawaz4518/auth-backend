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

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:5173', ",http://localhost:8080"],
    credentials: true
  })
);

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
