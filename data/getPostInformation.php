<?php
include '../database.php';
session_start();

$post = $_GET["post"];

$data =  getPostInformation($post,$connect);
echo json_encode($data);
?>