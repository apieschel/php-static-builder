<?php 

if( $_SERVER['REQUEST_METHOD'] === 'GET' ) {
	require_once( '../../inc/config.php' );
	$ip = '';

	if( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}

	$ip = str_replace( array( '.', ':' ), '', $ip );
	$target_dir = ABSPATH . 'music/' . $ip . '/' . $_GET['directory'];

	if( is_dir( $target_dir ) ) {
		// https://www.php.net/manual/en/function.scandir.php#107215
		$arrFiles = array_values( array_diff( scandir( $target_dir ), array( '..', '.' ) ) );
		echo json_encode( ( object ) array( 'files' => $arrFiles, 'directory' => '/music' . '/' . $ip . '/' . $_GET['directory'] . '/' ) );
	}
}