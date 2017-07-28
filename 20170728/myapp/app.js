var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.post('/', function(req, res){
	res.send('Got a POST request');
});

app.get('/user', function(req, res){
	res.send('Got a GET request');	
});
app.put('/user', function(req, res){
	res.send('Got a PUT request');
});

app.delete('/user', function(req, res){
	res.send('Got a DELETE request');
});

var server = app.listen(3000);
