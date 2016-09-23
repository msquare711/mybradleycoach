'use strict';

var _server = require('./server');

var server = (0, _server.createServer)();
var port = process.env.PORT || 3000;
server.listen(port, function () {
  console.log('Example app listening on port 3000!');
});