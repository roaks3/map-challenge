
var databaseUrl = "orderdb"; 
var collections = ["hubs", "orders"];
var orderdb = require("mongojs").connect(databaseUrl, collections);

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);

app.get('/hubs', function (req, res) {
  var cursor = orderdb.hubs.find();
  cursor.toArray(function(err, docs) {
    res.send(docs);
  });
});

app.get('/orders', function (req, res) {
  var cursor = orderdb.orders.find();
  cursor.toArray(function(err, docs) {
    res.send(docs);
  });
});

app.listen(9005);
