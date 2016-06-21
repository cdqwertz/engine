code_generator = new function() {
	this.genParams = function(l) {
		var s = "";
		for(var i = 1; i < l.length; i++){
			s += l[i] + ",";
		}
		s = s.substring(0, s.length-1);
		return s;
	}

	this.genCode = function() {
		var c = "function load() {\n";
		for(var i = 0; i < level_editor.scenes.length; i++){
			for(var j = 1; j < level_editor.scenes[i].length; j++){
				c += "\tvar " + level_editor.scenes[i][j][0] + " = new actor();\n" ;
				for(var k = 1; k < level_editor.scenes[i][j].length; k++){
					c += "\t" + level_editor.scenes[i][j][0] + ".addComponent(new " + level_editor.scenes[i][j][k][0] + "(" + this.genParams(level_editor.scenes[i][j][k]) + "));\n" ;
				}
				c += "\tmainScene.addObject(" + level_editor.scenes[i][j][0] + ");\n\n" ;
			}
		}
		c += "}";
		return c;
	}
}();
