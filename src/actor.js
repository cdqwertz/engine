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
	
	this.findComponent = function(t) {
		for(var i = 0; i < this.components.length; i++) {
			if(this.components[i].componentType == t) {
				return i;
			}
		}
		return -1;
	};
}
