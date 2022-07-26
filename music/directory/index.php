<?php // https://www.w3schools.com/php/php_file_upload.asp
require_once('../../inc/config.php');
$ip = '';

if (DEBUG && DEBUG_DISPLAY) {
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
}

if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
	$ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
	$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
	$ip = $_SERVER['REMOTE_ADDR'];
}

$ip = str_replace('.', '', $ip);
$ip = str_replace(':', '', $ip);

$target_dir = ABSPATH . 'music/' . $ip . '/' . $_GET['directory'];

if( is_dir( $target_dir ) ) {
	// https://www.php.net/manual/en/function.scandir.php#107215
	$arrFiles = array_values( array_diff( scandir( $target_dir ), array( '..', '.' ) ) );
	echo json_encode( ( object ) array( 'files' => $arrFiles, 'directory' => '/music' . '/' . $ip . '/' . $_GET['directory'] . '/' ) );
}