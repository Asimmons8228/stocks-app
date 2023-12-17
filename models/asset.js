const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assetSchema= new Schema({
    symbol:{
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    purchase_price:{
        type: Number,
        required: true,
    },
    current_price:{
        type: Number,
        required: true,
    }
})