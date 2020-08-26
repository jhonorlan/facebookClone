<?php
include '../database.php';
session_start();

$start = $_POST["start"];
$limit = $_POST["limit"];
$condition = $_POST["condition"];
$people = $_POST["people"];
$post = $_POST["post"];

if($condition == "false"){
	$condition = false;
}
if($people == "false"){
	$people = false;
}
if($post == "false"){
	$post = false;
}

postCondition($start,$limit,$condition,$people,$post,$connect);
?>