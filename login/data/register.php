<?php
include '../../database.php';
session_start();

$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$email = $_POST["email"];
$password = $_POST["password"];
$month = $_POST["month"];
$day = $_POST["day"];
$year = $_POST["year"];
$birthday = $month." ".$day." ".$year;
$isExist = isUserExist($email,$connect);
$middlename = "";
if($isExist == false){
	registerUser($firstname,$middlename,$lastname,$email,$password,$month,$day,$year,$birthday,$connect);
}else{
	echo "Sorry, Email is already used by someone";
}

?>