const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema = new Schema({
    symbol: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    purchase_price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation for purchase_price as an integer with up to two decimal places
                const regex = /^\d+(\.\d{1,2})?$/;
                return regex.test(value.toString());
            },
            message: 'Purchase Price must be a valid number with up to two decimal places',
        },
    },
    share_balance: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                // Custom validation for share_balance as an integer with up to two decimal places
                const regex = /^\d+(\.\d{1,2})?$/;
                return regex.test(value.toString());
            },
            message: 'Share Balance must be a valid number with up to two decimal places',
        },
    },
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;