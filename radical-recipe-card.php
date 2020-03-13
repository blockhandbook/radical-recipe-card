<?php
/**
 * Plugin Name:     Radical Recipe Card
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * Text Domain:     blockhandbook
 *
 * @package         blockhandbook
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function blockhandbook_radical_recipe_card_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "blockhandbook/radical-recipe-card" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'blockhandbook-radical-recipe-card-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'blockhandbook-radical-recipe-card-block-editor',
		plugins_url( "build/$editor_css", __FILE__ ),
		array(),
		filemtime( "$dir/build/$editor_css" )
	);

	$style_css = 'style.css';
	wp_register_style(
		'blockhandbook-radical-recipe-card-block',
		plugins_url( "build/$style_css", __FILE__ ),
		array(),
		filemtime( "$dir/build/$style_css" )
	);

	register_block_type( 'blockhandbook/radical-recipe-card', array(
		'editor_script' => 'blockhandbook-radical-recipe-card-block-editor',
		'editor_style'  => 'blockhandbook-radical-recipe-card-block-editor',
		'style'         => 'blockhandbook-radical-recipe-card-block',
	) );
}
add_action( 'init', 'blockhandbook_radical_recipe_card_block_init' );
