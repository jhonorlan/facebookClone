<?php
include '../database.php';
session_start();


$ref = $_GET["ref"];

if(!isset($_GET["tab"])){
	$tab = "account";
}else{
	$tab = $_GET["tab"];
}
getSettingsTab($tab,$ref,$connect);
?>