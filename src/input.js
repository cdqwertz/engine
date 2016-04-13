pressedKeys = []
var input = {
	HandleKey : function(e) {
		e = e || window.event;
		pressedKeys[e.keyCode] = e.type == 'keydown';
	},
	getKey : function (keyCode) {
		return pressedKeys[keyCode];
	}
}

window.onkeydown = input.HandleKey;
window.onkeyup = input.HandleKey;
