/*
Author       : Dreamguys
Template Name: Real Estate
Version      : 1.0
*/

(function ($) {
	"use strict";

	// Owl Carousel

	if ($(".owl-carousel").length > 0) {
		var owl = $(".owl-carousel");
		owl.owlCarousel({
			margin: 30,
			nav: true,
			loop: false,
			dots: false,
			responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
			},
		});
	}


	//   Product Details Price Range

	if (document.getElementById("myRange")) {
		var slider = document.getElementById("myRange");
		var output = document.getElementById("demo");
		output.innerHTML = slider.value;
	}
	
})(jQuery);
