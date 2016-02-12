var data = require("../data.json");

exports.addPlaces = function(req, res) { 
	var newPlaces = {
		"name": req.query.name,
		"type": req.query.type,
		"description": req.query.description,
		"imageURL": "http://lorempixel.com/400/400/people"
	};
	console.log(newFriend);
	data["friends"].push(newFriend);

	res.render('add', data);
 };