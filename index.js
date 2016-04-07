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

app.get('/home', function(request, response) {
  response.render('home.jade');
});

app.get('/incomingpatients', function(request, response) {
  response.render('incomingpatients.jade');
});

app.get('/pastpatients', function(request, response) {
  response.render('pastpatients.jade');
});

app.get('/clinicreview', function(request, response) {
  response.render('clinicreview.jade');
});

app.get('/patientinfo', function(request, response) {
  response.render('patientinfo.jade');
});

app.get('/user', function(request, response) {
  response.render('user.jade');
});

app.get('/clinic', function(request, response) {
  response.render('clinic.jade');
});

app.get('/clinic1', function(request, response) {
  response.render('clinic1.jade');
});

app.get('/clinic2', function(request, response) {
  response.render('clinic2.jade');
});

app.get('/clinic3', function(request, response) {
  response.render('clinic3.jade');
});

app.get('/list', function(request, response) {
  response.render('list.jade');
});

app.get('/login', function(request, response) {
  response.render('login.jade');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
