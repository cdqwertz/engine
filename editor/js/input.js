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

		code_editor.OnMouseDown(e);
	};
	this.onMouseMove = function(e) {
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;

		code_editor.OnMouseMove(e);
	};
	this.onMouseUp = function(e) {
		input.mouseX = e.clientX;
		input.mouseY = e.clientY;
		input.mousePressed = false;

		code_editor.OnMouseUp(e);
	};
}();
