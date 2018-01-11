var http = require('http')
var WebSocketServer = require('websocket').server
var fs = require('fs')
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

// WebSocket server
wsServer.on('request', function (request) {
	var connection = request.accept(null, request.origin)

	///////////////////
	//CODE TO INSERT HERE
	///////////////////

	connection.on('message', function (message) {
		if (message.type == 'utf8')
			message = JSON.parse(message.utf8Data);
		else
			return

		///////////////////
		//CODE TO INSERT HERE
		///////////////////

	})

	connection.on('close', function (connection) {
		///////////////////
		//CODE TO INSERT HERE
		///////////////////

	})
})

