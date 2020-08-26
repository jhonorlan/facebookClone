<?php
include '../database.php';
session_start();
$emoji = $_GET["emoji"];
$color = $_GET["color"];

echo insertEmoji($emoji,$color);




?>