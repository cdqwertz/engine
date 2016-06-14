var c = document.getElementById("screen");
var ctx = c.getContext("2d");
var mainScene = new scene();
var physicsLayers = new physicsManager();

var screen = new function() {
	this.w = 0;
	this.h = 0;

	this.init = function(x) {
		this.w = document.body.clientWidth-20;
		this.h = document.body.clientHeight-20;
		x.width  = this.w;
		x.height = this.h;
	};
}();

var time = new function() {
	this.dtime = -1.0;
	this.lastTime = 0.0;

	this.update = function(x) {
		this.dtime = x-this.lastTime || 0.0;
		this.lastTime = x;
	};
}();

function onUpdate(t) {
	time.update(t || 0);
		
	ctx.clearRect(0, 0, c.width, c.height);
	mainScene.update();
	
	physicsLayers.update();
	window.requestAnimationFrame(onUpdate);
}

function onInit() {
	screen.init(c);
	if(load) {
		load();
	}
	mainScene.start();
	onUpdate();
}


