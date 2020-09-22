<?php
include '../database.php';
include '../vendor/autoload.php';
session_start();



$action = $_POST["action"];
$data = fetchMessageInbox($connect);

$port = file_get_contents("../port.txt");

use ElephantIO\Client;
use ElephantIO\Engine\SocketIO\Version2X;

$version = new Version2X("http://localhost:".$port);
$client = new Client($version);

$client->initialize();

if($action == "fetchinbox"){
	$client->emit("fetchinbox", ["fetch" => "yes"]);
}


$client->close();
?>