<?php
include '../database.php';
session_start();

$post = $_GET["post"];
$id = $_GET["id"];
$index = $_GET["index"];

$image = getPostImageInformation($post,$id,$index,$connect);

echo json_encode($image);
?>