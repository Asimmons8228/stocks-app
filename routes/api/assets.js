const express = require('express');
const router = express.Router();
const assetsCtrl = require('../../controllers/api/assets');

// Create a new asset
router.post('/new', assetsCtrl.create);

router.get('/', assetsCtrl.getAllAssets);

router.get('/:id', assetsCtrl.getAssetById);

router.put('/:id', assetsCtrl.updateAsset);

router.delete('/:id', assetsCtrl.deleteAsset);

module.exports = router;