const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    stocks: {
        type: String,
    },
    created_at:{
        type: Date, 
    }
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    {
        timestamps: true
    }

});
