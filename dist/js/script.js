window.addEventListener("DOMContentLoaded", () => {
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
		animateContent(i);
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
		if (
			target &&
			(target.classList.contains("catalog-item__back") || target.classList.contains("catalog-item__link"))
		) {
			e.preventDefault();
			const item = target.parentNode.parentNode; // getting item from its button
			item.querySelector(".catalog-item__content").classList.toggle("catalog-item__content_active");
			item.querySelector(".catalog-item__list").classList.toggle("catalog-item__list_active");
		}
	});

	//=============================================================
	// Forms
	//=============================================================
	const consultationButtons = document.querySelectorAll("[data-modal=consultation]"),
		modalConsultation = document.querySelector("#consultation"),
		modals = document.querySelectorAll(".modal"),
		modalOrder = document.querySelector("#order"),
		modalThanks = document.querySelector("#thanks"),
		overlay = document.querySelector(".overlay");

	function openModal(modal, itemName = "") {
		if (modal.id === "order") {
			modal.querySelector(".modal__descr").innerHTML = itemName;
		}
		overlay.style.display = "block";
		modal.style.display = "block";
	}

	function closeModal() {
		overlay.style.display = "none";
		modals.forEach((modal) => {
			modal.style.display = "none";
		});
	}

	consultationButtons.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
			openModal(modalConsultation);
		});
	});

	overlay.addEventListener("click", (e) => {
		const target = e.target;
		if (target && (target.classList.contains("overlay") || target.classList.contains("modal__close"))) {
			closeModal();
		}
	});

	catalog.addEventListener("click", (e) => {
		const target = e.target;
		if (target && target.classList.contains("button_mini")) {
			e.preventDefault();
			const itemName = target.parentNode.parentNode.querySelector(".catalog-item__subtitle").innerHTML;
			openModal(modalOrder, itemName);
		}
	});

	//=============================================================
	// Forms validation
	//=============================================================

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true,
				},
			},
			messages: {
				name: "Введите свое имя",
				phone: "Введите свой номер телефона",
				email: {
					required: "Введите свою почту",
					email: "Неправильно введен адрес почты",
				},
			},
		});
	}

	validateForms("#consultation-form");
	validateForms("#consultation form");
	validateForms("#order form");

	$("input[name=phone]").mask("+7 (999) 999-99-99");

	// Data send
	$("form").submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize(),
		}).done(function () {
			$(this).find("input").val("");
			$("#consultation, #order").fadeOut();
			$(".overlay, #thanks").fadeIn("slow");
			$("form").trigger("reset");
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function () {
		if ($(this).scrollTop() > 1600) {
			$(".pageup").fadeIn();
		} else {
			$(".pageup").fadeOut();
		}
	});

	$("a[href='#up']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});
	$("a[href='#catalog']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});
	// For animations
	new WOW().init();
	// Animations for Items
	function animateContent(i = 0) {
		const items = tabsContent[i].querySelectorAll(".catalog-item");
		items.forEach((item, j) => {
			item.classList.remove("animate__", "animate__animated", "animate__pulse", "wow");
			item.classList.add("animate__animated", "animate__pulse", "wow");
			const delayStep = 100;
			item.setAttribute("style", `animation-delay: ${delayStep * j}ms`);
		});
	}
});
