const express = require('express');
const router = express.Router();
const stocksController = require('../../controllers/api/asset');

router.get('/:symbol', stocksController.getStockData);

module.exports = router;
