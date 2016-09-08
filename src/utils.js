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
}();
