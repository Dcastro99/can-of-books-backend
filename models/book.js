'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  description: String,
  url: String,
  status: Boolean,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
