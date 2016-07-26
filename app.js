var express = require('express');  
var app = express();

require('./router')(app); 

app.listen(3001, function () {
  console.log('Listening on port 3001');
});

module.exports = app;