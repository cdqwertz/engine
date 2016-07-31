//file : input.js
//author : cdqwertz

var input = new function() {
	this.pressedKeys = [];
	this.mouseX = -1;
	this.mouseY = -1;
	this.mousePressed = [];

	//Keyboard
	this.HandleKey = function(e) {
		e = e || window.event;
		input.pressedKeys[e.keyCode] = (e.type == 'keydown');
	};

	//Mouse
	this.HandleMouse = function(e) {
		e = e || window.event;
		input.mousePressed[e.which] = (e.type == 'mousedown');
	};

	this.MouseMove = function(e) {
		e = e || window.event;
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;
	};

	//
	this.getKey = function (keyCode) {
		return this.pressedKeys[keyCode];
	};

	this.getMouse = function (button) {
		return this.mousePressed[button];
	};
}();

//Keyboard
window.onkeydown = input.HandleKey;
window.onkeyup = input.HandleKey;

//Mouse
window.onmousemove = input.MouseMove;
window.onmousedown = input.HandleMouse;
window.onmouseup = input.HandleMouse;

//keyCodes
var keyCodes = new function () {
	this.a = 65;
	this.b = 66;
	this.c = 67;
	this.d = 68;
	this.e = 69;
	this.f = 70;
	this.g = 71;
	this.h = 72;
	this.i = 73;
	this.j = 74;
	this.k = 75;
	this.l = 76;
	this.m = 77;
	this.n = 78;
	this.o = 79;
	this.p = 80;
	this.q = 81;
	this.r = 82;
	this.s = 83;
	this.t = 84;
	this.u = 85;
	this.v = 86;
	this.w = 87;
	this.x = 88;
	this.y = 89;
	this.z = 90;

	this.arrow_left = 37;
	this.arrow_up = 38;
	this.arrow_right = 39;
	this.arrow_down = 40;
}();
