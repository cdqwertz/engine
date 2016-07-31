//file : actor.js
//author : cdqwertz

function actor() {
	this.components = new Array();
	this.addComponent = function (comp) {
		this.components.push(comp);
	};
	this.start = function() {
		for (var i in this.components) {
			if (this.components[i].start) {
				this.components[i].start(this);
			}
		}
	};

	this.update = function() {
		for (var i in this.components) {
			if (this.components[i].update) {
				this.components[i].update(this);
			}
		}
		for (var i in this.components) {
			if (this.components[i].afterUpdate) {
				this.components[i].afterUpdate(this);
			}
		}
	};

	this.draw = function() {
		for (var i in this.components) {
			if (this.components[i].draw) {
				this.components[i].draw(this);
			}
		}
		for (var i in this.components) {
			if (this.components[i].afterDraw) {
				this.components[i].afterDraw(this);
			}
		}
	};

	this.physics = function() {
		for (var i in this.components) {
			if (this.components[i].physics) {
				this.components[i].physics(this);
			}
		}
	};
	
	this.findComponent = function(t) {
		for(var i = 0; i < this.components.length; i++) {
			if(this.components[i].componentType == t) {
				return i;
			}
		}
		return -1;
	};

	this.getComponent = function(t) {
		return this.components[this.findComponent(t)]
	};
}
