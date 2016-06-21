var code_editor = new function() {
	this.components = [[]];
	this.component = 0;
	this.Cmds = [];

	this.MouseDown = false;
	this.SelectedObject = [-1];

	this.OnMouseDown = function (e) {
		this.MouseDown = true;
		var x = e.clientX;
		var y = e.clientY;
		console.log(x + "," + y);

		if(this.component != -1) {
			for(var i = 0; i < this.components[this.component].length; i++){
				if(x > this.components[this.component][i][0] &&
				   x < this.components[this.component][i][0]+100 &&
				   y > this.components[this.component][i][1] &&
				   y < this.components[this.component][i][1]+100) {
					this.SelectedObject = [0,i];
					this.updateEditorGUI();
				}
				if(x > this.components[this.component][i][0]+100 &&
				   x < this.components[this.component][i][0]+115 &&
				   y > this.components[this.component][i][1]+10 &&
				   y < this.components[this.component][i][1]+25) {
					this.SelectedObject = [1,i];
					this.updateEditorGUI();
				}
			}
		}
		
	}

	this.OnMouseUp = function (e) {
		var x = e.clientX;
		var y = e.clientY;
		if(this.component != -1 && this.SelectedObject[0] == 1) {
			for(var i = 0; i < this.components[this.component].length; i++){
				if(x > this.components[this.component][i][0]-15 &&
				   x < this.components[this.component][i][0]+10 &&
				   y > this.components[this.component][i][1] &&
				   y < this.components[this.component][i][1]+25) {
					this.components[this.component][this.SelectedObject[1]][3].push([i]);
					this.updateEditorGUI();
				}
			}
		}
		this.MouseDown = false;
		this.SelectedObject = [-1];
	}

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
	}

	
	this.updateEditorGUI = function () {
		codeCtx.clearRect(0,0,codeGUI.width,codeGUI.height);
		if(this.component != -1) {
			for(var i = 0; i < this.components[this.component].length; i++){
				this.DrawCmd(this.components[this.component][i]);
			}
		}
	}

	this.DrawCmd = function(d) {
		codeCtx.strokeRect(d[0],d[1], 100, 100);
		codeCtx.fillText(d[2],d[0]+20,d[1] + 20);

		//draw inputs
		codeCtx.strokeRect(d[0]-15,d[1]+10, 15, 15);
		
		//draw outputs
		codeCtx.strokeRect(d[0]+100,d[1]+10, 15, 15);

		//draw connections
		for(var i = 0; i < d[3].length; i++){
			codeCtx.beginPath();
			codeCtx.moveTo(d[0]+107,d[1]+17, 15, 15);
			var c = this.components[this.component][d[3][i][0]];
			codeCtx.lineTo(c[0]-10,c[1]+17, 15, 15);
			codeCtx.stroke();
		}
	}

	this.AddCmd = function(n) {
		this.components[this.component].push([200, 200, this.Cmds[n][0], []]); 
		this.updateEditorGUI();
	}

	this.AddConnection = function(n) {
		this.components[this.component][n][3].push([n]); 
		this.updateEditorGUI();
	}

	this.RegisterCmd = function(name) {
		this.Cmds.push([name])
	}

	//register commands

	this.RegisterCmd("test");
}();
