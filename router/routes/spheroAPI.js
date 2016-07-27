
var sphero = require("../core/spheroCore");


var routes = function(app) {
  app.post('/sphero/shape/:shape/color/:color', function(req, res) {
  	try{
  		var shape = req.params.shape;
			var color = req.params.color;

			console.log("API + [" + req.url + "]");

			// Let's make some shapes with colors:
			sphero("shape", shape, color);  					
		
  	} catch(ex){
  		res.status(500).json({error:"Something went wrong!", details:ex});
  		return;
  	}

    res.status(202).end();
  });

  app.post('/sphero/color/:color', function(req, res) {
  	try{

  		var color = req.params.color;

			console.log("API + [" + req.url + "]");

			// Let's change color:
			sphero("color", color, "empty");  					
		
  	} catch(ex){
  		res.status(500).json({error:"Something went wrong!", details:ex});
  		return;
  	}

    res.status(202).end();
  });



};

module.exports = routes;  