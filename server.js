var express = require('express');
var bodyParser = require('body-parser');
var expressSanitized = require('express-sanitize-escape');
var path = require('path');

var app = express();
var port = 1123;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(expressSanitized());

app.use(express.static(path.join(__dirname, 'dist'), { dotfiles: 'ignore', index: false }));
app.use(express.static('public'))


// make it that every request will serve the same index.html
app.get('*', function(req, res, next){
  var indexFile = path.resolve(__dirname+'/dist', 'index.html')
  console.log('Request: [GET] : ', req.originalUrl)

  res.sendFile(indexFile);
})

// Error Handling
app.use(function(req, res, next){
  console.log('[ 404 ]');
  var err = new Error('NOT FOUND');
  err.status = 404;
  next(err);
});

// server start
app.listen(port);
console.log('Server Start at Port::' + port);
