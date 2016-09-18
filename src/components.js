//file : components.js
//author : cdqwertz

function drawRect(pos, scale, color)
{
	this.pos = pos;
	this.scale = scale;
	this.color = color || "#000000";
	this.componentType = "drawRect";
	this.draw = function(obj) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.pos.x-(this.scale.x/2), this.pos.y-(this.scale.y/2),this.scale.x,this.scale.y);
	};
}

function drawImage(pos, img, mode, w, h, animations, animation, speed)
{
	this.pos = pos;
	this.img = img;
	this.componentType = "drawImage";
	
	this.mode = mode || 0;	

	this.w = w || 0;
	this.h = h || 0;

	this.animations = animations || [];
	this.frame = 0;
	this.speed = speed || 10;
	this.timer = 0;
	this.animation = animation || 0;

	this.draw = function(obj) {
		if(this.mode == 0) {
			ctx.drawImage(this.img,this.pos.x-(this.img.width/2), this.pos.y-(this.img.height/2));
		} else if(this.mode == 1) {
			ctx.drawImage(this.img,this.pos.x-(this.w/2), this.pos.y-(this.h/2), this.w, this.h);
		} else if(this.mode == 2) {
			if(this.animation == -1) {
				ctx.drawImage(this.img, 0, 0, this.w, this.h,this.pos.x-(this.w/2), this.pos.y-(this.h/2), this.w, this.h);	
			} else {
				var s = this.animations[this.animation][0];
				var e = this.animations[this.animation][1];
				ctx.drawImage(this.img, this.frame*this.w + s*this.w, 0, this.w, this.h,this.pos.x-(this.w/2), this.pos.y-(this.h/2), this.w, this.h);
				if(this.timer > this.speed) {	
					this.frame += 1;
					if(this.frame > e) {
						this.frame = s;
					}
					this.timer = 0;
				}
				this.timer += 1;
			}
		}
	};
}

function motion(v, r, a, f, g) {
	this.velocity = v;
	this.velocity_rotation = r;
	
	this.acceleration = a || new vec2(0,0);

	this.friction = f || 0.0;
	this.gravity = g || 0.0;

	this.t;
	this.componentType = "motion";
	this.start = function(obj) {
		this.t = obj.getComponent("transform");
	};
	this.update = function(obj) {
		this.velocity = this.velocity.mul(new vec2(1.0-this.friction,1.0-this.friction));
		this.velocity.y += this.gravity;
		this.velocity = this.velocity.add(this.acceleration);

		if(this.t) {
			this.t.position = this.t.position.add(new vec2(this.velocity.x*time.dtime, this.velocity.y*time.dtime));
			this.t.rotate(this.velocity_rotation*time.dtime);
		}
	};
}

function loop() {
	this.componentType = "loop";
	this.t = null;
	
	this.start = function(obj) {
		this.t = obj.getComponent("transform");
	};

	this.update = function(obj) {
		if(this.t.position.y < -screen.centerY) {
			this.t.position.y += screen.h;
		}
		if(this.t.position.x > screen.centerX) {
			this.t.position.x -= screen.w;
		}
		if(this.t.position.y > screen.centerY) {
			this.t.position.y -= screen.h;
		}
		if(this.t.position.x < -screen.centerX) {
			this.t.position.x += screen.w;
		}

	};
}

function bounce() {
	this.coll;
	this.v;
	this.componentType = "bounce";
	this.start = function(obj) {
		this.coll = obj.getComponent("boxCollider");
		this.v = obj.getComponent("motion");
	};
	this.update = function(obj) {
		if(this.coll) {
			if(this.coll.isColliding) {
				var dir = this.coll.getDir(this.coll.other);
				console.log(dir);
				if(dir == 1) {
					var x1 = this.v.velocity.x;
					var y1 = -Math.abs(this.v.velocity.y);
				
					this.v.velocity.x = x1;
					this.v.velocity.y = y1;
				} else if(dir == 3) {
					var x1 = this.v.velocity.x;
					var y1 = Math.abs(this.v.velocity.y);
				
					this.v.velocity.x = x1;
					this.v.velocity.y = y1;
				} else if(dir == 0) {
					var x1 = -Math.abs(this.v.velocity.x);
					var y1 = this.v.velocity.y;
				
					this.v.velocity.x = x1;
					this.v.velocity.y = y1;
				} else if(dir == 2) {
					var x1 = Math.abs(this.v.velocity.x);
					var y1 = this.v.velocity.y;
				
					this.v.velocity.x = x1;
					this.v.velocity.y = y1;
				}
			}
		}
	};
}

function transform(p, r) {
	this.position = p;
	this.rotation = r;
	this.componentType = "transform";
	this.draw = function(obj) {
		ctx.translate(this.position.x, this.position.y);
		ctx.rotate(this.rotation);
	};
	this.afterDraw = function(obj) {
		ctx.rotate(-this.rotation);
		ctx.translate(-this.position.x, -this.position.y);
	};
	this.setPos = function(pos) {
		this.position = pos;
		return this.position;
	};
	this.getPos = function() {
		return(this.position);
	};
	this.rotate = function(r) {
		this.rotation += r;
	};
}

function health(hp, regeneration, destroy) {
	this.hp = hp;
	this.maxHp = hp;
	this.regeneration = regeneration;
	this.destroyOnDie = destroy || false;

	this.componentType = "health";

	this.timer = 0;
	
	this.update = function(obj) {
		if(this.regeneration) {
			this.timer += time.dtime;
			if(this.timer > 1000) {
				this.hp += this.regeneration;
				this.timer = 0;
			}
		}

		if(this.hp > this.maxHp) {
			this.hp = this.maxHp;
		}

		if((this.hp < 0 || this.hp == 0) && this.destroyOnDie) {
			obj.destroy();
		}
	};

	this.damage = function(x) {
		this.hp -= x;
	};
}

function damage(damage, destroy) {
	this.damage = damage || 0;
	this.destroyOnDie = destroy || false;
	this.coll = null;
	this.componentType = "damage";

	this.start = function(parent) {
		this.coll = parent.getComponent("boxCollider");
		
	};
	
	this.update = function(parent) {
		if(this.coll && this.coll.isColliding) {
			for(var i = 0; i < this.coll.collisions.length; i++) {
				var other = this.coll.collisions[i].b;
				if(other.parent.getComponent("health")) {
					other.parent.getComponent("health").damage(this.damage);
					if(this.destroyOnDie) {
						parent.destroy();
					}
				}
			}
		}
	};
}

function score() {
	this.score = 0;
	this.componentType = "score";
	
	this.update = function(obj) {
	};

	this.add = function(x) {
		this.score += x;
	};
}

function coin() {
	this.componentType = "coin";
	this.coll = null;
	
	this.start = function(obj) {
		this.coll = obj.getComponent("boxCollider");
	};	

	this.update = function(obj) {
		if(this.coll && this.coll.isColliding) {
			for(var i = 0; i < this.coll.collisions.length; i++) {
				var other = this.coll.collisions[i].b;
				if(other.parent.getComponent("score")) {
					other.parent.getComponent("score").add(1);
					obj.destroy();
				}
			}
		}
	};
}

function followMouse(followX,followY) {
	this.followX = followX;
	this.followY = followY;
	this.componentType = "followMouse";

	this.transform = null;

	this.start = function(parent) {
		this.transform = parent.getComponent("transform");
	}

	this.update = function(parent) {
		if(this.transform) {
			if(this.followX) {
				this.transform.position.x = input.mouseX-screen.centerX;
			}
			if(this.followY) {
				this.transform.position.y = input.mouseY-screen.centerY;
			}
		}
	};
}

function moveToMouse(speed,radius) {
	this.componentType = "moveToMouse";
	this.speed = speed;
	this.radius = radius;
	this.transform = null;

	this.start = function(parent) {
		this.transform = parent.getComponent("transform");
	}

	this.update = function(parent) {
		if(this.transform) {
			var mouse = new vec2((input.mouseX-screen.centerX),(input.mouseY-screen.centerY));
			if (mouse.dist(this.transform.position) > this.radius) {
				var len = mouse.sub(this.transform.position).length();
				var dir = mouse.sub(this.transform.position).div(new vec2(len,len)).mul(new vec2(this.speed, this.speed));

				this.transform.position.x += dir.x * time.dtime;
				this.transform.position.y += dir.y * time.dtime;
			}
		}
	};
}


