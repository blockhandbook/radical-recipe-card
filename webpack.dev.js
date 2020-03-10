const path = require( 'path' );
const webpack = require( 'webpack' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

/* Plugins */

// Hot Module Replacement
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

// Compile block frontend and editor scss files into css files.
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const extractStyles = new ExtractTextPlugin( './style.css' );
const extractEditorStyles = new ExtractTextPlugin( './editor.css' );

// Remove LiveReloadPlugin if in development mode
const defaultPlugins = defaultConfig.plugins.map( ( plugin ) => {
	if ( plugin.constructor.name.includes( 'LiveReloadPlugin' ) ) {
		return false;
	}
	return plugin;
} ).filter( plugin => plugin );

const config = {
	...defaultConfig,
	mode: 'development',
	devtool: 'source-map',
	entry: [
		path.resolve( process.cwd(), `src/index.js` ),
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true',
	],
	output: {
		publicPath: `/build/`,
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
								sourceMap: true,								
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
								sourceMap: true,
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
		hotModuleReplacementPlugin
	],
};

module.exports = config;
