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
        return false;
    }

    _checkEnabled(){
        const listItem = first(this.editor.model.document.selection.getSelectedBlocks());
        return !!listItem && listItem.is('listItem');
    }

    execute(){
        console.log("IDList execute");
        
        const model = this.editor.model;
       
        for(const block of model.document.selection.getSelectedBlocks())
            this._recursiveAddId(block);

        console.log("IDList finish");
    }

    _recursiveAddId(element){
        console.log(element);
        
        if(!element.is('listItem'))
            return;

        const model = this.editor.model;
        model.change(writer => {
            writer.setAttribute('noteid', uuidv4(), element);
        });

        for(const child of element.getChildren()){
            this._recursiveAddId(child);
        }
    }
}
