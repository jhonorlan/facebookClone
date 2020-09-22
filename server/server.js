const socket = require("socket.io"),
	express = require("express"),
	https = require("https"),
	http = require("http"),
	path = require("path"),
	port = process.env.PORT || 3001;

const fs = require('fs') 
  
// Write data in 'Output.txt' . 
fs.writeFile('port.txt', "" + port, (err) => { 
      
    // In case of a error throw err. 
    if (err) throw err; 
}) 


var app = express();
var http_server = http.createServer(app).listen(port);

function redirectToLandingPage(){
	
	app.set('view engine', 'ejs')
	app.get('/',function(req,res){

		console.log( path.join(__dirname, '../'))
	})
}

function manage(http_server){

	var io = socket.listen(http_server);

	io.sockets.on('connection',function (socket){
		socket.emit('connection');
		socket.on("new_message",function(data){
			io.emit("new_message",data);
		});
		socket.on("keypress",function(data){
			io.emit("keypress",data);
		});
		socket.on("fetchinbox",function(data){
			io.emit("fetchinbox",data);
		});
		socket.on("send_call_request",function(data){
			io.emit("send_call_request",data);
		});
		socket.on("accept_call_request",function(data){
			io.emit("accept_call_request",data);
		});
		socket.on("create_room",function(data){
			io.emit("create_room",data);
			console.log("create_room")
		})


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
		

		// Friend System

		socket.on("send-friend-request",function(data){
			io.emit("send-friend-request",data);
		});
		socket.on("cancel-friend-request",function(data){
			io.emit("cancel-friend-request",data);
		});
		socket.on("accept-friend-request",function(data){
			io.emit("accept-friend-request",data);
		});

	});
	io.sockets.on('disconnect',function(socket){
		socket.emit('disconnected');
	});


}
redirectToLandingPage()
manage(http_server)