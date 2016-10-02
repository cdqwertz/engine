//file : prefab_preview.js
//author : cdqwertz

var prefab_preview = new function() {
	this.scale = 640/100;

	this.render = function(obj, _x,_y) {
		if(!obj) {
			return;
		}
		ctx.translate(_x*this.scale+canvasGUI.width/2,_y*this.scale+canvasGUI.height/2);
		for(var j = 1; j < obj.length; j++) {
			if(obj[j][0] == "transform") {
				var x = obj[j][1][1]*this.scale;
				var y = obj[j][1][2]*this.scale;
				ctx.translate(x,y);
			}
			if(obj[j][0] == "drawRect") {
				var x = obj[j][1][1]*this.scale;
				var y = obj[j][1][2]*this.scale;
				var sx = obj[j][2][1]*this.scale;
				var sy = obj[j][2][2]*this.scale;
				ctx.fillStyle = obj[j][3][1];
				ctx.fillRect(x-(sx/2), y-(sy/2),sx,sy);
			}
			if(obj[j][0] == "drawImage") {
				var x = obj[j][1][1]*this.scale;
				var y = obj[j][1][2]*this.scale;
				var sx = obj[j][2][1]*this.scale;
				var sy = obj[j][2][2]*this.scale;
				ctx.strokeStyle = "#000000";
				ctx.fillStyle = "#000000";
				ctx.strokeRect(x-(sx/2), y-(sy/2),sx,sy);
				ctx.fillText("Image", x-(sx/2)+10, y-(sy/2)+20);
			}
			if(obj[j][0] == "boxCollider") {
				var x = obj[j][1][1]*this.scale;
				var y = obj[j][2][1]*this.scale;
				var sx = obj[j][3][1]*this.scale;
				var sy = obj[j][4][1]*this.scale;
				ctx.strokeStyle = "#0000FF";
				ctx.lineWidth = 3;
				ctx.strokeRect(x-(sx/2), y-(sy/2),sx,sy);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#000000";
			}
			
		}

		for(var j = 1; j < obj.length; j++) {
			if(obj[j][0] == "transform") {
				var x = obj[j][1][1]*this.scale;
				var y = obj[j][1][2]*this.scale;
				ctx.translate(-x,-y)
			}
			
		}
		ctx.translate(-_x*this.scale-canvasGUI.width/2,-_y*this.scale-canvasGUI.height/2);
	}
}();
