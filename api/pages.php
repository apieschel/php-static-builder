<?php 
	require_once( '../inc/config.php' );
	require_once( 'head.php' );
	require_once( 'header.php' );
	require_once( 'footer.php' );

	if( DEBUG && DEBUG_DISPLAY ) {
		ini_set( 'display_errors', 1 );
		ini_set( 'display_startup_errors', 1 );
		error_reporting( E_ALL );
	}

	// echo '<pre>'; var_dump( $_SERVER ); echo '</pre>';

	if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
		global $headString;
		global $headerString;
		global $footerString;
		
		$curl = curl_init();
					
		curl_setopt_array( $curl, [
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => API_URL_PAGES,
		] );

		$result = curl_exec( $curl );

		curl_close( $curl );
		
		$pages = ( array ) json_decode( $result );

		if( isset( $_POST['post'] ) ) {
			file_put_contents( ABSPATH . 'api/' . $_POST['title'] . '.json', $_POST['post'] );
		}
		
		foreach( $pages as $page ) {
			if( $page->slug !== 'gitfeed' && $page->slug !== 'twitch-api' ) {
				$markup = $headString;

				if( $page->slug === 'pomodoro' ) {
					$markup .= '<body class="page-template-page-pomodoro">';
				} else if( $page->slug === 'simon' ) {
					$markup .= '<body class="page-template-page-simon">';
				} else if( $page->slug === 'tic-tac-toe' ) {
					$markup .= '<body class="page-template-page-tic-tac-toe">';
				} else if( $page->slug === 'javascript-drum-machine' ) {
					$markup .= '<body class="javascript-drum-machine">';
				}
				else {
					$markup .= '<body class="page-template-default">';
				}

				$markup .= $headerString;
				$markup .= '<main><h1>' . $page->title->rendered . '</h1>';
				$markup .= $page->content->rendered . '</main>';

				if( $page->slug === 'javascript-calculator' ) {
					$markup .= '<script src="assets/js/calc.js"></script>';
				}

				if( $page->slug === 'tic-tac-toe' ) {
					$markup .= '<script src="assets/js/tictac.js"></script>';
				}

				if( $page->slug === 'simon' ) {
					$markup .= '<script src="assets/js/simon.js"></script>';
				}

				if( $page->slug === 'pomodoro' ) {
					$markup .= '<script src="assets/js/pomodoro.js"></script>';
				}

				if( $page->slug === 'javascript-drum-machine' ) {
					$markup .= '
						<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
						<script src="assets/js/client.js"></script>
						<script src="assets/js/drummachine.js"></script>
					';
				}
				
				$markup .= $footerString;	
				
				file_put_contents( ABSPATH . $page->slug . '.html', $markup );
			}
		}
	} else {
		echo "Sorry, but you don't have access to this page.";
	}
	
	$pages['timestamp'] = time();
?>