
var dat = require("./dat.gui");

p5.prototype.createGUI = function(params) {
	var context = this._isGlobal ? window : this;
	context.gui = new dat.GUI(params);
	return context.gui;
}
