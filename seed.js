'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { getMaxListeners } = require('./models/book');
mongoose.connect(process.env.DATABASE_URL);

const Book = require('./models/book');

const seed = async () => {
  await Book.create({
    title: 'The Alchemist',
    description:
      'The Alchemist is a classic novel in which a boy named Santiago embarks on a journey seeking treasure in the Egyptian pyramids after having a recurring dream about it and on the way meets mentors, falls in love, and most importantly, learns the true importance of who he is and how to improve himself and focus on what really matters in life.',
    url: 'https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg',
    status: 'Great Book!',
    email: 'dcmusic01@gmail.com',
  });

  await Book.create({
    title: 'On Writing',
    description: "Steven King's bio on how he made it as a writer",
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0anvNcddCNqmQV4TCrtQ3OaysabSi8qwtSTCDNf9UJSvK_--3UTU0RGNyknNV7OAqOWM&usqp=CAU',
    status: 'Best Seller!',
    email: 'dcmusic01@gmail.com',
  });
  console.log('On writing is a must read!');

  await Book.create({
    title: 'The Four Agreements',
    description:
      'Four basic agreements that everyone should make with themselves in order to be happy',
    url: 'https://bostonglobe-prod.cdn.arcpublishing.com/resizer/-EumGEaouz_ceR_KOPYhBCCeYxw=/960x0/arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/3SEC2PAD6UI6DOFQNUT6IR6DKA.jpg',
    status: 'Must Read!',
    email: 'dcmusic01@gmail.com',
  });
  console.log('Self improvement!');

  mongoose.disconnect();
};

seed();
