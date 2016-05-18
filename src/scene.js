function scene() {
	this.objs = new Array();
	this.addObject = function(obj) {
		this.objs.push(obj);
	};
	this.start = function() {
		for (var i in this.objs) {
			if (this.objs[i].start) {
				this.objs[i].start();
			}
		}
	};
	this.update = function() {
		for (var i in this.objs) {
			if (this.objs[i].update) {
				this.objs[i].update();
			}
		}
	};
}
