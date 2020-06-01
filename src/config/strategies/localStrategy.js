const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:localStrategy');
const chalk = require('chalk');

const url = 'mongodb://localhost:27017';
const dbName = 'libraryApp';


module.exports = function localStrategy() {
  passport.use(new Strategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      const user = { username, password };
      (async function addUser() {
        let client;

        try {
          client = await MongoClient.connect(url);
          const db = client.db(dbName);
          const col = db.collection('users');
          const result = await col.findOne({ username });
          debug(chalk.green(result));
          if (result != null && result.password === password) {
            // * call the successRedirect on post.authenticate method found on authRoutes
            done(null, result);
          } else {
            // * call the failureRedirect on post.authenticate method found on authRoutes
            done(null, false);
          }
        } catch (err) { debug(chalk.red(err.stack)); }
        client.close();
      }());
    },
  ));
};
