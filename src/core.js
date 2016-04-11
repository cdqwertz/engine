var c = document.getElementById("screen");
var screen = c.getContext("2d");
var mainScene = new scene();

function onUpdate() {
	screen.clearRect(0, 0, c.width, c.height);
	mainScene.update();
}

function onInit() {
	c.width  = window.innerWidth;
	c.height = window.innerHeight;
	if(load) {
		load();
	}
	setInterval(onUpdate, 20);
}


