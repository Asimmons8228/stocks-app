const express = require('express');
const router = express.Router();
const stocksController = require('../../controllers/api/assets');

router.get('/:symbol', stocksController.getStockData);

module.exports = router;
