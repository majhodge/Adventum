var data = require("../data.json"); 

exports.view = function(req, res) {
	var rand = Math.floor(Math.random() * data.location.length);
	data.currPlace = data.location[rand];
    res.render('surprise', data);
};

