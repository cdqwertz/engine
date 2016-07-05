var level_editor = new function() {
	this.scenes = [["mainScene"]];
	this.scene = 0;
	this.selectedObject = [-1];

	this.selectedPrefab = -1;

	this.mouseDown = function(e) {
		var x = e.clientX;
		var y = e.clientY;
		console.log("mouse down");
		if(this.selectedPrefab != -1) {
			if(e.which == 2) {
				this.selectedPrefab = -1;
				canvasGUI.style.cursor = "auto";
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

	this.updateEditorGUI = function(e) {
		ctx.clearRect(0,0,canvasGUI.width,canvasGUI.height);
		for(var i = 1; i < this.scenes[this.scene].length; i++) {
			//BEGIN TODO : move this to an own class
			for(var j = 1; j < this.scenes[this.scene][i].length; j++) {
				if(this.scenes[this.scene][i][j][0] == "transform") {
					var x = this.scenes[this.scene][i][j][1][1];
					var y = this.scenes[this.scene][i][j][1][2];
					ctx.translate(x,y);
				}
				if(this.scenes[this.scene][i][j][0] == "drawRect") {
					var x = this.scenes[this.scene][i][j][1][1];
					var y = this.scenes[this.scene][i][j][1][2];
					var sx = this.scenes[this.scene][i][j][2][1];
					var sy = this.scenes[this.scene][i][j][2][2];
					ctx.fillStyle = this.scenes[this.scene][i][j][3][1];
					ctx.fillRect(x-(sx/2), y-(sy/2),sx,sy);
				}
				if(this.scenes[this.scene][i][j][0] == "boxCollider") {
					var x = this.scenes[this.scene][i][j][1][1];
					var y = this.scenes[this.scene][i][j][2][1];
					var sx = this.scenes[this.scene][i][j][3][1];
					var sy = this.scenes[this.scene][i][j][4][1];
					ctx.strokeStyle = "#0000FF";
					ctx.lineWidth = 3;
					ctx.strokeRect(x-(sx/2), y-(sy/2),sx,sy);
					ctx.lineWidth = 1;
					ctx.strokeStyle = "#000000";
				}
				
			}

			for(var j = 1; j < this.scenes[this.scene][i].length; j++) {
				if(this.scenes[this.scene][i][j][0] == "transform") {
					var x = this.scenes[this.scene][i][j][1][1];
					var y = this.scenes[this.scene][i][j][1][2];
					ctx.translate(-x,-y)
				}
				
			}
			//END TODO
		}
	};


	this.showPrefabsGUI = function() {
		var s = "";
		for(var i = 0; i < prefab_editor.prefabs.length; i++) {
			s += "<li><a onclick=\"level_editor.GUISelectPrefab(" + i + ");return false;\">" + prefab_editor.prefabs[i][0] + "</a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.GUISelectPrefab = function(i) {
		this.selectedPrefab = i;
		canvasGUI.style.cursor = "crosshair";
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
