var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;
var fs = require('fs');

var libraryName = 'neoui-kero-mixin';
var data = fs.readFileSync('./package.json', 'utf8');
var packageObj = JSON.parse(data);
var headerStr = '';
headerStr += packageObj.name + ' v' + packageObj.version + '\r\n';
headerStr += packageObj.description + '\r\n';
headerStr += 'author : ' + packageObj.author + '\r\n';
headerStr += 'homepage : ' + packageObj.homepage + '\r\n';
headerStr += 'bugs : ' + packageObj.bugs.url;
var plugins = [new webpack.BannerPlugin(headerStr)],
    outputFile;


var plugins = [],
	outputFile;

if(env === 'build') {
	plugins.push(new UglifyJsPlugin({
		minimize: true
	}));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

var config = {
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + '/dist',
		filename: outputFile,
		libraryTarget: 'var',
		umdNamedDefine: true
	},
	module: {
		loaders: [{
			test: /(\.jsx|\.js)$/,
			loader: 'babel',
			exclude: /(bower_components)/
		}, {
			test: /(\.jsx|\.js)$/,
			loader: "eslint-loader",
			exclude: /node_modules/
		}]
	},
	resolve: {
		root: path.resolve('./src'),
		extensions: ['', '.js']
	},
	plugins: plugins
};

module.exports = config;
