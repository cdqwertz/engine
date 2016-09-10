//file : level_editor.js
//author : cdqwertz

var level_editor = new function() {
	this.screenWidth = 640;
	this.screenHeight = 480;

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
				this.addPrefab(this.selectedPrefab,x-canvasGUI.width/2,y-canvasGUI.height/2);
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
			prefab_preview.render(prefab_editor.getPrefab(this.scenes[this.scene][i][0]),this.scenes[this.scene][i][1]+canvasGUI.width/2,this.scenes[this.scene][i][2]+canvasGUI.height/2);
		}
		ctx.strokeStyle = "#000";
		ctx.strokeRect(canvasGUI.width/2-(this.screenWidth/2), canvasGUI.height/2-(this.screenHeight/2), this.screenWidth,this.screenHeight);
		ctx.fillText("Camera",canvasGUI.width/2-(this.screenWidth/2), canvasGUI.height/2-(this.screenHeight/2)-5)
	};


	this.showPrefabsGUI = function() {
		var s = "";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">...</a></li>";
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
		s += "<li><a onclick=\"level_editor.showPrefabsGUI();return false;\">Add Prefab</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUISelectObject = function(i) {
		var s = "";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">...</a></li>";
		s += "<li><a onclick=\"level_editor.GUIDeleteObject(" + i + ");return false;\">Delete</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUIDeleteObject = function(i) {
		this.scenes[this.scene].splice(i,1);
		this.showObjectsGUI();
		this.updateEditorGUI();
	};

	this.showMenuGUI = function() {
		var s = "";
		s += "<li><a onclick=\"level_editor.showObjectsGUI();return false;\">Objects...</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.GUISelectPrefab = function(i) {
		this.selectedPrefab = i;
		canvasOverlayGUI.style.cursor = "crosshair";
	};

	this.addPrefab = function(n,x,y) {
		var p = this.scenes[this.scene].push([prefab_editor.prefabs[n][0],x,y]);
		this.updateEditorGUI();
	};
}();
