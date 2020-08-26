<?php
include 'database.php';
session_start();

$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$middlename = $_POST["middlename"];
$email = $_POST["email"];
$bdy = $_POST["bday"];


foreach($bdy as $key => $value){
	if($key == "month"){
		$month = $value;
	}else if($key == "day"){
		$day = $value;
	}else if($key == "year"){
		$year = $value;;
	}else if($key == "birthday"){
		$birthday = $value;
	}
}
$password = "123456789";
registerNewUser($firstname,$middlename,$lastname,$email,$password,$month,$day,$year,$birthday,$connect);


?>