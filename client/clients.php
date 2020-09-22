<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();


$port = file_get_contents("../port.txt");
$action = $_POST["action"];


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
		"sender" 		=> $_SESSION["id"],
		 "reciever"  	=> $_POST["id_reciever"],
		 "message" 		=> $_SESSION["id"]." is Typing...",
		 "token" 		=> $_POST["token"],
		 "color"		=> $_POST["color"],
		 "isTyping" 	=> $_POST["isTyping"],
		 "emoji"		=> $_POST["emoji"]
	]);
}else if($action == "send-friend-request"){
	$client->emit("send-friend-request", [
		"from_id" 	=> $_SESSION["id"],
		 "to_id"  	=> $_POST["to_id"]
	]);

	sendFriendRequest($_POST["to_id"],$connect);
}else if($action == "cancel-friend-request"){
	$client->emit("cancel-friend-request", [
		"from_id" 	=> $_SESSION["id"],
		 "to_id"  	=> $_POST["to_id"]
	]);

	cancelFriendRequest($_POST["to_id"],$connect);
}else if($action == "accept-friend-request"){
	$client->emit("accept-friend-request", [
		"from_id" 	=> $_SESSION["id"],
		 "to_id"  	=> $_POST["to_id"]
	]);

	acceptFriendRequest($_POST["to_id"],$connect);
}else if($action == "send_call_request"){
	$client->emit("send_call_request", [
		"from_id" 	=> $_SESSION["id"],
		 "to_id"  	=> $_POST["id"]
	]);	
}else if($action == "accept_call_request"){
	$client->emit("accept_call_request", [
		"from_id" 	=> $_POST["from_id"],
		 "to_id"  	=> $_POST["to_id"]
	]);	
}else if($action == "request_room"){
	$client->emit("create_room", [
			"participants" 	=> $_POST["participants"],
			 "roomId" => generateUUID(3)
		]);	
}


$client->close();
?>