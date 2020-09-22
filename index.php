<?php
include 'data/PHPGradientColors.php';
include 'database.php';
session_start();
if(!isset($_SESSION["id"])){
	header("Location: login/");
}else{
	setUserInformation($connect);
}
echo $_SESSION["id"]
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.1">
	<title>Facebook</title>

	<link rel="icon" href="image/facebook-logo.png" class="rel">
	
	<!-- Jquery Cdn -->
	<script type="text/javascript" src="lib/jquery/jquery.js"></script>
	<script type="text/javascript" src="lib/jquery/jqueryui.js"></script>
	

	<!-- Css -->
	<link rel="stylesheet" type="text/css" href="assets/css/styles.css">
	<link rel="stylesheet" type="text/css" href="assets/css/responsive.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main-style.css">

	<!-- Font Awesome -->
	<script type="text/javascript" src="lib/fontawesome/fontawesome.min.js"></script>
	<!-- Socket -->
	<script type="text/javascript" src="lib/socket/socket.io.js"></script>
	<!-- Dom To Image -->
	<script type="text/javascript" src="lib/dom-to-image/dist/dom-to-image.min.js"></script>
	<script type="text/javascript" src="lib/dom-to-image/src/dom-to-image.js"></script>
		<!-- HTML2 -->
	<script type="text/javascript" src="lib/html2/html2canvas.js"></script>

</head>
<body>
	<!-- Root -->
		
	<main>
		<!-- For facebook -->
		<facebook class="view">
		<?php include 'content/facebook-navbar-content.php'; ?>
		<!-- Home -->
		<?php include 'content/facebook-home-content.php'; ?>
		<!-- Watch -->
		<?php include 'content/facebook-watch-content.php'; ?>
		<!-- Marketplace -->
		<?php include 'content/facebook-marketplace-content.php'; ?>
		<!-- Group -->
		<?php include 'content/facebook-group-content.php'; ?>
		<!-- Gaming -->
		<?php include 'content/facebook-gaming-content.php'; ?>
		<!-- Messenger -->
		<?php include 'content/facebook-messenger-content.php'; ?>
		<!-- Stories -->
		<?php include"content/facebook-stories-content.php"; ?> 
		<!-- Settings -->
		<?php include 'content/facebook-settings-content.php'; ?>
		<!-- No Content -->
		<?php include 'content/facebook-no-content-content.php'; ?>
        <!-- Floating Content -->
		<?php include 'content/facebook-floating-content-content.php'; ?>

        <?php include 'content/facebook-new-post-textarea-content.php'; ?>

		<!-- MESSAGES  -->
        <div class="message-big-pipe-container"></div>
		<!-- Notification -->
		<div class="notification-float-container"></div>
		<!-- Photo Preview -->
		<div class="facebook-content photo-body facebook-content-body" style="display: none;"></div>
		<!-- Profile -->
		<div class="profile-body user-profile-body" style="display: none;"></div>
		</facebook>		
	</main>
	<!-- End Root -->
<!-- <script type="text/javascript" src="assets/js/cookie.js"></script> -->
	<script type="text/javascript" src="assets/js/script.js"></script>


</body>	
</html>



