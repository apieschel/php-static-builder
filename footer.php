<?php ob_start(); ?>

		<script src="assets/js/jquery-3.2.1.min.js"></script> 
		<script src="assets/lightbox/dist/js/lightbox.min.js" defer></script>

		<script>
			$(window).scroll(function() {
				if ($(this).scrollTop() > 700) {
					$(".frankie").addClass("animated fadeInRight");
				}
			});
		</script>
	</body>
</html>

<?php 
   global $footerString;
   $footerString = ob_get_contents(); 
   ob_flush();
?>