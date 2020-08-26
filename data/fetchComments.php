<?php
include '../database.php';
session_start();

$post_id = $_POST["id"];

fetchComments($post_id,$connect);


?>