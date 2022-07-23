<?php 
	if( DEBUG && DEBUG_DISPLAY ) {
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);
	}

	require_once( '../inc/config.php' );
	require_once( ABSPATH . 'header.php' );
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
		if( $page->slug !== 'gitfeed' ) {
			$markup = $headerString . '<body class="page-template-default">';
			$markup .= '<main><h1>' . $page->title->rendered . '</h1>';
			$markup .= $page->content->rendered . '</main>' . $footerString;	
			
			file_put_contents( ABSPATH . 'web/' . $page->slug . '.html', $markup );
		}
	}
	
	$pages['timestamp'] = time();
?>