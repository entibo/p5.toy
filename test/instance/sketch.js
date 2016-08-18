
new p5(function(p) {

	var params = {
		t: 0,
		bgColor: [240, 240, 240]
	};

	p.setup = function() {
		p.createCanvas(400, 400);
		p.createToy();
		p.params.add(params, "t").step(0.001).listen();
		p.params.addColor(params, "bgColor");
		p.stopRecordButton = p.stopGif;
	}

	p.draw = function() {
		p.background(params.bgColor);

		p.push();
		p.translate(p.width/2, p.height/2);
		p.noStroke();
		p.fill(30, 10, 190);
		var d = 0.7*p.width + p.abs(p.cos(params.t*p.PI))*(0.1*p.width);
		p.ellipse(0, 0, d, d);
		p.pop();

		params.t += 0.01;
		params.t %= 1;
	}
});