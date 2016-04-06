var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index.jade');
});

app.get('/user', function(request, response) {
  response.render('user.jade');
});

app.get('/clinic', function(request, response) {
  response.render('clinic.jade');
});

app.get('/list', function(request, response) {
  response.render('list.jade');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
