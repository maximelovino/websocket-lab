var http = require('http')
var WebSocketServer = require('websocket').server
var fs = require('fs')
const messages = require('./messages');
var PORT = 18000
//Partie pour servir les fichiers statiques (serveur http normal)
var server = http.createServer(function (request, response) {
	var responsePage
	switch (request.url) {
		case '/':
			response.writeHead(200, { 'Content-Type': 'text/html' });
			responsePage = fs.readFileSync('client.html')
			break;
		case '/GameManager.js':
			response.writeHead(200, { 'Content-Type': 'text/javascript' });
			responsePage = fs.readFileSync('GameManager.js')
			break;
		case '/client.js':
			response.writeHead(200, { 'Content-Type': 'text/javascript' });
			responsePage = fs.readFileSync('client.js')
			break;
		case '/messages.js':
			response.writeHead(200, { 'Content-Type': 'text/javascript' });
			responsePage = fs.readFileSync('messages.js')
			break;
		//404 Not found
		default:
			response.writeHead(404, { 'Content-Type': 'text/html' });
			responsePage = '<html><head><meta charset="utf-8"><title>Oops !</title></head><body>L\'url demandée n\'existe pas.</body>'
			break;
	}
	response.end(responsePage);
})
server.listen(PORT, function () {
	console.log("Server listening on port " + PORT)
})


// create the server
wsServer = new WebSocketServer({
	httpServer: server
})

let openConnections = [];
//id will be rattached to the player, so we put it on in hello
let id = 0;

// WebSocket server
wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin);

	const playersToSend = openConnections.filter(c => c.player).map(c => c.player);
	connection.sendUTF(messages.createMessage(messages.messageType.playersList, playersToSend));

	openConnections.push(connection);
	///////////////////
	//CODE TO INSERT HERE
	///////////////////

	connection.on('message', function (message) {
		if (message.type == 'utf8')
			message = JSON.parse(message.utf8Data);
		else
			return

		switch (message.type) {
			case messages.messageType.hello:
				connection.player = message.content;
				connection.player.id = id++;
				console.log(`Received player ${connection.player.name}`)
				openConnections.forEach(c => c.sendUTF(messages.createMessage(messages.messageType.newPlayer, connection.player)));
				break;
			case messages.messageType.playerMove:
				connection.player.pos = message.content;
				openConnections.forEach(c => c.sendUTF(messages.createMessage(messages.messageType.playerMove, { id: connection.player.id, pos: connection.player.pos })));
				break;
			case messages.messageType.playerMessage:
				openConnections.forEach(c => c.sendUTF(messages.createMessage(messages.messageType.playerMessage, { id: connection.player.id, msg: message.content })));
				break;
		}

		///////////////////
		//CODE TO INSERT HERE
		///////////////////

	})

	connection.on('close', function (c) {
		///////////////////
		//CODE TO INSERT HERE
		///////////////////

		//TODO check removal
		let index = openConnections.indexOf(connection);
		if (index != -1) {
			openConnections.splice(index, 1);
			if (connection.player) {
				openConnections.forEach(c => c.sendUTF(messages.createMessage(messages.messageType.removePlayer, connection.player.id)))
			}
		}

	})
})

