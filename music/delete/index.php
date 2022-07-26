<?php	

require_once('../../inc/config.php');
$ip = '';

if( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) ) {
	$ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
	$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
	$ip = $_SERVER['REMOTE_ADDR'];
}

$ip = str_replace( array( '.', ':' ), '', $ip );
$dir = ABSPATH . 'music/' . $ip;

if( is_dir( $dir ) ) {
	rrmdir( $dir );
}

// https://www.php.net/manual/en/function.rmdir.php#98622
function rrmdir( $dir ) {
	if( is_dir( $dir ) ) {
		$objects = scandir( $dir );
		foreach( $objects as $object ) {
			if( $object != "." && $object != ".." ) {
				if( filetype( $dir . "/" . $object ) == "dir" ) rrmdir( $dir . "/" . $object );
				else unlink( $dir . "/" . $object );
			}
		}
		reset( $objects );
		rmdir( $dir );
	}
}