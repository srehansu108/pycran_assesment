const pool = require('../config/db');

exports.getAllFinancialRecords = async () => {
  const result = await pool.query('SELECT * FROM financial.financial_data');
  return result.rows;
};
