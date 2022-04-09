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
  const books = await Book.find({});

  response.send(books);
});

app.post('/books', async (request, response, next) => {
  try {
    const newBookinDB = await Book.create(request.body);
    response.status(201).send(newBookinDB);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.delete('/books/:id', async (request, response, next) => {
  try {
    console.log(request.params.id);
    await Book.findByIdAndDelete(request.params.id);
    response.status(204).send('Book was successfully deleted!');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.put('/books/:id', async (request, response, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );
    response.status(200).send(updatedBook);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
