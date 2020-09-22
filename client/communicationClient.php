<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();


$port = 3003;
$action = $_POST["action"];

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

$version = new Version2X("http://localhost:".$port);

$client = new Client($version);

$client->initialize();

if($action == "join_room"){
	$client->emit("join_room", [
		"id" => $_POST["id"],
		"roomId" => $_POST["roomId"]
	]);
}else if($action == "user_con"){
	$client->emit("user_con", [
		"id" => $_POST["id"],
		"roomId" => $_POST["roomId"]
	]);
}

?>