
const fs = window.require('fs');


export class BaseCryManager {
    static data;
    static filePath = './src/data/baseCries.json';
    static undoStack = [];
    static init() {
        this.data = JSON.parse(fs.readFileSync(this.filePath,'utf8'));
    }

    static get(idx){
        return this.data[idx];
    }

    static pushUndo(){
        this.undoStack.push(structuredClone(this.data));
        if(this.undoStack.length > 20){
            this.undoStack.shift();
        }
    }

    static popUndo(){
        this.data = this.undoStack.pop();
        this.flush();
    }

    static flush(){
        fs.writeFileSync(this.filePath, JSON.stringify(this.data));
    }

    static addNew(){
        this.pushUndo();
        this.data.push({
            channels: {
                "pulse1": [
                  
                ],
                "pulse2": [
                   
                ],
                "noise": [
                  
                ]
            },
            name: "New Base Cry",
            "isReference": false
        });
        this.flush();
         return this.data.length - 1;
    }

    static delete(idx){
        this.pushUndo();
        this.data.splice(idx, 1);
        this.flush();
    }

    static copy(idx){
        this.pushUndo();
        const data = structuredClone(this.data[idx]);
        data.isReference = false;
        data.name = data.name + " (Copy)";
        this.data.push(data);
        this.flush();        
        return this.data.length - 1;
    }

    static updateName(idx, name){
        this.pushUndo();
        this.data[idx].name = name;
        this.flush(); 
    }

    static updateChannels(idx, channels){
        this.pushUndo();
        this.data[idx].channels = channels;
        this.flush(); 
    }
}