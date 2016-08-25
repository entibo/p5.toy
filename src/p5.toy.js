
p5.prototype.toggleLoop = function() {
	var context = this._isGlobal ? window : this;
	if(this._loop) context.noLoop();
	else context.loop();
}

p5.prototype.isLooping = function() {
	return this._loop;
}

/**
 * Allows to bind a function to a p5 method.
 * @param 	{Function} 	name 	of a method attached to this p5 instance
 * @param 	{string} 	when 	the function should fire ("pre" or "post")
 * @param 	{Function} 	fn 		function to be called
 * @example
 * // Global mode
 * registerInstanceMethod("rect", "pre", function() {
 *     clear();
 * });
 * // The canvas will now be cleared before every rect() call
 */
p5.prototype.registerInstanceMethod = function(name, when, fn) {
	var context = this._isGlobal ? window : this;
	if(when === undefined || !(when == "pre" || when == "post")) {
		when = "post";
	}
	if(!context.hasOwnProperty("_registeredInstanceMethods")) {
		context._registeredInstanceMethods = {};
	}
	if(!context._registeredInstanceMethods.hasOwnProperty(name)) {
		context._registeredInstanceMethods[name] = {};
	}
	if(!context._registeredInstanceMethods[name].hasOwnProperty(when)) {
		context._registeredInstanceMethods[name][when] = [];
		var _method = context[name];
		if(when == "pre") {
			context[name] = function() {
				context._registeredInstanceMethods[name]["pre"].forEach(function(f) {
					if(typeof(f) === "function") {
						f.call(this);
					}
				}, this);
				return _method.apply(this, arguments);
			};
		}
		else {
			context[name] = function() {
				var r = _method.apply(this, arguments);
				context._registeredInstanceMethods[name]["post"].forEach(function(f) {
					if(typeof(f) === "function") {
						f.call(this);
					}
				}, this);
				return r;
			}
		}
	}
	context._registeredInstanceMethods[name][when].push(fn);
};

//
p5.prototype.createToy = function(parent) {
	var context = this._isGlobal ? window : this;

	if(parent && typeof parent === "string") {
		parent = document.querySelector(parent);
	}
	if(!parent) parent = context._curElement.parent();

	require("./toy.css");
	var h = require("html!./toy.html");
	var d = document.createElement("div");
	d.innerHTML = h;
	var root = d.childNodes[0];
	var cvs = root.querySelector(".p5toy-canvas"),
		menu = root.querySelector(".p5toy-menu");
	parent.appendChild(root);
	context._curElement.parent(cvs);

	var	buttons = root.querySelector(".p5toy-buttons"),
		playBtn = root.querySelector(".p5toy-play"),
		snapBtn = root.querySelector(".p5toy-snapshot"),
		pngBtn = root.querySelector(".p5toy-png"),
		recordBtn = root.querySelector(".p5toy-record"),
		recordProgress1 = root.querySelector(".p5toy-record-progress-1"),
		recordProgress2 = root.querySelector(".p5toy-record-progress-2"),
		gifBtn = root.querySelector(".p5toy-gif"),
		closeBtn = root.querySelector(".p5toy-close");

	var gui = context.createGUI({scrollable: false, autoPlace: false});
	menu.appendChild(gui.domElement);

	context._buttonSize = 60;

	var onResize = function() {
		if(this._setupDone) context.resizeCanvas(context.width, context.height);
		cvs.style.minHeight = cvs.style.minWidth = 4*context._buttonSize + "px";
		gui.domElement.style.maxWidth = 4*context._buttonSize + "px";
		gui.domElement.style.minHeight = 240 - buttons.offsetHeight + "px";
		gui.domElement.style.maxHeight = Math.max(4*context._buttonSize, context.height) - buttons.offsetHeight + "px";
	}.bind(this);
	onResize();

	// Spacebar pressed while toy is focused
	root.addEventListener("keydown", function(e) {
		if(!e.ctrlKey && e.which == 32) {
			context.toggleLoop();
			e.preventDefault();
			//e.stopPropagation();
		}
	});

	// Spacebar pressed (will toggle all instances)
	window.addEventListener("keydown", function(e) {
		if(e.ctrlKey && e.which == 32) {
			context.toggleLoop();
			e.preventDefault();
		}
	});	

	playBtn.addEventListener("click", function() {					// Play/Pause
		if(context.isLooping()) {
			context.pauseButton();
		}
		else {
			context.playButton();
		}
	});

	// Using those callbacks so that the buttons
	// stay in the correct state when loop/noLoop
	// are called without the buttons being clicked
	this.registerInstanceMethod("noLoop", "post", function() {
		playBtn.classList.add("paused");
	});

	this.registerInstanceMethod("loop", "post", function() {
		playBtn.classList.remove("paused");
	});

	snapBtn.addEventListener("click", function() {					// Snapshot
		context.snapshotButton();
		snapBtn.classList.add("download");
		var dataUri = context._curElement.elt.toDataURL("image/png");
		pngBtn.setAttribute("href", dataUri);
	});

	pngBtn.addEventListener("click", function(e) {
		snapBtn.classList.remove("download");
		e.stopPropagation();
	});

	recordBtn.addEventListener("click", function() {				// Record gif
		if(context._gif) {
			if(context._gifRendering) {
				context.abortGif();
			}
			else {
				context.stopRecordButton();
			}
		}
		else {
			context.recordButton();
		}
	});

	// Same reason as for the play/pause button
	this.registerInstanceMethod("abortGif", "post", function() {
		recordProgress1.style.width = 0;
		recordProgress1.style.marginTop = 0;
		recordProgress2.style.height = 0;
		recordBtn.classList.remove("recording");
		recordBtn.classList.remove("download");
	});

	this.registerInstanceMethod("startGif", "post", function() {
		recordBtn.classList.remove("download");
		recordBtn.classList.add("recording");
		context._gif.on("progress", function(p) {
			recordProgress1.style.width = ((p*5)%1)*100 + "%";
			recordProgress1.style.marginTop = Math.floor(p*5)*20 + "%";
			recordProgress2.style.height = Math.floor(p*5)*20 + "%";
		});
		context._gif.removeListener("finished", context._gifDefaultFinishedCallback);
		context._gif.on("finished", function(blob) {
			recordBtn.classList.add("download");
			recordProgress2.style.height = null;
			gifBtn.setAttribute("href", URL.createObjectURL(blob));
		});
	});

	gifBtn.addEventListener("click", function(e) {
		recordBtn.classList.remove("recording");
		recordBtn.classList.remove("download");
		e.stopPropagation();
	});

	closeBtn.addEventListener("click", function() {					// Collapse/Expand
		if(root.classList.contains("side")) {
			context.collapseButton();
		}
		else {
			context.expandButton();
		}
	});	

	// Adding new methods to the instance/window
	context.playButton = context.loop;
	context.pauseButton = context.noLoop;
	context.snapshotButton = function(){};
	context.recordButton = context.startGif;
	context.stopRecordButton = context.stopGif;
	context.expandToy = function() {
		root.classList.add("side");
		root.classList.remove("overlay");
	};
	context.collapseToy = function() {
		root.classList.add("overlay");
		root.classList.remove("side");
	};
	context.collapseButton = context.collapseToy;
	context.expandButton = context.expandToy;
	context.hideGUI = function() {
		root.classList.add("noGUI");
		onResize();
	};
	context.showGUI = function() {
		root.classList.remove("noGUI");
		onResize();
	};
	context.hideButtons = function() {
		root.classList.add("noButtons");
		onResize();
	};
	context.showButtons = function() {
		root.classList.remove("noButtons");
		onResize();
	};
	context.addDefaultParams = function() {
		var globalParams = gui.addFolder("Global settings");
		globalParams.add(context, "width").listen().onChange(onResize).min(0).step(5).name("Canvas width");
		globalParams.add(context, "height").listen().onChange(onResize).min(0).step(5).name("Canvas height");
		context.targetFPS = 60;
		globalParams.add(context, "targetFPS").listen().min(0).max(60).step(1).name("Target framerate").onChange(function() {
			context.frameRate(context.targetFPS);
		});

		var gifParams = gui.addFolder("Gif settings");
		gifParams.add(context, "gifFps").listen().min(0).max(60).step(1).name("Framerate");
		gifParams.add(context, "gifQuality").listen().min(0).max(1000).step(1).name("Quality (0=best)");
		gifParams.add(context, "gifWorkers").listen().min(1).max(5).step(1).name("Workers");
	};
	context.buttonSize = function(v) {
		if(v) {
			context._buttonSize = v;
			for(var b, i=0; i < buttons.children.length; i++) {
				b = buttons.children[i];
				b.style.width = b.style.height = v + "px";
			}
			onResize();
			return context;
		}
		else return context._buttonSize;
	};

	context.hideGUI();
	// Show the GUI as soon as something is added to it
	var methodNames = ["add", "addColor", "addFolder", "def", "defColor"];
	methodNames.forEach(function(name) {
		(function(m) {
			gui[name] = function() {
				if(gui.__controllers.length === 0) {
					context.showGUI();
				}
				return m.apply(gui, arguments);
			};
		})(gui[name]);
	});

	context.gui = gui;

};