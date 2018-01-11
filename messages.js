const messageType = {
	hello: 0,
	newPlayer: 1,
	playerMove: 2,
	playersList: 3,
	removePlayer: 4,
	playerMessage: 5,
}

function createMessage(type, content) {
	return JSON.stringify({ type, content });
}

//This is how you share code between server and client, you only export for the server
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
	exports.messageType = messageType;
	exports.createMessage = createMessage;
}
