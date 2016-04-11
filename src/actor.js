function actor() {
	this.components = new Array();
	this.addComponent = function (comp) {
		this.components.push(comp);
	};
	this.update = function() {
		for (var i in this.components) {
			if (this.components[i].update) {
				this.components[i].update();
			}
		}
		for (var i in this.components) {
			if (this.components[i].afterUpdate) {
				this.components[i].afterUpdate();
			}
		}
	};
}
