<?php ob_start(); ?>

<header>
	<nav>
		<ul>
			<li><a href="/web">Sites</a></li>
			<li>
				<button aria-expanded="false">Projects</button>
				<ul>
					<li><a href="/web/javascript-calculator">Samsung Galaxy S6 Calculator</a></li>
					<li><a href="/web/tic-tac-toe">Tic Tac Toe</a></li>
					<li><a href="/web/simon">Simon</a></li>
					<li><a href="/web/pomodoro">Pomodoro</a></li>
				</ul>
			</li>	
			<li><a href="/web/about">About</a></li>							
		</ul>
	</nav>
</header>

<?php 
   global $headerString;
   $headerString = ob_get_contents(); 
   ob_flush();
?>