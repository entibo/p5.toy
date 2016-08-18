
function setup() {
	createCanvas(400, 400);
	createToy();

	t = 0;
	params.add("t").step(0.001).listen();
	params.addColor("bgColor", [240, 240, 240]);
	params.addColor("fgColor", "#8a80ac");

	gifQuality = 300;
	recordButton = function() {
		t = 0;
		startGif(function() { return (t >= 1) });
	}

}

function draw() {
	background(bgColor);

	push();
	translate(width/2, height/2);
	noStroke();
	fill(fgColor);
	var d = 0.7*width + abs(cos(t*PI))*(0.1*width);
	ellipse(0, 0, d, d);
	pop();

	t += 0.01;
}