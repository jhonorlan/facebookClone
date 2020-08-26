<?php
include 'database.php';
session_start();

echo countAllUser($connect);
?>