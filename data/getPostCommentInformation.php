<?php
include '../database.php';
session_start();

$comment = $_GET["comment"];
$data = getPostCommentInformation($comment,$connect);

echo json_encode($data)
?>