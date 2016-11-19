'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 31557600000 }));


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var ipaddress = process.env.NODE_IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
var port      = process.env.NODE_PORT || process.env.OPENSHIFT_NODEJS_PORT || 9000;

app.listen(port, ipaddress, function () {
  console.log('Example app listening on port ' + port +' at ' + ipaddress)
})
