<?php
include '../database.php';
session_start();


$post_id = $_POST["id"];

fetchReaction($post_id,$connect);



?>