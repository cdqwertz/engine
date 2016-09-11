//file : core.js
//author : cdqwertz

var c = document.getElementById("screen");
var ctx = c.getContext("2d");
var mainScene = new scene();

var c2 = document.getElementById("canvas");
var ctx2 = c2.getContext("2d");

var screen = new function() {
	this.w = 0;
	this.h = 0;

	this.centerX = 0;
	this.centerY = 0;

	this.init = function(x,y) {
		this.w = document.body.clientWidth;
		this.h = document.body.clientHeight;

		this.centerX = this.w/2;
		this.centerY = this.h/2;

		x.width  = this.w;
		x.height = this.h;
		y.width  = this.w;
		y.height = this.h;
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
		
	ctx.clearRect(-c.width/2, -c.height/2, c.width, c.height);
	mainScene.update();

	ctx2.clearRect(0, 0, c.width, c.height);
	ctx2.drawImage(c,0,0);
	
	window.requestAnimationFrame(onUpdate);
}

function onInit() {
	screen.init(c, c2);
	ctx.translate(screen.centerX, screen.centerY);
	mainScene.start();
	onUpdate();
}


