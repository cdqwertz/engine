function vec2(x, y) {
	this.x = x;
	this.y = y;
	this.add = function(other) {
		this.x += other.x;
		this.y += other.y;
	};
}
