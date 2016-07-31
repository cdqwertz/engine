//file : scene.js
//author : cdqwertz

function scene() {
	this.objs = new Array();
	
	this.physicsManager = new physicsManager();

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
