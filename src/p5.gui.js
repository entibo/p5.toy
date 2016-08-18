
var dat = require("./dat.gui");

p5.prototype.createGUI = function(params) {
	return new dat.GUI(params);
}
