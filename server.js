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
	
	var Banking = require('banking');
	
	var bank = Banking({
		  fid: req.body.fid
		, fidOrg: req.body.fidOrg
		, url: req.body.url
		, bankId: req.body.bankId
		, user: req.body.user
		, password: req.body.password
		, accId: req.body.accId
		, accType: req.body.accType
		, ofxVer: 102
		, app: 'QBKS'
		, appVer: '1900'
	});

	bank.getStatement({start:20161201, end:20161217}, function(err, foo) {
		if(err) console.log(err);
		
		var parseString = require('xml2js').parseString;
		parseString(foo.xml, function(err, result) {
			res.send(result);
		})
	});
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function() {
	console.log("Express server listening on http://" + server_ip_address + ":" + server_port);
});