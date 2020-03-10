/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './style.css';
import './editor.css';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
const name = 'radical-recipe-card/recipe-card';
const settings = {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Recipe Card', 'radical-recipe-card' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'radical-recipe-card'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		ingredients: {
			type: 'array',
			source: 'children',
			selector: '.ingredients',
		},
		instructions: {
			type: 'array',
			source: 'children',
			selector: '.steps',
		},
	},

	example: {
		attributes: {
			title: __( 'Chocolate Chip Cookies', 'radical-recipe-card' ),
			mediaURL:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/2ChocolateChipCookies.jpg/320px-2ChocolateChipCookies.jpg',
			ingredients: [
				__( 'flour', 'radical-recipe-card' ),
				__( 'sugar', 'radical-recipe-card' ),
				__( 'chocolate', 'radical-recipe-card' ),
				'💖',
			],
			instructions: [
				__( 'Mix', 'radical-recipe-card' ),
				__( 'Bake', 'radical-recipe-card' ),
				__( 'Enjoy', 'radical-recipe-card' ),
			],
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
	 *
	 * @param {Object} [props] Properties passed from the editor.
	 *
	 * @return {WPElement} Element to render.
	 */
	edit: ( props ) => {
		const {
			className,
			attributes: { title, mediaID, mediaURL, ingredients, instructions },
			setAttributes,
		} = props;
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeIngredients = ( value ) => {
			setAttributes( { ingredients: value } );
		};

		const onChangeInstructions = ( value ) => {
			setAttributes( { instructions: value } );
		};

		return (
			<div className={ className }>
				<RichText
					tagName="h2"
					placeholder={ __(
						'Write Recipe title…',
						'radical-recipe-card'
					) }
					value={ title }
					onChange={ onChangeTitle }
				/>
				<div className="recipe-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button
								className={
									mediaID
										? 'image-button'
										: 'button button-large'
								}
								onClick={ open }
							>
								{ ! mediaID ? (
									__( 'Upload Image', 'radical-recipe-card' )
								) : (
									<img
										src={ mediaURL }
										alt={ __(
											'Upload Recipe Image',
											'radical-recipe-card'
										) }
									/>
								) }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Ingredients', 'radical-recipe-card' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __(
						'Write a list of ingredients…',
						'radical-recipe-card'
					) }
					value={ ingredients }
					onChange={ onChangeIngredients }
					className="ingredients"
				/>
				<h3>{ __( 'Instructions', 'radical-recipe-card' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __(
						'Write the instructions…',
						'radical-recipe-card'
					) }
					value={ instructions }
					onChange={ onChangeInstructions }
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by the block editor into `post_content`.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
	 *
	 * @return {WPElement} Element to render.
	 */
	save: ( props ) => {
		const {
			className,
			attributes: { title, mediaURL, ingredients, instructions },
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h2" value={ title } />

				{ mediaURL && (
					<img
						className="recipe-image"
						src={ mediaURL }
						alt={ __( 'Recipe Image', 'radical-recipe-card' ) }
					/>
				) }

				<h3>{ __( 'Ingredients', 'radical-recipe-card' ) }</h3>
				<RichText.Content
					tagName="ul"
					className="ingredients"
					value={ ingredients }
				/>

				<h3>{ __( 'Instructions', 'radical-recipe-card' ) }</h3>
				<RichText.Content
					tagName="div"
					className="steps"
					value={ instructions }
				/>
			</div>
		);
	},
};

export { name, settings };
