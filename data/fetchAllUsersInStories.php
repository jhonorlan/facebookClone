<?php
include '../database.php';
session_start();

echo json_encode(fetchAllUsersInStories($connect));
?>