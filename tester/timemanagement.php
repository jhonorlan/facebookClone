<?php
include '../database.php';
session_start();

$id = $_SESSION["id"];
$check = checkIfUserHasStory($id,$connect);

if($check == true){
	echo "Yes";
}
?>