//file : utils.js
//author : cdqwertz

var utils = new function() {
	this.color = new function() {
		this.red = "#FF0000";
		this.green = "#00FF00";
		this.blue = "#0000FF";
		this.yellow = "#FFFF00";

		this.white = "#FFF";
		this.black = "#000";
		this.gray = "#555";

		this.rgb = function(r,g,b) {
			return "rgb("+ r +", " + g + ", " + b + ")"
		};
		
		this.rgba = function(r,g,b,a) {
			return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")"
		};
	}();

	this.scale = window.innerHeight/100;

	this.scaleNumber = function(x) {
		return x * this.scale;
	};

	this.scaleVec2 = function(v) {
		return new vec2(v.x*this.scale, v.y*this.scale);
	};
}();
