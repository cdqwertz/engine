function physicsManager() {
	this.layers = new Array();
	this.addLayer = function(c) {
		this.layers.push(c);
	};
	this.update = function() {
		for(var i = 0; i < this.layers.length; i++) {
			this.layers[i].update();
		}
	};
}

function collisionLayer() {
	this.objs = new Array();
	this.addCollider = function(c) {
		this.objs.push(c);
	};
	this.update = function() {
		for(var i = 0; i < this.objs.length; i++) {
			this.objs[i].isColliding = false;
			this.objs[i].other = null;
		}

		for(var i = 0; i < this.objs.length; i++) {
			if(this.objs[i].check) {
				for(var j = 0; j < this.objs.length; j++) {
					if(this.objs[j] != this.objs[i]) {
						var c = this.objs[i].intersect(this.objs[j]);
						this.objs[j].isColliding = c || this.objs[j].isColliding;
						this.objs[i].isColliding = c || this.objs[i].isColliding;

						if(c) {
							this.objs[j].other = this.objs[i]
							this.objs[i].other = this.objs[j]
						}
					}
				}
			}
		}
	}
}

function boxCollider(x, y, w, h, t, m) {
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.offset_x = x;
	this.offset_y = y;
	this.check = m;
	this.tag = t || "";
	this.componentType = "boxCollider";

	this.isColliding = false;
	this.other = null;

	this.start = function(obj) {
		var p = obj.components[obj.findComponent("transform")].getPos();
		this.x = p.x + this.offset_x;
		this.y = p.y + this.offset_y;
	};

	this.update = function(obj) {
		var p = obj.components[obj.findComponent("transform")].getPos();
		this.x = p.x + this.offset_x;
		this.y = p.y + this.offset_y;
	};

	this.intersect = function (b) {
		if (this.x-this.w/2 < b.x-b.w/2 + b.w && 
			this.x-this.w/2 + this.w > b.x-b.w/2 &&
			this.y-this.h/2 < b.y-b.h/2 + b.h &&
			this.h + (this.y-this.h/2) > b.y-b.h/2) {
			return true;
		} else {
			return false;
		}
	};


	this.getDir = function(b) {
		var d = -1;
		var dx = (b.x-this.x)/(b.w/2);
		var dy = (b.y-this.y)/(b.h/2);

		var absDx = Math.abs(dx);
		var absDy = Math.abs(dy);

		if(absDx > absDy){
			if(dx > 0) {
				d = 0;
			} else {
				d = 2;
			}
		} else {
			if(dy > 0) {
				d = 1;
			} else {
				d = 3;
			}
		}

		//dir
		// 0 : right
		// 1 : bottom
		// 2 : left
		// 3 : top

		return d;
	};
}


function simpleRigidbody() {
	this.componentType = "simpleRigidbody";
	
	this.t = null;
	this.coll = null;

	this.start = function(obj) {
		this.t = obj.getComponent("transform");
		this.coll = obj.getComponent("boxCollider");
	};	

	this.update = function(obj) {
		//console.log(this.t.p.x + " " + this.t.p.y);
		if(this.coll) {
			if(this.coll.isColliding) {
				var dir = this.coll.getDir(this.coll.other);
				if(dir == 0) {
					this.t.p.x = this.coll.other.x - this.coll.other.w/2 -  this.coll.w/2;
				} else if(dir == 1) {
					this.t.p.y = this.coll.other.y - this.coll.other.h/2 - this.coll.h/2;
				} else if(dir == 2) {
					this.t.p.x = this.coll.other.x + this.coll.other.w;
				} else if(dir == 3) {
					this.t.p.y = this.coll.other.y + this.coll.other.h;
				}
			}
		}
	}
}
