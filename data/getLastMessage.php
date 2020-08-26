<?php
include '../database.php';
session_start();

$name = $_GET["name"];
$id = getIdByName($name,$connect);

$message = getLastMessage($id,$connect);

echo json_encode($message);
?>