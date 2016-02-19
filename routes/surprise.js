var oldData = require("../oldData.json"); 

exports.view = function(req, res) {
    res.render(dataData);
    console.log(dataData);
};

/*exports.addPlaces = function(req, res) { 
	var newPlaces = {
		"name": req.query.name,
		//"type": req.query.type,
		//"foodtype": req.query.foodtype,
		//"image": req.query.image,
		//"link": req.query.link,
		"description": req.query.description
		//"phone": req.query.phone,
		//"address": req.query.address,
	};
	console.log(newPlaces);
	data["places"].push(newPlaces);

	res.render('surprise', data);
 };*/