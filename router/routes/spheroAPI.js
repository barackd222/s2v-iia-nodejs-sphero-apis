
var sphero = require("../core/spheroCore");


var routes = function (app, queue) {
  app.post('/sphero/shape/:shape/color/:color', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {
			var shape = req.params.shape;
			var color = req.params.color;

			console.log("API + [" + req.url + "]");

			// Let's make some shapes with colors:
			queue.push(function () { sphero("shape", shape, color) });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}

    res.status(202).end();
  });

  app.post('/sphero/color/:color', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");

		try {

			var color = req.params.color;

			console.log("API + [" + req.url + "]");

			// Let's change color:
			queue.push(function () { sphero("color", color, "empty") });

		} catch (ex) {
			res.status(500).json({ error: "Something went wrong!", details: ex });
			return;
		}

    res.status(202).end();
  });



};

module.exports = routes;  