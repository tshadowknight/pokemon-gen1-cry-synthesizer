const fs = window.require('fs');

export class MonsterManager {
    static data;
    static filePath = './src/data/pokemon.json';
    static undoStack = [];
    
    static init() {
        this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));
    }

    static get(idx) {
        return this.data[idx];
    }

    static getByName(name) {
        return this.data.find(pokemon => pokemon.name === name);
    }

    static pushUndo() {
        this.undoStack.push(structuredClone(this.data));
        if (this.undoStack.length > 20) {
            this.undoStack.shift();
        }
    }

    static popUndo() {
        this.data = this.undoStack.pop();
        this.flush();
    }

    static flush() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    }

    static addNew() {
        this.pushUndo();
        this.data.push({
            name: "New Monster",
            cry: 0,
            pitch: 128,
            length: 64
        });
        this.flush();
        return this.data.length - 1;
    }

    static delete(idx) {
        this.pushUndo();
        this.data.splice(idx, 1);
        this.flush();
    }

    static copy(idx) {
        this.pushUndo();
        const pokemon = structuredClone(this.data[idx]);
        pokemon.name = pokemon.name + " (Copy)";
        this.data.push(pokemon);
        this.flush();
        return this.data.length - 1;
    }

    static updateName(idx, name) {
        this.pushUndo();
        this.data[idx].name = name;
        this.flush();
    }

    static updateCry(idx, cry) {
        this.pushUndo();
        this.data[idx].cry = cry;
        this.flush();
    }

    static updatePitch(idx, pitch) {
        this.pushUndo();
        this.data[idx].pitch = pitch;
        this.flush();
    }

    static updateLength(idx, length) {
        this.pushUndo();
        this.data[idx].length = length;
        this.flush();
    }

    static updatePokemon(idx, pokemon) {
        this.pushUndo();
        this.data[idx] = { ...this.data[idx], ...pokemon };
        this.flush();
    }  

}