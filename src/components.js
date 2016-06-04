function drawRect(pos, scale)
{
	this.pos = pos;
	this.scale = scale;
	this.componentType = "drawRect";
	this.update = function(obj) {
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

	this.update = function(obj) {
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

function transform(p, v) {
	this.p = p;
	this.v = v
	this.componentType = "transform";
	this.update = function(obj) {
		p.add(v);
		ctx.translate(this.p.x, this.p.y);
	};
	this.afterUpdate = function(obj) {
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
