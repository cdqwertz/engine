//file : event_editor.js
//author : cdqwertz

var event_editor = new function() {
	this.components = [["component1"]];
	this.selectedComponent = 0;

	this.commands = [];
	this.selectedCommand = -1;
	this.library = [];
	this.selectedLibrary = -1;

	this.dist_x = 100;
	this.dist_y = 100;

	this.mouseDown = function(e) {
		var x = core.mouseX - this.dist_x;
		var y = core.mouseY - this.dist_y;

		var a = Math.max(1,Math.floor(x/100)+1);
		var b = Math.max(1,Math.floor(y/100)+1);

		while(this.components[this.selectedComponent].length < a) {
			this.components[this.selectedComponent].push([])
		}
		
		if(this.components[this.selectedComponent][a-1].length > b-1) {
			if(e.which == 1) {
				var p = this.components[this.selectedComponent][a-1][b-1][1];
				for(var i = 0; i < p.length; i++) {
					var cmd = this.commands[this.findCommand(this.components[this.selectedComponent][a-1][b-1][0])];
					var value = prompt(cmd[1][i][0]);
					this.components[this.selectedComponent][a-1][b-1][1][i] = value;
				}
				this.updateEditorGUI();
			} else if(e.which == 2) {
				this.components[this.selectedComponent][a-1].splice(b-1,1);
				this.updateEditorGUI();
			}
		} else if(e.which == 2) {
			this.components[this.selectedComponent][a-1].pop();
			this.updateEditorGUI();
		} else if(!(this.selectedCommand == -1)) {
			
			{
				this.components[this.selectedComponent][a-1].push([this.commands[this.selectedCommand][0], new Array(this.commands[this.selectedCommand][1].length)])
				this.selectedCommand = -1;
				this.updateEditorGUI();
			}
		} 
	};

	this.mouseMove = function(e) {
	};

	this.mouseUp = function(e) {
	};

	this.keyDown = function(e) {
	};

	this.updateEditorGUI = function() {
		ctx.clearRect(0,0,canvasGUI.width,canvasGUI.height);
		for(var i = 1; i < this.components[this.selectedComponent].length; i++){
			for(var j = 0; j < this.components[this.selectedComponent][i].length; j++){
				ctx.strokeRect(this.dist_x+i*100, this.dist_y+j*100, 100, 100);
				ctx.fillText(this.components[this.selectedComponent][i][j][0], this.dist_x+i*100+ 10, this.dist_y+j*100+15);
				
				var p = this.components[this.selectedComponent][i][j][1];
				for(var k = 0; k < p.length; k++) {
					ctx.fillText(p[k], this.dist_x+i*100+ 30, this.dist_y+j*100+35+12*k);
				}
			}
		}
	};

	this.showCommandsGUI = function(n) {
		var s = "";
		s += "<li><a onclick=\"event_editor.showLibraryGUI()\">...</a></li>"
		for(var i = 0; i < this.commands.length; i++) {
			if(this.commands[i][4] == n) {
				s += "<li><a onclick=\"event_editor.selectCommand("+i+")\">"+this.commands[i][0]+"</a></li>";
			}
		}
		objectsGUI.innerHTML = s;
	};

	this.showLibraryGUI = function() {
		var s = "";
		for(var i = 0; i < this.library.length; i++) {
			s += "<li><a onclick=\"event_editor.showCommandsGUI(\'" + i + "\');return false;\">" + this.library[i] + "</a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.selectCommand = function(i) {
		this.selectedCommand = i;
	};

	this.runEditorCommand = function(cmd) {
		var parts = cmd.split(" ");
		

		if(parts[0] == "select") {
			if(parseInt(parts[1]) || parseInt(parts[1]) == 0) {
				this.selectedComponent = parseInt(parts[1]);
				this.updateEditorGUI();
			}
		} else if(parts[0] == "add") {
			if(core.utils.isNameAllowed(parts[1])) {
				var i = this.components.push([parts[1]]);
				this.selectedComponent = i-1;
				console.log(this.components);
			} else {
				core.dialog.show("This name is not allowed!", "<button onclick=\"core.dialog.close();\">Back</button>");
			}

			this.updateEditorGUI();
		} else if(parts[0] == "name") {
			if(core.utils.isNameAllowed(parts[1])) {
				this.components[this.selectedComponent][0] = parts[1];
			} else {
				core.dialog.show("This name is not allowed!", "<button onclick=\"core.dialog.close();\">Back</button>");
			}
		}
	};

	this.registerCommand = function(name, params, convert_to, library, is_code_block) {
		is_code_block = is_code_block || false
		this.commands.push([name,params,convert_to, is_code_block, library]);
	};

	this.registerLibrary = function(name) {
		this.library.push(name);
	};

	this.findCommand = function(name) {
		for(var i = 0; i < this.commands.length; i++){
			if(this.commands[i][0] == name) {
				return i;
			}
		}
		return -1;
	};

	this.genCode = function() {
		var c = "";
		for(var i = 0; i < this.components.length; i++){
			c += "\tfunction " + this.components[i][0] + "() {\n\tthis.transform = null;\n\tthis.motion = null;\n\tthis.collider = null;\n\tthis.state = 0;\n\tthis.componentType=\""+ this.components[i][0] +"\";\n\tthis.start = function(parent) {\n\t\tthis.transform = parent.getComponent(\"transform\");\n\t\tthis.motion = parent.getComponent(\"motion\");\n\t\tthis.collider = parent.getComponent(\"boxCollider\");\n\t};\n\n\n\tthis.update = function(parent) {\n";
			for(var j = 1; j < this.components[i].length; j++){
				c += "\t\t\t{\n"
				var z = 0;
				for(var k = 0; k < this.components[i][j].length; k++){
					var cmd = this.commands[this.findCommand(this.components[i][j][k][0])];	
					var s = cmd[2];
					for(var n = 0; n < cmd[1].length; n++){
						s = s.replace("<"+cmd[1][n][1]+">",this.components[i][j][k][1][n]);
					}
					c += "\t\t\t\t" + s + "\n";
					if(cmd[3]) {
						z++;
					}
				}

				for(var k = 0; k < z; k++){
					c += "\t\t\t\t}\n"
				}
				c += "\t\t\t}\n";
			}
			c += "\t};\n\t}\n\n";
		}
		return c;
	}

	this.registerLibrary("Actor");
	this.registerLibrary("Motion");
	this.registerLibrary("Input");
	this.registerLibrary("Other");

	this.registerCommand("Key Pressed?", [["Key", "key"]], "if(input.getKey(<key>)) {", 2, true);
	this.registerCommand("Mouse Pressed?", [["Button", "button"]], "if(input.getMouse(<button>)) {", 2, true);
	this.registerCommand("State = value?", [["Value", "value"]], "if(this.state == <value>) {", 3, true);
	this.registerCommand("Random > value?", [["Value", "value"]], "if(Math.random() > <value>) {", 3, true);
	this.registerCommand("Collision?", [], "if(this.collider && this.collider.isColliding) {", 0, true);

	this.registerCommand("Set State", [["Value", "value"]], "this.state = <value>;", 3);

	this.registerCommand("Move", [["X","x"] , ["Y", "y"]], "this.transform.setPos(this.transform.getPos().add(new vec2(<x>*time.dtime, <y>*time.dtime)));", 1);
	this.registerCommand("Rotate", [["Rotation", "r"]], "this.transform.rotation += <r>;", 1);
	this.registerCommand("Set Velocity", [["X", "x"], ["Y", "y"]], "this.motion.velocity = new vec2(<x>, <y>);", 1);
	this.registerCommand("Set Friction", [["Friction", "friction"]], "this.motion.friction = <friction>;", 1);
	this.registerCommand("Set Gravity", [["Gravity", "gravity"]], "this.motion.gravity = <gravity>;", 1);

	this.registerCommand("Destroy", [[]], "parent.destroy();", 0);
	this.registerCommand("Add Component", [["Component", "c"]], "parent.addComponent(new <c>);", 0);

	this.registerCommand("Move Actor", [["Actor","obj"],["X","x"] , ["Y", "y"]], "var t = <obj>.getComponent(\"transform\");\nt.setPos(t.getPos().add(new vec2(<x>*time.dtime, <y>*time.dtime)));", 0);
	this.registerCommand("Add Component to Actor", [["Actor", "obj"],["Component", "c"]], "<obj>.addComponent(new <c>);", 0);

}();
