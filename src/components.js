function drawRect(pos, scale)
{
	this.pos = pos;
	this.scale = scale;
	this.componentType = "drawRect";
	this.update = function(obj) {
		ctx.fillRect(this.pos.x, this.pos.y,this.scale.x,this.scale.y);
	};
}

function drawImage(pos, img)
{
	this.pos = pos;
	this.img = img;
	this.componentType = "drawImage";
	this.update = function(obj) {
		ctx.drawImage(this.img,this.pos.x, this.pos.y);
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
