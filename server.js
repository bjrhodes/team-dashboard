var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist/'));

app.listen(9000, function () {
  console.log('Team Dashboard is serving directory ' + __dirname + 'on port 9000');
});
