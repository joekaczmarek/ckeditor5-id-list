/**
 * @module list/list
 */

import numberedListIcon from '../theme/icons/numberedlist.svg';
import bulletedListIcon from '../theme/icons/bulletedlist.svg';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import IDListCommand from './idlistcommand.js';

/**
 * ID List
 *
 * @extends module:core/plugin~Plugin
 */
export default class IDList extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ IDListCommand ];
	}

	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'IDList';
	}

    init() {
        const editor = this.editor;

        editor.model.schema.extend('listItem', { allowAttributes: 'noteid' });

        editor.conversion.attributeToAttribute({
            model: 'noteid',
            view: 'noteid'
        });

        editor.commands.add('IDList', new IDListCommand(editor));

        editor.ui.componentFactory.add('IDList', locale => {
            const command = editor.commands.get('IDList');
            const buttonView = new ButtonView(locale);

            buttonView.set({
                label: 'ID',
                keystroke: 'Ctrl-L',
                withText: true
            });

            buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');
            this.listenTo(buttonView, 'execute', () => editor.execute('IDList'));

            return buttonView;
        });
    }
}
