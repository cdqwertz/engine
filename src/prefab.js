//file : prefab.js
//author : cdqwertz
//license : see LICENSE.txt

function prefab(blueprint) {
	this.build = blueprint;

	this.setBlueprint = function(blueprint) {
		this.build = blueprint;
	};

	//TODO : add ability to build many prefabs at once
}
