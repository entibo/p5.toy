var webpack = require('webpack')
require('es6-promise').polyfill();

var unminimized = {
	context: __dirname + "/src",
	entry: "./app.js",
	output: {
		path: __dirname + "/build",
		filename: "p5.toy.js"
	},
	resolve: {
		extensions: ["", ".js"]
	},
	module: {

	},
	plugins: []
};

var minimized = JSON.parse(JSON.stringify(unminimized));
console.log(minimized);

minimized.plugins.push(new webpack.optimize.UglifyJsPlugin());
minimized.output.filename = "p5.toy.min.js";

module.exports = [unminimized, minimized];