<?php

include '../database.php';
session_start();

$sender = $_SESSION["id"];
$reciever = $_POST["id"];

fetchMessages($sender,$reciever,$connect);

?>