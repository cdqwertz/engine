//file : core.js
//author : cdqwertz

var core = new function() {
	this.mode = 0;
	this.mouseX = 0;
	this.mouseY = 0;
	this.pmouseX = 0;
	this.pmouseY = 0;

	this.snap = false;
	this.snapDistance = 15;

	this.mouseDown = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / this.snapDistance)+0.5)*this.snapDistance;
			this.mouseY = Math.floor((e.clientY / this.snapDistance)+0.5)*this.snapDistance;
		} else {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		}
		if(this.mode == 0) {
			code_editor.OnMouseDown(e);
		} else if(this.mode == 2) {
		} else if(this.mode == 3) {
			event_editor.mouseDown(e);
		} else {
			level_editor.mouseDown(e);
		}

		this.pmouseX = this.mouseX;
		this.pmouseY = this.mouseY;
	};

	this.mouseUp = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / this.snapDistance)+0.5)*this.snapDistance;
			this.mouseY = Math.floor((e.clientY / this.snapDistance)+0.5)*this.snapDistance;
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

		this.pmouseX = this.mouseX;
		this.pmouseY = this.mouseY;
	};
	
	this.mouseMove = function(e) {
		if(this.snap) {
			this.mouseX = Math.floor((e.clientX / this.snapDistance)+0.5)*this.snapDistance;
			this.mouseY = Math.floor((e.clientY / this.snapDistance)+0.5)*this.snapDistance;
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

		this.pmouseX = this.mouseX;
		this.pmouseY = this.mouseY;
	};

	this.keyDown = function(e) {
		if(document.activeElement.nodeName.toLowerCase() == "input") {
			return false;
		}
		if(!e.shiftKey) {
			return false;
		}
		if(e.keyCode == 83) {
			this.snap = !this.snap;
		} else if(e.keyCode == 81) {
			this.snapDistance += 5;
		} else if(e.keyCode == 65) {
			if(!(this.snapDistance < 10)) {
				this.snapDistance -= 5;
			}
		} else if(e.keyCode == 32) {
			var cmd = prompt("Command:");
			//TODO: add some simple commands (snap <d>, add <name>,...)
			if(this.mode == 0) {
				//code_editor.runEditorCommand(cmd);
			} else if(this.mode == 2) {
				//prefab_editor.runEditorCommand(cmd);
			} else if(this.mode == 3) {
				event_editor.runEditorCommand(cmd);
			} else {
				//level_editor.runEditorCommand(cmd);
			}
		}


		if(this.mode == 0) {
			code_editor.keyDown(e);
		} else if(this.mode == 2) {
			prefab_editor.keyDown(e);
		} else {
			level_editor.keyDown(e);
		}

		return true;
	};

	this.code = function() {
		this.mode = 0;
		code_editor.updateEditorGUI();
		code_editor.showCmdsGUI();
	};

	this.level = function() {
		this.mode = 1;
		level_editor.showMenuGUI();
		level_editor.updateEditorGUI();
	};
	
	this.prefabs = function() {
		this.mode = 2;
		prefab_editor.showObjectsGUI();
		prefab_editor.updateEditorGUI();
	};

	this.events = function() {
		this.mode = 3;
		event_editor.showLibraryGUI();
		event_editor.updateEditorGUI();
	};

	this.exportCode = function() {
		this.dialog.show("<textarea editable=\"false\" readonly>"+code_generator.genHtml(code_generator.genCode())+"</textarea>", "");
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

			event_editor.components = l[3];

			this.code();
		}
	}
	
	this.saveProject = function() {
		var l = [];
		l.push(code_editor.components);
		l.push(prefab_editor.prefabs);
		l.push(level_editor.scenes);
		l.push(event_editor.components);
		this.dialog.show("<textarea editable=\"false\" readonly>"+JSON.stringify(l)+"</textarea>","");
	};

	this.dialog = new function() { 
		this.show = function(text,buttons) {
			if(buttons == "") {
				buttons = "<button onclick=\"core.dialog.close();\">OK</button>"
			}
			s = "<div class=\"dialog_bg\"><div class=\"dialog\">" + text + "<div class=\"dialog_buttons\">"+buttons+"</div></div></div>";
			dialogContainer.innerHTML = s;
		};

		this.close = function() {
			dialogContainer.innerHTML = "";
		};
	}();

	this.utils = new function() {
		this.isNameAllowed = function(str) {
			var name = str.trim();
			var strs = ["var", "function", "this", "new", "for", "while", "return", "true", "false","Math", "window", "document", "core", "input"];
			if (strs.indexOf(name) != -1) {
				return false;
			}

			if(name.includes("<") || name.includes(">")) {
				return false;
			}

			if(name.includes("(") || name.includes(")")) {
				return false;
			}

			if(name.includes("{") || name.includes("}")) {
				return false;
			}

			if(name.includes("&&") || name.includes("||")) {
				return false;
			}

			if(name.includes(" ") || name.includes("-")) {
				return false;
			}

			return true;
		};
	}();
}();
