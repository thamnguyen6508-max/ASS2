const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        unique: true, 
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 0, 
    },
    availableCopies: {
        type: Number,
        required: true,
        min: 0,
    }
}, { timestamps: true });

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;