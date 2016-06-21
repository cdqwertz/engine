var level_editor = new function() {
	this.scenes = [["mainScene"]];
	this.scene = 0;
	this.selectedObject = -1;

	this.showObjectsGUI = function() {
		var s = "";
		for(var i = 1; i < this.scenes[this.scene].length; i++) {
			s += "<li><a onclick=\"level_editor.GUISelectObject(" + i + ");return false;\">" + this.scenes[this.scene][i][0] + "</a></li>";
		}
		s += "<li><a onclick=\"level_editor.addActor();return false;\">Add Actor</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.showComponentsGUI = function() {
		var s = "";
		if(this.selectedObject == -1) {
			return 0;
		}
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">Back</a></li>";
		for(var i = 1; i < this.scenes[this.scene][this.selectedObject].length; i++) {
			s += "<li><a onclick=\"level_editor.GUISelectComponent(" + i + ");return false;\">" + this.scenes[this.scene][this.selectedObject][i][0] + "</a></li>";
		}
		s += "<li><a onclick=\"level_editor.addComponent();return false;\">Add Component</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUISelectObject = function(i) {
		this.selectedObject = i;
		this.showComponentsGUI();
	};

	this.GUISelectComponent = function(n) {
		var s = "";
		if(this.selectedObject == -1) {
			return 0;
		}
		s += "<li><a onclick=\"level_editor.showComponentsGUI();return false;\">Back</a></li>";
		for(var i = 1; i < this.scenes[this.scene][this.selectedObject][n].length; i++) {
			s += "<li><a><input type=\"text\" value=\"" + this.scenes[this.scene][this.selectedObject][n][i] + "\" onchange = \"level_editor.scenes[level_editor.scene][level_editor.selectedObject]["+n+"]["+i+"] = this.value; level_editor.GUISelectComponent(" + n+");\"></input></a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.addActor = function() {
		var n = prompt("Name:");
		if(n) {
			var p = this.scenes[this.scene].push([]);
			this.scenes[this.scene][p-1].push(n);
		}
		this.showObjectsGUI();
	};
	
	this.addComponent = function() {
		var n = prompt("Type:");
		if(n) {
			var p = this.scenes[this.scene][this.selectedObject].push([]);
			this.scenes[this.scene][this.selectedObject][p-1].push(n);
			if(n == "transform") {
				this.scenes[this.scene][this.selectedObject][p-1].push("new vec2(0, 0)");
				this.scenes[this.scene][this.selectedObject][p-1].push("new vec2(0, 0)");
			} else if(n == "drawRect") {
				this.scenes[this.scene][this.selectedObject][p-1].push("new vec2(0, 0)");
				this.scenes[this.scene][this.selectedObject][p-1].push("new vec2(0, 0)");
			} else if(n == "drawImage") {
				this.scenes[this.scene][this.selectedObject][p-1].push("new vec2(0, 0)");
				this.scenes[this.scene][this.selectedObject][p-1].push("new Image()");
				this.scenes[this.scene][this.selectedObject][p-1].push("0");
				this.scenes[this.scene][this.selectedObject][p-1].push("512");
				this.scenes[this.scene][this.selectedObject][p-1].push("512");
				this.scenes[this.scene][this.selectedObject][p-1].push("[]");
			} else if(n == "boxCollider") {
				this.scenes[this.scene][this.selectedObject][p-1].push("0");
				this.scenes[this.scene][this.selectedObject][p-1].push("0");

				this.scenes[this.scene][this.selectedObject][p-1].push("512");
				this.scenes[this.scene][this.selectedObject][p-1].push("512");

				this.scenes[this.scene][this.selectedObject][p-1].push("");
				this.scenes[this.scene][this.selectedObject][p-1].push("false");
			}
		}
		this.showComponentsGUI();
	};
}();
