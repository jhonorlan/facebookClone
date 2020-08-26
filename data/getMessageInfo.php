<?php
include '../database.php';
session_start();

$sender = $_SESSION["id"];
$reciever = $_GET["reciever"];

echo getMessageInfo($sender,$reciever,$connect);

?>