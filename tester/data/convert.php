<?php
include 'database.php';
session_start();

$code = $_POST["code"];

echo json_encode($code);
?>