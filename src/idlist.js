/**
 * @module list/list
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

/**
 * ID List
 *
 * @extends module:core/plugin~Plugin
 */
export default class List extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'IDList';
	}
}
