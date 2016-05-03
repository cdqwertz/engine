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
}
