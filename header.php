<?php ob_start(); ?>

<header>
	<ul>
		<li><a href="/web">Sites</a></li>
		<li>
			<a href="#">Projects</a>
			<ul>
				<li><a class="dropdown-item" href="/web/javascript-calculator">Samsung Galaxy S6 Calculator</a></li>
				<li><a class="dropdown-item" href="/web/twitch-api">Twitch API</a></li>
				<li><a class="dropdown-item" href="/web/tic-tac-toe">Tic Tac Toe</a></li>
				<li><a class="dropdown-item" href="/web/simon">Simon</a></li>
				<li><a class="dropdown-item" href="/web/pomodoro">Pomodoro</a></li>
				<li><a class="dropdown-item" href="/web/gitfeed">Gitfeed</a></li>
			</ul>
		</li>	
		<li><a href="/web/about">About</a></li>							
	</ul>
</header>

<?php 
   global $headerString;
   $headerString = ob_get_contents(); 
   ob_flush();
?>