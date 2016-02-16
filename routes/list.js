exports.view = function(req, res) {
    var name = req.params.name;
    console.log("The place is: " + name);
    res.render('list', data);
};