<?php
include '../database.php';
session_start();

$id = $_POST["post_id"];
$comment = $_POST["comment"];
commentToPost($id,$comment,$connect);
?>