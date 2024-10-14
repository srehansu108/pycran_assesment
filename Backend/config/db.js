const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Get connection string from .env file
});

module.exports = pool;
