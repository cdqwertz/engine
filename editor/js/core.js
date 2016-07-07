var core = new function() {
	this.mode = 0;
	this.mouseX = 0;
	this.mouseY = 0;
	this.snap = false;


	this.mouseDown = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / 15)+0.5)*15;
			this.mouseY = Math.floor((e.clientY / 15)+0.5)*15;
		} else {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}
		if(this.mode == 0) {
			code_editor.OnMouseDown(e);
		} else if(this.mode == 2) {
		} else {
			level_editor.mouseDown(e);
		}
	};

	this.mouseUp = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / 15)+0.5)*15;
			this.mouseY = Math.floor((e.clientY / 15)+0.5)*15;
		} else {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}
		if(this.mode == 0) {
			code_editor.OnMouseUp(e);
		} else if(this.mode == 2) {
		} else {
			level_editor.mouseUp(e);
		}
	};
	
	this.mouseMove = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / 15)+0.5)*15;
			this.mouseY = Math.floor((e.clientY / 15)+0.5)*15;
		} else {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}
		if(this.mode == 0) {
			code_editor.OnMouseMove(e);
		} else if(this.mode == 2) {
		} else {
			level_editor.mouseMove(e);
		}

		overlayCtx.clearRect(0,0,canvasOverlayGUI.width,canvasOverlayGUI.height);

		if(this.snap) {
			overlayCtx.beginPath();
			overlayCtx.moveTo(0,this.mouseY);
			overlayCtx.lineTo(canvasOverlayGUI.width,this.mouseY);
			overlayCtx.stroke();

			overlayCtx.beginPath();
			overlayCtx.moveTo(this.mouseX,0);
			overlayCtx.lineTo(this.mouseX,canvasOverlayGUI.height);
			overlayCtx.stroke();
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

	this.exportCode = function() {
		alert(code_generator.genCode());
	};

	this.newProject = function() {
	}

	this.openProject = function() {
		var l = JSON.parse(prompt("Data:"));
		if (l && l != []) {
			code_editor.components = l[0];
			prefab_editor.prefabs = l[1];
			level_editor.scenes = l[2];

			level_editor.selectedObject = [-1];
			level_editor.selectedPrefab = -1;

			prefab_editor.selectedObject = -1;

			code_editor.component = 0;
			code_editor.SelectedObject = [-1];
			code_editor.vars = [];
			code_editor.connectionsWithStart = [];

			this.code();
		}
	}
	
	this.saveProject = function() {
		var l = [];
		l.push(code_editor.components);
		l.push(prefab_editor.prefabs);
		l.push(level_editor.scenes);
		alert(JSON.stringify(l));
	}
}();
