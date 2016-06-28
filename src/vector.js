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
		return math.pow(math.pow(this.x-other.x)+math.pow(this.y-other.y),0.5);
	};

	this.length = function() {
		return math.pow(math.pow(this.x)+math.pow(this.y),0.5);
	};

	this.abs = function() {
		var _x = math.abs(this.x);
		var _y = math.abs(this.y);
		return (new vec2(_x,_y));
	};
}
