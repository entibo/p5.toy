
var GIF = require("./gif");

var properties = {
	gifWorkers: 2,
	gifQuality: 100,
	gifFps: 60,
	_gif: null,
	_gifRendering: false,
	_gifStartFrameCount: null,
	_getLastFrame: false,
	_gifStopCondition: null
};

for(var p in properties) {
	p5.prototype[p] = properties[p];
}

p5.prototype.startGif = function(stop) {
	var context = this._isGlobal ? window : this;
	context._gif = new GIF({
		workers: context.gifWorkers,
		quality: context.gifQuality
	});	
	context._gifStartFrameCount = context.frameCount;
	context._getLastFrame = false;
	context._gifStopCondition = stop || function() { return false };
	// context._gif.on("finished", function(blob) {
	// 	window.open(URL.createObjectURL(blob));
	// });
	window.dispatchEvent(new CustomEvent("gif", {detail: context._gif}));
	return context._gif;
}

p5.prototype.abortGif = function() {
	var context = this._isGlobal ? window : this;
	if(!context._gif) return;
	context._gif.abort();
	context._gif = null;
	context._gifRendering = false;
	window.dispatchEvent(new Event("noGif"));
}

p5.prototype.stopGif = function() {
	var context = this._isGlobal ? window : this;
	context._getLastFrame = true;
}

p5.prototype._stopGif = function() {
	var context = this._isGlobal ? window : this;
	context._gif.render();
	context._gif.on("finished", function() { 
		context._gifRendering = false; 
		context._gif = null;
		//window.dispatchEvent(new Event("noGif"));
	});
	context._gifRendering = true;
}

// Called after every draw() call
p5.prototype.registerMethod("post", function() {
	var context = this._isGlobal ? window : this;
	if(context._gif && !context._gifRendering && context.frameCount > context._gifStartFrameCount) {
		context._gif.addFrame(context._curElement.elt, {delay: 1000/context.gifFps, copy: true});
		if(context._gifStopCondition() === true || context._getLastFrame === true) {
			context._stopGif();
		}
	}
});

