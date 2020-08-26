const socket = require("socket.io"),
	express = require("express"),
	https = require("https"),
	http = require("http"),
	moment =  require("moment"),
	port = process.env.PORT || 3001;

const fs = require('fs') 
  
// Write data in 'Output.txt' . 
fs.writeFile('port.txt', "" + port, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 


var app = express();
var http_server = http.createServer(app).listen(port);


function emitNewOrder(http_server){

	var io = socket.listen(http_server);

	io.sockets.on('connection',function (socket){
		
		socket.on("new_message",function(data){
			io.emit("new_message",data);
		});
		socket.on("keypress",function(data){
			io.emit("keypress",data);
		});
		socket.on("fetchinbox",function(data){
			io.emit("fetchinbox",data);
		});

		// Reaction
		socket.on("react-to-post",function(data){
			io.emit("react-to-post",data);
		});
		// Comments
		socket.on("comment-to-post",function(data){
			io.emit("comment-to-post",data);
		});
		socket.on("new-notification",function(data){
			io.emit("new-notification",data);
		});
		
	});
}

emitNewOrder(http_server);