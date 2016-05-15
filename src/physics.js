function boxCollider(x, y, w, h, t) {
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.offset_x = x;
	this.offset_y = y;

	this.tag = t || "";

	this.componentType = "boxCollider";

	this.update = function(obj) {
		var p = obj.components[obj.findComponent("transform")].getPos();
		this.x = p.x + this.offset_x;
		this.y = p.y + this.offset_y;
	};

	this.intersect = function (b) {
		if (this.x < b.x + b.w && 
			this.x + this.w > b.x &&
			this.y < b.y + b.h &&
			this.h + this.y > b.y) {
			return true;
		} else {
			return false;
		}
	};
}
