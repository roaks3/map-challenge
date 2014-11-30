
var databaseUrl = "orderdb"; 
var collections = ["hubs", "orders"];
var orderdb = require("mongojs").connect(databaseUrl, collections);

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

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
