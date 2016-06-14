function drawRect(pos, scale)
{
	this.pos = pos;
	this.scale = scale;
	this.componentType = "drawRect";
	this.draw = function(obj) {
		ctx.fillRect(this.pos.x, this.pos.y,this.scale.x,this.scale.y);
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
			ctx.drawImage(this.img,this.pos.x, this.pos.y);
		} else if(this.mode == 1) {
			ctx.drawImage(this.img,this.pos.x, this.pos.y, this.w, this.h);
		} else if(this.mode == 2) {
			if(this.animation == -1) {
				ctx.drawImage(this.img, 0, 0, this.w, this.h,this.pos.x, this.pos.y, this.w, this.h);	
			} else {
				var s = this.animations[this.animation][0];
				var e = this.animations[this.animation][1];
				ctx.drawImage(this.img, this.frame*this.w + s*this.w, 0, this.w, this.h,this.pos.x, this.pos.y, this.w, this.h);
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

function velocity(_v) {
	this.v = _v;
	this.t;
	this.componentType = "velocity";
	this.start = function(obj) {
		this.t = obj.getComponent("transform");
	};
	this.update = function(obj) {
		if(this.t) {
			this.t.p.add(new vec2(this.v.x*time.dtime, this.v.y*time.dtime));
		}
	};
}

function bounce() {
	this.coll;
	this.v;
	this.componentType = "bounce";
	this.start = function(obj) {
		this.coll = obj.getComponent("boxCollider");
		this.v = obj.getComponent("velocity");
	};
	this.update = function(obj) {
		if(this.coll) {
			if(this.coll.isColliding) {
				//TODO
				if(this.coll.other.tag == "wall") {
					var x1 = -this.v.v.x;
					var y1 = this.v.v.y;
					console.log(x1);
					this.v.v.x = x1;
					this.v.v.y = y1;
				}
			}
		}
	};
}

function transform(p, r) {
	this.p = p;
	this.componentType = "transform";
	this.draw = function(obj) {
		ctx.translate(this.p.x, this.p.y);
	};
	this.afterDraw = function(obj) {
		ctx.translate(-this.p.x, -this.p.y);
	};
	this.setPos = function(pos) {
		this.p = pos;
		return this.p;
	};
	this.getPos = function() {
		return(this.p);
	};
}
