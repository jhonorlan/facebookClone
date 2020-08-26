<?php
include '../database.php';
session_start();
if(!isset($_SESSION["id"])){
	header("Location: login/");
}

?>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>User Generator</title>
	<script type="text/javascript" src="../lib/jquery/jquery.js"></script>
	<link rel="stylesheet" type="text/css" href="assets/css/styles.css">
</head>
<body>
	<container>
			<div class="area-code">
				<div id="header">
					<h2>Object/Array</h2>
				</div>
				<div id="body" contenteditable resize="false">
					
				</div>
			</div>
		<main class="start-creating">
			<div id="header">
				<div class="box">
					<div class="circle"><img src="" class="profile_picture"></div>
				</div>
				<div class="name-con">
					<h2 class="fullname">Name</h2>
				</div>
			</div>
			<div id="body">
				<li>
					<p>Firstname :</p><span  class="firstname"> </span>
				</li>
				<li>
					<p>Middlename :</p><span  class="middlename"></span>
				</li>
				<li>
					<p>Lastname :</p><span class="lastname"></span>
				</li>
				<li>
					<p>Email :</p><span class="email"></span>
				</li>
				<li>
					<p>Month :</p><span class="month"></span>
				</li>
				<li>
					<p>Day :</p><span class="day"> </span>
				</li>
				<li>
					<p>Year :</p><span class="year"> </span>
				</li>
				<li>
					<p>Birthday :</p><span class="bday"> </span>
				</li>
			</div>
		</main>
		<main class="pause-generating">
			<div class="header">
				<h2>User Generator</h2>
			</div>
			<div class="body">
				<div class="start" data-type="array">
					<span>Array</span>
				</div>
				<div class="start" data-type="database">
					<span>Use Database</span>
				</div>
			
			</div>
		</main>
			<div class="user-lists">
				<div id="header" style="position: relative;">
					<h2>User Lists</h2>
					<h3 style="float: right;position: absolute;right: 30px;top:5px;"></h3>
				</div>
				<div id="body">
					<div class="all-user-list-database"></div>
					<div class="all-user-list-array"></div>
				</div>
			</div>

	</container>

	<div class="buttons">
		<button class="copyArray">Copy as Array</button>
		<button class="insert">Insert to Database</button>
		<button class="create">Generate User</button>
		<button class="generate_insert">Generate & Insert</button>
	</div>
</body>
<script type="text/javascript" src="assets/js/thescripts.js"></script>

</html>
