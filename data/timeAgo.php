<?php
include '../database.php';
session_start();


$date = $_GET["date"];

echo time_elapsed_string($date);;

?>