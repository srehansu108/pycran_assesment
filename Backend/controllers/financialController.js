const Financial = require('../models/financialModel');

exports.getFinancials = async (req, res) => {
  try {
    const financials = await Financial.getAllFinancialRecords();
    res.json(financials);
  } catch (err) {
    console.error('Error fetching financial records:', err); // Log the error
    res.status(500).json({ error: 'Server error' });
  }
};
