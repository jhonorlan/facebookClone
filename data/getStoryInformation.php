<?php
include '../database.php';
session_start();

$id = $_GET["user"];
$code = $_GET["code"];
$username = "";
$data = getStoryInformation($id,$username,$code,$connect);

echo json_encode($data);
?>