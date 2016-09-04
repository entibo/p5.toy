require("es6-promise").polyfill();
var autoprefixer = require("autoprefixer");

module.exports = {
	entry: "./app.js",
	output: {
		filename: "demo.js"
	},
	resolve: {
		extensions: ["", ".js"],
		alias: {
            'react': 'react-lite',
            'react-dom': 'react-lite'
        }
	},
	module: {
		loaders: [
			{
				test: /\.png$/,
				include: __dirname,
				loader: "url"
			},
			{
				test: /\.jsx?$/,
				include: __dirname,
				loader: "babel",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader!postcss-loader"
			},
			{
				test: /\.ttf$/,
				loader: "url"
			}
		]
	},
	postcss: function () {
        return [autoprefixer];
    }
};