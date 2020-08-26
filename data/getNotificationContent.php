<?php
include '../database.php';
session_start();

$count = $_GET['new_count'];
$content = $_GET["content"];
$output ='
	<div id="notification-float-item" class="notification-count-'.$count.'">
		<div id="header"><div id="circle"></div><p id="desc">Notifications</p><i class="fa fa-chevron-down"></i></div>
		<div id="body" >
			<div id="profile_pic"></div><p><a href="">Shasha </a>'.$count.'</p>
			<small>1 min</small>
		</div>
		<div id="footer">
			<center>
						<div id="button-cancel">Close</div>
						<div id="button-open">Open</div>
			</center>
		</div>
	</div>
';
echo $output;
?>