const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoute');

const adminRouter = express.Router();
const books = [
  {
    title: 'A Journey into the center of the earth',
    genre: 'Scientific Fiction',
    author: 'Jules Verne',
    read: false,
  },
  {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kutneer',
    read: false,
  },
  {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Keneth Grahme',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false,
  },
  {
    title: 'Mera',
    genre: 'Romance',
    author: 'Jhon',
    read: false,
  },
];
function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected to server');
        const db = client.db(dbName);
        const response = await db.collection('books').insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;
