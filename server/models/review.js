const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"] 
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"]
    },
    description: {
        type: String,
        required: [true, "Description are required"]
    }
}, {timestamps: true});

mongoose.model("Review", ReviewSchema);

module.exports = ReviewSchema;