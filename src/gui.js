//file : gui.js
//author : cdqwertz
//license : see LICENSE.txt

var guiStyle = new function() {
	this.color = "#CCCCCC";
	this.colorActive = "#AAAAAA";

	this.textColor = "#000000";
	this.font = null;
}();

function gui() {
	this.componentType = "gui";

	this.draw = function(parent) {
		ctx.translate(-screen.centerX,-screen.centerY)
	};
	
	this.afterDraw = function(parent) {
		ctx.translate(screen.centerX,screen.centerY)
	};
}

function label(x,y,text,color, font) {
	this.componentType = "label";
	
	this.x = x;
	this.y = y;

	this.text = text;
	this.color = color || guiStyle.textColor || "#000000";
	this.font = font || guiStyle.font || null;

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

	this.color = color || guiStyle.color || "#CCCCCC";
	
	this.text = text || "Button" ;
	this.textColor = textColor || guiStyle.textColor || "#000000";
	this.font = font || guiStyle.font  || null;

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
			ctx.fillStyle = guiStyle.colorActive;
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

	this.color = color || guiStyle.textColor;
	this.font = font || guiStyle.font || null;
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

function scrollbar(x,y,w,h,color) {
	this.componentType = "scrollbar";

	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.color = color || guiStyle.color || "#CCCCCC";

	this.active = false;
	this.value = 0.0;

	this.update = function(parent) {
		if(input.getMouse(1) &&
		   input.mouseX > this.x && 
		   input.mouseX < this.x+this.w &&
		   input.mouseY > this.y &&
		   input.mouseY < this.y+this.h) {
			this.active = true;	
			this.value = (input.mouseY - this.y)/this.h;
		} else {
			this.active = false;
		}
	};

	this.draw = function(parent) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.w, this.h);

		ctx.fillStyle = guiStyle.colorActive;
		ctx.fillRect(this.x, this.y+this.value*this.h-10, this.w, 20);
	};

	this.getValue = function() {
		return (this.value);
	};
}
