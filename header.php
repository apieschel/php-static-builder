<?php ob_start(); ?>

<header>
	<ul>
		<li><a href="/">Sites</a></li>
		<li>
			<a href="#">Projects</a>
			<ul>
				<li><a class="dropdown-item" href="/javascript-calculator">Samsung Galaxy S6 Calculator</a></li>
				<li><a class="dropdown-item" href="/twitch-api">Twitch API</a></li>
				<li><a class="dropdown-item" href="/tic-tac-toe">Tic Tac Toe</a></li>
				<li><a class="dropdown-item" href="/simon">Simon</a></li>
				<li><a class="dropdown-item" href="/pomodoro">Pomodoro</a></li>
				<li><a class="dropdown-item" href="/gitfeed">Gitfeed</a></li>
			</ul>
		</li>	
		<li><a href="/about">About</a></li>							
	</ul>
</header>

<?php 
   global $headerString;
   $headerString = ob_get_contents(); 
   ob_flush();
?>