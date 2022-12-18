const mongoose = require('mongoose');

categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Kategori başlığı alanı boş geçilemez'],
        minlength: [5, 'Kategori başlığı için minimum 5 karakter girmelisiniz.'],
        maxlength: [255, 'Kategori başlığı için maksimum 200 karakter girmelisiniz.'],
        lowercase: true,
        // uppercase: true
        trim: true
    },
    description: {
        type: String,
        minlength: [10, 'Haber içeriği alanına minimum 10 karakter girmelisiniz.'],
        trim: true
    },
});

module.exports = mongoose.model('Category', categorySchema);