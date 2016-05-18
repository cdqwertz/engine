var c = document.getElementById("screen");
var ctx = c.getContext("2d");
var mainScene = new scene();
var physicsLayers = new physicsManager();

function onUpdate() {
	ctx.clearRect(0, 0, c.width, c.height);
	mainScene.update();
	
	physicsLayers.update();
	window.requestAnimationFrame(onUpdate);
}

function onInit() {
	c.width  = window.innerWidth-30;
	c.height = window.innerHeight-30;
	if(load) {
		load();
	}
	mainScene.start();
	onUpdate();
}


