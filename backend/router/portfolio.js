const express = require('express');
const { calculatePortfolioValue, assignRandomStocks, addStock, updateStock, deleteStock, buyStock, sellStock } = require('../controller/portfolio');
const auth = require('../middleware/auth'); 

const router = express.Router();

router.post('/assign', auth,assignRandomStocks);
router.get('/:userId/value',auth, calculatePortfolioValue); 
router.post('/add', auth, addStock);
router.put('/update', auth, updateStock); 
router.delete('/delete', auth, deleteStock);
router.post('/buy', auth, buyStock);
router.post('/sell', auth, sellStock);

module.exports = router;
