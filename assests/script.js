

window.addEventListener('DOMContentLoaded', () => {
	
	function getViewportWidth() {
		if (window.innerWidth) {
			return window.innerWidth;
		}
		else if (document.body && document.body.offsetWidth) {
			return document.body.offsetWidth;
		}
		else {
			return 0;
		}
	}

	function getViewportHeight() {
		if (window.innerHeight) {
			return window.innerHeight;
		}
		else if (document.body && document.body.offsetHeight) {
			return document.body.offsetHeight;
		}
		else {
			return 0;
		}
	}

	//add Fixed to banner when scrolled to top
	const header = document.querySelector('header');
	const banner = document.querySelector('#banner');
	const nav = document.querySelector('nav');
	const bannerOffset = '-' + banner.offsetTop + 'px';
	const bannerMobileptions = { root: null, threshold: 0, rootMargin: "0px" };
	const bannerDesktopOptions = { root: null, threshold: 0, rootMargin: bannerOffset };
	let bannerOptions = (getViewportWidth() > 1079) ? bannerDesktopOptions : bannerMobileptions;
	const bannerObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				banner.classList.remove('fixed')
				nav.classList.remove('fixed')
			} else {
				banner.classList.add('fixed')
				nav.classList.add('fixed')
			}
		});
	}, bannerOptions);
	bannerObserver.observe(header)

	//add 'Fixed class' to nav items when scrolled to top
	const navItem = document.querySelectorAll('.navItem');
	const navLinkOptions = { root: null, threshold: 0, rootMargin: "-120px" };
	const navLinkObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.remove('stuck')
			} else {
				entry.target.classList.add('stuck')
			}
		});
	}, navLinkOptions);


	//add 'active class' to nav items when section in view
	const sectionID = document.querySelectorAll('section[id]');
	const activeNavOptions = { root: null, threshold: 0, rootMargin: "-45% 0px -55%" };
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
				document.getElementById('navToggle').checked = false;
			} else {
				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	}, activeNavOptions);


	window.onload = function () {
		if (getViewportWidth() > 1079) {
			bannerObserver.observe(header);
			navItem.forEach(navItem => { navLinkObserver.observe(navItem); });
			sectionID.forEach((section) => { observer.observe(section); });
		}
	}

	window.onresize = function () {
		if (getViewportWidth() > 1079) {
			bannerObserver.observe(header);
			navItem.forEach(navItem => { navLinkObserver.observe(navItem); });
			sectionID.forEach((section) => { observer.observe(section); });
		}
	}

});