const express = require('express');
const { calculatePortfolioValue, assignRandomStocks, addStock, updateStock, deleteStock, buyStock, sellStock, getStockDataForChart } = require('../controller/portfolio');
const auth = require('../middleware/auth'); 

const router = express.Router();

router.post('/assign', assignRandomStocks);
router.get('/:userId/value', calculatePortfolioValue); 
router.post('/add', addStock);
router.put('/update',  updateStock); 
router.delete('/delete',  deleteStock);
router.post('/buy', auth, buyStock);
router.post('/sell', auth, sellStock);
router.get('/getStockDataForChart/:ticker',getStockDataForChart);


module.exports = router;
