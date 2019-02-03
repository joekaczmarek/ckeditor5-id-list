/**
 * @module list/list
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import IDListCommand from './idlistcommand.js';

import {downcastAttributeToAttribute} from '@ckeditor/ckeditor5-engine/src/conversion/downcast-converters';
import {upcastAttributeToAttribute} from '@ckeditor/ckeditor5-engine/src/conversion/upcast-converters';

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

        editor.model.schema.extend('listItem', { allowAttributes: ['noteid'/*, 'notetype'*/] });

/*
        editor.conversion.attributeToAttribute({
            model: 'noteid',
            view: 'noteid'
        });
*/

/*
        editor.conversion.attributeToAttribute({
            model: 'notetype',
            view: 'notetype'
        });
*/

        editor.conversion.for('downcast').add(downcastAttributeToAttribute({
            model: "noteid",
            view: modelAttributeValue => ({
                key: "noteid",
                value: modelAttributeValue
            })
        }));

        editor.conversion.for('upcast').add(upcastAttributeToAttribute({
            view: {
                key: 'noteid'
            },
            model: {
                key: 'noteid',
                value: viewElement => {
                    console.log("upcast", viewElement);
                    console.log("upcast", viewElement.getAttribute('noteid'));
                    return viewElement.getAttribute('noteid'); 
                }
            },
            converterPriority: 'low'
        }));

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
