/**
 * External Dependencies
 */
import { hotBlockLoader, registerBlocks } from '@blockhandbook/block-hot-loader';

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */

/** Import the blocks **/
if ( module.hot ) {
	hotBlockLoader( {
		getContext: () => require.context( './blocks', true, /index\.js$/ ),
		module,
	} );
} else {
	registerBlocks( {
		getContext: () => require.context( './blocks', true, /index\.js$/ ),
		module,
	} );
}
