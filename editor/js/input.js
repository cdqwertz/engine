//file : input.js
//author : cdqwertz

var input = new function() {
	this.mousePressed = false;
	this.mouseX = 0;
	this.mouseY = 0;
	this.mouseDown = null;
	this.mouseMove = null;
	this.mouseUp = null;

	this.onMouseDown = function(e) {
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;
		input.mousePressed = true;

		core.mouseDown(e);
	};
	this.onMouseMove = function(e) {
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;

		core.mouseMove(e);
	};
	this.onMouseUp = function(e) {
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;
		input.mousePressed = false;

		core.mouseUp(e);
	};

	this.onKeyDown = function(e) {
		core.keyDown(e);
	};
}();
