<?php
include '../database.php';
session_start();


$name = $_GET["name"];
echo insvg($name);

?>