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
        return this._isID(block) || this._isLeafID(block);
    }

    _checkEnabled(){
        const listItem = first(this.editor.model.document.selection.getSelectedBlocks());
        return !!listItem && listItem.is('listItem');
    }

    _isID(block){
        return block.is('listItem') && block.hasAttribute('noteid');
    }

    _isLeafID(block){
        if(block.previousSibling){
            if(block.previousSibling.getAttribute('listIndent') < block.getAttribute('listIndent')){
                return this.isID(block.previousSibling);
            }
        }
        return false;
    }

    execute(){
        const model = this.editor.model;
        
        for(const block of model.document.selection.getSelectedBlocks()){
            if(!block.is('listItem'))
                continue;
    
            var curr = block;

            // disable
            if(curr.hasAttribute('noteid')){
                do{
                    model.change(writer => {
                        writer.removeAttribute('noteid', curr);
                    });
                }
                while(curr.nextSibling && (curr = curr.nextSibling).is('listItem'));
            }
            // enable
            else{
                var next = null;

                while(curr.nextSibling && (next = curr.nextSibling).is('listItem')){

                    if(next.getAttribute('listIndent') > curr.getAttribute('listIndent')){
                        model.change(writer => {
                            writer.setAttribute('noteid', uuidv4(), curr);
                        });
                    }

                    curr = next;
                }
            }
        }
    }
}
