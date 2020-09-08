

window.addEventListener('DOMContentLoaded', () => {

	//add Fixed to banner when scrolled to top
	const header = document.querySelector('header');
	const banner = document.querySelector('#banner');
	const nav = document.querySelector('nav');
	const bannerOffset = '-' + banner.offsetTop + 'px';
	const bannerOptions = { root: null, threshold: 0, rootMargin: bannerOffset };
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
	navItem.forEach(navItem => { navLinkObserver.observe(navItem); });


	//add 'active class' to nav items when section in view
	const sectionID = document.querySelectorAll('section[id]');
	const activeNavOptions = { root: null, threshold: 0, rootMargin: "-45% 0px -55%" };
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			const id = entry.target.getAttribute('id');
			if (entry.intersectionRatio > 0) {
				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
			} else {
				document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
			}
		});
	}, activeNavOptions);
	sectionID.forEach((section) => { observer.observe(section); });

});