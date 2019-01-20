/**
 * @module list/list
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ListCommand from '@ckeditor/ckeditor5-list/src/listcommand';

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

    init() {
        const editor = this.editor;
        editor.commands.add('numberedIDList', new ListCommand(editor, 'numbered'));
        editor.commands.add('bulletedIDList', new ListCommand(editor, 'bulleted'));
    }
}
