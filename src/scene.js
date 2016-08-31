//file : scene.js
//author : cdqwertz

function scene() {
	this.objs = new Array();
	
	this.physicsManager = new physicsManager();

	this.addObject = function(obj) {
		this.objs.push(obj);
	};

	this.findObject = function(obj) {
		for(var i = 0; i < this.objs.length; i++) {
			if(this.objs[i] == obj) {
				return (i);
			}
		}
		return -1;
	};

	this.start = function() {
		for (var i in this.objs) {
			if (this.objs[i].start) {
				this.objs[i].start(this);
			}
		}
	};
	this.update = function() {
		//update
		for (var i in this.objs) {
			if (this.objs[i].update) {
				this.objs[i].update();
			}
		}

		//physics
		this.physicsManager.update();
		
		for (var i in this.objs) {
			if (this.objs[i].physics) {
				this.objs[i].physics();
			}
		}

		//render
		for (var i in this.objs) {
			if (this.objs[i].draw) {
				this.objs[i].draw();
			}
		}
	};
}
