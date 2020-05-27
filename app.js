const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app');

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('tiny'));// acts like a middleware and console logs the request header
app.use(express.static(path.join(__dirname, '/assets/')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// setting template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', { myList: ['a', 'b'], title: 'My Library' });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)} `);
});
