const pool = require('../config/db');

exports.getAllProperties = async () => {
  const result = await pool.query('SELECT * FROM property.properties');
  return result.rows;
};
