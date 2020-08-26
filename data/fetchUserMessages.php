<?php
include '../database.php';
session_start();

$sender = $_SESSION["id"];
$reciever = $_POST["id"];
$color = "#FF7E29";
fetchMessages($sender,$reciever,$color,$connect);

?>