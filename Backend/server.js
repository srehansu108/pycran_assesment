const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const propertyRoutes = require('./routes/propertyRoutes');
const financialRoutes = require('./routes/financialRoutes');

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/properties', propertyRoutes);
app.use('/api/financials', financialRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Database connection check
const pool = require('./config/db');
pool.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
