var prefab_preview = new function() {
	this.render = function(obj, _x,_y) {
		ctx.translate(_x,_y);
		for(var j = 1; j < obj.length; j++) {
			if(obj[j][0] == "transform") {
				var x = obj[j][1][1];
				var y = obj[j][1][2];
				ctx.translate(x,y);
			}
			if(obj[j][0] == "drawRect") {
				var x = obj[j][1][1];
				var y = obj[j][1][2];
				var sx = obj[j][2][1];
				var sy = obj[j][2][2];
				ctx.fillStyle = obj[j][3][1];
				ctx.fillRect(x-(sx/2), y-(sy/2),sx,sy);
			}
			if(obj[j][0] == "boxCollider") {
				var x = obj[j][1][1];
				var y = obj[j][2][1];
				var sx = obj[j][3][1];
				var sy = obj[j][4][1];
				ctx.strokeStyle = "#0000FF";
				ctx.lineWidth = 3;
				ctx.strokeRect(x-(sx/2), y-(sy/2),sx,sy);
				ctx.lineWidth = 1;
				ctx.strokeStyle = "#000000";
			}
			
		}

		for(var j = 1; j < obj.length; j++) {
			if(obj[j][0] == "transform") {
				var x = obj[j][1][1];
				var y = obj[j][1][2];
				ctx.translate(-x,-y)
			}
			
		}
		ctx.translate(-_x,-_y);
	}
}();
