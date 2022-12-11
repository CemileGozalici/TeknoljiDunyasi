const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: false
        }
    ]
});

module.exports = mongoose.model('Content', contentSchema);