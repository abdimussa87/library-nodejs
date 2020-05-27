var express=  require('express');
var chalk = require('chalk');
var morgan = require('morgan');
var path = require('path');
var debug = require('debug')('app');

var app = express();

app.use(morgan('tiny'));// acts like a middleware and console logs the request header
app.use(express.static(path.join(__dirname,'/assets/')));
app.use('/js',express.static(path.join(__dirname,'node_modules/bootstrap/dist/js')));
app.use('/css',express.static(path.join(__dirname,'node_modules/bootstrap/dist/css')));
app.use('/js',express.static(path.join(__dirname,'node_modules/jquery/dist')));




app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views/index.html'));
});

app.listen(8080,()=>{
    debug(`listening on port ${chalk.green(8080)} ` );
});