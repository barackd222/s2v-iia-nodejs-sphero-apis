var express = require('express');  
var app = express();

var queue = [];

require('./router')(app, queue); 

app.listen(3001, function () {
  console.log('Listening on port 3001');
});


setInterval(function(){
	if(queue.length > 0){
		handleQueue(queue.shift());
	}
}, 3000);

function handleQueue(callbackFunction){

	callbackFunction();
}

module.exports = app;