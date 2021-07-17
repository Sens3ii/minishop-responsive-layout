//=============================================================
// Slider
//=============================================================

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

//=============================================================
// Tabs
//=============================================================

const tabsParent = document.querySelector(".catalog__tabs");
const tabs = document.querySelectorAll(".catalog__tab");
const tabsContent = document.querySelectorAll(".catalog__content");

function hideTabContent() {
	tabsContent.forEach((content) => {
		content.classList.remove("catalog__content_active");
	});
	tabs.forEach((tab) => {
		tab.classList.remove("catalog__tab_active");
	});
}

function showTabContent(i = 0) {
	tabsContent[i].classList.add("catalog__content_active");
	tabs[i].classList.add("catalog__tab_active");
}

hideTabContent();
showTabContent(0);

tabsParent.addEventListener("click", (e) => {
	const target = e.target.parentNode;
	if (target && target.classList.contains("catalog__tab")) {
		tabs.forEach((tab, i) => {
			if (target == tab) {
				hideTabContent();
				showTabContent(i);
			}
		});
	}
});

//=============================================================
// Items
//=============================================================
const catalog = document.querySelector(".catalog");

// function to flip items on their initial position
function flipItems() {
	const itemContents = document.querySelectorAll(".catalog-item__content");
	const itemLists = document.querySelectorAll(".catalog-item__list");
	itemContents.forEach((itemContent) => {
		itemContent.classList.remove("catalog-item__content_active");
		itemContent.classList.add("catalog-item__content_active");
	});
	itemLists.forEach((itemList) => {
		itemList.classList.remove("catalog-item__list_active");
	});
}

flipItems();

// adding event listener to buttons cancel and more
catalog.addEventListener("click", (e) => {
	const target = e.target;
	if (target && (target.classList.contains("catalog-item__back") || target.classList.contains("catalog-item__link"))) {
		e.preventDefault();
		const item = target.parentNode.parentNode; // getting item from its button
		item.querySelector(".catalog-item__content").classList.toggle("catalog-item__content_active");
		item.querySelector(".catalog-item__list").classList.toggle("catalog-item__list_active");
	}
});
