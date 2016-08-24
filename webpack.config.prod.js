var webpack = require("webpack")
require("es6-promise").polyfill();
var autoprefixer = require("autoprefixer");

module.exports = {
	context: __dirname + "/src",
	entry: "./app.js",
	output: {
		path: __dirname + "/build",
		filename: "p5.toy.min.js"
	},
	resolve: {
		extensions: ["", ".js"]
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!postcss-loader"
			}
		]
	},
	postcss: function () {
        return [autoprefixer];
    },
	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};