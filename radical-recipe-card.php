<?php
/**
 * Plugin Name:     Radical Recipe Card
 * Description:     Example block written with ESNext standard and JSX support – build step required.
 * Version:         0.1.0
 * Author:          The WordPress Contributors
 * License:         GPL-2.0-or-later
 * Text Domain:     radical-recipe-card
 *
 * @package         radical-recipe-card
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function radical_recipe_card_recipe_card_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "radical-recipe-card/recipe-card" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'radical-recipe-card-recipe-card-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'radical-recipe-card-recipe-card-block-editor',
		plugins_url( "build/$editor_css", __FILE__ ),
		array(),
		filemtime( "$dir/build/$editor_css" )
	);

	$style_css = 'style.css';
	wp_register_style(
		'radical-recipe-card-recipe-card-block',
		plugins_url( "build/$style_css", __FILE__ ),
		array(),
		filemtime( "$dir/build/$style_css" )
	);

	register_block_type( 'radical-recipe-card/recipe-card', array(
		'editor_script' => 'radical-recipe-card-recipe-card-block-editor',
		'editor_style'  => 'radical-recipe-card-recipe-card-block-editor',
		'style'         => 'radical-recipe-card-recipe-card-block',
	) );
}
add_action( 'init', 'radical_recipe_card_recipe_card_block_init' );
