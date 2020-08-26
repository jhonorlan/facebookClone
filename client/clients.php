<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();


$sender = $_SESSION["id"];
$reciever= $_POST["id_reciever"];
$message =	$_POST["message"];                                                                                         
$token = $_POST["token"];
$color = $_POST["color"];
$action = $_POST["action"];
$isTyping = $_POST["isTyping"];
$emoji = $_POST["emoji"];
$port = file_get_contents("../port.txt");



use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

$version = new Version2X("http://localhost:".$port);

$client = new Client($version);

$client->initialize();

if($action == "new_message"){
	$client->emit("new_message", [
		"sender" 		=> $_SESSION["id"],
		 "reciever"  	=> $_POST["id_reciever"],
		 "message" 		=> $_POST["message"],
		 "token" 		=> $_POST["token"],
		 "color"		=> $_POST["color"],
		 "emoji"		=> $_POST["emoji"]
	]);
}else if($action == "keypress"){
	$client->emit("keypress", [
		"sender" 		=> $sender,
		 "reciever"  	=> $reciever,
		 "message" 		=> $sender." is Typing...",
		 "token" 		=> $token,
		 "color"		=> $color,
		 "isTyping" 	=> $isTyping,
		 "emoji"		=> $emoji
	]);
}


$client->close();
?>