const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug');

const bookRouter = express.Router();

function router(nav) {
  // const books = [
  //   {
  //     title: 'A Journey into the center of the earth',
  //     genre: 'Scientific Fiction',
  //     author: 'Jules Verne',
  //     read: false,
  //   },
  //   {
  //     title: 'The Dark World',
  //     genre: 'Fantasy',
  //     author: 'Henry Kutneer',
  //     read: false,
  //   },
  //   {
  //     title: 'The Wind in the Willows',
  //     genre: 'Fantasy',
  //     author: 'Keneth Grahme',
  //     read: false,
  //   },
  //   {
  //     title: 'War and Peace',
  //     genre: 'Historical Fiction',
  //     author: 'Victor Hugo',
  //     read: false,
  //   },
  //   {
  //     title: 'Mera',
  //     genre: 'Romance',
  //     author: 'Jhon',
  //     read: false,
  //   },
  // ];


  bookRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  });
  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const books = await db.collection('books').find().toArray();
        res.render('books', {
          nav,

          title: 'My Library',
          books,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const book = await db.collection('books').findOne({ _id: new ObjectId(id) });
        res.render('singleBook', {
          nav,

          title: 'My Library',
          book,
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });
  return bookRouter;
}

module.exports = router;
