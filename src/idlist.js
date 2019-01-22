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

/*
        editor.editing.downcastDispatcher.on(
            'attribute:noteid:listItem', 
            (evt, data, conversionApi) => {
            
            console.log("called");

            console.log(evt);
            console.log(data);
            console.log(conversionApi);
        });
*/

        editor.commands.add('IDList', new IDListCommand(editor));

        const t = this.editor.t;
        this._addButton('IDList', t('ID List'), bulletedListIcon);
    }

    // from @ckeditor5/ckeditor5-list/src/listui.js
	/**
	 * Helper method for initializing a button and linking it with an appropriate command.
	 *
	 * @private
	 * @param {String} commandName The name of the command.
	 * @param {Object} label The button label.
	 * @param {String} icon The source of the icon.
	 */
	_addButton( commandName, label, icon ) {
		const editor = this.editor;

		editor.ui.componentFactory.add( commandName, locale => {
			const command = editor.commands.get( commandName );

			const buttonView = new ButtonView( locale );

			buttonView.set( {
				label,
				icon,
				tooltip: true
			} );

			// Bind button model to command.
			buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( buttonView, 'execute', () => editor.execute( commandName ) );

			return buttonView;
		} );
	}
}
