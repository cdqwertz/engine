var level_editor = new function() {
	this.scenes = [["mainScene"]];
	this.scene = 0;
	this.selectedObject = [-1];

	this.selectedPrefab = -1;

	this.mouseDown = function(e) {
		var x = core.mouseX;
		var y = core.mouseY;
		console.log("mouse down");
		if(this.selectedPrefab != -1) {
			if(e.which == 2) {
				this.selectedPrefab = -1;
				canvasOverlayGUI.style.cursor = "auto";
			} else {
				console.log("add prefab");
				this.addPrefab(this.selectedPrefab,x,y);
			}
		}
	};

	this.mouseUp = function(e) {
	};
	
	this.mouseMove = function(e) {
	};

	this.keyDown = function(e) {
	};

	this.updateEditorGUI = function(e) {
		ctx.clearRect(0,0,canvasGUI.width,canvasGUI.height);
		for(var i = 1; i < this.scenes[this.scene].length; i++) {
			prefab_preview.render(this.scenes[this.scene][i],0,0);
		}
	};


	this.showPrefabsGUI = function() {
		var s = "";
		s += "<li><a onclick=\"level_editor.showMenuGUI();return false;\">...</a></li>";
		for(var i = 0; i < prefab_editor.prefabs.length; i++) {
			s += "<li><a onclick=\"level_editor.GUISelectPrefab(" + i + ");return false;\">" + prefab_editor.prefabs[i][0] + "</a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.showObjectsGUI = function() {
		var s = "";
		s += "<li><a onclick=\"level_editor.showMenuGUI();return false;\">...</a></li>";
		for(var i = 1; i < this.scenes[this.scene].length; i++) {
			s += "<li><a onclick=\"level_editor.GUISelectObject(" + i + ");return false;\">" + this.scenes[this.scene][i][0] + "</a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.GUISelectObject = function(i) {
		var s = "";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">...</a></li>";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">Update (WIP)</a></li>";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">Show Prefab (WIP)</a></li>";
		s += "<li><a onclick=\"level_editor.GUIDeleteObject(" + i + ");return false;\">Delete</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUIDeleteObject = function(i) {
	};

	this.showMenuGUI = function() {
		var s = "";
		s += "<li><a onclick=\"level_editor.showPrefabsGUI();return false;\">Add...</a></li>";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">Objects...</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUISelectPrefab = function(i) {
		this.selectedPrefab = i;
		canvasOverlayGUI.style.cursor = "crosshair";
	};

	this.addPrefab = function(n,x,y) {
		var name = prompt("name");
		//BEGIN TODO : replace the code below with better code
		var prefab = JSON.parse(JSON.stringify(prefab_editor.prefabs[n]));
		//END TODO
		var p = this.scenes[this.scene].push(prefab);
		this.scenes[this.scene][p-1][0] = name;
		var obj = this.scenes[this.scene][p-1];
		for(var i = 1; i < obj.length; i++) {
			if(obj[i][0] == "transform") {
				obj[i][1][1] = x;
				obj[i][1][2] = y;
			}
		}
		
		this.updateEditorGUI();
	};
}();
