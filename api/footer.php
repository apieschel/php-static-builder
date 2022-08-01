<?php ob_start(); ?>
		<script src="assets/lightbox/dist/js/lightbox.min.js" defer></script>

		<script>
			let parentMenuItems = Array.from( document.querySelectorAll( "nav ul li ul" ) );

			parentMenuItems.forEach((element) => {
				let menuButton = element.parentElement.querySelector("button");
				let menuLastChild = element.querySelector("li:last-child > a");

				if( menuButton ) {
					menuButton.addEventListener("focusin", function () {
						menuButton.setAttribute("aria-expanded", true);
					} );

					menuLastChild.addEventListener("blur", function () {
						menuButton.setAttribute("aria-expanded", false);
					} );

					menuButton.addEventListener("mousedown", function () {
						let menuState = menuButton.getAttribute("aria-expanded");
						if (menuState === "false") { menuButton.setAttribute("aria-expanded", true); }
						else { menuButton.setAttribute("aria-expanded", false);}
					} );
				}
			} );
		</script>
	</body>
</html>

<?php 
   global $footerString;
   $footerString = ob_get_contents(); 
   ob_end_clean();
?>