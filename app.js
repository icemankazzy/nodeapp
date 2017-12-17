var express = require('express');
const bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json())

// Routes
app.get('/helloword', function(req, res) {
  res.json({hello:'Hello World!'});
});
app.get('/', function(req, res) {
  res.json({hello:'Hello App!'});
});

// Listen
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on localhost:'+ port);