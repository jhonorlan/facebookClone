<?php
include '../database.php';
session_start();

$sender = $_SESSION["id"];
$reciever = $_GET["reciever"];

echo getMessageToken($sender,$reciever,$connect);

?>