
var GIF = require("./gif");

p5.prototype.registerMethod("init", function() {
	this.gifWorkers = 2;
	this.gifQuality = 100;
	this.gifFps = 60;
	this._gif = null;
	this._gifRendering = false;
	this._gifStartFrameCount = null;
	this._getLastFrame = false;
	this._gifStopCondition = null;
	this._gifDefaultFinishedCallback = function(blob) {
		window.open(URL.createObjectURL(blob));
	};
});

p5.prototype.startGif = function(stop) {
	var context = this._isGlobal ? window : this;
	context._gif = new GIF({
		workers: context.gifWorkers,
		quality: context.gifQuality
	});	
	context._gifStartFrameCount = context.frameCount;
	context._getLastFrame = false;
	context._gifStopCondition = stop || function() { return false };
	context._gif.addListener("finished", context._gifDefaultFinishedCallback);
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

