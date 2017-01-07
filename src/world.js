//file : world.js
//author : cdqwertz
//license : see LICENSE.txt

var world = new function() {
	this.scenes = [];
	this.loadedScene = null;
	
	this.addScene = function(s) {
		this.scenes.push(s);
	};
	
	this.loadScene = function(i) {
		this.loadedScene = i;
		this.scenes[i].start();
	};
	
	this.getScene = function() {
		return (this.scenes[this.loadedScene]);
	};
	
	this.update = function() {
		this.getScene().update();
	};
}();
