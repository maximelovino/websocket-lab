/*
	Ce code n'est pas à modifier. Les modifications 
	sont à faire dans le fichier client.html & server.js
*/

//FONCTIONS UTILITAIRES
//Gestion du clavier
var _PRESSED = {};
window.onkeydown = function (e) {
	e = e || window.event;
	_PRESSED[e.keyCode] = true;
}

window.onkeyup = function (e) {
	e = e || window.event;
	delete _PRESSED[e.keyCode];
}

//String hashcode - from http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function () {
	var hash = 0, i, chr, len;
	if (this.length == 0) return hash;
	for (i = 0, len = this.length; i < len; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash << 5) - hash) + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return Math.abs(hash);
};

var COLORS = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange', 'pink', 'yellow']

//Player class
function Player(n, p) {
	this.pos = p
	this.name = n
	this.speed = 5
	this.color = COLORS[n.hashCode() % (COLORS.length - 1)]
	this.size = 15
	this.msg = undefined
}

Player.prototype.draw = function () {
	CONTEXT.fillStyle = this.color
	CONTEXT.beginPath()
	CONTEXT.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
	CONTEXT.fill()
	CONTEXT.stroke()
	CONTEXT.fillText(this.name, this.pos.x, this.pos.y + this.size + 10)
	if (this.msg)
		this.msg.draw()
}

function TextBubble(txt, ttl, owner) {
	this.txt = txt
	this.ttl = ttl
	this.owner = owner
}
TextBubble.prototype.draw = function () {
	CONTEXT.fillStyle = this.owner.color
	CONTEXT.fillText(this.txt, this.owner.pos.x, this.owner.pos.y - this.owner.size - 10)
}