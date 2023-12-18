const express = require('express');
const router = express.Router();
const stocksController = require('../../controllers/api/assets');

router.get('/search', stocksController.searchStocks);
router.get('/:symbol', stocksController.getStockData);

module.exports = router;
