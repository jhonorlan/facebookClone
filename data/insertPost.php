<?php
include '../database.php';
session_start();

$text = $_POST["text"];

$background = $_POST["background"];

$code = generateCode(12);

if($background == ""){
	$background = "false";
}

if($_POST["hasimage"] == "yes"){
	if(count($_FILES["images"]["tmp_name"] != 0) ){
		for($count = 0; $count < count($_FILES["images"]["tmp_name"]); $count++ ){
			$image_file = addslashes(file_get_contents($_FILES["images"]["tmp_name"][$count]));
			$index = $count;

			insertImages($image_file,$index,$code,$connect);
		}
	}
	$images = "true";
}else{

	$images = "false";

}
if($_POST["hasvideo"] == "yes"){
	$videos = "true";
}else{
	$videos = "false";
}


// images


// videos


insertPost($text,$background,$images,$videos,$code,$connect);
?>