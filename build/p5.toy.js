/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(4);

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

		__webpack_require__(6);
		var h = __webpack_require__(10);
		var d = document.createElement("div");
		d.innerHTML = h;
		a.appendChild(d.childNodes[0]);
		context._curElement.parent("p5toy-mainbox");

		var gui = context.createGUI({scrollable: true, autoPlace: false});
		gui.setParent("p5toy-sidebox");
		gui.remember();

		gui.setMinHeight(200);
		gui.setMaxHeight(context.height-60);

		var rC = function() {
			context.resizeCanvas(context.width, context.height);
			gui.setMaxHeight(context.height-60);
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
		var snapBtn = document.getElementById("p5toy-snapshot"),
			pngLink = document.getElementById("p5toy-png");
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

		snapBtn.addEventListener("click", function() {
			snapBtn.classList.add("p5toy-download");
			var dataUri = context._curElement.elt.toDataURL("image/png");
			pngLink.setAttribute("href", dataUri);
		});

		pngLink.addEventListener("click", function(e) {
			snapBtn.classList.remove("p5toy-download");
			e.stopPropagation();
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
				recordProgress1.style.width = ((p/0.2)%1)*37.2 + "px";
				recordProgress1.style.marginTop = Math.floor(p/0.2)*7.44 + "px";
				recordProgress2.style.height = Math.floor(p/0.2)*7.44 + "px";
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	Taken from https://github.com/DelvarWorld/easing-utils
	**/

	// No easing, no acceleration
	p5.prototype.linear = function( t ) {
	    return t;
	}

	// Slight acceleration from zero to full speed
	p5.prototype.easeInSine = function( t ) {
	    return -1 * Math.cos( t * ( Math.PI / 2 ) ) + 1;
	}

	// Slight deceleration at the end
	p5.prototype.easeOutSine = function( t ) {
	    return Math.sin( t * ( Math.PI / 2 ) );
	}

	// Slight acceleration at beginning and slight deceleration at end
	p5.prototype.easeInOutSine = function( t ) {
	    return -0.5 * ( Math.cos( Math.PI * t ) - 1 );
	}

	// Accelerating from zero velocity
	p5.prototype.easeInQuad = function( t ) {
	    return t * t;
	}

	// Decelerating to zero velocity
	p5.prototype.easeOutQuad = function( t ) {
	    return t * ( 2 - t );
	}

	// Acceleration until halfway, then deceleration
	p5.prototype.easeInOutQuad = function( t ) {
	    return t < 0.5 ? 2 * t * t : - 1 + ( 4 - 2 * t ) * t;
	}

	// Accelerating from zero velocity
	p5.prototype.easeInCubic = function( t ) {
	    return t * t * t;
	}

	// Decelerating to zero velocity
	p5.prototype.easeOutCubic = function( t ) {
	    var t1 = t - 1;
	    return t1 * t1 * t1 + 1;
	}

	// Acceleration until halfway, then deceleration
	p5.prototype.easeInOutCubic = function( t ) {
	    return t < 0.5 ? 4 * t * t * t : ( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
	}

	// Accelerating from zero velocity
	p5.prototype.easeInQuart = function( t ) {
	    return t * t * t * t;
	}

	// Decelerating to zero velocity
	p5.prototype.easeOutQuart = function( t ) {
	    var t1 = t - 1;
	    return 1 - t1 * t1 * t1 * t1;
	}

	// Acceleration until halfway, then deceleration
	p5.prototype.easeInOutQuart = function( t ) {
	    var t1 = t - 1;
	    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
	}

	// Accelerating from zero velocity
	p5.prototype.easeInQuint = function( t ) {
	    return t * t * t * t * t;
	}

	// Decelerating to zero velocity
	p5.prototype.easeOutQuint = function( t ) {
	    var t1 = t - 1;
	    return 1 + t1 * t1 * t1 * t1 * t1;
	}

	// Acceleration until halfway, then deceleration
	p5.prototype.easeInOutQuint = function( t ) {
	    var t1 = t - 1;
	    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
	}

	// Accelerate exponentially until finish
	p5.prototype.easeInExpo = function( t ) {

	    if( t === 0 ) {
	        return 0;
	    }

	    return Math.pow( 2, 10 * ( t - 1 ) );

	}

	// Initial exponential acceleration slowing to stop
	p5.prototype.easeOutExpo = function( t ) {

	    if( t === 1 ) {
	        return 1;
	    }

	    return ( -Math.pow( 2, -10 * t ) + 1 );

	}

	// Exponential acceleration and deceleration
	p5.prototype.easeInOutExpo = function( t ) {
	    
	    if( t === 0 || t === 1 ) {
	        return t;
	    }

	    var scaledTime = t * 2;
	    var scaledTime1 = scaledTime - 1;

	    if( scaledTime < 1 ) {
	        return 0.5 * Math.pow( 2, 10 * ( scaledTime1 ) );
	    }

	    return 0.5 * ( -Math.pow( 2, -10 * scaledTime1 ) + 2 );

	}

	// Increasing velocity until stop
	p5.prototype.easeInCirc = function( t ) {

	    var scaledTime = t / 1;
	    return -1 * ( Math.sqrt( 1 - scaledTime * t ) - 1 );

	}

	// Start fast, decreasing velocity until stop
	p5.prototype.easeOutCirc = function( t ) {

	    var t1 = t - 1;
	    return Math.sqrt( 1 - t1 * t1 );

	}

	// Fast increase in velocity, fast decrease in velocity
	p5.prototype.easeInOutCirc = function( t ) {

	    var scaledTime = t * 2;
	    var scaledTime1 = scaledTime - 2;

	    if( scaledTime < 1 ) {
	        return -0.5 * ( Math.sqrt( 1 - scaledTime * scaledTime ) - 1 );
	    }

	    return 0.5 * ( Math.sqrt( 1 - scaledTime1 * scaledTime1 ) + 1 );

	}

	// Slow movement backwards then fast snap to finish
	p5.prototype.easeInBack = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 1.70158;
	    var scaledTime = t / 1;
	    return scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime - magnitude );

	}

	// Fast snap to backwards point then slow resolve to finish
	p5.prototype.easeOutBack = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 1.70158;
	    var scaledTime = ( t / 1 ) - 1;
	    
	    return (
	        scaledTime * scaledTime * ( ( magnitude + 1 ) * scaledTime + magnitude )
	    ) + 1;

	}

	// Slow movement backwards, fast snap to past finish, slow resolve to finish
	p5.prototype.easeInOutBack = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 1.70158;
	    var scaledTime = t * 2;
	    var scaledTime2 = scaledTime - 2;

	    var s = magnitude * 1.525;

	    if( scaledTime < 1) {

	        return 0.5 * scaledTime * scaledTime * (
	            ( ( s + 1 ) * scaledTime ) - s
	        );

	    }

	    return 0.5 * (
	        scaledTime2 * scaledTime2 * ( ( s + 1 ) * scaledTime2 + s ) + 2
	    );

	}
	// Bounces slowly then quickly to finish
	p5.prototype.easeInElastic = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 0.7;
	    if( t === 0 || t === 1 ) {
	        return t;
	    }

	    var scaledTime = t / 1;
	    var scaledTime1 = scaledTime - 1;

	    var p = 1 - magnitude;
	    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

	    return -(
	        Math.pow( 2, 10 * scaledTime1 ) *
	        Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
	    );

	}

	// Fast acceleration, bounces to zero
	p5.prototype.easeOutElastic = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 0.7;
	    var p = 1 - magnitude;
	    var scaledTime = t * 2;

	    if( t === 0 || t === 1 ) {
	        return t;
	    }

	    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );
	    return (
	        Math.pow( 2, -10 * scaledTime ) *
	        Math.sin( ( scaledTime - s ) * ( 2 * Math.PI ) / p )
	    ) + 1;

	}

	// Slow start and end, two bounces sandwich a fast motion
	p5.prototype.easeInOutElastic = function( t, magnitude ) {

	    if(magnitude === undefined) magnitude = 0.65;
	    var p = 1 - magnitude;

	    if( t === 0 || t === 1 ) {
	        return t;
	    }

	    var scaledTime = t * 2;
	    var scaledTime1 = scaledTime - 1;
	    
	    var s = p / ( 2 * Math.PI ) * Math.asin( 1 );

	    if( scaledTime < 1 ) {
	        return -0.5 * (
	            Math.pow( 2, 10 * scaledTime1 ) *
	            Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p )
	        );
	    }

	    return (
	        Math.pow( 2, -10 * scaledTime1 ) *
	        Math.sin( ( scaledTime1 - s ) * ( 2 * Math.PI ) / p ) * 0.5
	    ) + 1;

	}

	// Bounce to completion
	p5.prototype.easeOutBounce = function( t ) {

	    var scaledTime = t / 1;

	    if( scaledTime < ( 1 / 2.75 ) ) {

	        return 7.5625 * scaledTime * scaledTime;

	    } else if( scaledTime < ( 2 / 2.75 ) ) {

	        var scaledTime2 = scaledTime - ( 1.5 / 2.75 );
	        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.75;

	    } else if( scaledTime < ( 2.5 / 2.75 ) ) {

	        var scaledTime2 = scaledTime - ( 2.25 / 2.75 );
	        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.9375;

	    } else {

	        var scaledTime2 = scaledTime - ( 2.625 / 2.75 );
	        return ( 7.5625 * scaledTime2 * scaledTime2 ) + 0.984375;

	    }

	}

	// Bounce increasing in velocity until completion
	p5.prototype.easeInBounce = function( t ) {
	    return 1 - this.easeOutBounce( 1 - t );
	}

	// Bounce in and bounce out
	p5.prototype.easeInOutBounce = function( t ) {

	    if( t < 0.5 ) {

	        return this.easeInBounce( t * 2 ) * 0.5;
	        
	    }

	    return ( this.easeOutBounce( ( t * 2 ) - 1 ) * 0.5 ) + 0.5;

	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	var GIF = __webpack_require__(3);

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



/***/ },
/* 3 */
/***/ function(module, exports) {

	var code = "(function(b){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c},a.define('/gif.worker.coffee',function(d,e,f,g){var b,c;b=a('/GIFEncoder.js',d),c=function(a){var c,e,d,f;return c=new b(a.width,a.height),a.index===0?c.writeHeader():c.firstFrame=!1,c.setTransparent(a.transparent),c.setRepeat(a.repeat),c.setDelay(a.delay),c.setQuality(a.quality),c.addFrame(a.data),a.last&&c.finish(),d=c.stream(),a.data=d.pages,a.cursor=d.cursor,a.pageSize=d.constructor.pageSize,a.canTransfer?(f=function(c){for(var b=0,d=a.data.length;b<d;++b)e=a.data[b],c.push(e.buffer);return c}.call(this,[]),self.postMessage(a,f)):self.postMessage(a)},self.onmessage=function(a){return c(a.data)}}),a.define('/GIFEncoder.js',function(e,h,i,j){function c(){this.page=-1,this.pages=[],this.newPage()}function b(a,b){this.width=~~a,this.height=~~b,this.transparent=null,this.transIndex=0,this.repeat=-1,this.delay=0,this.image=null,this.pixels=null,this.indexedPixels=null,this.colorDepth=null,this.colorTab=null,this.usedEntry=new Array,this.palSize=7,this.dispose=-1,this.firstFrame=!0,this.sample=10,this.out=new c}var f=a('/TypedNeuQuant.js',e),g=a('/LZWEncoder.js',e);c.pageSize=4096,c.charMap={};for(var d=0;d<256;d++)c.charMap[d]=String.fromCharCode(d);c.prototype.newPage=function(){this.pages[++this.page]=new Uint8Array(c.pageSize),this.cursor=0},c.prototype.getData=function(){var d='';for(var a=0;a<this.pages.length;a++)for(var b=0;b<c.pageSize;b++)d+=c.charMap[this.pages[a][b]];return d},c.prototype.writeByte=function(a){this.cursor>=c.pageSize&&this.newPage(),this.pages[this.page][this.cursor++]=a},c.prototype.writeUTFBytes=function(b){for(var c=b.length,a=0;a<c;a++)this.writeByte(b.charCodeAt(a))},c.prototype.writeBytes=function(b,d,e){for(var c=e||b.length,a=d||0;a<c;a++)this.writeByte(b[a])},b.prototype.setDelay=function(a){this.delay=Math.round(a/10)},b.prototype.setFrameRate=function(a){this.delay=Math.round(100/a)},b.prototype.setDispose=function(a){a>=0&&(this.dispose=a)},b.prototype.setRepeat=function(a){this.repeat=a},b.prototype.setTransparent=function(a){this.transparent=a},b.prototype.addFrame=function(a){this.image=a,this.getImagePixels(),this.analyzePixels(),this.firstFrame&&(this.writeLSD(),this.writePalette(),this.repeat>=0&&this.writeNetscapeExt()),this.writeGraphicCtrlExt(),this.writeImageDesc(),this.firstFrame||this.writePalette(),this.writePixels(),this.firstFrame=!1},b.prototype.finish=function(){this.out.writeByte(59)},b.prototype.setQuality=function(a){a<1&&(a=1),this.sample=a},b.prototype.writeHeader=function(){this.out.writeUTFBytes('GIF89a')},b.prototype.analyzePixels=function(){var g=this.pixels.length,d=g/3;this.indexedPixels=new Uint8Array(d);var a=new f(this.pixels,this.sample);a.buildColormap(),this.colorTab=a.getColormap();var b=0;for(var c=0;c<d;c++){var e=a.lookupRGB(this.pixels[b++]&255,this.pixels[b++]&255,this.pixels[b++]&255);this.usedEntry[e]=!0,this.indexedPixels[c]=e}this.pixels=null,this.colorDepth=8,this.palSize=7,this.transparent!==null&&(this.transIndex=this.findClosest(this.transparent))},b.prototype.findClosest=function(e){if(this.colorTab===null)return-1;var k=(e&16711680)>>16,l=(e&65280)>>8,m=e&255,c=0,d=16777216,j=this.colorTab.length;for(var a=0;a<j;){var f=k-(this.colorTab[a++]&255),g=l-(this.colorTab[a++]&255),h=m-(this.colorTab[a]&255),i=f*f+g*g+h*h,b=parseInt(a/3);this.usedEntry[b]&&i<d&&(d=i,c=b),a++}return c},b.prototype.getImagePixels=function(){var a=this.width,g=this.height;this.pixels=new Uint8Array(a*g*3);var b=this.image,c=0;for(var d=0;d<g;d++)for(var e=0;e<a;e++){var f=d*a*4+e*4;this.pixels[c++]=b[f],this.pixels[c++]=b[f+1],this.pixels[c++]=b[f+2]}},b.prototype.writeGraphicCtrlExt=function(){this.out.writeByte(33),this.out.writeByte(249),this.out.writeByte(4);var b,a;this.transparent===null?(b=0,a=0):(b=1,a=2),this.dispose>=0&&(a=dispose&7),a<<=2,this.out.writeByte(0|a|0|b),this.writeShort(this.delay),this.out.writeByte(this.transIndex),this.out.writeByte(0)},b.prototype.writeImageDesc=function(){this.out.writeByte(44),this.writeShort(0),this.writeShort(0),this.writeShort(this.width),this.writeShort(this.height),this.firstFrame?this.out.writeByte(0):this.out.writeByte(128|this.palSize)},b.prototype.writeLSD=function(){this.writeShort(this.width),this.writeShort(this.height),this.out.writeByte(240|this.palSize),this.out.writeByte(0),this.out.writeByte(0)},b.prototype.writeNetscapeExt=function(){this.out.writeByte(33),this.out.writeByte(255),this.out.writeByte(11),this.out.writeUTFBytes('NETSCAPE2.0'),this.out.writeByte(3),this.out.writeByte(1),this.writeShort(this.repeat),this.out.writeByte(0)},b.prototype.writePalette=function(){this.out.writeBytes(this.colorTab);var b=768-this.colorTab.length;for(var a=0;a<b;a++)this.out.writeByte(0)},b.prototype.writeShort=function(a){this.out.writeByte(a&255),this.out.writeByte(a>>8&255)},b.prototype.writePixels=function(){var a=new g(this.width,this.height,this.indexedPixels,this.colorDepth);a.encode(this.out)},b.prototype.stream=function(){return this.out},e.exports=b}),a.define('/LZWEncoder.js',function(e,g,h,i){function f(y,D,C,B){function w(a,b){r[f++]=a,f>=254&&t(b)}function x(b){u(a),k=i+2,j=!0,l(i,b)}function u(b){for(var a=0;a<b;++a)h[a]=-1}function A(z,r){var g,t,d,e,y,w,s;for(q=z,j=!1,n_bits=q,m=p(n_bits),i=1<<z-1,o=i+1,k=i+2,f=0,e=v(),s=0,g=a;g<65536;g*=2)++s;s=8-s,w=a,u(w),l(i,r);a:while((t=v())!=c){if(g=(t<<b)+e,d=t<<s^e,h[d]===g){e=n[d];continue}if(h[d]>=0){y=w-d,d===0&&(y=1);do if((d-=y)<0&&(d+=w),h[d]===g){e=n[d];continue a}while(h[d]>=0)}l(e,r),e=t,k<1<<b?(n[d]=k++,h[d]=g):x(r)}l(e,r),l(o,r)}function z(a){a.writeByte(s),remaining=y*D,curPixel=0,A(s+1,a),a.writeByte(0)}function t(a){f>0&&(a.writeByte(f),a.writeBytes(r,0,f),f=0)}function p(a){return(1<<a)-1}function v(){if(remaining===0)return c;--remaining;var a=C[curPixel++];return a&255}function l(a,c){g&=d[e],e>0?g|=a<<e:g=a,e+=n_bits;while(e>=8)w(g&255,c),g>>=8,e-=8;if((k>m||j)&&(j?(m=p(n_bits=q),j=!1):(++n_bits,n_bits==b?m=1<<b:m=p(n_bits))),a==o){while(e>0)w(g&255,c),g>>=8,e-=8;t(c)}}var s=Math.max(2,B),r=new Uint8Array(256),h=new Int32Array(a),n=new Int32Array(a),g,e=0,f,k=0,m,j=!1,q,i,o;this.encode=z}var c=-1,b=12,a=5003,d=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535];e.exports=f}),a.define('/TypedNeuQuant.js',function(A,F,E,D){function C(A,B){function I(){o=[],q=new Int32Array(256),t=new Int32Array(a),y=new Int32Array(a),z=new Int32Array(a>>3);var c,d;for(c=0;c<a;c++)d=(c<<b+8)/a,o[c]=new Float64Array([d,d,d,0]),y[c]=e/a,t[c]=0}function J(){for(var c=0;c<a;c++)o[c][0]>>=b,o[c][1]>>=b,o[c][2]>>=b,o[c][3]=c}function K(b,a,c,e,f){o[a][0]-=b*(o[a][0]-c)/d,o[a][1]-=b*(o[a][1]-e)/d,o[a][2]-=b*(o[a][2]-f)/d}function L(j,e,n,l,k){var h=Math.abs(e-j),i=Math.min(e+j,a),g=e+1,f=e-1,m=1,b,d;while(g<i||f>h)d=z[m++],g<i&&(b=o[g++],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c),f>h&&(b=o[f--],b[0]-=d*(b[0]-n)/c,b[1]-=d*(b[1]-l)/c,b[2]-=d*(b[2]-k)/c)}function C(p,s,q){var h=2147483647,k=h,d=-1,m=d,c,j,e,n,l;for(c=0;c<a;c++)j=o[c],e=Math.abs(j[0]-p)+Math.abs(j[1]-s)+Math.abs(j[2]-q),e<h&&(h=e,d=c),n=e-(t[c]>>i-b),n<k&&(k=n,m=c),l=y[c]>>g,y[c]-=l,t[c]+=l<<f;return y[d]+=x,t[d]-=r,m}function D(){var d,b,e,c,h,g,f=0,i=0;for(d=0;d<a;d++){for(e=o[d],h=d,g=e[1],b=d+1;b<a;b++)c=o[b],c[1]<g&&(h=b,g=c[1]);if(c=o[h],d!=h&&(b=c[0],c[0]=e[0],e[0]=b,b=c[1],c[1]=e[1],e[1]=b,b=c[2],c[2]=e[2],e[2]=b,b=c[3],c[3]=e[3],e[3]=b),g!=f){for(q[f]=i+d>>1,b=f+1;b<g;b++)q[b]=d;f=g,i=d}}for(q[f]=i+n>>1,b=f+1;b<256;b++)q[b]=n}function E(j,i,k){var b,d,c,e=1e3,h=-1,f=q[i],g=f-1;while(f<a||g>=0)f<a&&(d=o[f],c=d[1]-i,c>=e?f=a:(f++,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3])))),g>=0&&(d=o[g],c=i-d[1],c>=e?g=-1:(g--,c<0&&(c=-c),b=d[0]-j,b<0&&(b=-b),c+=b,c<e&&(b=d[2]-k,b<0&&(b=-b),c+=b,c<e&&(e=c,h=d[3]))));return h}function F(){var c,f=A.length,D=30+(B-1)/3,y=f/(3*B),q=~~(y/w),n=d,o=u,a=o>>h;for(a<=1&&(a=0),c=0;c<a;c++)z[c]=n*((a*a-c*c)*m/(a*a));var i;f<s?(B=1,i=3):f%l!==0?i=3*l:f%k!==0?i=3*k:f%p!==0?i=3*p:i=3*j;var r,t,x,e,g=0;c=0;while(c<y)if(r=(A[g]&255)<<b,t=(A[g+1]&255)<<b,x=(A[g+2]&255)<<b,e=C(r,t,x),K(n,e,r,t,x),a!==0&&L(a,e,r,t,x),g+=i,g>=f&&(g-=f),c++,q===0&&(q=1),c%q===0)for(n-=n/D,o-=o/v,a=o>>h,a<=1&&(a=0),e=0;e<a;e++)z[e]=n*((a*a-e*e)*m/(a*a))}function G(){I(),F(),J(),D()}function H(){var b=[],g=[];for(var c=0;c<a;c++)g[o[c][3]]=c;var d=0;for(var e=0;e<a;e++){var f=g[e];b[d++]=o[f][0],b[d++]=o[f][1],b[d++]=o[f][2]}return b}var o,q,t,y,z;this.buildColormap=G,this.getColormap=H,this.lookupRGB=E}var w=100,a=256,n=a-1,b=4,i=16,e=1<<i,f=10,B=1<<f,g=10,x=e>>g,r=e<<f-g,z=a>>3,h=6,t=1<<h,u=z*t,v=30,o=10,d=1<<o,q=8,m=1<<q,y=o+q,c=1<<y,l=499,k=491,p=487,j=503,s=3*j;A.exports=C}),a('/gif.worker.coffee')}.call(this,this))";

	window.URL = window.URL || window.webkitURL;

	var blob;
	try {
	    blob = new Blob([code], {type: 'application/javascript'});
	} catch (e) { // Backwards-compatibility
	    window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
	    blob = new BlobBuilder();
	    blob.append(code);
	    blob = blob.getBlob();
	}

	var workerUrl = URL.createObjectURL(blob);

	(function(c){function a(b,d){if({}.hasOwnProperty.call(a.cache,b))return a.cache[b];var e=a.resolve(b);if(!e)throw new Error('Failed to resolve module '+b);var c={id:b,require:a,filename:b,exports:{},loaded:!1,parent:d,children:[]};d&&d.children.push(c);var f=b.slice(0,b.lastIndexOf('/')+1);return a.cache[b]=c.exports,e.call(c.exports,c,c.exports,f,b),c.loaded=!0,a.cache[b]=c.exports}a.modules={},a.cache={},a.resolve=function(b){return{}.hasOwnProperty.call(a.modules,b)?a.modules[b]:void 0},a.define=function(b,c){a.modules[b]=c};var b=function(a){return a='/',{title:'browser',version:'v0.10.26',browser:!0,env:{},argv:[],nextTick:c.setImmediate||function(a){setTimeout(a,0)},cwd:function(){return a},chdir:function(b){a=b}}}();a.define('/gif.coffee',function(d,m,l,k){function g(a,b){return{}.hasOwnProperty.call(a,b)}function j(d,b){for(var a=0,c=b.length;a<c;++a)if(a in b&&b[a]===d)return!0;return!1}function i(a,b){function d(){this.constructor=a}for(var c in b)g(b,c)&&(a[c]=b[c]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a}var h,c,f,b,e;f=a('events',d).EventEmitter,h=a('/browser.coffee',d),e=function(d){function a(d){var a,b;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(d);for(a in c)b=c[a],null!=this.options[a]?this.options[a]:this.options[a]=b}return i(a,d),c={workerScript:'gif.worker.js',workers:2,repeat:0,background:'#fff',quality:10,width:null,height:null,transparent:null},b={delay:500,copy:!1},a.prototype.setOption=function(a,b){return this.options[a]=b,null!=this._canvas&&(a==='width'||a==='height')?this._canvas[a]=b:void 0},a.prototype.setOptions=function(b){var a,c;return function(d){for(a in b){if(!g(b,a))continue;c=b[a],d.push(this.setOption(a,c))}return d}.call(this,[])},a.prototype.addFrame=function(a,d){var c,e;null==d&&(d={}),c={},c.transparent=this.options.transparent;for(e in b)c[e]=d[e]||b[e];if(null!=this.options.width||this.setOption('width',a.width),null!=this.options.height||this.setOption('height',a.height),'undefined'!==typeof ImageData&&null!=ImageData&&a instanceof ImageData)c.data=a.data;else if('undefined'!==typeof CanvasRenderingContext2D&&null!=CanvasRenderingContext2D&&a instanceof CanvasRenderingContext2D||'undefined'!==typeof WebGLRenderingContext&&null!=WebGLRenderingContext&&a instanceof WebGLRenderingContext)d.copy?c.data=this.getContextData(a):c.context=a;else if(null!=a.childNodes)d.copy?c.data=this.getImageData(a):c.image=a;else throw new Error('Invalid image');return this.frames.push(c)},a.prototype.render=function(){var d,a;if(this.running)throw new Error('Already running');if(!(null!=this.options.width&&null!=this.options.height))throw new Error('Width and height must be set prior to rendering');this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(c){for(var b=function(){var b;b=[];for(var a=0;0<=this.frames.length?a<this.frames.length:a>this.frames.length;0<=this.frames.length?++a:--a)b.push(a);return b}.apply(this,arguments),a=0,e=b.length;a<e;++a)d=b[a],c.push(null);return c}.call(this,[]),a=this.spawnWorkers();for(var c=function(){var c;c=[];for(var b=0;0<=a?b<a:b>a;0<=a?++b:--b)c.push(b);return c}.apply(this,arguments),b=0,e=c.length;b<e;++b)d=c[b],this.renderNextFrame();return this.emit('start'),this.emit('progress',0)},a.prototype.abort=function(){var a;while(!0){if(a=this.activeWorkers.shift(),!(null!=a))break;console.log('killing active worker'),a.terminate()}return this.running=!1,this.emit('abort')},a.prototype.spawnWorkers=function(){var a;return a=Math.min(this.options.workers,this.frames.length),function(){var c;c=[];for(var b=this.freeWorkers.length;this.freeWorkers.length<=a?b<a:b>a;this.freeWorkers.length<=a?++b:--b)c.push(b);return c}.apply(this,arguments).forEach(function(a){return function(c){var b;return console.log('spawning worker '+c),b=new Worker(workerUrl),b.onmessage=function(a){return function(c){return a.activeWorkers.splice(a.activeWorkers.indexOf(b),1),a.freeWorkers.push(b),a.frameFinished(c.data)}}(a),a.freeWorkers.push(b)}}(this)),a},a.prototype.frameFinished=function(a){return console.log('frame '+a.index+' finished - '+this.activeWorkers.length+' active'),this.finishedFrames++,this.emit('progress',this.finishedFrames/this.frames.length),this.imageParts[a.index]=a,j(null,this.imageParts)?this.renderNextFrame():this.finishRendering()},a.prototype.finishRendering=function(){var e,a,k,m,b,d,h;b=0;for(var f=0,j=this.imageParts.length;f<j;++f)a=this.imageParts[f],b+=(a.data.length-1)*a.pageSize+a.cursor;b+=a.pageSize-a.cursor,console.log('rendering finished - filesize '+Math.round(b/1e3)+'kb'),e=new Uint8Array(b),d=0;for(var g=0,l=this.imageParts.length;g<l;++g){a=this.imageParts[g];for(var c=0,i=a.data.length;c<i;++c)h=a.data[c],k=c,e.set(h,d),k===a.data.length-1?d+=a.cursor:d+=a.pageSize}return m=new Blob([e],{type:'image/gif'}),this.emit('finished',m,e)},a.prototype.renderNextFrame=function(){var c,a,b;if(this.freeWorkers.length===0)throw new Error('No free workers');return this.nextFrame>=this.frames.length?void 0:(c=this.frames[this.nextFrame++],b=this.freeWorkers.shift(),a=this.getTask(c),console.log('starting frame '+(a.index+1)+' of '+this.frames.length),this.activeWorkers.push(b),b.postMessage(a))},a.prototype.getContextData=function(a){return a.getImageData(0,0,this.options.width,this.options.height).data},a.prototype.getImageData=function(b){var a;return null!=this._canvas||(this._canvas=document.createElement('canvas'),this._canvas.width=this.options.width,this._canvas.height=this.options.height),a=this._canvas.getContext('2d'),a.setFill=this.options.background,a.fillRect(0,0,this.options.width,this.options.height),a.drawImage(b,0,0),this.getContextData(a)},a.prototype.getTask=function(a){var c,b;if(c=this.frames.indexOf(a),b={index:c,last:c===this.frames.length-1,delay:a.delay,transparent:a.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,repeat:this.options.repeat,canTransfer:h.name==='chrome'},null!=a.data)b.data=a.data;else if(null!=a.context)b.data=this.getContextData(a.context);else if(null!=a.image)b.data=this.getImageData(a.image);else throw new Error('Invalid frame');return b},a}(f),d.exports=e}),a.define('/browser.coffee',function(f,g,h,i){var a,d,e,c,b;c=navigator.userAgent.toLowerCase(),e=navigator.platform.toLowerCase(),b=c.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,'unknown',0],d=b[1]==='ie'&&document.documentMode,a={name:b[1]==='version'?b[3]:b[1],version:d||parseFloat(b[1]==='opera'&&b[4]?b[4]:b[2]),platform:{name:c.match(/ip(?:ad|od|hone)/)?'ios':(c.match(/(?:webos|android)/)||e.match(/mac|win|linux/)||['other'])[0]}},a[a.name]=!0,a[a.name+parseInt(a.version,10)]=!0,a.platform[a.platform.name]=!0,f.exports=a}),a.define('events',function(f,e,g,h){b.EventEmitter||(b.EventEmitter=function(){});var a=e.EventEmitter=b.EventEmitter,c=typeof Array.isArray==='function'?Array.isArray:function(a){return Object.prototype.toString.call(a)==='[object Array]'},d=10;a.prototype.setMaxListeners=function(a){this._events||(this._events={}),this._events.maxListeners=a},a.prototype.emit=function(f){if(f==='error'&&(!(this._events&&this._events.error)||c(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var a=this._events[f];if(!a)return!1;if(!(typeof a=='function'))if(c(a)){var b=Array.prototype.slice.call(arguments,1),e=a.slice();for(var d=0,g=e.length;d<g;d++)e[d].apply(this,b);return!0}else return!1;switch(arguments.length){case 1:a.call(this);break;case 2:a.call(this,arguments[1]);break;case 3:a.call(this,arguments[1],arguments[2]);break;default:var b=Array.prototype.slice.call(arguments,1);a.apply(this,b)}return!0},a.prototype.addListener=function(a,b){if('function'!==typeof b)throw new Error('addListener only takes instances of Function');if(this._events||(this._events={}),this.emit('newListener',a,b),!this._events[a])this._events[a]=b;else if(c(this._events[a])){if(!this._events[a].warned){var e;this._events.maxListeners!==undefined?e=this._events.maxListeners:e=d,e&&e>0&&this._events[a].length>e&&(this._events[a].warned=!0,console.error('(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.',this._events[a].length),console.trace())}this._events[a].push(b)}else this._events[a]=[this._events[a],b];return this},a.prototype.on=a.prototype.addListener,a.prototype.once=function(b,c){var a=this;return a.on(b,function d(){a.removeListener(b,d),c.apply(this,arguments)}),this},a.prototype.removeListener=function(a,d){if('function'!==typeof d)throw new Error('removeListener only takes instances of Function');if(!(this._events&&this._events[a]))return this;var b=this._events[a];if(c(b)){var e=b.indexOf(d);if(e<0)return this;b.splice(e,1),b.length==0&&delete this._events[a]}else this._events[a]===d&&delete this._events[a];return this},a.prototype.removeAllListeners=function(a){return a&&this._events&&this._events[a]&&(this._events[a]=null),this},a.prototype.listeners=function(a){return this._events||(this._events={}),this._events[a]||(this._events[a]=[]),c(this._events[a])||(this._events[a]=[this._events[a]]),this._events[a]}}),c.GIF=a('/gif.coffee'),module.exports=c.GIF}.call(this,this))
	// gif.js 0.1.6 - https://github.com/jnordberg/gif.js


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	var dat = __webpack_require__(5);

	p5.prototype.createGUI = function(params) {
		return new dat.GUI(params);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * dat-gui JavaScript Controller Library
	 * http://code.google.com/p/dat-gui
	 *
	 * Copyright 2011 Data Arts Team, Google Creative Lab
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 */

	/** @namespace */
	var dat = dat || {};

	/** @namespace */
	dat.gui = dat.gui || {};

	/** @namespace */
	dat.utils = dat.utils || {};

	/** @namespace */
	dat.controllers = dat.controllers || {};

	/** @namespace */
	dat.dom = dat.dom || {};

	/** @namespace */
	dat.color = dat.color || {};

	dat.utils.css = (function () {
	  return {
	    load: function (url, doc) {
	      doc = doc || document;
	      var link = doc.createElement('link');
	      link.type = 'text/css';
	      link.rel = 'stylesheet';
	      link.href = url;
	      doc.getElementsByTagName('head')[0].appendChild(link);
	    },
	    inject: function(css, doc) {
	      doc = doc || document;
	      var injected = document.createElement('style');
	      injected.type = 'text/css';
	      injected.innerHTML = css;
	      doc.getElementsByTagName('head')[0].appendChild(injected);
	    }
	  }
	})();


	dat.utils.common = (function () {
	  
	  var ARR_EACH = Array.prototype.forEach;
	  var ARR_SLICE = Array.prototype.slice;

	  /**
	   * Band-aid methods for things that should be a lot easier in JavaScript.
	   * Implementation and structure inspired by underscore.js
	   * http://documentcloud.github.com/underscore/
	   */

	  return { 
	    
	    BREAK: {},
	  
	    extend: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (!this.isUndefined(obj[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	      
	    },
	    
	    defaults: function(target) {
	      
	      this.each(ARR_SLICE.call(arguments, 1), function(obj) {
	        
	        for (var key in obj)
	          if (this.isUndefined(target[key])) 
	            target[key] = obj[key];
	        
	      }, this);
	      
	      return target;
	    
	    },
	    
	    compose: function() {
	      var toCall = ARR_SLICE.call(arguments);
	            return function() {
	              var args = ARR_SLICE.call(arguments);
	              for (var i = toCall.length -1; i >= 0; i--) {
	                args = [toCall[i].apply(this, args)];
	              }
	              return args[0];
	            }
	    },
	    
	    each: function(obj, itr, scope) {

	      if (!obj) return;

	      if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) { 
	        
	        obj.forEach(itr, scope);
	        
	      } else if (obj.length === obj.length + 0) { // Is number but not NaN
	        
	        for (var key = 0, l = obj.length; key < l; key++)
	          if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) 
	            return;
	            
	      } else {

	        for (var key in obj) 
	          if (itr.call(scope, obj[key], key) === this.BREAK)
	            return;
	            
	      }
	            
	    },
	    
	    defer: function(fnc) {
	      setTimeout(fnc, 0);
	    },
	    
	    toArray: function(obj) {
	      if (obj.toArray) return obj.toArray();
	      return ARR_SLICE.call(obj);
	    },

	    isUndefined: function(obj) {
	      return obj === undefined;
	    },
	    
	    isNull: function(obj) {
	      return obj === null;
	    },
	    
	    isNaN: function(obj) {
	      return obj !== obj;
	    },
	    
	    isArray: Array.isArray || function(obj) {
	      return obj.constructor === Array;
	    },
	    
	    isObject: function(obj) {
	      return obj === Object(obj);
	    },
	    
	    isNumber: function(obj) {
	      return obj === obj+0;
	    },
	    
	    isString: function(obj) {
	      return obj === obj+'';
	    },
	    
	    isBoolean: function(obj) {
	      return obj === false || obj === true;
	    },
	    
	    isFunction: function(obj) {
	      return Object.prototype.toString.call(obj) === '[object Function]';
	    }
	  
	  };
	    
	})();


	dat.controllers.Controller = (function (common) {

	  /**
	   * @class An "abstract" class that represents a given property of an object.
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var Controller = function(object, property) {

	    this.initialValue = object[property];

	    /**
	     * Those who extend this class will put their DOM elements in here.
	     * @type {DOMElement}
	     */
	    this.domElement = document.createElement('div');

	    /**
	     * The object to manipulate
	     * @type {Object}
	     */
	    this.object = object;

	    /**
	     * The name of the property to manipulate
	     * @type {String}
	     */
	    this.property = property;

	    /**
	     * The function to be called on change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onChange = undefined;

	    /**
	     * The function to be called on finishing change.
	     * @type {Function}
	     * @ignore
	     */
	    this.__onFinishChange = undefined;

	  };

	  common.extend(

	      Controller.prototype,

	      /** @lends dat.controllers.Controller.prototype */
	      {

	        /**
	         * Specify that a function fire every time someone changes the value with
	         * this Controller.
	         *
	         * @param {Function} fnc This function will be called whenever the value
	         * is modified via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onChange: function(fnc) {
	          this.__onChange = fnc;
	          return this;
	        },

	        /**
	         * Specify that a function fire every time someone "finishes" changing
	         * the value wih this Controller. Useful for values that change
	         * incrementally like numbers or strings.
	         *
	         * @param {Function} fnc This function will be called whenever
	         * someone "finishes" changing the value via this Controller.
	         * @returns {dat.controllers.Controller} this
	         */
	        onFinishChange: function(fnc) {
	          this.__onFinishChange = fnc;
	          return this;
	        },

	        /**
	         * Change the value of <code>object[property]</code>
	         *
	         * @param {Object} newValue The new value of <code>object[property]</code>
	         */
	        setValue: function(newValue) {
	          this.object[this.property] = newValue;
	          if (this.__onChange) {
	            this.__onChange.call(this, newValue);
	          }
	          this.updateDisplay();
	          return this;
	        },

	        /**
	         * Gets the value of <code>object[property]</code>
	         *
	         * @returns {Object} The current value of <code>object[property]</code>
	         */
	        getValue: function() {
	          return this.object[this.property];
	        },

	        /**
	         * Refreshes the visual display of a Controller in order to keep sync
	         * with the object's current value.
	         * @returns {dat.controllers.Controller} this
	         */
	        updateDisplay: function() {
	          return this;
	        },

	        /**
	         * @returns {Boolean} true if the value has deviated from initialValue
	         */
	        isModified: function() {
	          return this.initialValue !== this.getValue()
	        }

	      }

	  );

	  return Controller;


	})(dat.utils.common);


	dat.dom.dom = (function (common) {

	  var EVENT_MAP = {
	    'HTMLEvents': ['change'],
	    'MouseEvents': ['click','mousemove','mousedown','mouseup', 'mouseover'],
	    'KeyboardEvents': ['keydown']
	  };

	  var EVENT_MAP_INV = {};
	  common.each(EVENT_MAP, function(v, k) {
	    common.each(v, function(e) {
	      EVENT_MAP_INV[e] = k;
	    });
	  });

	  var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

	  function cssValueToPixels(val) {

	    if (val === '0' || common.isUndefined(val)) return 0;

	    var match = val.match(CSS_VALUE_PIXELS);

	    if (!common.isNull(match)) {
	      return parseFloat(match[1]);
	    }

	    // TODO ...ems? %?

	    return 0;

	  }

	  /**
	   * @namespace
	   * @member dat.dom
	   */
	  var dom = {

	    /**
	     * 
	     * @param elem
	     * @param selectable
	     */
	    makeSelectable: function(elem, selectable) {

	      if (elem === undefined || elem.style === undefined) return;

	      elem.onselectstart = selectable ? function() {
	        return false;
	      } : function() {
	      };

	      elem.style.MozUserSelect = selectable ? 'auto' : 'none';
	      elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
	      elem.unselectable = selectable ? 'on' : 'off';

	    },

	    /**
	     *
	     * @param elem
	     * @param horizontal
	     * @param vertical
	     */
	    makeFullscreen: function(elem, horizontal, vertical) {

	      if (common.isUndefined(horizontal)) horizontal = true;
	      if (common.isUndefined(vertical)) vertical = true;

	      elem.style.position = 'absolute';

	      if (horizontal) {
	        elem.style.left = 0;
	        elem.style.right = 0;
	      }
	      if (vertical) {
	        elem.style.top = 0;
	        elem.style.bottom = 0;
	      }

	    },

	    /**
	     *
	     * @param elem
	     * @param eventType
	     * @param params
	     */
	    fakeEvent: function(elem, eventType, params, aux) {
	      params = params || {};
	      var className = EVENT_MAP_INV[eventType];
	      if (!className) {
	        throw new Error('Event type ' + eventType + ' not supported.');
	      }
	      var evt = document.createEvent(className);
	      switch (className) {
	        case 'MouseEvents':
	          var clientX = params.x || params.clientX || 0;
	          var clientY = params.y || params.clientY || 0;
	          evt.initMouseEvent(eventType, params.bubbles || false,
	              params.cancelable || true, window, params.clickCount || 1,
	              0, //screen X
	              0, //screen Y
	              clientX, //client X
	              clientY, //client Y
	              false, false, false, false, 0, null);
	          break;
	        case 'KeyboardEvents':
	          var init = evt.initKeyboardEvent || evt.initKeyEvent; // webkit || moz
	          common.defaults(params, {
	            cancelable: true,
	            ctrlKey: false,
	            altKey: false,
	            shiftKey: false,
	            metaKey: false,
	            keyCode: undefined,
	            charCode: undefined
	          });
	          init(eventType, params.bubbles || false,
	              params.cancelable, window,
	              params.ctrlKey, params.altKey,
	              params.shiftKey, params.metaKey,
	              params.keyCode, params.charCode);
	          break;
	        default:
	          evt.initEvent(eventType, params.bubbles || false,
	              params.cancelable || true);
	          break;
	      }
	      common.defaults(evt, aux);
	      elem.dispatchEvent(evt);
	    },

	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    bind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.addEventListener)
	        elem.addEventListener(event, func, bool);
	      else if (elem.attachEvent)
	        elem.attachEvent('on' + event, func);
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param event
	     * @param func
	     * @param bool
	     */
	    unbind: function(elem, event, func, bool) {
	      bool = bool || false;
	      if (elem.removeEventListener)
	        elem.removeEventListener(event, func, bool);
	      else if (elem.detachEvent)
	        elem.detachEvent('on' + event, func);
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    addClass: function(elem, className) {
	      if (elem.className === undefined) {
	        elem.className = className;
	      } else if (elem.className !== className) {
	        var classes = elem.className.split(/ +/);
	        if (classes.indexOf(className) == -1) {
	          classes.push(className);
	          elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
	        }
	      }
	      return dom;
	    },

	    /**
	     *
	     * @param elem
	     * @param className
	     */
	    removeClass: function(elem, className) {
	      if (className) {
	        if (elem.className === undefined) {
	          // elem.className = className;
	        } else if (elem.className === className) {
	          elem.removeAttribute('class');
	        } else {
	          var classes = elem.className.split(/ +/);
	          var index = classes.indexOf(className);
	          if (index != -1) {
	            classes.splice(index, 1);
	            elem.className = classes.join(' ');
	          }
	        }
	      } else {
	        elem.className = undefined;
	      }
	      return dom;
	    },

	    hasClass: function(elem, className) {
	      return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
	    },

	    /**
	     *
	     * @param elem
	     */
	    getWidth: function(elem) {

	      var style = getComputedStyle(elem);

	      return cssValueToPixels(style['border-left-width']) +
	          cssValueToPixels(style['border-right-width']) +
	          cssValueToPixels(style['padding-left']) +
	          cssValueToPixels(style['padding-right']) +
	          cssValueToPixels(style['width']);
	    },

	    /**
	     *
	     * @param elem
	     */
	    getHeight: function(elem) {

	      var style = getComputedStyle(elem);

	      return cssValueToPixels(style['border-top-width']) +
	          cssValueToPixels(style['border-bottom-width']) +
	          cssValueToPixels(style['padding-top']) +
	          cssValueToPixels(style['padding-bottom']) +
	          cssValueToPixels(style['height']);
	    },

	    /**
	     *
	     * @param elem
	     */
	    getOffset: function(elem) {
	      var offset = {left: 0, top:0};
	      if (elem.offsetParent) {
	        do {
	          offset.left += elem.offsetLeft;
	          offset.top += elem.offsetTop;
	        } while (elem = elem.offsetParent);
	      }
	      return offset;
	    },

	    // http://stackoverflow.com/posts/2684561/revisions
	    /**
	     * 
	     * @param elem
	     */
	    isActive: function(elem) {
	      return elem === document.activeElement && ( elem.type || elem.href );
	    }

	  };

	  return dom;

	})(dat.utils.common);


	dat.controllers.OptionController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a select input to alter the property of an object, using a
	   * list of accepted values.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object|string[]} options A map of labels to acceptable values, or
	   * a list of acceptable string values.
	   *
	   * @member dat.controllers
	   */
	  var OptionController = function(object, property, options) {

	    OptionController.superclass.call(this, object, property);

	    var _this = this;

	    /**
	     * The drop down menu
	     * @ignore
	     */
	    this.__select = document.createElement('select');

	    if (common.isArray(options)) {
	      var map = {};
	      common.each(options, function(element) {
	        map[element] = element;
	      });
	      options = map;
	    }

	    common.each(options, function(value, key) {

	      var opt = document.createElement('option');
	      opt.innerHTML = key;
	      opt.setAttribute('value', value);
	      _this.__select.appendChild(opt);

	    });

	    // Acknowledge original value
	    this.updateDisplay();

	    dom.bind(this.__select, 'change', function() {
	      var desiredValue = this.options[this.selectedIndex].value;
	      _this.setValue(desiredValue);
	    });

	    this.domElement.appendChild(this.__select);

	  };

	  OptionController.superclass = Controller;

	  common.extend(

	      OptionController.prototype,
	      Controller.prototype,

	      {

	        setValue: function(v) {
	          var toReturn = OptionController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          return toReturn;
	        },

	        updateDisplay: function() {
	          this.__select.value = this.getValue();
	          return OptionController.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  return OptionController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.NumberController = (function (Controller, common) {

	  /**
	   * @class Represents a given property of an object that is a number.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberController = function(object, property, params) {

	    NumberController.superclass.call(this, object, property);

	    params = params || {};

	    this.__min = params.min;
	    this.__max = params.max;
	    this.__step = params.step;

	    if (common.isUndefined(this.__step)) {

	      if (this.initialValue == 0) {
	        this.__impliedStep = 1; // What are we, psychics?
	      } else {
	        // Hey Doug, check this out.
	        this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(this.initialValue))/Math.LN10))/10;
	      }

	    } else {

	      this.__impliedStep = this.__step;

	    }

	    this.__precision = numDecimals(this.__impliedStep);


	  };

	  NumberController.superclass = Controller;

	  common.extend(

	      NumberController.prototype,
	      Controller.prototype,

	      /** @lends dat.controllers.NumberController.prototype */
	      {

	        setValue: function(v) {

	          if (this.__min !== undefined && v < this.__min) {
	            v = this.__min;
	          } else if (this.__max !== undefined && v > this.__max) {
	            v = this.__max;
	          }

	          if (this.__step !== undefined && v % this.__step != 0) {
	            v = Math.round(v / this.__step) * this.__step;
	          }

	          return NumberController.superclass.prototype.setValue.call(this, v);

	        },

	        /**
	         * Specify a minimum value for <code>object[property]</code>.
	         *
	         * @param {Number} minValue The minimum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        min: function(v) {
	          this.__min = v;
	          return this;
	        },

	        /**
	         * Specify a maximum value for <code>object[property]</code>.
	         *
	         * @param {Number} maxValue The maximum value for
	         * <code>object[property]</code>
	         * @returns {dat.controllers.NumberController} this
	         */
	        max: function(v) {
	          this.__max = v;
	          return this;
	        },

	        /**
	         * Specify a step value that dat.controllers.NumberController
	         * increments by.
	         *
	         * @param {Number} stepValue The step value for
	         * dat.controllers.NumberController
	         * @default if minimum and maximum specified increment is 1% of the
	         * difference otherwise stepValue is 1
	         * @returns {dat.controllers.NumberController} this
	         */
	        step: function(v) {
	          this.__step = v;
	          this.__impliedStep = v;
	          this.__precision = numDecimals(v);
	          return this;
	        }

	      }

	  );

	  function numDecimals(x) {
	    x = x.toString();
	    if (x.indexOf('.') > -1) {
	      return x.length - x.indexOf('.') - 1;
	    } else {
	      return 0;
	    }
	  }

	  return NumberController;

	})(dat.controllers.Controller,
	dat.utils.common);


	dat.controllers.NumberControllerBox = (function (NumberController, dom, common) {

	  /**
	   * @class Represents a given property of an object that is a number and
	   * provides an input element with which to manipulate it.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Object} [params] Optional parameters
	   * @param {Number} [params.min] Minimum allowed value
	   * @param {Number} [params.max] Maximum allowed value
	   * @param {Number} [params.step] Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerBox = function(object, property, params) {

	    this.__truncationSuspended = false;

	    NumberControllerBox.superclass.call(this, object, property, params);

	    var _this = this;

	    /**
	     * {Number} Previous mouse y position
	     * @ignore
	     */
	    var prev_y;

	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');

	    // Makes it so manually specified values are not truncated.

	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'mousedown', onMouseDown);
	    dom.bind(this.__input, 'keydown', function(e) {

	      // When pressing entire, you can be as precise as you want.
	      if (e.keyCode === 13) {
	        _this.__truncationSuspended = true;
	        this.blur();
	        _this.__truncationSuspended = false;
	      }

	    });

	    function onChange() {
	      var attempted = parseFloat(_this.__input.value);
	      if (!common.isNaN(attempted)) _this.setValue(attempted);
	    }

	    function onBlur() {
	      onChange();
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    function onMouseDown(e) {
	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);
	      prev_y = e.clientY;
	    }

	    function onMouseDrag(e) {

	      var diff = prev_y - e.clientY;
	      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

	      prev_y = e.clientY;

	    }

	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	    }

	    this.updateDisplay();

	    this.domElement.appendChild(this.__input);

	  };

	  NumberControllerBox.superclass = NumberController;

	  common.extend(

	      NumberControllerBox.prototype,
	      NumberController.prototype,

	      {

	        updateDisplay: function() {

	          this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
	          return NumberControllerBox.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  function roundToDecimal(value, decimals) {
	    var tenTo = Math.pow(10, decimals);
	    return Math.round(value * tenTo) / tenTo;
	  }

	  return NumberControllerBox;

	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.NumberControllerSlider = (function (NumberController, dom, css, common, styleSheet) {

	  /**
	   * @class Represents a given property of an object that is a number, contains
	   * a minimum and maximum, and provides a slider element with which to
	   * manipulate it. It should be noted that the slider element is made up of
	   * <code>&lt;div&gt;</code> tags, <strong>not</strong> the html5
	   * <code>&lt;slider&gt;</code> element.
	   *
	   * @extends dat.controllers.Controller
	   * @extends dat.controllers.NumberController
	   * 
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   * @param {Number} minValue Minimum allowed value
	   * @param {Number} maxValue Maximum allowed value
	   * @param {Number} stepValue Increment by which to change value
	   *
	   * @member dat.controllers
	   */
	  var NumberControllerSlider = function(object, property, min, max, step) {

	    NumberControllerSlider.superclass.call(this, object, property, { min: min, max: max, step: step });

	    var _this = this;

	    this.__background = document.createElement('div');
	    this.__foreground = document.createElement('div');
	    


	    dom.bind(this.__background, 'mousedown', onMouseDown);
	    
	    dom.addClass(this.__background, 'slider');
	    dom.addClass(this.__foreground, 'slider-fg');

	    function onMouseDown(e) {

	      dom.bind(window, 'mousemove', onMouseDrag);
	      dom.bind(window, 'mouseup', onMouseUp);

	      onMouseDrag(e);
	    }

	    function onMouseDrag(e) {

	      e.preventDefault();

	      var offset = dom.getOffset(_this.__background);
	      var width = dom.getWidth(_this.__background);
	      
	      _this.setValue(
	        map(e.clientX, offset.left, offset.left + width, _this.__min, _this.__max)
	      );

	      return false;

	    }

	    function onMouseUp() {
	      dom.unbind(window, 'mousemove', onMouseDrag);
	      dom.unbind(window, 'mouseup', onMouseUp);
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    this.updateDisplay();

	    this.__background.appendChild(this.__foreground);
	    this.domElement.appendChild(this.__background);

	  };

	  NumberControllerSlider.superclass = NumberController;

	  /**
	   * Injects default stylesheet for slider elements.
	   */
	  NumberControllerSlider.useDefaultStyles = function() {
	    css.inject(styleSheet);
	  };

	  common.extend(

	      NumberControllerSlider.prototype,
	      NumberController.prototype,

	      {

	        updateDisplay: function() {
	          var pct = (this.getValue() - this.__min)/(this.__max - this.__min);
	          this.__foreground.style.width = pct*100+'%';
	          return NumberControllerSlider.superclass.prototype.updateDisplay.call(this);
	        }

	      }



	  );

	  function map(v, i1, i2, o1, o2) {
	    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
	  }

	  return NumberControllerSlider;
	  
	})(dat.controllers.NumberController,
	dat.dom.dom,
	dat.utils.css,
	dat.utils.common,
	"/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");


	dat.controllers.FunctionController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a GUI interface to fire a specified method, a property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var FunctionController = function(object, property, text) {

	    FunctionController.superclass.call(this, object, property);

	    var _this = this;

	    this.__button = document.createElement('div');
	    this.__button.innerHTML = text === undefined ? 'Fire' : text;
	    dom.bind(this.__button, 'click', function(e) {
	      e.preventDefault();
	      _this.fire();
	      return false;
	    });

	    dom.addClass(this.__button, 'button');

	    this.domElement.appendChild(this.__button);


	  };

	  FunctionController.superclass = Controller;

	  common.extend(

	      FunctionController.prototype,
	      Controller.prototype,
	      {
	        
	        fire: function() {
	          if (this.__onChange) {
	            this.__onChange.call(this);
	          }
	          this.getValue().call(this.object);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	        }
	      }

	  );

	  return FunctionController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.controllers.BooleanController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a checkbox input to alter the boolean property of an object.
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var BooleanController = function(object, property) {

	    BooleanController.superclass.call(this, object, property);

	    var _this = this;
	    this.__prev = this.getValue();

	    this.__checkbox = document.createElement('input');
	    this.__checkbox.setAttribute('type', 'checkbox');


	    dom.bind(this.__checkbox, 'change', onChange, false);

	    this.domElement.appendChild(this.__checkbox);

	    // Match original value
	    this.updateDisplay();

	    function onChange() {
	      _this.setValue(!_this.__prev);
	    }

	  };

	  BooleanController.superclass = Controller;

	  common.extend(

	      BooleanController.prototype,
	      Controller.prototype,

	      {

	        setValue: function(v) {
	          var toReturn = BooleanController.superclass.prototype.setValue.call(this, v);
	          if (this.__onFinishChange) {
	            this.__onFinishChange.call(this, this.getValue());
	          }
	          this.__prev = this.getValue();
	          return toReturn;
	        },

	        updateDisplay: function() {
	          
	          if (this.getValue() === true) {
	            this.__checkbox.setAttribute('checked', 'checked');
	            this.__checkbox.checked = true;    
	          } else {
	              this.__checkbox.checked = false;
	          }

	          return BooleanController.superclass.prototype.updateDisplay.call(this);

	        }


	      }

	  );

	  return BooleanController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common);


	dat.color.toString = (function (common) {

	  return function(color) {

	    if (color.a == 1 || common.isUndefined(color.a)) {

	      var s = color.hex.toString(16);
	      while (s.length < 6) {
	        s = '0' + s;
	      }

	      return '#' + s;

	    } else {

	      return 'rgba(' + Math.round(color.r) + ',' + Math.round(color.g) + ',' + Math.round(color.b) + ',' + color.a + ')';

	    }

	  }

	})(dat.utils.common);


	dat.color.interpret = (function (toString, common) {

	  var result, toReturn;

	  var interpret = function() {

	    toReturn = false;

	    var original = arguments.length > 1 ? common.toArray(arguments) : arguments[0];

	    common.each(INTERPRETATIONS, function(family) {

	      if (family.litmus(original)) {

	        common.each(family.conversions, function(conversion, conversionName) {

	          result = conversion.read(original);

	          if (toReturn === false && result !== false) {
	            toReturn = result;
	            result.conversionName = conversionName;
	            result.conversion = conversion;
	            return common.BREAK;

	          }

	        });

	        return common.BREAK;

	      }

	    });

	    return toReturn;

	  };

	  var INTERPRETATIONS = [

	    // Strings
	    {

	      litmus: common.isString,

	      conversions: {

	        THREE_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt(
	                  '0x' +
	                      test[1].toString() + test[1].toString() +
	                      test[2].toString() + test[2].toString() +
	                      test[3].toString() + test[3].toString())
	            };

	          },

	          write: toString

	        },

	        SIX_CHAR_HEX: {

	          read: function(original) {

	            var test = original.match(/^#([A-F0-9]{6})$/i);
	            if (test === null) return false;

	            return {
	              space: 'HEX',
	              hex: parseInt('0x' + test[1].toString())
	            };

	          },

	          write: toString

	        },

	        CSS_RGB: {

	          read: function(original) {

	            var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3])
	            };

	          },

	          write: toString

	        },

	        CSS_RGBA: {

	          read: function(original) {

	            var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
	            if (test === null) return false;

	            return {
	              space: 'RGB',
	              r: parseFloat(test[1]),
	              g: parseFloat(test[2]),
	              b: parseFloat(test[3]),
	              a: parseFloat(test[4])
	            };

	          },

	          write: toString

	        }

	      }

	    },

	    // Numbers
	    {

	      litmus: common.isNumber,

	      conversions: {

	        HEX: {
	          read: function(original) {
	            return {
	              space: 'HEX',
	              hex: original,
	              conversionName: 'HEX'
	            }
	          },

	          write: function(color) {
	            return color.hex;
	          }
	        }

	      }

	    },

	    // Arrays
	    {

	      litmus: common.isArray,

	      conversions: {

	        RGB_ARRAY: {
	          read: function(original) {
	            if (original.length != 3) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b];
	          }

	        },

	        RGBA_ARRAY: {
	          read: function(original) {
	            if (original.length != 4) return false;
	            return {
	              space: 'RGB',
	              r: original[0],
	              g: original[1],
	              b: original[2],
	              a: original[3]
	            };
	          },

	          write: function(color) {
	            return [color.r, color.g, color.b, color.a];
	          }

	        }

	      }

	    },

	    // Objects
	    {

	      litmus: common.isObject,

	      conversions: {

	        RGBA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b,
	              a: color.a
	            }
	          }
	        },

	        RGB_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.r) &&
	                common.isNumber(original.g) &&
	                common.isNumber(original.b)) {
	              return {
	                space: 'RGB',
	                r: original.r,
	                g: original.g,
	                b: original.b
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              r: color.r,
	              g: color.g,
	              b: color.b
	            }
	          }
	        },

	        HSVA_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v) &&
	                common.isNumber(original.a)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v,
	                a: original.a
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v,
	              a: color.a
	            }
	          }
	        },

	        HSV_OBJ: {
	          read: function(original) {
	            if (common.isNumber(original.h) &&
	                common.isNumber(original.s) &&
	                common.isNumber(original.v)) {
	              return {
	                space: 'HSV',
	                h: original.h,
	                s: original.s,
	                v: original.v
	              }
	            }
	            return false;
	          },

	          write: function(color) {
	            return {
	              h: color.h,
	              s: color.s,
	              v: color.v
	            }
	          }

	        }

	      }

	    }


	  ];

	  return interpret;


	})(dat.color.toString,
	dat.utils.common);


	dat.GUI = dat.gui.GUI = (function (css, saveDialogueContents, styleSheet, controllerFactory, Controller, BooleanController, FunctionController, NumberControllerBox, NumberControllerSlider, OptionController, ColorController, requestAnimationFrame, CenteredDiv, dom, common) {

	  css.inject(styleSheet);

	  /** Outer-most className for GUI's */
	  var CSS_NAMESPACE = 'dg';

	  var HIDE_KEY_CODE = 72;

	  /** The only value shared between the JS and SCSS. Use caution. */
	  var CLOSE_BUTTON_HEIGHT = 20;

	  var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

	  var SUPPORTS_LOCAL_STORAGE = (function() {
	    try {
	      return 'localStorage' in window && window['localStorage'] !== null;
	    } catch (e) {
	      return false;
	    }
	  })();

	  var SAVE_DIALOGUE;

	  /** Have we yet to create an autoPlace GUI? */
	  var auto_place_virgin = true;

	  /** Fixed position div that auto place GUI's go inside */
	  var auto_place_container;

	  /** Are we hiding the GUI's ? */
	  var hide = false;

	  /** GUI's which should be hidden */
	  var hideable_guis = [];

	  /**
	   * A lightweight controller library for JavaScript. It allows you to easily
	   * manipulate variables and fire functions on the fly.
	   * @class
	   *
	   * @member dat.gui
	   *
	   * @param {Object} [params]
	   * @param {String} [params.name] The name of this GUI.
	   * @param {Object} [params.load] JSON object representing the saved state of
	   * this GUI.
	   * @param {Boolean} [params.auto=true]
	   * @param {dat.gui.GUI} [params.parent] The GUI I'm nested in.
	   * @param {Boolean} [params.closed] If true, starts closed
	   */
	  var GUI = function(params) {

	    var _this = this;

	    this.minHeight = null;
	    this.maxHeight = null;

	    /**
	     * Outermost DOM Element
	     * @type DOMElement
	     */
	    this.domElement = document.createElement('div');
	    this.__ul = document.createElement('ul');
	    this.domElement.appendChild(this.__ul);

	    dom.addClass(this.domElement, CSS_NAMESPACE);

	    /**
	     * Nested GUI's by name
	     * @ignore
	     */
	    this.__folders = {};

	    this.__controllers = [];

	    /**
	     * List of objects I'm remembering for save, only used in top level GUI
	     * @ignore
	     */
	    this.__rememberedObjects = [];

	    /**
	     * Maps the index of remembered objects to a map of controllers, only used
	     * in top level GUI.
	     *
	     * @private
	     * @ignore
	     *
	     * @example
	     * [
	     *  {
	     *    propertyName: Controller,
	     *    anotherPropertyName: Controller
	     *  },
	     *  {
	     *    propertyName: Controller
	     *  }
	     * ]
	     */
	    this.__rememberedObjectIndecesToControllers = [];

	    this.__listening = [];

	    params = params || {};

	    // Default parameters
	    params = common.defaults(params, {
	      autoPlace: true,
	      width: GUI.DEFAULT_WIDTH
	    });

	    params = common.defaults(params, {
	      resizable: params.autoPlace,
	      hideable: params.autoPlace
	    });


	    if (!common.isUndefined(params.load)) {

	      // Explicit preset
	      if (params.preset) params.load.preset = params.preset;

	    } else {

	      params.load = { preset: DEFAULT_DEFAULT_PRESET_NAME };

	    }

	    if (common.isUndefined(params.parent) && params.hideable) {
	      hideable_guis.push(this);
	    }

	    // Only root level GUI's are resizable.
	    params.resizable = common.isUndefined(params.parent) && params.resizable;


	    if (params.autoPlace && common.isUndefined(params.scrollable)) {
	      params.scrollable = true;
	    }
	//    params.scrollable = common.isUndefined(params.parent) && params.scrollable === true;

	    // Not part of params because I don't want people passing this in via
	    // constructor. Should be a 'remembered' value.
	    var use_local_storage =
	        SUPPORTS_LOCAL_STORAGE &&
	            localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';

	    var saveToLocalStorage;

	    Object.defineProperties(this,

	        /** @lends dat.gui.GUI.prototype */
	        {

	          /**
	           * The parent <code>GUI</code>
	           * @type dat.gui.GUI
	           */
	          parent: {
	            get: function() {
	              return params.parent;
	            }
	          },

	          scrollable: {
	            get: function() {
	              return params.scrollable;
	            }
	          },

	          /**
	           * Handles <code>GUI</code>'s element placement for you
	           * @type Boolean
	           */
	          autoPlace: {
	            get: function() {
	              return params.autoPlace;
	            }
	          },

	          /**
	           * The identifier for a set of saved values
	           * @type String
	           */
	          preset: {

	            get: function() {
	              if (_this.parent) {
	                return _this.getRoot().preset;
	              } else {
	                return params.load.preset;
	              }
	            },

	            set: function(v) {
	              if (_this.parent) {
	                _this.getRoot().preset = v;
	              } else {
	                params.load.preset = v;
	              }
	              setPresetSelectIndex(this);
	              _this.revert();
	            }

	          },

	          /**
	           * The width of <code>GUI</code> element
	           * @type Number
	           */
	          width: {
	            get: function() {
	              return params.width;
	            },
	            set: function(v) {
	              params.width = v;
	              setWidth(_this, v);
	            }
	          },

	          /**
	           * The name of <code>GUI</code>. Used for folders. i.e
	           * a folder's name
	           * @type String
	           */
	          name: {
	            get: function() {
	              return params.name;
	            },
	            set: function(v) {
	              // TODO Check for collisions among sibling folders
	              params.name = v;
	              if (title_row_name) {
	                title_row_name.innerHTML = params.name;
	              }
	            }
	          },

	          /**
	           * Whether the <code>GUI</code> is collapsed or not
	           * @type Boolean
	           */
	          closed: {
	            get: function() {
	              return params.closed;
	            },
	            set: function(v) {
	              params.closed = v;
	              if (params.closed) {
	                dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
	              } else {
	                dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
	              }
	              // For browsers that aren't going to respect the CSS transition,
	              // Lets just check our height against the window height right off
	              // the bat.
	              this.onResize();

	              if (_this.__closeButton) {
	                _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
	              }
	            }
	          },

	          /**
	           * Contains all presets
	           * @type Object
	           */
	          load: {
	            get: function() {
	              return params.load;
	            }
	          },

	          /**
	           * Determines whether or not to use <a href="https://developer.mozilla.org/en/DOM/Storage#localStorage">localStorage</a> as the means for
	           * <code>remember</code>ing
	           * @type Boolean
	           */
	          useLocalStorage: {

	            get: function() {
	              return use_local_storage;
	            },
	            set: function(bool) {
	              if (SUPPORTS_LOCAL_STORAGE) {
	                use_local_storage = bool;
	                if (bool) {
	                  dom.bind(window, 'unload', saveToLocalStorage);
	                } else {
	                  dom.unbind(window, 'unload', saveToLocalStorage);
	                }
	                localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
	              }
	            }

	          }

	        });

	    // Are we a root level GUI?
	    if (common.isUndefined(params.parent)) {

	      params.closed = false;

	      dom.addClass(this.domElement, GUI.CLASS_MAIN);
	      dom.makeSelectable(this.domElement, false);

	      // Are we supposed to be loading locally?
	      if (SUPPORTS_LOCAL_STORAGE) {

	        if (use_local_storage) {

	          _this.useLocalStorage = true;

	          var saved_gui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

	          if (saved_gui) {
	            params.load = JSON.parse(saved_gui);
	          }

	        }

	      }

	      this.__closeButton = document.createElement('div');
	      this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
	      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);
	      this.domElement.appendChild(this.__closeButton);

	      dom.bind(this.__closeButton, 'click', function() {

	        _this.closed = !_this.closed;


	      });


	      // Oh, you're a nested GUI!
	    } else {

	      if (params.closed === undefined) {
	        params.closed = true;
	      }

	      var title_row_name = document.createTextNode(params.name);
	      dom.addClass(title_row_name, 'controller-name');

	      var title_row = addRow(_this, title_row_name);

	      var on_click_title = function(e) {
	        e.preventDefault();
	        _this.closed = !_this.closed;
	        _this.parent.onResize();
	        return false;
	      };

	      dom.addClass(this.__ul, GUI.CLASS_CLOSED);

	      dom.addClass(title_row, 'title');
	      dom.bind(title_row, 'click', on_click_title);

	      if (!params.closed) {
	        this.closed = false;
	      }

	    }

	    if (params.autoPlace) {

	      if (common.isUndefined(params.parent)) {

	        if (auto_place_virgin) {
	          auto_place_container = document.createElement('div');
	          dom.addClass(auto_place_container, CSS_NAMESPACE);
	          dom.addClass(auto_place_container, GUI.CLASS_AUTO_PLACE_CONTAINER);
	          document.body.appendChild(auto_place_container);
	          auto_place_virgin = false;
	        }

	        // Put it in the dom for you.
	        auto_place_container.appendChild(this.domElement);

	        // Apply the auto styles
	        dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);

	      }


	      // Make it not elastic.
	      if (!this.parent) setWidth(_this, params.width);

	    }

	    dom.bind(window, 'resize', function() { _this.onResize() });
	    dom.bind(this.__ul, 'webkitTransitionEnd', function() { _this.onResize(); });
	    dom.bind(this.__ul, 'transitionend', function() { _this.onResize() });
	    dom.bind(this.__ul, 'oTransitionEnd', function() { _this.onResize() });
	    this.onResize();


	    if (params.resizable) {
	      addResizeHandle(this);
	    }

	    saveToLocalStorage = function () {
	      if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
	        localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
	      }
	    }

	    // expose this method publicly
	    this.saveToLocalStorageIfPossible = saveToLocalStorage;

	    var root = _this.getRoot();
	    function resetWidth() {
	        var root = _this.getRoot();
	        root.width += 1;
	        common.defer(function() {
	          root.width -= 1;
	        });
	      }

	      if (!params.parent) {
	        resetWidth();
	      }

	  };

	  GUI.toggleHide = function() {

	    hide = !hide;
	    common.each(hideable_guis, function(gui) {
	      gui.domElement.style.zIndex = hide ? -999 : 999;
	      gui.domElement.style.opacity = hide ? 0 : 1;
	    });
	  };

	  GUI.CLASS_AUTO_PLACE = 'a';
	  GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
	  GUI.CLASS_MAIN = 'main';
	  GUI.CLASS_CONTROLLER_ROW = 'cr';
	  GUI.CLASS_TOO_TALL = 'taller-than-window';
	  GUI.CLASS_CLOSED = 'closed';
	  GUI.CLASS_CLOSE_BUTTON = 'close-button';
	  GUI.CLASS_DRAG = 'drag';

	  GUI.DEFAULT_WIDTH = 240;
	  GUI.TEXT_CLOSED = 'Close Controls';
	  GUI.TEXT_OPEN = 'Open Controls';

	  dom.bind(window, 'keydown', function(e) {

	    if (document.activeElement.type !== 'text' &&
	        (e.which === HIDE_KEY_CODE || e.keyCode == HIDE_KEY_CODE)) {
	      GUI.toggleHide();
	    }

	  }, false);

	  common.extend(

	      GUI.prototype,

	      /** @lends dat.gui.GUI */
	      {

	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.Controller} The new controller that was added.
	         * @instance
	         */
	        add: function(object, property) {

	          return add(
	              this,
	              object,
	              property,
	              {
	                factoryArgs: Array.prototype.slice.call(arguments, 2)
	              }
	          );

	        },

	        /**
	         * @param object
	         * @param property
	         * @returns {dat.controllers.ColorController} The new controller that was added.
	         * @instance
	         */
	        addColor: function(object, property) {

	          return add(
	              this,
	              object,
	              property,
	              {
	                color: true
	              }
	          );

	        },

	        /**
	         * @param controller
	         * @instance
	         */
	        remove: function(controller) {

	          // TODO listening?
	          this.__ul.removeChild(controller.__li);
	          this.__controllers.splice(this.__controllers.indexOf(controller), 1);
	          var _this = this;
	          common.defer(function() {
	            _this.onResize();
	          });

	        },

	        destroy: function() {

	          if (this.autoPlace) {
	            auto_place_container.removeChild(this.domElement);
	          }

	        },

	        /**
	         * @param name
	         * @returns {dat.gui.GUI} The new folder.
	         * @throws {Error} if this GUI already has a folder by the specified
	         * name
	         * @instance
	         */
	        addFolder: function(name) {

	          // We have to prevent collisions on names in order to have a key
	          // by which to remember saved values
	          if (this.__folders[name] !== undefined) {
	            throw new Error('You already have a folder in this GUI by the' +
	                ' name "' + name + '"');
	          }

	          var new_gui_params = { name: name, parent: this };

	          // We need to pass down the autoPlace trait so that we can
	          // attach event listeners to open/close folder actions to
	          // ensure that a scrollbar appears if the window is too short.
	          new_gui_params.autoPlace = this.autoPlace;

	          // Do we have saved appearance data for this folder?

	          if (this.load && // Anything loaded?
	              this.load.folders && // Was my parent a dead-end?
	              this.load.folders[name]) { // Did daddy remember me?

	            // Start me closed if I was closed
	            new_gui_params.closed = this.load.folders[name].closed;

	            // Pass down the loaded data
	            new_gui_params.load = this.load.folders[name];

	          }

	          var gui = new GUI(new_gui_params);
	          this.__folders[name] = gui;

	          var li = addRow(this, gui.domElement);
	          dom.addClass(li, 'folder');
	          return gui;

	        },

	        open: function() {
	          this.closed = false;
	        },

	        close: function() {
	          this.closed = true;
	        },

	        setMinHeight: function(h) {
	          this.minHeight = h;
	          this.onResize();
	        },

	        setMaxHeight: function(h) {
	          this.maxHeight = h;
	          this.onResize();
	        },

	        setParent: function(id) {
	          var e;
	          if(this.autoPlace) e = this.domElement.parentNode;
	          else e = this.domElement;
	          document.getElementById(id).appendChild(e);
	        },

	        onResize: function() {

	          var root = this.getRoot();

	          if (root.scrollable) {

	            var h = 0;
	            var minHeight = this.minHeight || 0;
	            var maxHeight = this.maxHeight || window.innerHeight;
	            var closeButtonHeight = dom.getHeight(root.__closeButton);

	            common.each(root.__ul.childNodes, function(node) {
	              if (! (root.autoPlace && node === root.__save_row))
	                h += dom.getHeight(node);
	            });

	            if (Math.max(minHeight, maxHeight) - closeButtonHeight < h) {
	              dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = Math.max(minHeight, maxHeight) - closeButtonHeight + 'px';
	            } else {
	              dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
	              root.__ul.style.height = 'auto';
	            }

	          }

	          if (root.__resize_handle) {
	            common.defer(function() {
	              root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
	            });
	          }

	          if (root.__closeButton) {
	            root.__closeButton.style.width = root.width + 'px';
	          }

	        },

	        /**
	         * Mark objects for saving. The order of these objects cannot change as
	         * the GUI grows. When remembering new objects, append them to the end
	         * of the list.
	         *
	         * @param {Object...} objects
	         * @throws {Error} if not called on a top level GUI.
	         * @instance
	         */
	        remember: function() {

	          if (common.isUndefined(SAVE_DIALOGUE)) {
	            SAVE_DIALOGUE = new CenteredDiv();
	            SAVE_DIALOGUE.domElement.innerHTML = saveDialogueContents;
	          }

	          if (this.parent) {
	            throw new Error("You can only call remember on a top level GUI.");
	          }

	          var _this = this;

	          common.each(Array.prototype.slice.call(arguments), function(object) {
	            if (_this.__rememberedObjects.length == 0) {
	              addSaveMenu(_this);
	            }
	            if (_this.__rememberedObjects.indexOf(object) == -1) {
	              _this.__rememberedObjects.push(object);
	            }
	          });

	          if (this.autoPlace) {
	            // Set save row width
	            setWidth(this, this.width);
	          }

	        },

	        /**
	         * @returns {dat.gui.GUI} the topmost parent GUI of a nested GUI.
	         * @instance
	         */
	        getRoot: function() {
	          var gui = this;
	          while (gui.parent) {
	            gui = gui.parent;
	          }
	          return gui;
	        },

	        /**
	         * @returns {Object} a JSON object representing the current state of
	         * this GUI as well as its remembered properties.
	         * @instance
	         */
	        getSaveObject: function() {

	          var toReturn = this.load;

	          toReturn.closed = this.closed;

	          // Am I remembering any values?
	          if (this.__rememberedObjects.length > 0) {

	            toReturn.preset = this.preset;

	            if (!toReturn.remembered) {
	              toReturn.remembered = {};
	            }

	            toReturn.remembered[this.preset] = getCurrentPreset(this);

	          }

	          toReturn.folders = {};
	          common.each(this.__folders, function(element, key) {
	            toReturn.folders[key] = element.getSaveObject();
	          });

	          return toReturn;

	        },

	        save: function() {

	          if (!this.load.remembered) {
	            this.load.remembered = {};
	          }

	          this.load.remembered[this.preset] = getCurrentPreset(this);
	          markPresetModified(this, false);
	          this.saveToLocalStorageIfPossible();

	        },

	        saveAs: function(presetName) {

	          if (!this.load.remembered) {

	            // Retain default values upon first save
	            this.load.remembered = {};
	            this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);

	          }

	          this.load.remembered[presetName] = getCurrentPreset(this);
	          this.preset = presetName;
	          addPresetOption(this, presetName, true);
	          this.saveToLocalStorageIfPossible();

	        },

	        revert: function(gui) {

	          common.each(this.__controllers, function(controller) {
	            // Make revert work on Default.
	            if (!this.getRoot().load.remembered) {
	              controller.setValue(controller.initialValue);
	            } else {
	              recallSavedValue(gui || this.getRoot(), controller);
	            }
	          }, this);

	          common.each(this.__folders, function(folder) {
	            folder.revert(folder);
	          });

	          if (!gui) {
	            markPresetModified(this.getRoot(), false);
	          }


	        },

	        listen: function(controller) {

	          var init = this.__listening.length == 0;
	          this.__listening.push(controller);
	          if (init) updateDisplays(this.__listening);

	        }

	      }

	  );

	  function add(gui, object, property, params) {

	    // Assume global mode, attach property to window
	    if(typeof object !== "object") {
	      var val = property;
	      property = object;
	      object = window;
	    }

	    if (object[property] === undefined) {
	      if(object === window && val !== undefined) object[property] = val;
	      else throw new Error("Object " + object + " has no property \"" + property + "\"");
	    }

	    var controller;

	    if (params.color) {

	      controller = new ColorController(gui, object, property);

	    } else {

	      var factoryArgs = [object,property].concat(params.factoryArgs);
	      controller = controllerFactory.apply(gui, factoryArgs);

	    }

	    if (params.before instanceof Controller) {
	      params.before = params.before.__li;
	    }

	    recallSavedValue(gui, controller);

	    dom.addClass(controller.domElement, 'c');

	    var name = document.createElement('span');
	    dom.addClass(name, 'property-name');
	    name.innerHTML = controller.property;

	    var container = document.createElement('div');
	    container.appendChild(name);
	    container.appendChild(controller.domElement);

	    var li = addRow(gui, container, params.before);

	    dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);
	    dom.addClass(li, typeof controller.getValue());

	    augmentController(gui, li, controller);

	    gui.__controllers.push(controller);

	    return controller;

	  }

	  /**
	   * Add a row to the end of the GUI or before another row.
	   *
	   * @param gui
	   * @param [dom] If specified, inserts the dom content in the new row
	   * @param [liBefore] If specified, places the new row before another row
	   */
	  function addRow(gui, dom, liBefore) {
	    var li = document.createElement('li');
	    if (dom) li.appendChild(dom);
	    if (liBefore) {
	      gui.__ul.insertBefore(li, params.before);
	    } else {
	      gui.__ul.appendChild(li);
	    }
	    gui.onResize();
	    return li;
	  }

	  function augmentController(gui, li, controller) {

	    controller.__li = li;
	    controller.__gui = gui;

	    common.extend(controller, {

	      options: function(options) {

	        if (arguments.length > 1) {
	          controller.remove();

	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [common.toArray(arguments)]
	              }
	          );

	        }

	        if (common.isArray(options) || common.isObject(options)) {
	          controller.remove();

	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [options]
	              }
	          );

	        }

	      },

	      name: function(v) {
	        controller.__li.firstElementChild.firstElementChild.innerHTML = v;
	        return controller;
	      },

	      listen: function() {
	        controller.__gui.listen(controller);
	        return controller;
	      },

	      remove: function() {
	        controller.__gui.remove(controller);
	        return controller;
	      }

	    });

	    // All sliders should be accompanied by a box.
	    if (controller instanceof NumberControllerSlider) {

	      var box = new NumberControllerBox(controller.object, controller.property,
	          { min: controller.__min, max: controller.__max, step: controller.__step });

	      common.each(['updateDisplay', 'onChange', 'onFinishChange'], function(method) {
	        var pc = controller[method];
	        var pb = box[method];
	        controller[method] = box[method] = function() {
	          var args = Array.prototype.slice.call(arguments);
	          pc.apply(controller, args);
	          return pb.apply(box, args);
	        }
	      });

	      dom.addClass(li, 'has-slider');
	      controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);

	    }
	    else if (controller instanceof NumberControllerBox) {

	      var r = function(returned) {

	        // Have we defined both boundaries?
	        if (common.isNumber(controller.__min) && common.isNumber(controller.__max)) {

	          // Well, then lets just replace this with a slider.
	          controller.remove();
	          return add(
	              gui,
	              controller.object,
	              controller.property,
	              {
	                before: controller.__li.nextElementSibling,
	                factoryArgs: [controller.__min, controller.__max, controller.__step]
	              });

	        }

	        return returned;

	      };

	      controller.min = common.compose(r, controller.min);
	      controller.max = common.compose(r, controller.max);

	    }
	    else if (controller instanceof BooleanController) {

	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__checkbox, 'click');
	      });

	      dom.bind(controller.__checkbox, 'click', function(e) {
	        e.stopPropagation(); // Prevents double-toggle
	      })

	    }
	    else if (controller instanceof FunctionController) {

	      dom.bind(li, 'click', function() {
	        dom.fakeEvent(controller.__button, 'click');
	      });

	      dom.bind(li, 'mouseover', function() {
	        dom.addClass(controller.__button, 'hover');
	      });

	      dom.bind(li, 'mouseout', function() {
	        dom.removeClass(controller.__button, 'hover');
	      });

	    }
	    else if (controller instanceof ColorController) {

	      dom.addClass(li, 'color');
	      controller.updateDisplay = common.compose(function(r) {
	        li.style.borderLeftColor = controller.__color.toString();
	        return r;
	      }, controller.updateDisplay);

	      controller.updateDisplay();

	    }

	    controller.setValue = common.compose(function(r) {
	      if (gui.getRoot().__preset_select && controller.isModified()) {
	        markPresetModified(gui.getRoot(), true);
	      }
	      return r;
	    }, controller.setValue);

	  }

	  function recallSavedValue(gui, controller) {

	    // Find the topmost GUI, that's where remembered objects live.
	    var root = gui.getRoot();

	    // Does the object we're controlling match anything we've been told to
	    // remember?
	    var matched_index = root.__rememberedObjects.indexOf(controller.object);

	    // Why yes, it does!
	    if (matched_index != -1) {

	      // Let me fetch a map of controllers for thcommon.isObject.
	      var controller_map =
	          root.__rememberedObjectIndecesToControllers[matched_index];

	      // Ohp, I believe this is the first controller we've created for this
	      // object. Lets make the map fresh.
	      if (controller_map === undefined) {
	        controller_map = {};
	        root.__rememberedObjectIndecesToControllers[matched_index] =
	            controller_map;
	      }

	      // Keep track of this controller
	      controller_map[controller.property] = controller;

	      // Okay, now have we saved any values for this controller?
	      if (root.load && root.load.remembered) {

	        var preset_map = root.load.remembered;

	        // Which preset are we trying to load?
	        var preset;

	        if (preset_map[gui.preset]) {

	          preset = preset_map[gui.preset];

	        } else if (preset_map[DEFAULT_DEFAULT_PRESET_NAME]) {

	          // Uhh, you can have the default instead?
	          preset = preset_map[DEFAULT_DEFAULT_PRESET_NAME];

	        } else {

	          // Nada.

	          return;

	        }


	        // Did the loaded object remember thcommon.isObject?
	        if (preset[matched_index] &&

	          // Did we remember this particular property?
	            preset[matched_index][controller.property] !== undefined) {

	          // We did remember something for this guy ...
	          var value = preset[matched_index][controller.property];

	          // And that's what it is.
	          controller.initialValue = value;
	          controller.setValue(value);

	        }

	      }

	    }

	  }

	  function getLocalStorageHash(gui, key) {
	    // TODO how does this deal with multiple GUI's?
	    return document.location.href + '.' + key;

	  }

	  function addSaveMenu(gui) {

	    var div = gui.__save_row = document.createElement('li');

	    dom.addClass(gui.domElement, 'has-save');

	    gui.__ul.insertBefore(div, gui.__ul.firstChild);

	    dom.addClass(div, 'save-row');

	    var gears = document.createElement('span');
	    gears.innerHTML = '&nbsp;';
	    dom.addClass(gears, 'button gears');

	    // TODO replace with FunctionController
	    var button = document.createElement('span');
	    button.innerHTML = 'Save';
	    dom.addClass(button, 'button');
	    dom.addClass(button, 'save');

	    var button2 = document.createElement('span');
	    button2.innerHTML = 'New';
	    dom.addClass(button2, 'button');
	    dom.addClass(button2, 'save-as');

	    var button3 = document.createElement('span');
	    button3.innerHTML = 'Revert';
	    dom.addClass(button3, 'button');
	    dom.addClass(button3, 'revert');

	    var select = gui.__preset_select = document.createElement('select');

	    if (gui.load && gui.load.remembered) {

	      common.each(gui.load.remembered, function(value, key) {
	        addPresetOption(gui, key, key == gui.preset);
	      });

	    } else {
	      addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
	    }

	    dom.bind(select, 'change', function() {


	      for (var index = 0; index < gui.__preset_select.length; index++) {
	        gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
	      }

	      gui.preset = this.value;

	    });

	    div.appendChild(select);
	    div.appendChild(gears);
	    div.appendChild(button);
	    div.appendChild(button2);
	    div.appendChild(button3);

	    if (SUPPORTS_LOCAL_STORAGE) {

	      var saveLocally = document.getElementById('dg-save-locally');
	      var explain = document.getElementById('dg-local-explain');

	      saveLocally.style.display = 'block';

	      var localStorageCheckBox = document.getElementById('dg-local-storage');

	      if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
	        localStorageCheckBox.setAttribute('checked', 'checked');
	      }

	      function showHideExplain() {
	        explain.style.display = gui.useLocalStorage ? 'block' : 'none';
	      }

	      showHideExplain();

	      // TODO: Use a boolean controller, fool!
	      dom.bind(localStorageCheckBox, 'change', function() {
	        gui.useLocalStorage = !gui.useLocalStorage;
	        showHideExplain();
	      });

	    }

	    var newConstructorTextArea = document.getElementById('dg-new-constructor');

	    dom.bind(newConstructorTextArea, 'keydown', function(e) {
	      if (e.metaKey && (e.which === 67 || e.keyCode == 67)) {
	        SAVE_DIALOGUE.hide();
	      }
	    });

	    dom.bind(gears, 'click', function() {
	      newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
	      SAVE_DIALOGUE.show();
	      newConstructorTextArea.focus();
	      newConstructorTextArea.select();
	    });

	    dom.bind(button, 'click', function() {
	      gui.save();
	    });

	    dom.bind(button2, 'click', function() {
	      var presetName = prompt('Enter a new preset name.');
	      if (presetName) gui.saveAs(presetName);
	    });

	    dom.bind(button3, 'click', function() {
	      gui.revert();
	    });

	//    div.appendChild(button2);

	  }

	  function addResizeHandle(gui) {

	    gui.__resize_handle = document.createElement('div');

	    common.extend(gui.__resize_handle.style, {

	      width: '6px',
	      marginLeft: '-3px',
	      height: '200px',
	      cursor: 'ew-resize',
	      position: 'absolute'
	//      border: '1px solid blue'

	    });

	    var pmouseX;

	    dom.bind(gui.__resize_handle, 'mousedown', dragStart);
	    dom.bind(gui.__closeButton, 'mousedown', dragStart);

	    gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);

	    function dragStart(e) {

	      e.preventDefault();

	      pmouseX = e.clientX;

	      dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.bind(window, 'mousemove', drag);
	      dom.bind(window, 'mouseup', dragStop);

	      return false;

	    }

	    function drag(e) {

	      e.preventDefault();

	      gui.width += pmouseX - e.clientX;
	      gui.onResize();
	      pmouseX = e.clientX;

	      return false;

	    }

	    function dragStop() {

	      dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
	      dom.unbind(window, 'mousemove', drag);
	      dom.unbind(window, 'mouseup', dragStop);

	    }

	  }

	  function setWidth(gui, w) {
	    gui.domElement.style.width = w + 'px';
	    // Auto placed save-rows are position fixed, so we have to
	    // set the width manually if we want it to bleed to the edge
	    if (gui.__save_row && gui.autoPlace) {
	      gui.__save_row.style.width = w + 'px';
	    }if (gui.__closeButton) {
	      gui.__closeButton.style.width = w + 'px';
	    }
	  }

	  function getCurrentPreset(gui, useInitialValues) {

	    var toReturn = {};

	    // For each object I'm remembering
	    common.each(gui.__rememberedObjects, function(val, index) {

	      var saved_values = {};

	      // The controllers I've made for thcommon.isObject by property
	      var controller_map =
	          gui.__rememberedObjectIndecesToControllers[index];

	      // Remember each value for each property
	      common.each(controller_map, function(controller, property) {
	        saved_values[property] = useInitialValues ? controller.initialValue : controller.getValue();
	      });

	      // Save the values for thcommon.isObject
	      toReturn[index] = saved_values;

	    });

	    return toReturn;

	  }

	  function addPresetOption(gui, name, setSelected) {
	    var opt = document.createElement('option');
	    opt.innerHTML = name;
	    opt.value = name;
	    gui.__preset_select.appendChild(opt);
	    if (setSelected) {
	      gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
	    }
	  }

	  function setPresetSelectIndex(gui) {
	    for (var index = 0; index < gui.__preset_select.length; index++) {
	      if (gui.__preset_select[index].value == gui.preset) {
	        gui.__preset_select.selectedIndex = index;
	      }
	    }
	  }

	  function markPresetModified(gui, modified) {
	    var opt = gui.__preset_select[gui.__preset_select.selectedIndex];
	//    console.log('mark', modified, opt);
	    if (modified) {
	      opt.innerHTML = opt.value + "*";
	    } else {
	      opt.innerHTML = opt.value;
	    }
	  }

	  function updateDisplays(controllerArray) {


	    if (controllerArray.length != 0) {

	      requestAnimationFrame(function() {
	        updateDisplays(controllerArray);
	      });

	    }

	    common.each(controllerArray, function(c) {
	      c.updateDisplay();
	    });

	  }

	  return GUI;

	})(dat.utils.css,
	"<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>",
	".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 0; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n",
	dat.controllers.factory = (function (OptionController, NumberControllerBox, NumberControllerSlider, StringController, FunctionController, BooleanController, common) {

	      return function(object, property) {

	        var initialValue = object[property];

	        // Providing options?
	        if (common.isArray(arguments[2]) || common.isObject(arguments[2])) {
	          return new OptionController(object, property, arguments[2]);
	        }

	        // Providing a map?

	        if (common.isNumber(initialValue)) {

	          if (common.isNumber(arguments[2]) && common.isNumber(arguments[3])) {

	            // Has min and max.
	            return new NumberControllerSlider(object, property, arguments[2], arguments[3]);

	          } else {

	            return new NumberControllerBox(object, property, { min: arguments[2], max: arguments[3] });

	          }

	        }

	        if (common.isString(initialValue)) {
	          return new StringController(object, property);
	        }

	        if (common.isFunction(initialValue)) {
	          return new FunctionController(object, property, '');
	        }

	        if (common.isBoolean(initialValue)) {
	          return new BooleanController(object, property);
	        }

	      }

	    })(dat.controllers.OptionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.StringController = (function (Controller, dom, common) {

	  /**
	   * @class Provides a text input to alter the string property of an object.
	   *
	   * @extends dat.controllers.Controller
	   *
	   * @param {Object} object The object to be manipulated
	   * @param {string} property The name of the property to be manipulated
	   *
	   * @member dat.controllers
	   */
	  var StringController = function(object, property) {

	    StringController.superclass.call(this, object, property);

	    var _this = this;

	    this.__input = document.createElement('input');
	    this.__input.setAttribute('type', 'text');

	    dom.bind(this.__input, 'keyup', onChange);
	    dom.bind(this.__input, 'change', onChange);
	    dom.bind(this.__input, 'blur', onBlur);
	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) {
	        this.blur();
	      }
	    });
	    

	    function onChange() {
	      _this.setValue(_this.__input.value);
	    }

	    function onBlur() {
	      if (_this.__onFinishChange) {
	        _this.__onFinishChange.call(_this, _this.getValue());
	      }
	    }

	    this.updateDisplay();

	    this.domElement.appendChild(this.__input);

	  };

	  StringController.superclass = Controller;

	  common.extend(

	      StringController.prototype,
	      Controller.prototype,

	      {

	        updateDisplay: function() {
	          // Stops the caret from moving on account of:
	          // keyup -> setValue -> updateDisplay
	          if (!dom.isActive(this.__input)) {
	            this.__input.value = this.getValue();
	          }
	          return StringController.superclass.prototype.updateDisplay.call(this);
	        }

	      }

	  );

	  return StringController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.utils.common),
	dat.controllers.FunctionController,
	dat.controllers.BooleanController,
	dat.utils.common),
	dat.controllers.Controller,
	dat.controllers.BooleanController,
	dat.controllers.FunctionController,
	dat.controllers.NumberControllerBox,
	dat.controllers.NumberControllerSlider,
	dat.controllers.OptionController,
	dat.controllers.ColorController = (function (Controller, dom, Color, interpret, common) {

	  var ColorController = function(gui, object, property) {

	    ColorController.superclass.call(this, object, property);

	    this.__color = new Color(this.getValue());
	    this.__temp = new Color(0);

	    var _this = this;

	    this.domElement = document.createElement('div');

	    dom.makeSelectable(this.domElement, false);

	    this.__selector = document.createElement('div');
	    this.__selector.className = 'selector';

	    this.__saturation_field = document.createElement('div');
	    this.__saturation_field.className = 'saturation-field';

	    this.__field_knob = document.createElement('div');
	    this.__field_knob.className = 'field-knob';
	    this.__field_knob_border = '2px solid ';

	    this.__hue_knob = document.createElement('div');
	    this.__hue_knob.className = 'hue-knob';

	    this.__hue_field = document.createElement('div');
	    this.__hue_field.className = 'hue-field';

	    this.__input = document.createElement('input');
	    this.__input.type = 'text';
	    this.__input_textShadow = '0 1px 1px ';

	    dom.bind(this.__input, 'keydown', function(e) {
	      if (e.keyCode === 13) { // on enter
	        onBlur.call(this);
	      }
	    });

	    dom.bind(this.__input, 'blur', onBlur);

	    dom.bind(this.__selector, 'mousedown', function(e) {

	      dom
	        .addClass(this, 'drag')
	        .bind(window, 'mouseup', function(e) {
	          dom.removeClass(_this.__selector, 'drag');
	        });

	    });

	    var value_field = document.createElement('div');

	    common.extend(this.__selector.style, {
	      width: '122px',
	      height: '102px',
	      padding: '3px',
	      backgroundColor: '#222',
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
	    });

	    common.extend(this.__field_knob.style, {
	      position: 'absolute',
	      width: '12px',
	      height: '12px',
	      border: this.__field_knob_border + (this.__color.v < .5 ? '#fff' : '#000'),
	      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
	      borderRadius: '12px',
	      zIndex: 1
	    });
	    
	    common.extend(this.__hue_knob.style, {
	      position: 'absolute',
	      width: '15px',
	      height: '2px',
	      borderRight: '4px solid #fff',
	      zIndex: 1
	    });

	    common.extend(this.__saturation_field.style, {
	      width: '100px',
	      height: '100px',
	      border: '1px solid #555',
	      marginRight: '3px',
	      display: 'inline-block',
	      cursor: 'pointer'
	    });

	    common.extend(value_field.style, {
	      width: '100%',
	      height: '100%',
	      background: 'none'
	    });
	    
	    linearGradient(value_field, 'top', 'rgba(0,0,0,0)', '#000');

	    common.extend(this.__hue_field.style, {
	      width: '15px',
	      height: '100px',
	      display: 'inline-block',
	      border: '1px solid #555',
	      cursor: 'ns-resize'
	    });

	    hueGradient(this.__hue_field);

	    common.extend(this.__input.style, {
	      outline: 'none',
	//      width: '120px',
	      textAlign: 'center',
	//      padding: '4px',
	//      marginBottom: '6px',
	      color: '#fff',
	      border: 0,
	      fontWeight: 'bold',
	      textShadow: this.__input_textShadow + 'rgba(0,0,0,0.7)'
	    });

	    dom.bind(this.__saturation_field, 'mousedown', fieldDown);
	    dom.bind(this.__field_knob, 'mousedown', fieldDown);

	    dom.bind(this.__hue_field, 'mousedown', function(e) {
	      setH(e);
	      dom.bind(window, 'mousemove', setH);
	      dom.bind(window, 'mouseup', unbindH);
	    });

	    function fieldDown(e) {
	      setSV(e);
	      // document.body.style.cursor = 'none';
	      dom.bind(window, 'mousemove', setSV);
	      dom.bind(window, 'mouseup', unbindSV);
	    }

	    function unbindSV() {
	      dom.unbind(window, 'mousemove', setSV);
	      dom.unbind(window, 'mouseup', unbindSV);
	      // document.body.style.cursor = 'default';
	    }

	    function onBlur() {
	      var i = interpret(this.value);
	      if (i !== false) {
	        _this.__color.__state = i;
	        _this.setValue(_this.__color.toOriginal());
	      } else {
	        this.value = _this.__color.toString();
	      }
	    }

	    function unbindH() {
	      dom.unbind(window, 'mousemove', setH);
	      dom.unbind(window, 'mouseup', unbindH);
	    }

	    this.__saturation_field.appendChild(value_field);
	    this.__selector.appendChild(this.__field_knob);
	    this.__selector.appendChild(this.__saturation_field);
	    this.__selector.appendChild(this.__hue_field);
	    this.__hue_field.appendChild(this.__hue_knob);

	    this.domElement.appendChild(this.__input);
	    this.domElement.appendChild(this.__selector);

	    this.updateDisplay();

	    function setSV(e) {

	      e.preventDefault();

	      var w = dom.getWidth(_this.__saturation_field);
	      var o = dom.getOffset(_this.__saturation_field);
	      var s = (e.clientX - o.left + document.body.scrollLeft) / w;
	      var v = 1 - (e.clientY - o.top + document.body.scrollTop + gui.getRoot().domElement.scrollTop) / w;

	      if (v > 1) v = 1;
	      else if (v < 0) v = 0;

	      if (s > 1) s = 1;
	      else if (s < 0) s = 0;

	      _this.__color.v = v;
	      _this.__color.s = s;

	      _this.setValue(_this.__color.toOriginal());


	      return false;

	    }

	    function setH(e) {

	      e.preventDefault();

	      var s = dom.getHeight(_this.__hue_field);
	      var o = dom.getOffset(_this.__hue_field);
	      var h = 1 - (e.clientY - o.top + document.body.scrollTop + gui.getRoot().domElement.scrollTop) / s;

	      if (h > 1) h = 1;
	      else if (h < 0) h = 0;

	      _this.__color.h = h * 360;

	      _this.setValue(_this.__color.toOriginal());

	      return false;

	    }

	  };

	  ColorController.superclass = Controller;

	  common.extend(

	      ColorController.prototype,
	      Controller.prototype,

	      {

	        updateDisplay: function() {

	          var i = interpret(this.getValue());

	          if (i !== false) {

	            var mismatch = false;

	            // Check for mismatch on the interpreted value.

	            common.each(Color.COMPONENTS, function(component) {
	              if (!common.isUndefined(i[component]) &&
	                  !common.isUndefined(this.__color.__state[component]) &&
	                  i[component] !== this.__color.__state[component]) {
	                mismatch = true;
	                return {}; // break
	              }
	            }, this);

	            // If nothing diverges, we keep our previous values
	            // for statefulness, otherwise we recalculate fresh
	            if (mismatch) {
	              common.extend(this.__color.__state, i);
	            }

	          }

	          common.extend(this.__temp.__state, this.__color.__state);

	          this.__temp.a = 1;

	          var flip = (this.__color.v < .5 || this.__color.s > .5) ? 255 : 0;
	          var _flip = 255 - flip;

	          common.extend(this.__field_knob.style, {
	            marginLeft: 100 * this.__color.s - 7 + 'px',
	            marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
	            backgroundColor: this.__temp.toString(),
	            border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip +')'
	          });

	          this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px'

	          this.__temp.s = 1;
	          this.__temp.v = 1;

	          linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toString());

	          common.extend(this.__input.style, {
	            backgroundColor: this.__input.value = this.__color.toString(),
	            color: 'rgb(' + flip + ',' + flip + ',' + flip +')',
	            textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip +',.7)'
	          });

	        }

	      }

	  );
	  
	  var vendors = ['-moz-','-o-','-webkit-','-ms-',''];
	  
	  function linearGradient(elem, x, a, b) {
	    elem.style.background = '';
	    common.each(vendors, function(vendor) {
	      elem.style.cssText += 'background: ' + vendor + 'linear-gradient('+x+', '+a+' 0%, ' + b + ' 100%); ';
	    });
	  }
	  
	  function hueGradient(elem) {
	    elem.style.background = '';
	    elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);'
	    elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	    elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);'
	  }


	  return ColorController;

	})(dat.controllers.Controller,
	dat.dom.dom,
	dat.color.Color = (function (interpret, math, toString, common) {

	  var Color = function() {

	    this.__state = interpret.apply(this, arguments);

	    if (this.__state === false) {
	      throw 'Failed to interpret color arguments';
	    }

	    this.__state.a = this.__state.a || 1;


	  };

	  Color.COMPONENTS = ['r','g','b','h','s','v','hex','a'];

	  common.extend(Color.prototype, {

	    toString: function() {
	      return toString(this);
	    },

	    toOriginal: function() {
	      return this.__state.conversion.write(this);
	    }

	  });

	  defineRGBComponent(Color.prototype, 'r', 2);
	  defineRGBComponent(Color.prototype, 'g', 1);
	  defineRGBComponent(Color.prototype, 'b', 0);

	  defineHSVComponent(Color.prototype, 'h');
	  defineHSVComponent(Color.prototype, 's');
	  defineHSVComponent(Color.prototype, 'v');

	  Object.defineProperty(Color.prototype, 'a', {

	    get: function() {
	      return this.__state.a;
	    },

	    set: function(v) {
	      this.__state.a = v;
	    }

	  });

	  Object.defineProperty(Color.prototype, 'hex', {

	    get: function() {

	      if (!this.__state.space !== 'HEX') {
	        this.__state.hex = math.rgb_to_hex(this.r, this.g, this.b);
	      }

	      return this.__state.hex;

	    },

	    set: function(v) {

	      this.__state.space = 'HEX';
	      this.__state.hex = v;

	    }

	  });

	  function defineRGBComponent(target, component, componentHexIndex) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'RGB') {
	          return this.__state[component];
	        }

	        recalculateRGB(this, component, componentHexIndex);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'RGB') {
	          recalculateRGB(this, component, componentHexIndex);
	          this.__state.space = 'RGB';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function defineHSVComponent(target, component) {

	    Object.defineProperty(target, component, {

	      get: function() {

	        if (this.__state.space === 'HSV')
	          return this.__state[component];

	        recalculateHSV(this);

	        return this.__state[component];

	      },

	      set: function(v) {

	        if (this.__state.space !== 'HSV') {
	          recalculateHSV(this);
	          this.__state.space = 'HSV';
	        }

	        this.__state[component] = v;

	      }

	    });

	  }

	  function recalculateRGB(color, component, componentHexIndex) {

	    if (color.__state.space === 'HEX') {

	      color.__state[component] = math.component_from_hex(color.__state.hex, componentHexIndex);

	    } else if (color.__state.space === 'HSV') {

	      common.extend(color.__state, math.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));

	    } else {

	      throw 'Corrupted color state';

	    }

	  }

	  function recalculateHSV(color) {

	    var result = math.rgb_to_hsv(color.r, color.g, color.b);

	    common.extend(color.__state,
	        {
	          s: result.s,
	          v: result.v
	        }
	    );

	    if (!common.isNaN(result.h)) {
	      color.__state.h = result.h;
	    } else if (common.isUndefined(color.__state.h)) {
	      color.__state.h = 0;
	    }

	  }

	  return Color;

	})(dat.color.interpret,
	dat.color.math = (function () {

	  var tmpComponent;

	  return {

	    hsv_to_rgb: function(h, s, v) {

	      var hi = Math.floor(h / 60) % 6;

	      var f = h / 60 - Math.floor(h / 60);
	      var p = v * (1.0 - s);
	      var q = v * (1.0 - (f * s));
	      var t = v * (1.0 - ((1.0 - f) * s));
	      var c = [
	        [v, t, p],
	        [q, v, p],
	        [p, v, t],
	        [p, q, v],
	        [t, p, v],
	        [v, p, q]
	      ][hi];

	      return {
	        r: c[0] * 255,
	        g: c[1] * 255,
	        b: c[2] * 255
	      };

	    },

	    rgb_to_hsv: function(r, g, b) {

	      var min = Math.min(r, g, b),
	          max = Math.max(r, g, b),
	          delta = max - min,
	          h, s;

	      if (max != 0) {
	        s = delta / max;
	      } else {
	        return {
	          h: NaN,
	          s: 0,
	          v: 0
	        };
	      }

	      if (r == max) {
	        h = (g - b) / delta;
	      } else if (g == max) {
	        h = 2 + (b - r) / delta;
	      } else {
	        h = 4 + (r - g) / delta;
	      }
	      h /= 6;
	      if (h < 0) {
	        h += 1;
	      }

	      return {
	        h: h * 360,
	        s: s,
	        v: max / 255
	      };
	    },

	    rgb_to_hex: function(r, g, b) {
	      var hex = this.hex_with_component(0, 2, r);
	      hex = this.hex_with_component(hex, 1, g);
	      hex = this.hex_with_component(hex, 0, b);
	      return hex;
	    },

	    component_from_hex: function(hex, componentIndex) {
	      return (hex >> (componentIndex * 8)) & 0xFF;
	    },

	    hex_with_component: function(hex, componentIndex, value) {
	      return value << (tmpComponent = componentIndex * 8) | (hex & ~ (0xFF << tmpComponent));
	    }

	  }

	})(),
	dat.color.toString,
	dat.utils.common),
	dat.color.interpret,
	dat.utils.common),
	dat.utils.requestAnimationFrame = (function () {

	  /**
	   * requirejs version of Paul Irish's RequestAnimationFrame
	   * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	   */

	  return window.requestAnimationFrame ||
	      window.webkitRequestAnimationFrame ||
	      window.mozRequestAnimationFrame ||
	      window.oRequestAnimationFrame ||
	      window.msRequestAnimationFrame ||
	      function(callback, element) {

	        window.setTimeout(callback, 1000 / 60);

	      };
	})(),
	dat.dom.CenteredDiv = (function (dom, common) {


	  var CenteredDiv = function() {

	    this.backgroundElement = document.createElement('div');
	    common.extend(this.backgroundElement.style, {
	      backgroundColor: 'rgba(0,0,0,0.8)',
	      top: 0,
	      left: 0,
	      display: 'none',
	      zIndex: '1000',
	      opacity: 0,
	      WebkitTransition: 'opacity 0.2s linear',
	      transition: 'opacity 0.2s linear'
	    });

	    dom.makeFullscreen(this.backgroundElement);
	    this.backgroundElement.style.position = 'fixed';

	    this.domElement = document.createElement('div');
	    common.extend(this.domElement.style, {
	      position: 'fixed',
	      display: 'none',
	      zIndex: '1001',
	      opacity: 0,
	      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
	      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
	    });


	    document.body.appendChild(this.backgroundElement);
	    document.body.appendChild(this.domElement);

	    var _this = this;
	    dom.bind(this.backgroundElement, 'click', function() {
	      _this.hide();
	    });


	  };

	  CenteredDiv.prototype.show = function() {

	    var _this = this;

	    this.backgroundElement.style.display = 'block';

	    this.domElement.style.display = 'block';
	    this.domElement.style.opacity = 0;
	//    this.domElement.style.top = '52%';
	    this.domElement.style.webkitTransform = 'scale(1.1)';

	    this.layout();

	    common.defer(function() {
	      _this.backgroundElement.style.opacity = 1;
	      _this.domElement.style.opacity = 1;
	      _this.domElement.style.webkitTransform = 'scale(1)';
	    });

	  };

	  CenteredDiv.prototype.hide = function() {

	    var _this = this;

	    var hide = function() {

	      _this.domElement.style.display = 'none';
	      _this.backgroundElement.style.display = 'none';

	      dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
	      dom.unbind(_this.domElement, 'transitionend', hide);
	      dom.unbind(_this.domElement, 'oTransitionEnd', hide);

	    };

	    dom.bind(this.domElement, 'webkitTransitionEnd', hide);
	    dom.bind(this.domElement, 'transitionend', hide);
	    dom.bind(this.domElement, 'oTransitionEnd', hide);

	    this.backgroundElement.style.opacity = 0;
	//    this.domElement.style.top = '48%';
	    this.domElement.style.opacity = 0;
	    this.domElement.style.webkitTransform = 'scale(1.1)';

	  };

	  CenteredDiv.prototype.layout = function() {
	    this.domElement.style.left = window.innerWidth/2 - dom.getWidth(this.domElement) / 2 + 'px';
	    this.domElement.style.top = window.innerHeight/2 - dom.getHeight(this.domElement) / 2 + 'px';
	  };
	  
	  function lockScroll(e) {
	    console.log(e);
	  }

	  return CenteredDiv;

	})(dat.dom.dom,
	dat.utils.common),
	dat.dom.dom,
	dat.utils.common);

	module.exports = dat;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./toy.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./toy.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "\n#p5toy-container {\n\tdisplay: flex;\n\tflex-wrap: nowrap;\n}\n\n#p5toy-container > div {\n\tbox-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);\n}\n\n#p5toy-mainbox {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbackground: repeating-linear-gradient(-45deg, #ededed, #ededed 10px, #f5f5f5 10px, #f5f5f5 20px );\n\tmin-width: 280px;\n\tposition: relative;\n}\n\n#p5toy-open {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tmargin: 8px;\n\twidth: 52px;\n\theight: 52px;\n\topacity: 0;\n\tbackground: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADGElEQVRoQ+1Z7XXUMBDcqQA6IKkAUgGkAqACQgWECggVECogVABUQFIBoQKSDqCC4Q1PvuezLe3KliH3uP2TH5FXO/s5q4PtuGDH7bc9gH8dwaYRIPnNzB45oK4BHLUC3hoAI4YBaHZvM0Ukn5jZ1wgAMzsGcBk8Wzy2B9C5h+SZmb0JevU1gPPg2b8WgRoAbwHo/GJxU6iX29dmdg7gY/9WkgfJ88/M7H7QohszOxvq0rckn5rZaepmRwB0NisRAMPW+NPMLszsvZm9SJdFDR8aIuNeqqBJSpeiIod0cgngeDYAkidm9iHo1SXH5JScE4odKxsBklL4oyItlgAofXsD4DB3oASgpijXMr7Tm+1akwBSYcr7d0WUYocA9HdLcgA+mZm6yhy5VbcyMxWgOpc6i/iRJrW6y4M5StU0AOj7MoBKSjDU5w4okjLi3UwQisJWWx1FgKQ8rwjUinr2H497ssBJarlq4RvJpZBC/rki3K7nh6AqI/HLzE4AyCa/BlLeqo0KrSZjSW4B9IePF4DN/0kqHbyauErGT07kyCT2crba+x2CQBRczuQCSNEobVrh3J9II6WqdE9JcYB1H0QBZDetpdsVyUW6/xsApWJbK4W+A/AeCPx3IZLaskrLx5pFfApAtD0rJTKn1qiB5nkhVGxTFpAU3/JasHq/BtiIB0lnbpBpD9C4jy4q1VEItNA+ZqXw86lJP0Ul5i4x4VpYQFdCXEghnUul3Zwl+Sqx1fDE7h0cOSmXQqLDumiOKNz6/mpApx8nOu3lfO7OLwBGFD8HQLkvQ+7NQbDSN6P0yRZxog8eB1rJzkm1WU5UnMRBtrg2EFHpg6o22mOLpQdbKW6VYiVdoyWm7zGXC5HUK7IKsBPtvHpVu0iblXYGj9PnoiRdWlT0sKX2rYnf1+XSiQgAdQ2tit3T4mgrylxeSq2NE4aH0oxQ/clp7jO8CyCa4JWv0+6iEr23JYCarlVNPXKAWgLY/0ITTZuqLlSjtLQebl16F3/kS9NbneqhA9ptjTVOa1YDNZe2PLsH0NKbc3TtfAR+A36aTECwLSqWAAAAAElFTkSuQmCC);\n\ttransition: 150ms;\n\tmix-blend-mode: exclusion;\n\tz-index: 15;\n}\n#p5toy-mainbox.p5toy-sbHidden:hover > #p5toy-open {\n\topacity: 0.7;\n}\n#p5toy-mainbox.p5toy-sbHidden:hover > #p5toy-open:hover {\n\tcursor: pointer;\n\topacity: 1;\n}\n\n#p5toy-sidebox {\n\tmargin-left: 20px;\n\tbackground: #fff;\n\toverflow: hidden;\n\ttransition: 150ms ease-in;\n\twidth: 240px;\n}\n\n#p5toy-sidebox.p5toy-sbHidden {\n\twidth: 0;\n\tmargin-left: 0;\n}\n\n#p5toy-controls {\n\tdisplay: inline-flex;\n\toverflow: hidden;\n}\n\n#p5toy-controls > div {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\twidth: 60px;\n\theight: 60px;\n\tcursor: pointer;\n\tposition: relative;\n}\n\n#p5toy-play {\n\tbackground: #6eb3ee;\n}\n\n#p5toy-snapshot {\n\tbackground: #eed56e;\n}\n\n#p5toy-record {\n\tbackground: #cd5c5c;\n}\n\n#p5toy-close {\n\tbackground: #424242;\n}\n\n.p5toy-snapshot-button {\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-repeat: no-repeat;\n    background-size: 48px;\n    background-position: 45% 60%;\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFT0lEQVR4Xu2c8VXUQBDGZypQK1AqECoQOtAKlAqECtQKhAqECsAKhAqECoQKhArG98EGjyPZneR2M7vH5D3+IblM8v1mdjczkzD5ZqoAm1p34+QAjJ3AATgAYwWMzXsEOABjBYzNewQ4gP8KiMgnIvpRWJMjZt4tbEN9+moiYCbxO2GqgVAFgJnFrwqCOQAj8auBYArAWPwqIJgBqER8cwgmACoT3xTC7AAqFd8MwmgAIvKGiD4T0TYRbaoXvOt94AURnRHRITNfjbnVUQBE5DsR7Y0x8AyPPWDmfe19qwGIyG/3eK2sdMbMO5qjVQBE5CAMO5pz+jH3CmA4So4WSQBhzP/jqk5SYCM1J2gAuPdP0l4XBRoAPvZPB3DBzFuxn2sAyHT7/ktmjmrsAAr7iAMoLHDq9A4gpVDh/Q6gsMCp068TgPOQb0HO5YaZkX952EQEeamXIUeFPNW7lDhz7G8dwDURfSWiU2a+GSOYiAAGivx4Gn095rc5j20VwJ3wzHyUQ4yQAgfI2UG0COAwiD/K41OgQkQAAlLps20tAbjFkMHMpyXVEZH3RITIelHSTnfuVgBA/O3libWUQGHCxmReHEILANTiB+E+hroEJtmuIocVEYYsiPpTA3IuCC0A+JAadkQEomP8RjlUs6EsiEn8OHZwGI5ONCecekztAKJFi1CLQK8o1vVTNkTEbiwnX7rYVDMALDU3h9b3IgLR4Z0YalbZMDTtDA1LYXWEIazIErVmAPDM3nV+EP/XKqr3/HYrAqFYV3atAK6ZuXc8D8MOikCrev4yA0QCIPS2jYgI/p89CmoFEPN+eP7UMT8VNIPdCiKClAXabrJutQJ41Tf2z9Q117vqCnPB36zqE1GNAM6ZudfDRQTdF9ql5lStrph5o+/HIoJVU9Ysao0AvjEz1vSPtvBghLF/jq13QhYRXNeXnBdQIwAsCeFpywDmbH8ZcgJEZtbVV40Ahrwve/hHPLl3GCwRhdUBGLqgmXtPB/t1RCRrG05LALLeeGocjzhC1utwAAMkHMDTSRj5mLcpz820/5KZe18uWfshKKQDHnU0QNQSa3CfhPsVqHkZinJl1vpAdXMAEfmD2IJjWjTnxlIRRTKSS4EYy8RmfxapMQKghyfjgldYRABM7zMzUg9PtsKTcSz6nlU6OpaRRDYUq6TcLSPovkAJdKggUyQTW+sQBM/3kiTqBakHm9wPJgv24IlIzPW2IIa6MLrkVo2EaN9RKMQgDV6kDlFzBICFpi0FhfupRRK0tKPdcfDzAc+5LaULBk1jFroWxnQ3o+VlT9Hwlf3Ba3lEqT0CcL3Rvp3FGwr5eoiGwgm6Jrrc0eVCayLeJXiS6ugpACEXhOJL7u6LR6ZaADAKQmrO0uwPIIuLj2tpBUAHASujOdrT0e5Y1PM7R2gJQHfNeEBDvqjECxoouCc/oKGJIu0xLQLAvam6m7UiTOiu1p46eVyrALobAwhExPHYiAjre7S1w+OLrPGT6jc2B6TuB5nK7u924DVVPLRhhdT9pc5ZfH/rEVBcoNIGHEBphRPndwAOwFgBY/MeAWsAYM5+HWO5spsf7D96eFJOmSydrk3Zb3x/8tOVmoIMHmL8s5XTPGH1z1bCrkfBJPWT3n+XLdWeWkR8LtCKdf+5BNQtkpsagEdCUsvuAJXnqyfhZbPhPV4kuJBvmaubWX33RgeiIoc8Fb6cXu7z9UY3t9ZmRw1Ba62E0c05ACPhJ88Bxte7duY9AoyROgAHYKyAsXmPAAdgrICxeY8AB2CsgLF5jwAHYKyAsXmPAAdgrICxeY8AYwD/AAgzrH/GSVQUAAAAAElFTkSuQmCC);\n}\n\n#p5toy-png {\n\tvisibility: hidden;\n\twidth: 100%;\n\theight: 100%;\n\ttop: 0;\n\tleft: 0;\n\tbackground-repeat: no-repeat;\n\tbackground-size: 45px;\n\tbackground-position: center center;\n\tbackground-color: #eed56e;\n\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFd0lEQVR4Xu2c7XXVMAyGrQloJwAmgE5AOwFsQJkAmAA6Ae0ElAmACWgnoJ0ANqBMIM7bOj25vo4lx04drpVz7q8kdqJHryR/5JKzo6kFqGnv1rkzAI2dwAAYgMYWaNy9KcAANLZA4+5NAbsGgJmfOOfeOucOnXPPG79fre6vnHMXzrkzIvpdq1G0U1UBzPzJOfeu5gOusK1TInpf67mqAWDmnzvk8ZJ9r4joQLpIc74KAGY+9WFH0+euXINwVKz2YgA+5v/aFatmvsfT0pxQA0CP3j9wKlZBDQA9xf5QIMW5oAYAzpTtTl1OREU2LLoZlmTmJIDSB2xNa+n3MwACYQPQWAIGwACkLbC0hzS2/+I5znKA5YDWPt5W4aYAU4ApoMgCloRtJFzkQNLNSzuY5QDLAZIPtj1vCmhrfxuINba/ATAAgQV2dN9PKefZ+4ayqqBO9v2UwsjaN6QG0Nm+n1II6rViFYBO9/2UQlDtmBABdL7vpxSCuG9IA6DnfT+lAEQVaAD0vO+nFICYCzQAut73U0pA2pazBIAjxUPjuwF8P/BScW3YHr4/+Dxx3xfn3Hlw7ofQx3d/zw0R4RsAjH7RB36v/O+x4jmjlzw4AKnD8VMy855/+UkQsfaYGYZ6EXnjEyL6GPQxpeBr59wxEWEQlTyYGW1+kK6LnZfsUV0BUoexh2RmeO1r7QswM9QT82wtABj/kIhutEZl5uOE8iabkeyxOAAv57GE/8a8jpnx6c+W1KdeYAKaFsBB+AzMjHADJ4AqvxHRWWjVhPJWDSAm363yjJnxsQM+cdo4EgAQo8PvEjQAvhARvPn+mPDucyJ6o7guKaI1KGAqfu6PQ8BUWEm9QEQFGgAx7//jPT805sZAas6gdM0Ajoaqw1ce0bguAAhVIAII20vkEzwWclP4VeRGkpdyyJoBzFIAvHD8WVCgAgnAJREB9Dj8zK5wJOPj/FoBxOKwKgd4jwWE23rfl7Lw0kfOOQMQkTgS3pD0UPahwggHSzAkEipCSjIJewAYiCGW35aRozq9BoATwbOzxgPNFaCRKTPDoBuVyXBfImbfG3ukAiyGpAZiYgiSDCbtkpAcaOu8ZKDaHQbxFzU3jI8aPHokAMD7UaWMVYCYawBSUL23YhoBRo96/fh+oWoJVYCpBUyfj5PseCpCVIBzbgwQuWqjCqrtkA8xEi6qMgQAoQr2wumFwGCYcNsPAE1Na+CyjVLZ55us2WEppP3vAGCTrcSbUABOxQZiAIkqKjwMgHLgNLn0FwkZsUoJ4fCrAYhYQAlga1wxNBUBsBG2RtchFGEsglL4tlzGSFgIaVINs9qBmPjgijI0bCOqgomkeUFEmoWjjT58AYF5I/XRQw4YjBFVQaJqwUIMYrxqTYCZMVWNCguls/roCQCMsqUCoWwch5rLIHnD0M9Gy5Jbo3QNhQcHoHmolV8DKFlennqfGgAgVXiCHfkWuCai5B8XasYBtjEr3/DDHVU2ZsWW/uY/Ul93lm9NhL1sc+4srxG9H62KIWjompktF+g5iLH/fpyjb9OUoLSVyvNnAfDhCDkBQ3YM3a06urMkNnphtx4WhLL+2lgdgqboS/PjUh2s9Kpmly39fgZAQGsAmvn+XccGwACkLbC0hzS2vynAADROUgbAACz618xWhjZ2MANgAFpH+bZVnilg1xWwbv8uf7rSua4aCuh5nUA97z+FugaAnteMs+b+YxBqAOh5zVhc85WCXDEAP2PYowqKvR+2qwLAQ+gpFxTH/kEZ1QB0pIQqnr8IAA9hF9eMZ6/5PkgOkDqx89MWqBqCzND5FjAA+TareocBqGrO/MYMQL7Nqt5hAKqaM78xA5Bvs6p3GICq5sxv7B9SK7WO60ToTAAAAABJRU5ErkJggg==);\n\tposition: absolute;\n\tz-index: 10;\n\topacity: 0;\n\ttransition: 250ms;\n}\n\n.p5toy-download #p5toy-png {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n.p5toy-x-button {\n    position: relative;\n    width: 75%;\n    height: 75%;\n    transition: 50ms;\n}\n#p5toy-sidebox.p5toy-sbHidden .p5toy-x-button {\n\ttransform: rotate(-45deg);\n}\n\n.p5toy-bar {\n    background: white;\n    width: 16%;\n    height: 100%;\n    margin-left: 41%;\n}\n.p5toy-bar-1 {\n\ttransform: rotate(45deg);\n\tfloat: left;\n}\n.p5toy-bar-2 {\n\ttransform: rotate(-45deg);\n}\n\n.p5toy-record-button {\n\theight: 62%;\n\twidth: 62%;\n\tbackground: white;\n\tborder-radius: 50%;\n\tposition: relative;\n\ttransition: 0.25s ease;\n}\n\n.p5toy-recording .p5toy-record-button {\n\tborder-radius: 0;\n}\n\n.p5toy-recording .p5toy-record-progress-1, .p5toy-recording .p5toy-record-progress-2 {\n\tdisplay: block;\n}\n\n.p5toy-record-progress-1, .p5toy-record-progress-2 {\n\tbackground: #79c784;\n\tmargin-top: 0;\n\tdisplay: none;\n}\n\n.p5toy-record-progress-1 {\n\theight: 7.44px;\n\twidth: 0;\n\tfloat: left;\n}\n\n.p5toy-record-progress-2 {\n\theight: 0;\n\twidth: 37.2px;\n}\n\n.p5toy-download .p5toy-record-progress-2 {\n\ttransition: 250ms;\n\tmargin-left: -11px;\n\tmargin-top: -11px;\n\twidth: 60px;\n\theight: 60px;\n}\n\n#p5toy-blob {\n\tvisibility: hidden;\n\twidth: 100%;\n\theight: 100%;\n\ttop: 0;\n\tleft: 0;\n\tbackground-repeat: no-repeat;\n\tbackground-size: 45px;\n\tbackground-position: center center;\n\tbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAFA0lEQVR4Xu2djXHUMBCFdysAKgAqgFRAUgGhAqACkgoIFZBUQFIBUAFJBSQVkHQQKljmMbqM4/Od9Xzrk3xezzBh5nT6eZ9WWkkrn0o8RRXQoqVH4RIACneCABAACitQuPiwgABQWIHCxYcF7DoAM9sXkfcigr8vCrfXq/hbEbkUkQtVxd/Bz2gWYGZPReR7En5wBSfwRQB4p6r3Q+o6CoAk/i8ReT2kUhP8zrWIHAyBMBYAiI8hZ07PpaoesA12B5DGfACY4wMroOaEMQCcp0l3jgAwKX9gGj4GgD875O0wWiLtraq+ZL40BgBjKrBraVWV0pRKnCOWma0FwFYwp8xtpvFuXwAg6QUAUjDv5AHAW1EyvwBACuadPAB4K0rmFwBIwbyTBwBvRcn8AgApmHfyAOCtKJlfACAF804eALwVJfMLAKRg3skDgLeiZH4BgBTMO3kA8FaUzK86AGaGWJ9P6RB+V6IgEOWAs90zVUUM0MNTFQAz+yoiR2QnmlryU1U9XlS6GgBm9ntGcT8PISdVADCz0zTsTK03b1JfDEdHxQGkMR+RD3N8EPGwtu3smTd9JjzT3r/obGd9lr8NAHMa+9tWDu9orae3DQCzjvvpG3drBnAnIj+Sf33fjqE0M/QshLQjqBf/x98njQZfqepSwG97UmQFaLiX8Pvf9Anc9zlb/pA5gLWAKxE5YYNWzawtSAAA/T43rNVDjlUVLiv9BIAVkhEAPqoqIqUfPcmNfZuGmcWVJdwuwQSHZT96+q0nADP7nNEDENW88RWqWoagzjBtYusCMDAfNAUZPAQRnSaD0/okNQD4C+Ha13XM7JuIULHzraYGgMw5YKn3O92aCQCZAJbGfjOD+4lxf5MnAGQC2FNVjOEPT8cYjDXB0gTdogOfv+mXbwKg794W1h3NNcfgjlJ8DuiqQAeATjFb0E5EpOm9DAbQp2aHx9X3lZWfBwDyilCyapdVMPIqDkBEnnV4QO3VM/z9R0OQqn4JC8gwvAyfeumurJlhTni1Lvt2zzEztyEoo84ZLc9LUoMFLG0/5JwhBIA8wDl7QdequtcaTrCqxbCz0tMIAH4AkFPXMARXD+uB511FBQBfACvfHmJm2I5ovzsIVvMovCXmgBVAiAlt8CtckmsYk3AXAwIAvo5t5iNVvcg0sObqOQA4AFhkgQkY4z/+3XS92CgdSWJ+wPB02LE3P3glTHYatq88Sl+DG7pRA6b+5W0A6F1UTV3ENfW/YReUfVoMOZSfY1jiQscqArNwTBihiSu69uhDUHIR52gFdQTnLsDnbLD1jX8T+vynqsIz692K2YoFNCDMwRL+9/xGm13fCEZPwu1em+J8UEH472u3nCfU4+Ht4JAGt2PqvaI0ZKHGmmht0PoWdWz7NraADotwNdEAQCrg3UPI4kdP7t2+sAASWQAgBfNOHgC8FSXzCwCkYN7JA4C3omR+AYAUzDt5APBWlMwvAJCCeScPAN6KkvlNHgDZ3sklr2EvCLuHndFvk1OTr/CdqlI3LcfYiogf8SHAjQEA5wLxM1aZENwBoFzPKz+Z7aghWe+1q65KjgUA4eg4UdqVE7I+wDhB26/mpwyTFQACQhE3fgNJX+sLf46XkRwOER/1HsUCmoKkS9qLkPRd8Y5wzRYWfs6+BabdWUYHULh3Vl98ACiMKAAEgMIKFC4+LCAAFFagcPFhAQGgsAKFi/8Ho2JJjqqRr/AAAAAASUVORK5CYII=);\n\tposition: absolute;\n\tz-index: 10;\n\topacity: 0;\n\ttransition: 250ms;\n}\n\n.p5toy-download #p5toy-blob {\n\tvisibility: visible;\n\topacity: 1;\n}\n\n\n/* https://codepen.io/aralon/pen/NqGWXZ */\n.p5toy-play-button {\n\theight: 62%;\n\twidth: 62%;\n\tposition: relative;\n}\n.p5toy-left {\n\theight: 100%;\n\tfloat: left;\n\tbackground-color: #fff;\n\twidth: 36%;\n\t-webkit-transition: all 0.25s ease;\n\ttransition: all 0.25s ease;\n\toverflow: hidden;\n}\n.p5toy-triangle-1 {\n\t-webkit-transform: translate(0, -100%);\n\ttransform: translate(0, -100%);\n}\n.p5toy-triangle-2 {\n\t-webkit-transform: translate(0, 100%);\n\ttransform: translate(0, 100%);\n}\n.p5toy-triangle-1,\n.p5toy-triangle-2 {\n\tposition: absolute;\n\ttop: 0;\n\tright: 0;\n\tbackground-color: transparent;\n\twidth: 0;\n\theight: 0;\n\tborder-right: 37.2px solid #6eb3ee;\n\tborder-top: 19px solid transparent;\n\tborder-bottom: 19px solid transparent;\n\t-webkit-transition: -webkit-transform 0.25s ease;\n\ttransition: -webkit-transform 0.25s ease;\n\ttransition: transform 0.25s ease;\n\ttransition: transform 0.25s ease, -webkit-transform 0.25s ease;\n}\n.p5toy-right {\n\theight: 100%;\n\tfloat: right;\n\twidth: 36%;\n\tbackground-color: #fff;\n\t-webkit-transition: all 0.25s ease;\n\ttransition: all 0.25s ease;\n}\n.p5toy-paused .p5toy-left {\n\twidth: 50%;\n}\n.p5toy-paused .p5toy-right {\n\twidth: 50%;\n}\n.p5toy-paused .p5toy-triangle-1 {\n\t-webkit-transform: translate(0, -50%);\n\ttransform: translate(0, -50%);\n}\n.p5toy-paused .p5toy-triangle-2 {\n\t-webkit-transform: translate(0, 50%);\n\ttransform: translate(0, 50%);\n}\n/**/\n\n/* http://brm.io/dat-gui-light-theme/ */\n#p5toy-container .dg.main.taller-than-window .close-button {\n    border-top: 1px solid #ddd;\n}\n\n#p5toy-container .dg.main .close-button {\n    background-color: #ccc;\n}\n \n#p5toy-container .dg.main .close-button:hover {\n    background-color: #ddd;\n}\n\n#p5toy-container .dg {\n    color: #555;\n    text-shadow: none !important;\n}\n\n#p5toy-container .dg.main::-webkit-scrollbar {\n    background: #fafafa;\n}\n\n#p5toy-container .dg.main::-webkit-scrollbar-thumb {\n    background: #bbb;\n}\n \n#p5toy-container .dg li:not(.folder) {\n    background: #fafafa;\n    border-bottom: 1px solid #ddd;\n}\n \n#p5toy-container .dg li.save-row .button {\n    text-shadow: none !important;\n}\n\n#p5toy-container .dg li.title {\n    background: #e8e8e8;\n}\n\n#p5toy-container .dg .cr.function:hover,#p5toy-container .dg .cr.boolean:hover {\n    background: #fff;\n}\n \n#p5toy-container .dg .c input[type=text] {\n    background: #e9e9e9;\n}\n \n#p5toy-container .dg .c input[type=text]:hover {\n    background: #eee;\n}\n \n#p5toy-container .dg .c input[type=text]:focus {\n    background: #eee;\n    color: #555;\n}\n \n#p5toy-container .dg .c .slider {\n    background: #e9e9e9;\n}\n\n#p5toy-container .dg .c .slider:hover {\n    background: #eee;\n}\n\n/**/\n\n#p5toy-container .dg.ac {\n\tposition: relative;\n}\n\n#p5toy-container .dg.main.a {\n\tmargin-right: 0;\n}\n\n#p5toy-container .close-button {\n\theight: 0;\n\tvisibility: hidden;\n\topacity: 0;\n}\n\n#p5toy-container .dg li {\n\ttransition: none;\n}\n\n#p5toy-container .dg .c input[type=text] {\n    background: #f5f2f0;\n}\n\n#p5toy-container .dg .cr.string input[type=text] {\n\tcolor: #35b928;\n}\n\n#p5toy-container .dg .cr {\n\tborder-left: 4px solid #e8e8e8 !important;\n}\n\n#p5toy-container .dg li.folder {\n\tborder-left: none;\n}\n\n#p5toy-container .cr.color {\n\toverflow: visible;\n}\n\n#p5toy-container .closed .cr.color {\n    overflow: hidden;\n}\n\n#p5toy-container .dg .c {\n\tposition: relative;\n}", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div id=\"p5toy-container\">\n\t<div id=\"p5toy-mainbox\"><div id=\"p5toy-open\"></div></div>\n\t<div id=\"p5toy-sidebox\">\n\t\t<div id=\"p5toy-controls\">\n\t\t\t<div id=\"p5toy-play\">\n\t\t\t\t<div class=\"p5toy-play-button\">\n\t\t\t\t\t<div class=\"p5toy-left\"></div>\n\t\t\t\t\t<div class=\"p5toy-right\"></div>\n\t\t\t\t\t<div class=\"p5toy-triangle-1\"></div>\n\t\t\t\t\t<div class=\"p5toy-triangle-2\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"p5toy-snapshot\">\n\t\t\t\t<a id=\"p5toy-png\" target=\"_blank\"></a>\n\t\t\t\t<div class=\"p5toy-snapshot-button\"></div>\n\t\t\t</div>\n\t\t\t<div id=\"p5toy-record\">\n\t\t\t\t<a id=\"p5toy-blob\" target=\"_blank\"></a>\n\t\t\t\t<div class=\"p5toy-record-button\">\n\t\t\t\t\t<div class=\"p5toy-record-progress-1\"></div>\n\t\t\t\t\t<div class=\"p5toy-record-progress-2\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div id=\"p5toy-close\">\n\t\t\t\t<div class=\"p5toy-x-button\">\n\t\t\t\t\t<div class=\"p5toy-bar p5toy-bar-1\"></div>\n\t\t\t\t\t<div class=\"p5toy-bar p5toy-bar-2\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";

/***/ }
/******/ ]);