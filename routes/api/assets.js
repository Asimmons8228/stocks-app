const express = require('express');
const router = express.Router();
const assetsCtrl = require('../../controllers/api/asset');

// Create a new asset
router.post('/new', assetsCtrl.create);

// Add more routes as needed (e.g., get all assets, get a specific asset, update an asset, delete an asset)

module.exports = router;