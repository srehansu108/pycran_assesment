const express = require('express'); 
const { getFinancials } = require('../controllers/financialController');
const router = express.Router();

router.get('/', getFinancials);

module.exports = router;
