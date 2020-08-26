<?php
include '../database.php';
session_start();

$user = $_GET["user"];

$data = get_user_information($user,$connect);
echo json_encode($data);
?>