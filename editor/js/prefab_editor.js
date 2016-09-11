//file : prefab_editor.js
//author : cdqwertz

var prefab_editor = new function() {
	this.prefabs = [];
	this.selectedObject = -1;

	this.mouseDown = function(e) {
	};

	this.mouseUp = function(e) {
	};
	
	this.mouseMove = function(e) {
	};

	this.keyDown = function(e) {
		if(e.keyCode == 84) {
			if(this.selectedObject != -1) {
				var p = this.prefabs[this.selectedObject].push([]);
				this.prefabs[this.selectedObject][p-1].push("transform");
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0 , 0, "position"]);
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "rotation"]);
				this.showComponentsGUI();
				this.updateEditorGUI();
			}
		} else if(e.keyCode == 87) {
			this.addActor();
		} else if(e.keyCode == 69) {
			this.GUIaddComponent();
		}
	};

	this.updateEditorGUI = function() {
		ctx.clearRect(0,0,canvasGUI.width,canvasGUI.height);
		if(this.selectedObject != -1) {
			prefab_preview.render(this.prefabs[this.selectedObject],document.body.clientWidth/2,document.body.clientHeight/2);
		}
	};


	this.showObjectsGUI = function() {
		var s = "";
		for(var i = 0; i < this.prefabs.length; i++) {
			s += "<li><a onclick=\"prefab_editor.GUISelectObject(" + i + ");return false;\">" + this.prefabs[i][0] + "</a></li>";
		}
		s += "<li><a onclick=\"prefab_editor.addActor();return false;\">Add Prefab</a></li>";
		objectsGUI.innerHTML = s;
		this.updateEditorGUI();
	};

	this.showComponentsGUI = function() {
		var s = "";
		if(this.selectedObject == -1) {
			return 0;
		}
		s += "<li><a onclick=\"prefab_editor.showObjectsGUI();return false;\">Back</a></li>";
		for(var i = 1; i < this.prefabs[this.selectedObject].length; i++) {
			s += "<li><a onclick=\"prefab_editor.GUISelectComponent(" + i + ");return false;\">" + this.prefabs[this.selectedObject][i][0] + "</a></li>";
		}
		s += "<li><a onclick=\"prefab_editor.GUIaddComponent();return false;\">Add Component</a></li>";
		objectsGUI.innerHTML = s;
		this.updateEditorGUI();
	};

	this.GUISelectObject = function(i) {
		this.selectedObject = i;
		this.showComponentsGUI();
		this.updateEditorGUI();
	};

	this.GUISelectComponent = function(n) {
		var s = "";
		if(this.selectedObject == -1) {
			return 0;
		}
		s += "<li><a onclick=\"prefab_editor.showComponentsGUI();return false;\">Back</a></li>";
		s += "<li><a onclick=\"prefab_editor.GUIRemoveComponent("+ n +");return false;\">Delete</a></li>";
		for(var i = 1; i < this.prefabs[this.selectedObject][n].length; i++) {
			var inputType = "text";
			if(this.prefabs[this.selectedObject][n][i][0] == "int") {
				inputType = "number";
			}else if(this.prefabs[this.selectedObject][n][i][0] == "bool") {
				inputType = "checkbox";
			}

			if(this.prefabs[this.selectedObject][n][i][0] == "vec2") {
				s += "<li><a>"+ this.prefabs[this.selectedObject][n][i][3] +"<br><br><input type=\"number\" step=\"any\" value=\"" + this.prefabs[this.selectedObject][n][i][1] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][1] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input><input type=\"number\" step=\"any\" value=\"" + this.prefabs[this.selectedObject][n][i][2] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][2] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input></a></li>";
			} else {
				if(inputType == "checkbox") {
					s += "<li><a><input type=\""+inputType+"\" name=\"" + this.prefabs[this.selectedObject][n][i][2] +"\"" + "value=\"" + this.prefabs[this.selectedObject][n][i][2] +"\" " + (this.prefabs[this.selectedObject][n][i][1] ? "checked=\"checked\"" : "") + " onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][1] = this.checked; prefab_editor.GUISelectComponent(" + n+");\"></input>"+ this.prefabs[this.selectedObject][n][i][2] +"</a></li>";
				} else {
					s += "<li><a>"+ this.prefabs[this.selectedObject][n][i][2] +"<br><br><input type=\""+inputType+"\" value=\"" + this.prefabs[this.selectedObject][n][i][1] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][1] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input></a></li>";
				}
			}		
		}
		objectsGUI.innerHTML = s;
		this.updateEditorGUI();
	};

	this.GUIRemoveComponent = function(n) {
		this.prefabs[this.selectedObject].splice(n,1);
		this.showComponentsGUI();
	};

	this.addActor = function() {
		var n = prompt("Name:");
		if(n) {
			var p = this.prefabs.push([]);
			this.prefabs[p-1].push(n);
			this.selectedObject = p-1;
			this.prefabs[this.selectedObject].push(["transform",["vec2", 0 , 0, "position"],["float", 0, "rotation"]]);
		}
		this.showComponentsGUI();
		this.updateEditorGUI();
	};

	this.GUIaddComponent = function() {
		var buttons = "<ul>";
		var components = ["transform", "drawRect" , "drawImage", "boxCollider", "bounce", "simpleRigidbody", "motion", "health", "damage", "score", "coin", "followMouse"]
		for(var i = 0; i < components.length; i++) {
			buttons += "<li><button onclick=\"prefab_editor.addComponent(\'"+components[i]+"\');core.dialog.close();\">"+components[i]+"</button></li>";
		}
		buttons += "</ul>"
		core.dialog.show(buttons, "<button onclick=\"core.dialog.close();\">Back</button>");
	};
	
	this.addComponent = function(n) {
		if(n) {
			var p = this.prefabs[this.selectedObject].push([]);
			this.prefabs[this.selectedObject][p-1].push(n);
			if(n == "transform") {
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0 , 0, "position"]);
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "rotation"]);
			} else if(n == "drawRect") {
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0 , 0, "position"]);
				this.prefabs[this.selectedObject][p-1].push(["vec2", 512 , 512, "size"]);
				this.prefabs[this.selectedObject][p-1].push(["string", "#000000", "color"]);
			} else if(n == "drawImage") {
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0 , 0, "position"]);
				this.prefabs[this.selectedObject][p-1].push(["Image", "new Image()", "image"]);
				this.prefabs[this.selectedObject][p-1].push(["int", 0, "mode"]);
				this.prefabs[this.selectedObject][p-1].push(["int", 512 , "scale x"]);
				this.prefabs[this.selectedObject][p-1].push(["int", 512 , "scale y"]);
				this.prefabs[this.selectedObject][p-1].push(["list", "[]", "animations"]);
			} else if(n == "boxCollider") {
				this.prefabs[this.selectedObject][p-1].push(["int", 0, "x"]);
				this.prefabs[this.selectedObject][p-1].push(["int", 0, "y"]);

				this.prefabs[this.selectedObject][p-1].push(["int", 512, "size x"]);
				this.prefabs[this.selectedObject][p-1].push(["int", 512, "size y"]);

				this.prefabs[this.selectedObject][p-1].push(["string", "tag", "tag"]);
				this.prefabs[this.selectedObject][p-1].push(["bool", false, "check"]);
			} else if(n == "motion") {
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0 , 0, "velocity"]);
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "rotation"]);
				this.prefabs[this.selectedObject][p-1].push(["vec2", 0, 0, "acceleration"]);	
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "friction"]);
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "gravity"]);
			} else if(n == "health") {	
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "hp"]);
				this.prefabs[this.selectedObject][p-1].push(["float", 0, "regeneration"]);
				this.prefabs[this.selectedObject][p-1].push(["bool", true, "destroy on die"]);
			} else if(n == "damage") {	
				this.prefabs[this.selectedObject][p-1].push(["float", 1, "damage"]);
				this.prefabs[this.selectedObject][p-1].push(["bool", true, "destroy on die"]);
			} else if(n == "followMouse") {	
				this.prefabs[this.selectedObject][p-1].push(["bool", true, "follow x"]);
				this.prefabs[this.selectedObject][p-1].push(["bool", true, "follow y"]);
			}
		}
		this.showComponentsGUI();
		this.updateEditorGUI();
	};

	this.getPrefab = function(name) {
		for(var i = 0; i < this.prefabs.length; i++) {
			if(this.prefabs[i][0] == name) {
				return (this.prefabs[i])
			}
		}
	};
}();
