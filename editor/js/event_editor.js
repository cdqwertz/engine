var event_editor = new function() {
	this.components = [["c"]];
	this.selectedComponent = 0;

	this.commands = [];
	this.selectedCommand = -1;

	this.dist_x = 100;
	this.dist_y = 100;

	this.mouseDown = function(e) {
		var x = core.mouseX - this.dist_x;
		var y = core.mouseY - this.dist_y;

		var a = Math.max(1,Math.floor(x/100)+1);
		var b = Math.floor(y/100);

		if(!(this.selectedCommand == -1)) {
			while(this.components[this.selectedComponent].length < a) {
				this.components[this.selectedComponent].push([])
			}

			this.components[this.selectedComponent][a-1].push(this.commands[this.selectedCommand])
			this.selectedCommand = -1;
			this.updateEditorGUI();
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
				ctx.fillText(this.components[this.selectedComponent][i][j][0], this.dist_x+i*100+ 10, this.dist_y+j*100+10);
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

	this.registerCommand = function(name, params, convert_to, is_code_block) {
		is_code_block = is_code_block || false
		this.commands.push([name,params,convert_to, is_code_block]);
	};

	this.registerCommand("Compare", [["a", "a"], ["b", "b"]], "last_output = (a == b);");
	this.registerCommand("?", [], "if(last_output)", true);
	this.registerCommand("Move", [["actor","obj"] ["x","x"] , ["y", "y"]], "var t = obj.getComponent(\"transform\");\nt.setPos(t.getPos().add(new vec2(x*time.delta, y*time.delta)));");
}();
