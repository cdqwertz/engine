//file : scene.js
//author : cdqwertz
//license : see LICENSE.txt

function scene(load) {
	this.actors = [];
	this.load = load || (function(parent) {parent.actors = [];});
	
	this.physicsManager = new physicsManager();

	this.addObject = function(obj) {
		this.actors.push(obj);
	};

	this.findObject = function(obj) {
		for(var i = 0; i < this.actors.length; i++) {
			if(this.actors[i] == obj) {
				return (i);
			}
		}
		return -1;
	};

	this.start = function() {
		this.load(this);
		for (var i in this.actors) {
			if (this.actors[i].start) {
				this.actors[i].start(this);
			}
		}
	};

	this.update = function() {
		//update
		for (var i in this.actors) {
			if (this.actors[i].update) {
				this.actors[i].update();
			}
		}

		//physics
		this.physicsManager.update();
		
		for (var i in this.actors) {
			if (this.actors[i].physics) {
				this.actors[i].physics();
			}
		}

		//render
		for (var i in this.actors) {
			if (this.actors[i].draw) {
				this.actors[i].draw();
			}
		}
	};
}
