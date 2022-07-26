$(window).scroll(function () {
	if ($(this).scrollTop() > 700) {
		document.querySelector('.frankie').classList.add('animated');
		document.querySelector('.frankie').classList.add('fadeInRight');
	}
});