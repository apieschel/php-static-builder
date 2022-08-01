<?php ob_start(); ?>

<header>
	<nav>
		<ul>
			<li><a href="/">Sites</a></li>
			<li>
				<button aria-expanded="false">Projects</button>
				<ul>
					<li><a href="/javascript-drum-machine">Javascript Drum Machine</a></li>
					<li><a href="/javascript-calculator">Samsung Galaxy S6 Calculator</a></li>
					<li><a href="/tic-tac-toe">Tic Tac Toe</a></li>
					<li><a href="/simon">Simon</a></li>
					<li><a href="/pomodoro">Pomodoro</a></li>
				</ul>
			</li>	
			<li><a href="/about">About</a></li>							
		</ul>
	</nav>
</header>

<?php 
   global $headerString;
   $headerString = ob_get_contents(); 
   ob_end_clean();
?>