//file : messages.js
//author : cdqwertz
//license : see LICENSE.txt


function message(_title, _body, _receiver) {
	this.title = _title;
	this.body = _body;
	this.receiver = _receiver;
}

var messages = new function() {
	this.messages = [];

	this.send = function(m) {
		this.messages.push(m);
	};

	this.getMessagesForObject = function(name) {
		var m = [];
		for(var i = 0; i < this.messages.length; i++) {
			if(this.messages[i].receiver == name || this.messages[i].receiver == "") {
				m.push(this.messages[i]);
			}
		}
		return m;
	};

	this.clear = function() {
		this.messages = [];
	};
}();
