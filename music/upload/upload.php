<?php // https://www.w3schools.com/php/php_file_upload.asp

if( $_SERVER['REQUEST_METHOD'] === 'POST' ) {
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
	$target_dir = ABSPATH . 'music/' . $ip;
	$timeStamp = date('m-d-Y') . '_' . date( 'H' ) . 'h' . date( 'i' ) . 'm';

	if( ! is_dir( $target_dir ) ) {
		mkdir( $target_dir );
		$target_dir = ABSPATH . 'music/' . $ip . '/' . 'upfile_' . $timeStamp;

		if( ! is_dir( $target_dir ) ) {
			mkdir( $target_dir );
		}
	} else {
		$target_dir = ABSPATH . 'music/' . $ip . '/' . 'upfile_' . $timeStamp;

		if( ! is_dir( $target_dir ) ) {
			mkdir( $target_dir );
		}
	}

	$target_dir = $target_dir . '/';
	$uploadOk = 1;

	// Check for any files that already exist are aren't .wav
	foreach( $_FILES['upfile']['name'] as $name ) {
		$target_file = $target_dir . basename( $name );
		$imageFileType = strtolower( pathinfo( $target_file, PATHINFO_EXTENSION ) );
		
		if( file_exists( $target_file ) ) {
			$uploadOk = 0;
		}

		if( $imageFileType != 'wav' ) {
			$uploadOk = 0;
		}
	}

	// Check for any files that are too large
	foreach( $_FILES['upfile']['size'] as $size ) {
		if ( $size > 500000) {
			$uploadOk = 0;
		}
	}

	if ( $uploadOk ) {
		$i = 0;
		foreach( $_FILES['upfile']['tmp_name'] as $tmpName ) {
			$target_file = $target_dir . basename( $_FILES['upfile']['name'][$i] );
			move_uploaded_file( $tmpName, $target_file );
			$i++;
		}
	}
} 

header( 'Location: /javascript-drum-machine' );