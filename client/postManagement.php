<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();


$id = $_POST["id"];


use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;
$port = file_get_contents("../port.txt");
$version = new Version2X("http://localhost:".$port);
$client = new Client($version);

$client->initialize();
$reactions = array("like","love","care","haha","wow","sad","angry");
if(isset($_POST["action"])){
	$reaction = $_POST["action"];
	if(in_array($reaction, $reactions)){
	reactToPost($reaction,$id,$connect);
	$client->emit("react-to-post", ["reaction" => $reaction, "id" => $id]);	
	}
}
if(isset($_POST["comment"])){
	$comment = $_POST["comment"];
	$code = generateCode(12);
	 commentToPost($id,$comment,$code,$connect);
	$client->emit("comment-to-post", ["comment" => $comment, "id" => $id,"code" => $code]);	
}
if(isset($_POST["reply"])){
	$reply = $_POST["reply"];
	$post_id = $_POST["post_id"];
	replyToComment($id,$reply,$connect);
	$client->emit("comment-to-post", ["reply" => $reply, "id" => $post_id]);	
}


$client->close();
?>