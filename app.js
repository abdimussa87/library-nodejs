/* eslint-disable */
const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app');

const port = process.env.PORT || 8080;
const app = express();
const nav = [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoute')(nav);



app.use(morgan('tiny'));// acts like a middleware and console logs the request header
app.use(express.static(path.join(__dirname, '/assets/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// setting template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/books', bookRouter);
app.use('/admin',adminRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'Books' }, { link: '/authors', title: 'Authors' }],
    title: 'My Library',
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)} `);
});
