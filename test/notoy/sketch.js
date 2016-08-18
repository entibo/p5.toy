
function setup() {
	createCanvas(400, 400);

	t = 0;
	gui = createGUI();
	gui.add("t").step(0.001).listen();

	gifQuality = 300;
	var gif = startGif(function() { return (t >= 1) });
	gif.on("finished", function(blob) {
		window.open(URL.createObjectURL(blob));
	});
}

function draw() {
	background(240);

	push();
	translate(width/2, height/2);
	noStroke();
	fill(30, 10, 190);
	var d = 0.7*width + abs(cos(t*PI))*(0.1*width);
	ellipse(0, 0, d, d);
	pop();

	t += 0.03;
}