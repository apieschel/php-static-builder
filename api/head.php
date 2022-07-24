<?php ob_start(); ?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Golden Triangle Software</title>
		<meta charset="UTF-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<link rel="icon" type="image/png" href="assets/favicon.png"/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300">
		<link rel="stylesheet" href="assets/css/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="assets/lightbox/dist/css/lightbox.min.css">
		<link rel='stylesheet' href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css?ver=6.0.1" type='text/css' media='all' />
		<link rel="stylesheet" href="assets/css/style.css">
		<script src="assets/js/jquery-3.2.1.min.js"></script> 
	</head>

<?php 
   global $headString;
   $headString = ob_get_contents(); 
   ob_flush();
?>