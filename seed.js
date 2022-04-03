'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

async function seed() {
  const myBook = new Book({
    title: 'The Alchemist',
    description:
      'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself and focus on what really matters in life.',
    status: true,
  });

  myBook.save(function (err) {
    if (err) console.error(err);
    else console.log('The Alchemist rocks!');
  });

  await Book.create({
    name: 'On Writing',
    description: "Steven King's bio on how he made it as a writer",
    status: true,
  });
  console.log('On writing is a must read!');

  await Book.create({
    name: 'The Four Agreements',
    description:
      'Four basic agreements that everyone should make with themselves in order to be happy',
    status: true,
  });
  console.log('Self improvement!');

  mongoose.disconnect();
}

seed();
