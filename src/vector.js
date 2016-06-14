function vec2(x, y) {
	this.x = x;
	this.y = y;
	this.add = function(other) {
		this.x += other.x;
		this.y += other.y;
		return this;
	};

	this.sub = function(other) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	};

	this.mul = function(other) {
		this.x *= other.x;
		this.y *= other.y;
		return this;
	};

	this.div = function(other) {
		this.x /= other.x;
		this.y /= other.y;
		return this;
	};

	this.dist = function(other) {
		return math.pow(math.pow(this.x-other.x)+math.pow(this.y-other.y),0.5);
	};

	this.length = function() {
		return math.pow(math.pow(this.x)+math.pow(this.y),0.5);
	};

	this.abs = function() {
		this.x = math.abs(this.x);
		this.y = math.abs(this.y);
		return this;
	};

}
