<?php
include '../database.php';
session_start();
$username_or_email = $_POST["user"];

$isUserExist = isUserExist($username_or_email,$connect);

if($isUserExist == true){
	echo "true";
}else{
	echo "false";
}
?>