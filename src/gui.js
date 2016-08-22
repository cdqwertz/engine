//file : gui.js
//author : cdqwertz

function label(x,y,text,color, font) {
	this.componentType = "label";
	
	this.x = x;
	this.y = y;

	this.text = text;
	this.color = color || "#000000";
	this.font = font || null;

	this.draw = function(parent) {
		if(this.font != undefined && this.font) {
			ctx.font = this.font;
		}
		ctx.fillStyle = this.color;
		ctx.textAlign = "center"; 
		ctx.fillText(this.text, this.x, this.y);
	};
}

function button(x,y,w,h,text,color,textColor,font) {
	this.componentType = "button";

	this.x = x;
	this.y = y;

	this.w = w;
	this.h = h;

	this.color = color || "#CCCCCC";
	
	this.text = text || "Button" ;
	this.textColor = textColor || "#000000";
	this.font = font || null;

	this.active = false;

	this.update = function(parent) {
		if(input.getMouse(1) &&
		   input.mouseX > this.x && 
		   input.mouseX < this.x+this.w &&
		   input.mouseY > this.y &&
		   input.mouseY < this.y+this.h) {
			this.active = true;	
		} else {
			this.active = false;
		}
	};

	this.draw = function(parent) {
		if(this.active) {
			ctx.fillStyle = "#AAAAAA";
		} else {
			ctx.fillStyle = this.color;
		}
		ctx.fillRect(this.x, this.y, this.w, this.h);

		if(this.font) {
			ctx.font = this.font;
		}
		ctx.fillStyle = this.textColor;
		ctx.textAlign = "center"; 
		ctx.fillText(this.text, this.x+(this.w/2), this.y+(this.h/2));
	};
}

function menu(items, dist, color, font, fontActive) {
	this.items = items;
	this.distY = dist;

	this.color = color;
	this.font = font;
	this.fontActive = fontActive;	

	this.selected = 0;

	this.update = function(parent) {
		for(var i = 0; i < this.items.length; i++) {
			if(input.mouseY > screen.centerY+i*this.distY-(this.items.length*this.distY/2)-this.distY) {
				this.selected = i;
			}
		}
	};

	this.draw = function(parent) {
		ctx.textAlign = "center";
		for(var i = 0; i < this.items.length; i++) {
			ctx.font = ((i == this.selected) ? this.fontActive : this.font);
			ctx.fillStyle = this.color;
			ctx.fillText(items[i], screen.centerX, screen.centerY+i*this.distY-(this.items.length*this.distY/2));
		};
	};
};
