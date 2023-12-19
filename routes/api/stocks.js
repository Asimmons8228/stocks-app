const express = require('express');
const router = express.Router();
const assetsController = require('../../controllers/api/assets');

router.get('/search', assetsController.searchStocks);
router.get('/daily', assetsController.getDailyTimeSeries);
// router.get('/:symbol', assetsController.getStockData);

module.exports = router;
