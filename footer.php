<?php ob_start(); ?>

		<script src="assets/js/jquery-3.2.1.min.js"></script> 
		<script src="assets/lightbox/dist/js/lightbox.min.js" defer></script>

		<script>
			var $buoop = {c:2};function $buo_f(){var e = document.createElement("script");e.src = "//browser-update.org/update.min.js";document.body.appendChild(e);};try {document.addEventListener("DOMContentLoaded", $buo_f,false)}catch(e){window.attachEvent("onload", $buo_f)}
		
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