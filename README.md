# p5.toy
Wraps [gif.js](https://github.com/jnordberg/gif.js) and [dat.gui](https://github.com/dataarts/dat.gui) into an intuitive graphical user interface for [p5.js](http://p5js.org/) sketches.  
It works both in global and instance modes.

## Usage
Include p5.toy after p5 in your html. For example:
```html
<head>
  <script src="p5.min.js"></script>
  <script src="p5.toy.min.js"></script>
  <script src="sketch.js"></script>
</head>
  ```
Now you can simply call [createToy()](#createtoyparent):
```javascript
function setup() {
	createCanvas(400, 400);
	createToy();
}
```
That will create the UI around your canvas!

## Documentation

##### [startGif()](#startgifstop)
##### [stopGif()](#stopgif)
##### [abortGif()](#abortgif)
##### [Gif options](#gif-options)  
##### [createGUI()](#createguiparams)  
##### [createToy()](#createtoyparent)
##### [expandToy()*](#expandtoy)
##### [collapseToy()*](#collapsetoy)
##### [showGUI()*](#showgui)
##### [hideGUI()*](#hidegui)
##### [addDefaultParams()*](#adddefaultparams)
##### [showButtons()*](#showbuttons)
##### [hideButtons()*](#hidebuttons)
##### [buttonSize()*](#buttonsizevalue)
##### [Button actions*](#button-actions)

\* _only available after calling createToy_


#### startGif(stop)
Starts a new gif and records a frame every time the draw() function is called. The `stop` argument is optional and it is a function that will be called after a frame has been added to check if the gif should stop:
```javascript
var t = 0;

function setup() {
  createCanvas(200, 200);
  startGif(function() {
    if(t >= 1) return true;
    else return false;
  });
}

function draw() {
  background(40);
  fill(240);

  push();
  translate(width/2, height/2);
  rotate(t*TAU);
  rect(0, 0, width/4, height/4);
  pop();

  t #####= 0.01;
}
```
It returns a GIF instance on which you can add event listeners:
```javascript
  var gif = startGif();
  gif.on("finished", function(blob) { ... });
```
By default it opens the gif in a new tab; if you want to change that, do
```javascript
  gif.removeListener("finished", _gifDefaultFinishedCallback);
```
#### stopGif()
Stops recording frames and renders the gif.
```javascript
var t = 0;

function setup() {
  createCanvas(200, 200);
  startGif();
}

function draw() {
  background(40);

  push();
  translate(width/2, height/2);
  rotate(t*TAU);
  fill(240);
  rect(0, 0, width/4, height/4);
  pop();

  t #####= 0.01;
  if(t >= 1) stopGif();
}
```
#### abortGif()
Stops recording frames but doesn't render the gif.
#### Gif options
###### gifWorkers (default: `2`)
###### gifQuality (default: `100`)
###### gifFps     (default: `30`)
More on those options: [gif.js#options](https://github.com/jnordberg/gif.js#options)  
Note that the default framerate for a gif is 30 but your sketch is trying to reach 60. To make sure that what you see is what you'll get, either make gifFps 60 or reduce the sketch fps with [frameRate()](http://p5js.org/reference/#/p5/frameRate)  
#### createGUI(params)
Equivalent to `new dat.GUI(params)`.  
See [http://workshop.chromeexperiments.com/examples/gui/](the guide) to get started.

I extended the dat.gui controllers to be friendlier in global mode:
###### controller.setObject(object)
###### controller.def(prop, value, params)
###### controller.defColor(pop, value, params)
`def` is almost like add, except you don't have to specify the object, and you can initialize the value of the property.  
The object is implied to be `window`, but can be changed with `setObject`.
```javascript
  // global scope
  var gui = createGUI();
  
  // This
  var myColor = "#fd5a88";
  gui.addColor(window, "myColor");
  
  // Is equivalent to this
  gui.defColor("myColor", "#fd5a88");
  // Or this
  var myColor = "#fd5a88";
  gui.defColor("myColor");
```













