var code_editor = new function() {
	this.components = [[]];
	this.component = 0;
	this.Cmds = [];
	this.library = [];

	this.MouseDown = false;
	// [type, data1, data2]
	this.SelectedObject = [-1];

	this.connectionsWithStart = []

	this.vars = [];

	this.OnMouseDown = function (e) {
		this.MouseDown = true;
		var x = e.clientX;
		var y = e.clientY;
		console.log(x + "," + y);

		if(e.which == 1) {
			if(this.component != -1) {
				for(var i = 0; i < this.components[this.component].length; i++){
					if(x > this.components[this.component][i][0] &&
					   x < this.components[this.component][i][0]+100 &&
					   y > this.components[this.component][i][1] &&
					   y < this.components[this.component][i][1]+100) {
						this.SelectedObject = [0,i,0];
						this.updateEditorGUI();
					}
					var outputs = this.Cmds[this.findCmd(this.components[this.component][i][2])][2];
					for(var j = 0; j < outputs; j++){
						if(x > this.components[this.component][i][0]+100 &&
						   x < this.components[this.component][i][0]+115 &&
						   y > this.components[this.component][i][1]+10+j*20 &&
						   y < this.components[this.component][i][1]+25+j*20) {
							this.SelectedObject = [1,i,j];
							this.updateEditorGUI();
						}
					}
				}
				if(x > 100 && x < 200 &&
				   y > 100 && y < 200) {
					this.SelectedObject = [2,0,0];
					this.updateEditorGUI();
				}
			}
		} else if(e.which == 2) {
			if(this.component != -1) {
				for(var i = 0; i < this.components[this.component].length; i++){
					var inputs = this.Cmds[this.findCmd(this.components[this.component][i][2])][1];
					for(var j = 1; j < inputs; j++){
						if(x > this.components[this.component][i][0]-15 &&
						   x < this.components[this.component][i][0]+10 &&
						   y > this.components[this.component][i][1]+20*j &&
						   y < this.components[this.component][i][1]+25+20*j) {
							this.components[this.component][i][4][j] = prompt("I" + j + ":") || null;
							this.updateEditorGUI();
						}
					}
				}
			}
			
		}
		
	};

	this.OnMouseUp = function (e) {
		var x = e.clientX;
		var y = e.clientY;
		if(e.which == 1) {
			if(this.component != -1 && (this.SelectedObject[0] == 1 || this.SelectedObject[0] == 2)) {
				for(var i = 0; i < this.components[this.component].length; i++){
					var inputs = this.Cmds[this.findCmd(this.components[this.component][i][2])][1];
					for(var j = 0; j < inputs; j++){
						if(x > this.components[this.component][i][0]-15 &&
						   x < this.components[this.component][i][0]+10 &&
						   y > this.components[this.component][i][1]+20*j &&
						   y < this.components[this.component][i][1]+25+20*j) {
							if(this.SelectedObject[0] == 1) {
								this.components[this.component][this.SelectedObject[1]][3].push([i, j, this.SelectedObject[2]]);
								if(j != 0) {
									this.components[this.component][i][5].push([this.SelectedObject[1], this.SelectedObject[2], j]);
								}
							} else if(this.SelectedObject[0] == 2) {
								this.connectionsWithStart.push([i,j]);
							}
							this.updateEditorGUI();
						}
					}
				}
			}
		}
		this.MouseDown = false;
		this.SelectedObject = [-1];
	};

	this.OnMouseMove = function (e) {
		if(this.MouseDown) {
			var x = e.clientX;
			var y = e.clientY;
			if(this.component != -1 && this.SelectedObject[0] != -1) {
				if(this.SelectedObject[0] == 0) {
					this.components[this.component][this.SelectedObject[1]][0] = x -50;
					this.components[this.component][this.SelectedObject[1]][1] = y -50;
					this.updateEditorGUI();
				}
			}
		}
	};

	
	this.updateEditorGUI = function () {
		ctx.clearRect(0,0,canvasGUI.width,canvasGUI.height);
		ctx.strokeStyle = "#000000";

		ctx.strokeRect(100,100, 50, 50);

		for(var i = 0; i < this.connectionsWithStart.length; i++){
			var d = this.connectionsWithStart[i]
			ctx.beginPath();
			ctx.moveTo(125, 125);
			var c = this.components[this.component][d[0]];
			ctx.lineTo(c[0]-10,c[1]+17+20*d[1], 15, 15);
			ctx.strokeStyle = "#0000FF";
			ctx.stroke();
		}

		if(this.component != -1) {
			for(var i = 0; i < this.components[this.component].length; i++){
				this.DrawCmd(this.components[this.component][i]);
			}
		}

		ctx.fillText(this.genCode(),700,100);
	};

	this.showLibraryGUI = function() {
		var s = "";
		for(var i = 0; i < this.library.length; i++) {
			s += "<li><a onclick=\"code_editor.showCmdsGUI(\'" + this.library[i] + "\');return false;\">" + this.library[i] + "</a></li>";
		}
		objectsGUI.innerHTML = s;
	};

	this.showCmdsGUI = function(n) {
		var s = "";
		for(var i = 0; i < this.Cmds.length; i++) {
			if(this.Cmds[i][4] == n) {
				s += "<li><a onclick=\"code_editor.AddCmd(" + i + ");return false;\">" + this.Cmds[i][0] + "</a></li>";
			}
		}
		s += "<li><a onclick=\"code_editor.showLibraryGUI();return false;\">" + "Back" + "</a></li>";
		objectsGUI.innerHTML = s;
	};

	this.DrawCmd = function(d) {
		ctx.strokeStyle = "#000000";
		ctx.strokeRect(d[0],d[1], 100, 100);
		ctx.fillText(d[2],d[0]+20,d[1] + 20);

		//draw inputs
		var inputs = this.Cmds[this.findCmd(d[2])][1]
		for(var i = 0; i < inputs; i++){
			if(i == 0) {
				ctx.strokeStyle = "#0000FF";
			} else {
				ctx.strokeStyle = "#00FF00";
			}
			ctx.strokeRect(d[0]-15,d[1]+10+i*20, 15, 15);
			if(d[4][i]) {
				ctx.fillText(d[4][i],d[0]-50,d[1]+20+i*20);
			}
		}
		
		//draw outputs
		var outputs = this.Cmds[this.findCmd(d[2])][2]
		for(var i = 0; i < outputs; i++){
			if(i == 0) {
				ctx.strokeStyle = "#0000FF";
			} else {
				ctx.strokeStyle = "#00FF00";
			}
			ctx.strokeRect(d[0]+100,d[1]+10+i*20, 15, 15);
		}

		//draw connections
		for(var i = 0; i < d[3].length; i++){
			ctx.beginPath();
			ctx.moveTo(d[0]+107,d[1]+17+20*d[3][i][2], 15, 15);
			var c = this.components[this.component][d[3][i][0]];
			ctx.lineTo(c[0]-10,c[1]+17+20*d[3][i][1], 15, 15);
			if(d[3][i][2] == 0) {
				ctx.strokeStyle = "#0000FF";
			} else {
				ctx.strokeStyle = "#00FF00";
			}
			ctx.stroke();
		}
	};

	this.AddCmd = function(n) {
		var a = this.Cmds[n][2]
		this.components[this.component].push([200, 200, this.Cmds[n][0], [], new Array(a), []]); 
		this.updateEditorGUI();
	};

	this.AddConnection = function(n) {
		this.components[this.component][n][3].push([n]); 
		this.updateEditorGUI();
	};

	this.RegisterCmd = function(name, inputs, outputs, type, library) {
		this.Cmds.push([name, inputs, outputs, type, library])
	};

	this.registerLibrary = function(name) {
		this.library.push(name)
	};

	this.findCmd = function(name) {
		for(var i = 0; i < this.Cmds.length; i++){
			if(this.Cmds[i][0] == name) {
				return i;
			}
		}
		return -1;
	};

	this.genCode = function() {
		var c = "";
		this.vars = [];
		for(var i = 0; i < this.connectionsWithStart.length; i++){
			c += this.genPart(this.connectionsWithStart[i][0]) + "\n";
		}
		return c;
	};

	this.genPart = function(n) {
		var c = "";
		c = this.genCmd(n) + "\n";
		return c;
	};

	this.genCmd = function(n) {
		var c = "";
		var name = this.components[this.component][n][2];
		var param = "";
		var v = "";
		var t = this.Cmds[this.findCmd(name)][3];
		var object = "";

		if(this.Cmds[this.findCmd(name)][2] > 1) {
			var m = "";
			var var_name = "var_";
			var_name += n;
			this.vars.push([var_name, n]);
			v = "var " + var_name + " = ";
		}


		if(t == 0) {
			for(var i = 1; i < this.Cmds[this.findCmd(name)][2]+1; i++){
				if(this.components[this.component][n][4][i]) {
					param += (this.components[this.component][n][4][i]) + ",";
				} else {
					for(var j = 0; j < this.components[this.component][n][5].length; j++){
						if(this.components[this.component][n][5][j][2] == i) {
							param += ("var_" + this.components[this.component][n][5][j][0]) + ",";
						}
					}
				}
			}
			param = param.substring(0, param.length-1);
		} else if(t== 2) {
			for(var j = 0; j < this.components[this.component][n][5].length; j++){
				if(this.components[this.component][n][5][j][2] == 1) {
					object = ("var_" + this.components[this.component][n][5][j][0]);
				}
			}
			for(var i = 2; i < this.Cmds[this.findCmd(name)][2]+1; i++){
				if(this.components[this.component][n][4][i]) {
					param += (this.components[this.component][n][4][i]) + ",";
				} else {
					for(var j = 0; j < this.components[this.component][n][5].length; j++){
						if(this.components[this.component][n][5][j][2] == i) {
							param += ("var_" + this.components[this.component][n][5][j][0]) + ",";
						}
					}
				}
			}
			param = param.substring(0, param.length-1);
		};

		if(t == 0) {
			c += v + name + "(" + param + ");\n";
		} else if(t == 1) {
			c += v + name + ";\n";
		} else if(t==2) {
			c += v + object + "." + name + "(" + param + ");\n";
		}
		for(var i = 0; i < this.components[this.component][n][3].length; i++){
			if(this.components[this.component][n][3][i][2] == 0) {
				c += this.genCmd(this.components[this.component][n][3][i][0]);
			}
		}
		return c;
	};

	//register libraries
	
	this.registerLibrary("actor");
	this.registerLibrary("input");
	this.registerLibrary("vector");

	//register commands

	//input
	this.RegisterCmd("input.mouseX", 1, 2, 1, "input");
	this.RegisterCmd("input.mouseY", 1, 2, 1, "input");
	this.RegisterCmd("input.getKey", 2, 2, 0, "input");

	//actor
	this.RegisterCmd("findComponent", 3, 2, 2, "actor");
	this.RegisterCmd("getComponent", 3, 2, 2, "actor");

	//vec2
	this.RegisterCmd("new vector", 3, 2, 0, "vector");
	this.RegisterCmd("add", 3, 2, 2, "vector");
	this.RegisterCmd("sub", 3, 2, 2, "vector");
	this.RegisterCmd("mul", 3, 2, 2, "vector");
	this.RegisterCmd("div", 3, 2, 2, "vector");
	this.RegisterCmd("dist", 3, 2, 2, "vector");
}();
