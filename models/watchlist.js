const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema ({
     user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
        type: String
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    current_price: {
        type: Number,
        required: true
    }
})