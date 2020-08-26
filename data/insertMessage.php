<?php
include '../database.php';
session_start();

$sender = $_SESSION["id"];
$reciever= $_POST["reciever"];
$message =	$_POST["message"];                                                                                         
$token = $_POST["token"];
$color = $_POST["color"];
$index = $_POST["index"];
$messageToken = $_POST["messageToken"];
$emoji = $_POST["emoji"];

insertMessage($sender,$reciever,$message,$index,$emoji,$messageToken,$connect);
?>