//file : path.js
//author : cdqwertz

function path(p) {
	this.points = p;

	this.clear = function() {
		this.points = [];
	};

	this.set = function(p) {
		this.points = p;
	};

	this.get = function(i) {
		if(i || i == 0) {	
			return this.points[i];
		} else {
			return this.points;
		}
	};

	this.add = function(p) {
		this.points.push(p);
	};
}

function drawPath(p, c) {
	this.path = p;
	this.color = c;
	this.componentType = "drawPath";
	
	this.draw = function(parent) {
		ctx.strokeStyle = this.color;

		ctx.beginPath();
		ctx.moveTo(this.path.points[0].x, this.path.points[0].y);
		for(var i = 1; i < this.path.points.length; i++) {
			ctx.lineTo(this.path.points[i].x, this.path.points[i].y);
		}
		ctx.stroke();
	};
};
