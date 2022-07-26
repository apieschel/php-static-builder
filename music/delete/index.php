<?php
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
$dir = ABSPATH . 'music/' . $ip;
echo $dir;

if (is_dir($dir)) {
	$objects = scandir($dir);
	foreach ($objects as $object) {
		if ($object != "." && $object != "..") {
			if (filetype($dir . "/" . $object) == "dir")
				rrmdir($dir . "/" . $object);
			else unlink($dir . "/" . $object);
		}
	}
	reset($objects);
} else {
	echo 'That directory does not exist';
}

function rrmdir($dir) {
	if (is_dir($dir)) {
	  $objects = scandir($dir);
	  foreach ($objects as $object) {
		if ($object != "." && $object != "..") {
		  if (filetype($dir."/".$object) == "dir") rrmdir($dir."/".$object); else unlink($dir."/".$object);
		}
	  }
	  reset($objects);
	  rmdir($dir);
	}
 }