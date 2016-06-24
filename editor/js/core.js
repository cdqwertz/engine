var core = new function() {
	this.mode = 0;
	this.mouseDown = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseDown(e);
		} else {
			level_editor.mouseDown(e);
		}
	};

	this.mouseUp = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseUp(e);
		} else {
			level_editor.mouseUp(e);
		}
	};
	
	this.mouseMove = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseMove(e);
		} else {
			level_editor.mouseMove(e);
		}
	};

	this.code = function() {
		this.mode = 0;
		code_editor.updateEditorGUI();
		code_editor.showCmdsGUI();
	};

	this.level = function() {
		this.mode = 1;
		level_editor.showObjectsGUI();
		level_editor.updateEditorGUI();
	};
}();
