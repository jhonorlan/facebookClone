<?php
include '../../database.php';
session_start();

$username = $_POST["username"];
$password = $_POST["password"];

loginUser($username,$password,$connect);
?>