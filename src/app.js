
require("./p5.easing");
require("./p5.gif");
require("./p5.gui");

p5.prototype.toggleLoop = function() {
	if(this._loop) this.noLoop();
	else this.loop();
}

p5.prototype.isLooping = function() {
	return this._loop;
}

var _noLoop = p5.prototype.noLoop;
p5.prototype.noLoop = function() { 
	window.dispatchEvent(new Event("noLoop"));
	_noLoop.call(this); 
};
var _loop = p5.prototype.loop;
p5.prototype.loop = function() { 
	window.dispatchEvent(new Event("loop"));
	_loop.call(this); 
};

p5.prototype.createToy = function(a) {

	var context = this._isGlobal ? window : this;
	if(a && !(typeof a == "object" && a.appendChild)) {
		a = document.querySelector(a);
	}
	if(!a) a = context._curElement.parent();

	context.playButton = context.loop;
	context.pauseButton = context.noLoop;
	context.recordButton = context.startGif;
	context.stopRecordButton = context.abortGif;

	require("style!css!./toy.css");
	var h = require("html!./toy.html");
	var d = document.createElement("div");
	d.innerHTML = h;
	a.appendChild(d.childNodes[0]);
	context._curElement.parent("p5toy-mainbox");

	var gui = context.createGUI({scrollable: true, autoPlace: false});
	gui.setParent("p5toy-sidebox");
	gui.remember();

	gui.setMinHeight(200);
	gui.setMaxHeight(context.height-80);

	var rC = function() {
		context.resizeCanvas(context.width, context.height);
		gui.setMaxHeight(context.height-80);
	};
	var globalParams = gui.addFolder("Global settings");
	globalParams.add(context, "width").listen().onChange(rC).min(0).step(5).name("Canvas width");
	globalParams.add(context, "height").listen().onChange(rC).min(0).step(5).name("Canvas height");
	context.targetFPS = 60;
	globalParams.add(context, "targetFPS").listen().min(0).max(60).step(1).name("Target framerate").onChange(function() {
		context.frameRate(context.targetFPS);
	});

	var params = gui.addFolder("Sketch settings");
	params.open();

	var gifParams = gui.addFolder("Gif settings");
	gifParams.add(context, "gifFps").listen().min(0).max(60).step(1).name("Framerate");
	gifParams.add(context, "gifQuality").listen().min(0).max(1000).step(1).name("Quality (0=best)");
	gifParams.add(context, "gifWorkers").listen().min(1).max(5).step(1).name("Workers");

	window.addEventListener("keydown", function(e) {
		if(e.ctrlKey && e.altKey) {
			context.noLoop();
		}
		if(e.which == 32) {
			context.toggleLoop();
		}
	});

	var playBtn = document.getElementById("p5toy-play");
	var recordBtn = document.getElementById("p5toy-record"),
		recordProgress1 = document.getElementsByClassName("p5toy-record-progress-1")[0],
		recordProgress2 = document.getElementsByClassName("p5toy-record-progress-2")[0],
		gifBlob = document.getElementById("p5toy-blob");
	var closeBtn = document.getElementById("p5toy-close");
	var openBtn = document.getElementById("p5toy-open");
	var sb = document.getElementById("p5toy-sidebox"),
		mb = document.getElementById("p5toy-mainbox");

	playBtn.addEventListener("click", function() {
		if(context.isLooping()) {
			context.pauseButton();
		}
		else {
			context.playButton();
		}
	});

	window.addEventListener("noLoop", function() {
		playBtn.classList.add("p5toy-paused");
	});

	window.addEventListener("loop", function() {
		playBtn.classList.remove("p5toy-paused");
	});

	recordBtn.addEventListener("click", function() {
		if(context._gif) {
			context.stopRecordButton();
		}
		else {
			context.recordButton();
		}
	});

	window.addEventListener("noGif", function() {
		recordProgress1.style.width = 0;
		recordProgress1.style.marginTop = 0;
		recordProgress2.style.height = 0;
		recordBtn.classList.remove("p5toy-recording");
		recordBtn.classList.remove("p5toy-download");
	});

	window.addEventListener("gif", function(e) {
		var gif = e.detail;
		recordBtn.classList.add("p5toy-recording");
		gif.on("progress", function(p) {
			recordProgress1.style.width = ((p/0.2)%1)*50 + "px";
			recordProgress1.style.marginTop = Math.floor(p/0.2)*10 + "px";
			recordProgress2.style.height = Math.floor(p/0.2)*10 + "px";
		});
		gif.on("finished", function(blob) {
			recordBtn.classList.add("p5toy-download");
			recordProgress2.style.height = null;
			gifBlob.setAttribute("href", URL.createObjectURL(blob));
		});
	});

	gifBlob.addEventListener("click", function(e) {
		recordBtn.classList.remove("p5toy-recording");
		recordBtn.classList.remove("p5toy-download");
		e.stopPropagation();
	});

	closeBtn.addEventListener("click", function() {
		sb.classList.add("p5toy-sbHidden");
		mb.classList.add("p5toy-sbHidden");
	});

	openBtn.addEventListener("click", function() {
		sb.classList.remove("p5toy-sbHidden");
		mb.classList.remove("p5toy-sbHidden");
	});		

	context.globalParams = globalParams;
	context.params = params;
	context.gifParams = gifParams;

};