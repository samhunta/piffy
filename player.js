var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);
app.engine('html', ejs.renderFile);

app.use(express.urlencoded());
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use(app.router);

var player = {};

app.get('/player.html', function(req,res){
  res.render('player.html');
});

app.get('/index.html', function(req,res){
  res.render('index.html');
});

var server = app.listen(24922);

module.exports = function () {
};