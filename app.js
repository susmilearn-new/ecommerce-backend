require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require("cookie-parser");

// Route Imports
const authRoutes = require('./routes/authenticationRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Initialize Database
connectDB();

const app = express();

// Core Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userProfileRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'E-Commerce API is running' });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});