'use strict';

// Call this function when the page loads (the "ready" event)
jQuery(document).ready(function($) {
	initializePage();
});

function initializePage() {
	var loadDate = new Date();
	var firstClick = true;

	$('.btn-surprise').on('click', function (event) {
		if (firstClick) {
			var now = new Date();
			firstClick = false;

			var elapsed = now - loadDate;
			ga('send', 'timing', 'surprise', 'load', elapsed);
		}
		ga("send", "event", 'surprise', 'click');
	})
}