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


function simpleRigidbody(g) {
	this.gravity = g || 0.0;
	this.componentType = "simpleRigidbody";
	
	this.update = function(obj) {
		var t = obj.components[obj.findComponent("transform")]
	}
}
