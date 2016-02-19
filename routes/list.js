var oldData = require("../oldData.json"); 

exports.view = function(req, res) {
    res.render('list', oldData);
    console.log(oldData);
};

/**
exports.view = function(req, res) {
    res.render('list');
};
**/