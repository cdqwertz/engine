//file : physics.js
//author : cdqwertz

function physicsManager() {
	this.layers = [new collisionLayer()];
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
	this.removeCollider = function(c) {
		for(var i = 0; i < this.objs.length; i++) {
			if(this.objs[i] == c) {
				this.objs.splice(i, 1);
			}	
		}
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
						//this.objs[j].isColliding = c || this.objs[j].isColliding;
						this.objs[i].isColliding = c || this.objs[i].isColliding;

						if(c) {
							//this.objs[j].other = this.objs[i];
							this.objs[i].other = this.objs[j];
							this.objs[i].collisions.push(new collision(this.objs[i], this.objs[j]));
							//this.objs[j].collisions.push(new collision(this.objs[j], this.objs[i]));
						}
					}
				}
			}
		}
	}
}

function collision(a, b) {
	this.a = a;
	this.b = b;
}

//collider

function boxCollider(x, y, w, h, t, m, layer) {
	this.x = 0;
	this.y = 0;
	this.w = w;
	this.h = h;
	this.offset_x = x;
	this.offset_y = y;
	this.check = m;
	this.tag = t || "";
	this.layer = layer || 0;
	this.componentType = "boxCollider";

	this.isColliding = false;
	this.other = null;
	this.collisions = [];
	this.parent = null;

	this.start = function(obj) {
		mainScene.physicsManager.layers[this.layer].addCollider(this);

		this.parent = obj;

		var p = obj.components[obj.findComponent("transform")].getPos();
		this.x = p.x + this.offset_x;
		this.y = p.y + this.offset_y;
	};

	this.update = function(obj) {
	};

	this.afterUpdate = function(obj) {
		var p = obj.components[obj.findComponent("transform")].getPos();
		this.x = p.x + this.offset_x;
		this.y = p.y + this.offset_y;
		this.collisions = [];
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

	this.destroy = function(obj) {
		mainScene.physicsManager.layers[this.layer].removeCollider(this);
	};
}


function simpleRigidbody() {
	this.componentType = "simpleRigidbody";
	
	this.t = null;
	this.coll = null;
	this.motion = null;

	this.start = function(obj) {
		this.t = obj.getComponent("transform");
		this.coll = obj.getComponent("boxCollider");
		this.motion = obj.getComponent("motion")
	};	

	this.physics = function(obj) {
		if(this.coll) {
			if(this.coll.isColliding) {
				var rigidbody_collisions = [];
				var can_move = [true, true, true, true];
				for(var i = 0; i < this.coll.collisions.length; i++) {
					var other = this.coll.collisions[i].b;
					var dir = this.coll.getDir(other);
					var solve = true;
					
					if(other.parent && this.motion && other.parent.getComponent("simpleRigidbody")) {
						rigidbody_collisions.push(this.coll.collisions[i]);
						solve = false;
					} else if(this.motion) {
						if(dir == 0 || dir == 2) {
							this.motion.velocity.x = 0;	
						} else if(dir == 1 || dir == 3) {
							this.motion.velocity.y = 0;
						}
					}
						
					if(solve) {
						if(can_move[((dir+2)%4)]) {
							can_move[dir] = false;
							if(dir == 0) {
								this.t.position.x = other.x - other.w/2 -  this.coll.w/2;
							} else if(dir == 1) {
								this.t.position.y = other.y - other.h/2 - this.coll.h/2;
							} else if(dir == 2) {
								this.t.position.x = other.x + other.w/2 + this.coll.w/2;
							} else if(dir == 3) {
								this.t.position.y = other.y + other.h/2 + this.coll.h/2;
							}
						}
					}
				}
				
				for(var i = 0; i < rigidbody_collisions.length; i++) {
					var other = rigidbody_collisions[i].b;
					var dir = this.coll.getDir(other);
					if(can_move[((dir+2)%4)]) {
						can_move[dir] = false;
						if(dir == 0) {
							this.t.position.x = other.x - other.w/2 -  this.coll.w/2;
						} else if(dir == 1) {
							this.t.position.y = other.y - other.h/2 - this.coll.h/2;
						} else if(dir == 2) {
							this.t.position.x = other.x + other.w/2 + this.coll.w/2;
						} else if(dir == 3) {
							this.t.position.y = other.y + other.h/2 + this.coll.h/2;
						}
					} else {
					}
				}
			}
		}
	}
}
