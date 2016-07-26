
var move = require("../core/spheroCore");


var routes = function(app) {
  app.post('/sphero/shape/:shape/color/:color', function(req, res) {
  	try{
  		var shape = req.params.shape;
			var color = req.params.color;

			console.log("API + [" + req.url + "]");

			// Let's make some shapes with colors:
			move(shape, color);  					
		
  	} catch(ex){
  		res.status(500).json({error:"Something went wrong!", details:ex});
  		return;
  	}

    res.status(202).end();
  });

  app.post('/sphero/roll', function(req, res) {
  	try{
  		//Do sphero things with the request
  		console.log("API + [" + req.url + "]");
				
  	} catch(ex){
  		res.status(500).json({error:"Something went wrong!", details:ex});
  		return;
  	}	

    res.status(202).end();
  });

  app.post('/sphero/colour', function(req, res) {
  	try{
  		//Do sphero things with the request
			console.log("API + [" + req.url + "]");
		
  	} catch(ex){
  		res.status(500).json({error:"Something went wrong!", details:ex});
  		return;
  	}	

    res.status(202).send();
  });

};

module.exports = routes;  