<?php 
	if( DEBUG && DEBUG_DISPLAY ) {
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);
	}

	require_once( '../inc/config.php' );
	require_once( ABSPATH . 'head.php' );
	require_once( ABSPATH . 'header.php' );
	require_once( ABSPATH . 'footer.php' );
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
	
	foreach( $pages as $page ) {
		if( $page->slug !== 'gitfeed' && $page->slug !== 'twitch-api' ) {
			$markup = $headString . '<body class="page-template-default">' . $headerString;
			$markup .= '<main><h1>' . $page->title->rendered . '</h1>';
			$markup .= $page->content->rendered . '</main>';

			if( $page->slug === 'javascript-calculator' ) {
				$markup .= '<script src="assets/js/calc.js"></script>';
			}
			 
			$markup .= $footerString;	
			
			file_put_contents( ABSPATH . 'web/' . $page->slug . '.html', $markup );
		}
	}
	
	$pages['timestamp'] = time();
?>