const slider = tns({
	container: ".slider",
	items: 1,
	center: true,
	controls: false,
	nav: false,
	speed: 600,
	autoplay: true,
	autoplayTimeout: 4000,
	mouseDrag: true,
	autoplayButton: false,
	autoplayResetOnVisibility: false,
	autoplayButtonOutput: false,
});

document.querySelector(".prev").addEventListener("click", function () {
	slider.goTo("prev");
});
document.querySelector(".next").addEventListener("click", function () {
	slider.goTo("next");
});
