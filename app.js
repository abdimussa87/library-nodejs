/* eslint-disable */
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app');
const bodyParser = require('body-parser');


const port = process.env.PORT || 8080;
const app = express();
const nav = [{ link: '/books', title: 'Books' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoute')(nav);
const authRouter = require('./src/routes/authRoutes')(nav);


// acts like a middleware and console logs the request header
app.use(morgan('tiny'));

//setting up body-parser for getting POST data on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//setting up passport
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'library', resave: true, saveUninitialized: true }));
require('./src/config/passport.js')(app);

//setting up static files serving for express
app.use(express.static(path.join(__dirname, '/assets/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// setting template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  if(req.user){

   res.redirect('/books');
  }
  else{
     res.render('index', {
      nav,
      title: 'My Library',
    });
  }
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)} `);
});
