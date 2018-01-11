/*
	Ce code n'est pas à modifier. Les modifications 
	sont à faire dans le fichier client.html & server.js
*/

// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (/* function */ callback, /* DOMElement */ element) {
			window.setTimeout(callback, 1000 / 60);
		};
})();


function GameManager() {
	this.updateRate = 60;
	this.updateFunction = undefined;
	this.drawFunction = undefined;
	this.lastFrameTime = Date.now();
	this.lastUpdateTime = Date.now();
	this.currentFPS = 0;
	this.currentUpdSec = 0;
}

var GAME = new GameManager();
GameManager.prototype.animate = function () {
	requestAnimFrame(GAME.animate);
	if (GAME.drawFunction != undefined) {
		//FPS computing
		var t = Date.now();
		var delta = t - GAME.lastFrameTime;
		GAME.lastFrameTime = t;
		GAME.currentFPS = Math.round(1 / (delta / 1000));
		GAME.drawFunction();
	}
}

GameManager.prototype.update = function () {
	if (GAME.updateFunction != undefined) {
		GAME.updateFunction();
	}
	var t = Date.now();
	var delta = t - GAME.lastUpdateTime;
	GAME.lastUpdateTime = t;
	GAME.currentUpdSec = Math.round(1 / (delta / 1000));
	setTimeout(GAME.update, 1000 / GAME.updateRate);
}

GameManager.prototype.setDrawFunction = function (func) {
	this.drawFunction = func;

}

GameManager.prototype.setUpdateFunction = function (func) {
	this.updateFunction = func;
}

GameManager.prototype.init = function () {
	this.lastFrameTime = Date.now()
	this.lastUpdateTime = Date.now()
	this.animate();
	this.update();
}