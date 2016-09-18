//file : vector.js
//author : cdqwertz

function vec2(x, y) {
	this.x = x;
	this.y = y;
	
	this.set = function(_x,_y){
		this.x = _x;
		this.y = _y;
	};

	this.clone = function() {
		return (new vec2(this.x,this.y));
	};

	this.add = function(other) {
		var _x = this.x+other.x;
		var _y = this.y+other.y;
		return (new vec2(_x,_y));
	};

	this.sub = function(other) {
		var _x = this.x-other.x;
		var _y = this.y-other.y;
		return (new vec2(_x,_y));
	};

	this.mul = function(other) {
		var _x = this.x*other.x;
		var _y = this.y*other.y;
		return (new vec2(_x,_y));
	};

	this.div = function(other) {
		var _x = this.x/other.x;
		var _y = this.y/other.y;
		return (new vec2(_x,_y));
	};

	this.dist = function(other) {
		return Math.pow(Math.pow(this.x-other.x,2)+Math.pow(this.y-other.y,2),0.5);
	};

	this.length = function() {
		return Math.pow(Math.pow(this.x,2)+Math.pow(this.y,2),0.5);
	};

	this.abs = function() {
		var _x = Math.abs(this.x);
		var _y = Math.abs(this.y);
		return (new vec2(_x,_y));
	};
}
