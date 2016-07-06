var prefab_editor = new function() {
	this.prefabs = [];
	this.selectedObject = -1;

	this.mouseDown = function(e) {
	};

	this.mouseUp = function(e) {
	};
	
	this.mouseMove = function(e) {
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
		s += "<li><a onclick=\"prefab_editor.addComponent();return false;\">Add Component</a></li>";
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
		for(var i = 1; i < this.prefabs[this.selectedObject][n].length; i++) {
			if(this.prefabs[this.selectedObject][n][i][0] == "vec2") {
				s += "<li><a>"+ this.prefabs[this.selectedObject][n][i][3] +"<br><br><input type=\"text\" value=\"" + this.prefabs[this.selectedObject][n][i][1] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][1] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input><input type=\"text\" value=\"" + this.prefabs[this.selectedObject][n][i][2] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][2] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input></a></li>";
			} else {
				s += "<li><a>"+ this.prefabs[this.selectedObject][n][i][2] +"<br><br><input type=\"text\" value=\"" + this.prefabs[this.selectedObject][n][i][1] + "\" onchange = \"prefab_editor.prefabs[prefab_editor.selectedObject]["+n+"]["+i+"][1] = this.value; prefab_editor.GUISelectComponent(" + n+");\"></input></a></li>";
			}		
		}
		objectsGUI.innerHTML = s;
		this.updateEditorGUI();
	};

	this.addActor = function() {
		var n = prompt("Name:");
		if(n) {
			var p = this.prefabs.push([]);
			this.prefabs[p-1].push(n);
		}
		this.showObjectsGUI();
		this.updateEditorGUI();
	};
	
	this.addComponent = function() {
		var n = prompt("Type:");
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
			}
		}
		this.showComponentsGUI();
		this.updateEditorGUI();
	};
}();
