<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

$version = new Version2X("http://localhost:3001");
$client = new Client($version);

$client->initialize();


$event = null;
$react = null;
$src =	null;
$photo = null;
$is_shared = null;
$to_username = null;
$to_id = null;
$post_id = null;
$comment_id = null;
$reply_id = null;
$with = null;
$message = null;
$what = null;

if(isset($_POST["from_username"])){
	$from_username = $_POST["from_username"];
}else{
	$from_username = $_SESSION["username"];
}
if(isset($_POST["from_id"])){
	$from_id = $_POST["from_id"];
}else{
	$from_id = $_SESSION["id"];
}

if(isset($_POST["to_username"])){
	$to_username = $_POST["to_username"];
}
if(isset( $_POST["to_id"])){
	$to_id = $_POST["to_id"];
}
if(isset($_POST["event"])){
	$event = $_POST["event"];

	if($event == "react"){
		$react = $_POST["react"];
		$src = $_POST["src"];
		$photo = $_POST["photo"];
		$is_shared = $_POST["is_shared"];
	}
}
if(isset($_POST["post_id"])){
	$post_id = $_POST["post_id"];
}
if(isset($_POST["comment_id"])){
	$comment_id = $_POST["comment_id"];
}
if(isset($_POST["reply_id"])){
	$reply_id = $_POST["reply_id"];
}
if(isset($_POST["with"])){
	$with = $_POST["with"];
}
if($event == "react"){
	$data = get_user_information($from_id,$connect);
	if($post_id != "" || $post_id != null){
		$post = getPostInformation($post_id,$connect);
		$post_text = '"'.substr($post["post_text"], 0,12).'"';
		if($is_shared == null){
			$what = "your post";
		}else{
			if($photo == null){
				$what = "the post you shared: ".$post_text;
			}else{
				$what = "the photo you shared: ".$post_text;
			}
		}
		
	}else if($comment_id != "" || $comment_id != null){
		$what = "your Comment";
	}else if($reply_id != "" || $reply_id != null){
		$what = "your Reply";
	}
	$message = $data["fullname"]." reacted to ".$what;
}else if($event == "commented"){
	$data = get_user_information($from_id,$connect);
	if($post_id != "" || $post_id != null){
		$post = getPostInformation($post_id,$connect);
		$post_text = '"'.substr($post["post_text"], 0,12).'"';

		if($is_shared == null){
			$what = "your post";
		}else{
			if($photo == null){
				$what = "the post you shared: ".$post_text;
			}else{
				$what = "the photo you shared: ".$post_text;
			}
		}
	}
	$message = $data["fullname"]." commented to ".$what;
}

insertNewNotification($from_username,$from_id,$to_username,$to_id,$event,$post_id,$comment_id,$reply_id,$with,$connect);
$data = [
	"from_username"  => $from_username,
	"from_id"		 => $from_id,
	"to_id"			 =>	$to_id,
	"to_username"	 => $to_username,
	"event" 		 => $event,
	"post_id"  		 => $post_id,
	"comment_id"	 => $comment_id,
	"reply_id"		 => $reply_id,
	"with"			 => $with,
	"react" 		 => $react,
	"src"			=> $src,
	"message" 		=> $message
];

$client->emit("new-notification", $data);

?>