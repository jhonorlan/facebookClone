<?php
include '../database.php';
session_start();

$story = $_POST["storyData"];
$tag = $_POST["tag"];
$privacy = $_POST["privacy"];
$type = $_POST["type"];
$with = $_POST["with"];
insertToStory($story,$tag,$privacy,$type,$with,$connect);
?>