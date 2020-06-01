const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const chalk = require('chalk');
const passport = require('passport');

const authRouter = express.Router();

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';

module.exports = function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const col = db.collection('users');
        const results = await col.insertOne(req.body);
        req.logIn(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) { debug(chalk.red(err.stack)); }
      client.close();
    }());
  });

  authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', { title: 'Sign in', nav });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/books',
      failureRedirect: '/',
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  authRouter.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/auth/signin');
  });

  return authRouter;
};
