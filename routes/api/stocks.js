const express = require('express');
const router = express.Router();
const stocksController = require('../../controllers/api/stocks');

router.get('/search', stocksController.searchStocks);
router.get('/:symbol', stocksController.getStockData);

module.exports = router;
