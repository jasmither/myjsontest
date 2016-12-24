var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  next();
});

app.use(bodyParser.json());

app.post('/', function(req, res) {
	console.log(JSON.stringify(req.body));
	res.send(JSON.stringify(req.body));
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function() {
	console.log("Express server listening on http://" + server_ip_address + ":" + server_port);
});