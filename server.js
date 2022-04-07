'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/books', async (request, response) => {
  //find all the books in the book collection => as json response obj
  const books = await Book.find({});

  response.send(books);
});

app.post('/books', async (request, response) => {
  // const newBook = request.body;
  // if request.body has everything you need in the right shape
  // then you can pass it straight to Model
  // But often you'll need to mold the data a bit

  const newBookinDB = await Book.create(request.body);
  // console.log(request.body);
  response.status(201).send(newBookinDB);
});

// delete a book
app.delete('/books/:id', async (request, response, next) => {
  // const id = request.params.id;

  try {
    console.log(request.params.id);
    await Book.findByIdAndDelete(request.params.id);
    response.status(204).send('Book was successfully deleted!');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// error handling middleware must be the last app.use()
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
