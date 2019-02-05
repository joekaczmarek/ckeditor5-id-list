import Command from '@ckeditor/ckeditor5-core/src/command';
import first from '@ckeditor/ckeditor5-utils/src/first';
import uuidv4 from 'uuid/v4'

export default class IDListCommand extends Command {

    constructor(editor){
        super(editor);
    }

    refresh(){
        this.value = this._getValue();
        this.isEnabled = this._checkEnabled();
    }

    _getValue(){
        const block = first(this.editor.model.document.selection.getSelectedBlocks());
        return this._isID(block); 
    }

    _checkEnabled(){
        const block = first(this.editor.model.document.selection.getSelectedBlocks());
        return !!block && block.is('listItem') && this._hasChild(block);
    }

    _isID(block){
        return block.is('listItem') && block.hasAttribute('noteid');
    }

    _hasChild(block){
        const child = block.nextSibling;
        return child && child.is('listItem') 
            && child.getAttribute('listIndent') > block.getAttribute('listIndent');
    }

    execute(){
        const model = this.editor.model;
        for(const block of model.document.selection.getSelectedBlocks()){
            if(!block.is('listItem'))
                continue;
            
            // disable
            if(block.hasAttribute('noteid')){
                model.change(writer => {
                    writer.removeAttribute('noteid', block);
                });
            }
            // enable
            else{
                var next = block.nextSibling;

                // only add the noteid if the bullet has children sub bullets
                if(!next)
                    break;

                if(next.getAttribute('listIndent') > block.getAttribute('listIndent')){
                    model.change(writer => {
                        writer.setAttribute('noteid', uuidv4(), block);
                    });
                }
            }
        }
    }
}
