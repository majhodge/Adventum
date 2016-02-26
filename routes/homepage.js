exports.view = function(req, res) {
    res.render('homepage');
};

/* For A/B Testing 
 exports.view = function(req, res){
    // var random_num = Math.random();
    var randon_num = 1;
    console.log(random_num);

    // if (random_num > 0.5) {
    if (random_num >= 0) {
		surprise = true;
        res.render('homepage');
    } else {
        res.redirect('/map2');
    }
};

exports.viewAlt = function(req, res){
	surprise = false;
    res.render('homepage');
}; */
/* End of A/B Testing */

/* Lab 7's index.js
exports.view = function(req, res){
	var random_num = Math.random();
	console.log(random_num);

	// if (random_num > 0.5) {
	if (random_num >= 0) {
		projects["grid"] = false;
		res.render('index', projects);
	} else {
		res.redirect('/grid');
	}
};

exports.viewGrid = function(req, res){
	projects["grid"] = true;
  	res.render('index', projects);
};
*/

/* Lab 7's project.js
var projects = require('../projects.json')['projects'];
*/
