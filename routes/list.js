var data = require("../data.json"); 

exports.view = function(req, res) {
    res.render('list', data);
    // console.log(oldData);
};

/**
exports.view = function(req, res) {
    res.render('list');
};
**/