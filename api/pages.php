<?php 
	require_once( '../inc/config.php' );
	require_once( 'head.php' );
	require_once( 'header.php' );
	require_once( 'footer.php' );

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
		$resultStatus = curl_getinfo( $curl, CURLINFO_HTTP_CODE );
		curl_close( $curl );

		if( isset( $_POST['post'] ) && $resultStatus === 200 ) {
			$oldPageData = json_decode( file_get_contents( ABSPATH . 'api/' . $_POST['slug'] . '.json' ) );
			$expired = $pageData->timestamp <= strtotime( '-1 minute', time() );

			if( $expired ) {
				$newPageData = ( array ) json_decode( $_POST['post'] );
				$newPageData['timestamp'] = time();
				file_put_contents( ABSPATH . 'api/' . $_POST['slug'] . '.json', json_encode( $newPageData ) );
				
				$markup = $headString;

				switch( $_POST['slug'] ) {
					case 'pomodoro':
						$markup .= '<body class="page-template-page-pomodoro">';
						break;
					case 'simon':	
						$markup .= '<body class="page-template-page-simon">';
						break;
					case 'tic-tac-toe':
						$markup .= '<body class="page-template-page-tic-tac-toe">';
						break;
					case 'javascript-drum-machine':
						$markup .= '<body class="javascript-drum-machine">';
						break;
					default:
						$markup .= '<body class="page-template-default">';		
				}

				$markup .= $headerString;
				$markup .= '<main><h1>' . $_POST['title'] . '</h1>';
				$markup .= $newPageData['content']->rendered . '</main>';

				switch( $_POST['slug'] ) {
					case 'pomodoro':
						$markup .= '<script src="assets/js/pomodoro.js"></script>';
						break;
					case 'javascript-calculator':
						$markup .= '<script src="assets/js/calc.js"></script>';
						break;
					case 'simon':	
						$markup .= '<script src="assets/js/simon.js"></script>';
						break;
					case 'tic-tac-toe':
						$markup .= '<script src="assets/js/tictac.js"></script>';
						break;
					case 'javascript-drum-machine':
						$markup .= '
							<script src="https://cdn.rawgit.com/mattdiamond/Recorderjs/08e7abd9/dist/recorder.js"></script>
							<script src="assets/js/client.js"></script>
							<script src="assets/js/drummachine.js"></script>
						';
						break;
					default:
						$markup .= '<body class="page-template-default">';		
				}
				
				$markup .= $footerString;
				file_put_contents( ABSPATH . $_POST['slug'] . '.html', $markup );
			}
		}
	} else {
		echo "Sorry, but you don't have access to this page.";
	}
?>