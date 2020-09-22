<?php

$path = $_GET["path"];
$images = glob($path."*.{jpg,png,gif}", GLOB_BRACE);

echo json_encode($images);

?>