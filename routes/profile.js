var data = require("../data.json");

exports.view = function(req, res) {
	var profileInd = req.params.index;    
	data.profile = data.location[profileInd];
    res.render('profile', data);
};