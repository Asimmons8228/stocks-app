const express = require('express');
const router = express.Router();
const assetsCtrl = require('../../controllers/api/assets');

// Create a new asset
router.post('/new', assetsCtrl.create);



module.exports = router;