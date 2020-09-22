<?php
include '../database.php';
session_start();

$id = $_GET["id"];
$code = $_GET["code"];
$username = getUsernameById($id,$connect);
getStoryContent($id,$username,$code,$connect);

?>