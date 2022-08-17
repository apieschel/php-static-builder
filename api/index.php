<?php	
	require_once( '../inc/config.php' );
	require_once( 'head.php' );
	require_once( 'header.php' );

	if( DEBUG && DEBUG_DISPLAY ) {
		ini_set( 'display_errors', 1 );
		ini_set( 'display_startup_errors', 1 );
		error_reporting( E_ALL );
	}

	$pageTitle = '';
	$data = json_decode( file_get_contents( ABSPATH . 'api/data.json' ) );
    $page;
    global $headString;
	global $headerString;

	if( $data ) {
		$expired = $data->timestamp <= strtotime( '-1 minute', time() );

		if( $expired ) {
			$curl = curl_init();
			
			curl_setopt_array( $curl, [
				CURLOPT_RETURNTRANSFER => 1,
				CURLOPT_URL => API_URL,
			] );

			$result = curl_exec( $curl );
			$resultStatus = curl_getinfo( $curl, CURLINFO_HTTP_CODE );
			
			curl_close( $curl );
			
			if ( $resultStatus == 200 ) {
				$page = json_decode( $result );
				$pageArray = ( array ) $page;
				$pageArray['timestamp'] = time();
				$data = $pageArray;

				file_put_contents( ABSPATH . 'api/data.json', json_encode( $data ) );
			} else {
				$page = $data;
			}
		} else {
			$page = $data;
		}
	} else {
		$curl = curl_init();
				
		curl_setopt_array( $curl, [
			CURLOPT_RETURNTRANSFER => 1,
			CURLOPT_URL => API_URL,
		] );

		$result = curl_exec( $curl );

		curl_close( $curl );
		
		$page = json_decode( $result );

		$page = $page;
		$pageArray = ( array ) $page;
		$pageArray['timestamp'] = time();
		file_put_contents( ABSPATH . 'api/data.json', json_encode( $pageArray ) );
	}

	$markup = 
		'<div class="circle">
			<i class="fa fa-cog" aria-hidden="true"></i>
		</div>

		<h1>Golden Triangle Software: Site Portfolio</h1>
		<hr>';

	$pageArray = ( array ) $page;
	if( gettype( end( $pageArray ) ) !== 'object' ) {
		array_pop( $pageArray );
	}
	
	foreach( $pageArray as $project ) {
		$markup .= 
			'<section id="projects">
				<h2>' . $project->title->rendered . '</h2>

				<div class="project-container">
					<a href="' . $project->custom_fields->{'Project URL'}[0] . '" target="_blank">
						<img width="890" height="938" src="/assets/img/' . $project->_embedded->{'wp:featuredmedia'}[0]->slug . '-medium.webp" alt="' . $project->_embedded->{'wp:featuredmedia'}[0]->alt_text . '">
					</a>
					
					<div class="project-tile">
						' . $project->content->rendered . '
					</div>
				</div>

				<hr>
			</section>';
	}
	
	$level = '<body class="home page-template-page-home">';
	
	echo $markup;

	require_once( 'footer.php' );
	global $footerString;
	
	$markup = $headString . $level . $headerString . $markup . '<script src="assets/js/scrolldetect.js"></script>' . $footerString;
	 
	file_put_contents( ABSPATH . 'index.html', $markup );
?>