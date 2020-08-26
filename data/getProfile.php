<?php
include '../database.php';
session_start();

$user = $_GET["user"];

if($user == "me"){
	$user = $_SESSION["id"];
}

getProfile($user,$connect);

?>