
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

app.get('/test', function (req, res) {
  res.send('Test');
});

app.listen(9005);
