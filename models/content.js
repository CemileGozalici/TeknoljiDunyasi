const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'İçerik başlığı alanı boş geçilemez'],
        minlength: [5, 'içerik başlığı için minimum 5 karakter girmelisiniz.'],
        maxlength: [255, 'içerik başlığı için maksimum 200 karakter girmelisiniz.'],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    description: {
        type: String,
        minlength: [10, 'Haber içeriği alanına minimum 10 karakter girmelisiniz.'],
        trim: true
    },
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