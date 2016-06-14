var input = new function() {
	this.pressedKeys = [];
	this.mouseX = -1;
	this.mouseY = -1;
	this.HandleKey = function(e) {
		e = e || window.event;
		input.pressedKeys[e.keyCode] = e.type == 'keydown';
	};
	this.MouseMove = function(e) {
		e = e || window.event;
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;
	};
	this.getKey = function (keyCode) {
		return this.pressedKeys[keyCode];
	};
} ();

window.onkeydown = input.HandleKey;
window.onkeyup = input.HandleKey;
window.onmousemove = input.MouseMove;
