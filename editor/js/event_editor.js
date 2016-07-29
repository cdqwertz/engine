var event_editor = new function() {
	this.components = [[""]];
	this.selectedComponent = 0;

	this.commands = [];
	this.selectedCommand = -1;

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

	this.showCommandsGUI = function() {
		var s = "";
		for(var i = 0; i < this.commands.length; i++) {
			s += "<li><a onclick=\"event_editor.selectCommand("+i+")\">"+this.commands[i][0]+"</a></li>"
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
			var i = this.components.push([parts[1]]);
			this.selectedComponent = i-1;
			console.log(this.components);

			this.updateEditorGUI();
		} else if(parts[0] == "name") {
			this.components[this.selectedComponent][0] = parts[1];
		}
	};

	this.registerCommand = function(name, params, convert_to, is_code_block) {
		is_code_block = is_code_block || false
		this.commands.push([name,params,convert_to, is_code_block]);
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
			c += "function " + this.components[i][0] + "() {\n\tthis.componentType=\""+ this.components[i][0] +"\";\n\tthis.update = function(parent) {\n";
			for(var j = 1; j < this.components[i].length; j++){
				c += "\t\t{\n"
				var z = 0;
				for(var k = 0; k < this.components[i][j].length; k++){
					var cmd = this.commands[this.findCommand(this.components[i][j][k][0])];
					for(var n = 0; n < cmd[1].length; n++){
						c += "\t\t\tvar " + cmd[1][n][1] + " = " + this.components[i][j][k][1][n] + ";\n";
					}
					c += "\t\t\t" + cmd[2] + "\n";
					if(cmd[3]) {
						z++;
					}
				}

				for(var k = 0; k < z; k++){
					c += "\t\t\t}\n"
				}
				c += "\t\t}\n";
			}
			c += "\t}\n}\n\n";
		}
		return c;
	}

	this.registerCommand("Key Pressed?", [["Key", "key"]], "if(input.getKey(key)) {", true);
	this.registerCommand("?", [], "if(last_output) {", true);
	this.registerCommand("Move", [["Actor","obj"],["X","x"] , ["Y", "y"]], "var t = obj.getComponent(\"transform\");\nt.setPos(t.getPos().add(new vec2(x*time.dtime, y*time.dtime)));");
}();
