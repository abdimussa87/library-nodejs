const express = require('express');

const bookRouter = express.Router();

function router(nav) {
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

  bookRouter.route('/').get((req, res) => {
    res.render('books', {
      nav,
      title: 'My Library',
      books,
    });
  });
  bookRouter.route('/:id').get((req, res) => {
    const { id } = req.params;
    res.render('singleBook', {
      nav,
      title: 'My Library',
      book: books[id],
    });
  });
  return bookRouter;
}

module.exports = router;
