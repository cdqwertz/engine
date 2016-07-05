var core = new function() {
	this.mode = 0;
	this.mouseDown = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseDown(e);
		} else if(this.mode == 2) {
		} else {
			level_editor.mouseDown(e);
		}
	};

	this.mouseUp = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseUp(e);
		} else if(this.mode == 2) {
		} else {
			level_editor.mouseUp(e);
		}
	};
	
	this.mouseMove = function(e) {
		if(this.mode == 0) {
			code_editor.OnMouseMove(e);
		} else if(this.mode == 2) {
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
		level_editor.showPrefabsGUI();
		level_editor.updateEditorGUI();
	};
	
	this.prefabs = function() {
		this.mode = 2;
		prefab_editor.showObjectsGUI();
		prefab_editor.updateEditorGUI();
	};
}();
