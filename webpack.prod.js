const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const defaultPlugins = defaultConfig.plugins;

/* Plugins */
// Compile block frontend and editor scss files into css files.
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const extractStyles = new ExtractTextPlugin( './style.css' );
const extractEditorStyles = new ExtractTextPlugin( './editor.css' );

const config = {
	...defaultConfig,
	mode: 'production',
	devtool: 'source-map',
	entry: [
		path.resolve( process.cwd(), `./src/index.js` ),
	],
	output: {
		path: path.resolve( process.cwd(), `./build` ),
		filename: 'index.js',
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /editor\.(sa|sc|c)ss$/,
				use: extractEditorStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: false,								
							},
						},
					],
				} ),
			},
			{
				test: /style\.(sa|sc|c)ss$/,
				use: extractStyles.extract( {
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: false,
							},
						},
					],
				} ),
			},
		],
	},
	plugins: [
		...defaultPlugins,
		extractStyles,
		extractEditorStyles,
	],
};

module.exports = config;
