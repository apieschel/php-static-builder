<?php
// https://www.w3schools.com/php/php_file_upload.asp
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

$target_dir = ABSPATH . 'music/' . $ip;
$timeStamp = date('m-d-Y') . '_' . date('H') . 'h' . date('i') . 'm';

if (!is_dir($target_dir)) {
	mkdir($target_dir);
	echo "The ip directory was created.<br>";
	$target_dir = ABSPATH . 'music/' . $ip . '/' . 'upfile_' . $timeStamp;

	if (!is_dir($target_dir)) {
		mkdir($target_dir);
		echo "The timestamp directory was created.<br>";
	} else {
		echo "The timestamp directory already exists.<br>";
		echo $target_dir . '<br><br>';
	}
} else {
	echo "The ip directory already exists.<br>";
	$target_dir = ABSPATH . 'music/' . $ip . '/' . 'upfile_' . $timeStamp;

	if (!is_dir($target_dir)) {
		mkdir($target_dir);
		echo "The timestamp directory was created.<br>";
	} else {
		echo "The timestamp directory already exists.<br>";
	}
}

$target_dir = $target_dir . '/';
$uploadOk = 1;

var_dump( $_FILES ); 

foreach( $_FILES['upfile']['name'] as $name ) {
	$target_file = $target_dir . basename( $name );
	$imageFileType = strtolower( pathinfo( $target_file, PATHINFO_EXTENSION ) );
	
	if( file_exists( $target_file ) ) {
		echo 'Sorry, file already exists.<br>';
		$uploadOk = 0;
	}

	if( $imageFileType != 'wav' ) {
		echo 'Sorry, only Wav files are allowed.';
		$uploadOk = 0;
	}
}

// Check file sizes
foreach( $_FILES['upfile']['size'] as $size ) {
	if ( $size > 500000) {
		echo 'Sorry, your file is too large.';
		$uploadOk = 0;
	}
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
	echo ' Sorry, your file was not uploaded.';
	// if everything is ok, try to upload file
} else {
	$i = 0;
	foreach( $_FILES['upfile']['tmp_name'] as $tmpName ) {
		$target_file = $target_dir . basename( $_FILES['upfile']['name'][$i] );

		if( move_uploaded_file( $tmpName, $target_file ) ) {
			echo 'The file ' . htmlspecialchars( basename ( $_FILES['upfile']['name'][$i] ) ) . ' has been uploaded.';
		} else {
			echo 'Sorry, there was an error uploading your file.';
		}

		$i++;
	}
} ?>

<script type="text/javascript"> 
	window.location.href = '/javascript-drum-machine';
</script>