const express = require('express'),
	  app = express(),
	  server = require('http').Server(app),
	  io = require('socket.io')(server),
	  port = 3003,
	  {v4: uuidV4 } = require('uuid'),
	  path = require('path')

	app.get(path.join(__dirname, "../"), (req, res)=>{
		res.send("awdaw")
	})


	io.on('connection', socket => {
		socket.on('join', (roomId, userId) => {
			console.log(roomId, userId)
		})
	})
server.listen(port) 