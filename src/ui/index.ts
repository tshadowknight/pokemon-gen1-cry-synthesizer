import * as util from "../util";
import CryType from "../CryType";
import Pokemon from "../Pokemon";
import { saveAs } from "file-saver";
import cryTypes from "../data/cryTypes";
window["cryType"] = cryTypes;
import WaveDiagram from "./WaveDiagram";
import CryGenerator from "../CryGenerator";
import pokemonList from "../data/pokemonList";
import { BaseCryManager } from "../data/BaseCryManager";
import { MonsterManager } from "../data/MonsterManager";

class Ui {
  selectedPokemon: Pokemon;
  selectedCryType: CryType;
  selectedCryTypeIndex: number;

  pitch: number;
  length: number;
  volume: number = 50;

  customCryType: CryType = {
    name: "Custom",
    noise: [],
    pulse1: [],
    pulse2: []
  };

  cryTypes: CryType[] = [this.customCryType].concat(cryTypes);

  waveDiagram: WaveDiagram;
  cryGenerator = new CryGenerator();

  waveDiagramElement: SVGElement;
  playButtonElement: HTMLButtonElement;
  downloadButtonElement: HTMLButtonElement;

  newBaseCryButton: HTMLButtonElement;
  copyBaseCryButton: HTMLButtonElement;
  deleteBaseCryButton: HTMLButtonElement;

  selectedPokemonSelectElement: HTMLSelectElement;
  selectedCryTypeSelectElement: HTMLSelectElement;

  pitchInputElement: HTMLInputElement;
  lengthInputElement: HTMLInputElement;
  volumeInputElement: HTMLInputElement;

  pulse1EnabledElement: HTMLInputElement;
  pulse2EnabledElement: HTMLInputElement;
  noiseEnabledElement: HTMLInputElement;

  pulse1CommandsElement: HTMLTextAreaElement;
  pulse2CommandsElement: HTMLTextAreaElement;
  noiseCommandsElement: HTMLTextAreaElement;
  rawCommandsElement: HTMLTextAreaElement;

  baseCrySelectorElement: HTMLSelectElement;

  baseCryNameInput: HTMLInputElement;

  currentBaseCryIdx: number;
  currentMonIdx: number;

  monCryNameInput: HTMLInputElement;
  newMonButton: HTMLButtonElement;
  copyMonButton: HTMLButtonElement;
  deleteMonButton: HTMLButtonElement;

  init() {
    this.currentBaseCryIdx = 0;
    this.currentMonIdx = 0;

    this.waveDiagramElement = document.querySelector<SVGElement>("#wave-diagram");

    this.selectedPokemonSelectElement = document.querySelector<HTMLSelectElement>("#selected-pokemon");
    this.selectedPokemonSelectElement.addEventListener("change", this.onSelectedPokemonChange);

   // this.selectedCryTypeSelectElement = document.querySelector<HTMLSelectElement>("#selected-cry-type");
   // this.selectedCryTypeSelectElement.addEventListener("change", this.onCryTypeChange);

    this.pitchInputElement = document.querySelector<HTMLInputElement>("#pitch");
    this.pitchInputElement.addEventListener("change", this.onPitchChange);

    this.lengthInputElement = document.querySelector<HTMLInputElement>("#length");
    this.lengthInputElement.addEventListener("change", this.onLengthChange);

    this.volumeInputElement = document.querySelector<HTMLInputElement>("#volume");
    this.volumeInputElement.addEventListener("change", this.onVolumeChange);

    this.playButtonElement = document.querySelector<HTMLButtonElement>("#play");
    this.playButtonElement.addEventListener("click", this.onPlayClick);

    this.newBaseCryButton = document.querySelector<HTMLButtonElement>("#new");
    this.newBaseCryButton.addEventListener("click", this.onBaseCryNewClick);

    this.copyBaseCryButton = document.querySelector<HTMLButtonElement>("#copy");
    this.copyBaseCryButton.addEventListener("click", this.onBaseCryCopyClick);

    this.deleteBaseCryButton = document.querySelector<HTMLButtonElement>("#delete");
    this.deleteBaseCryButton.addEventListener("click", this.onBaseCryDeleteClick);

    this.downloadButtonElement = document.querySelector<HTMLButtonElement>("#download");
    this.downloadButtonElement.addEventListener("click", this.download);

    this.pulse1EnabledElement = document.querySelector<HTMLInputElement>("#pulse1-enabled");
    this.pulse2EnabledElement = document.querySelector<HTMLInputElement>("#pulse2-enabled");
    this.noiseEnabledElement = document.querySelector<HTMLInputElement>("#noise-enabled");

    this.pulse1CommandsElement = document.querySelector<HTMLTextAreaElement>("#pulse1cmds");
    this.pulse1CommandsElement.addEventListener("input", this.onCommandsInput);

    this.pulse2CommandsElement = document.querySelector<HTMLTextAreaElement>("#pulse2cmds");
    this.pulse2CommandsElement.addEventListener("input", this.onCommandsInput);

    this.noiseCommandsElement = document.querySelector<HTMLTextAreaElement>("#noisecmds");
    this.noiseCommandsElement.addEventListener("input", this.onCommandsInput);

    //this.rawCommandsElement = document.querySelector<HTMLTextAreaElement>("#rawcmds");

    this.baseCrySelectorElement = document.querySelector<HTMLSelectElement>("#selected-basecry");
    this.baseCrySelectorElement.addEventListener("change", this.onSelectedBaseCryChange);

    this.baseCryNameInput = document.querySelector<HTMLInputElement>("#name");
    this.baseCryNameInput.addEventListener("change", this.onBaseCryNameChange);


    this.monCryNameInput = document.querySelector<HTMLInputElement>("#mon_name");
    this.monCryNameInput.addEventListener("change", this.onMonNameChange);

    this.newMonButton = document.querySelector<HTMLButtonElement>("#mon_new");
    this.newMonButton.addEventListener("click", this.onMonNewClick);

    this.copyMonButton = document.querySelector<HTMLButtonElement>("#mon_copy");
    this.copyMonButton.addEventListener("click", this.onMonCopyClick);

    this.deleteMonButton = document.querySelector<HTMLButtonElement>("#mon_delete");
    this.deleteMonButton.addEventListener("click", this.onMonDeleteClick);    


    this.createElements();
    this.selectPokemon();
    this.updateCommands();
   
  }

  refresh(){
    this.createElements();
  }

  createElements(){
   let index = 0;
   this.selectedPokemonSelectElement.innerHTML = "";
    for (const pokemon of MonsterManager.data) {
      const option = util.createSelectOption(`#${index + 1}: ${pokemon.name}`, index.toString());
      this.selectedPokemonSelectElement.appendChild(option);
      index++;
    }
    this.selectedPokemonSelectElement.selectedIndex = this.currentMonIdx;

    this.monCryNameInput.value = MonsterManager.get(this.currentMonIdx).name;

    /*this.selectedCryTypeSelectElement.innerHTML = "";
    index = 0;
    for (const cryType of this.cryTypes) {
      const name = this.getCryTypeName(cryType);
      const value = index.toString();

      const option = util.createSelectOption(name, value);
      this.selectedCryTypeSelectElement.appendChild(option);
      index++;
    }*/

    this.baseCrySelectorElement.innerHTML = "";
    index = 0;
    for (const baseCry of BaseCryManager.data) {
      const option = util.createSelectOption(`#${index + 1}: ${baseCry.name}`, index.toString());
      this.baseCrySelectorElement.appendChild(option);
      index++;
    }

    this.baseCryNameInput.value = BaseCryManager.get(this.currentBaseCryIdx).name;

    this.baseCrySelectorElement.selectedIndex = this.currentBaseCryIdx;

    this.waveDiagram = new WaveDiagram(this.waveDiagramElement);

   // 
    this.updateCommands();
  }

  getCryTypeName(cryType: CryType) {
    return typeof cryType.name === "string" ?
      cryType.name :
      (cryTypes.indexOf(cryType) + 1).toString();
  }

  generateData() {
    this.updateCommands();

    const currentChannels = BaseCryManager.get(this.currentBaseCryIdx).channels;

    this.cryGenerator.init();
    const {
      pulse1,
      pulse2,
      noise
    } = this.cryGenerator.generate(currentChannels, this.pitch, this.length);

    const waves: number[][] = [];
    if (this.pulse1EnabledElement.checked) {
      waves.push(pulse1);
    }

    if (this.pulse2EnabledElement.checked) {
      waves.push(pulse2);
    }

    if (this.noiseEnabledElement.checked) {
      waves.push(noise);
    }

    const data = this.mixWaves(waves, 3);
    return {
      pulse1,
      pulse2,
      noise,
      data
    };
  }

  updateCurrentMonsterSettings(){
    
  }

  mixWaves(waves: number[][], reduction: number) {
    const totalLength = waves.reduce((prev, current) => Math.max(prev, current.length), 0);
    const data = new Array(totalLength).fill(0);

    for (const wave of waves) {
      for (let index = 0; index < wave.length; index++) {
        data[index] += wave[index] / reduction;
      }
    }

    return data;
  }

  onBaseCryNewClick = () => {
    const newIdx = BaseCryManager.addNew();
    this.currentBaseCryIdx = newIdx;
    this.refresh();
  }

  onBaseCryCopyClick = () => {
    const newIdx = BaseCryManager.copy(this.baseCrySelectorElement.selectedIndex);
    this.currentBaseCryIdx = newIdx;
    this.refresh();
  }

  onBaseCryDeleteClick = () => {
    BaseCryManager.delete(this.baseCrySelectorElement.selectedIndex);
    this.currentBaseCryIdx = 0;
    this.refresh();
  }

  onSelectedBaseCryChange = () => {
    this.currentBaseCryIdx = this.baseCrySelectorElement.selectedIndex;
    if(this.currentMonIdx > 151){
      MonsterManager.updateCry(this.currentMonIdx, this.currentBaseCryIdx);      
    }
    this.refresh();
  }

  onBaseCryNameChange = () => {
    BaseCryManager.updateName(this.currentBaseCryIdx, this.baseCryNameInput.value);
    this.refresh();
  }

  onMonNameChange = () => {
    MonsterManager.updateName(this.currentMonIdx, this.monCryNameInput.value);
    this.refresh();
  }

  onMonNewClick = () => {
    const newIdx = MonsterManager.addNew();
    this.currentMonIdx = newIdx;
    this.refresh();
  }

  onMonCopyClick = () => {
    const newIdx = MonsterManager.copy(this.currentMonIdx);
    this.currentMonIdx = newIdx;
    this.refresh();
  }

  onMonDeleteClick = () => {
    MonsterManager.delete(this.currentMonIdx);
    this.currentMonIdx = 0;
    this.refresh();
  }  

  onPlayClick = () => {
    const {
      pulse1,
      pulse2,
      noise,
      data
    } = this.generateData();

    this.waveDiagram.render([
      pulse1,
      pulse2,
      noise,
      data
    ]);

    const resampled = util.resamplePcm(
      this.cryGenerator.sourceSampleRate,
      this.cryGenerator.audioContext.sampleRate,
      data,
      this.volume
    );
    this.cryGenerator.play(resampled);
  }

  onPitchChange = (e: Event) => {
    const element = e.currentTarget as HTMLSelectElement;
    const pitch = parseInt(element.value, 10);
    if(this.currentMonIdx > 151){
      MonsterManager.updatePitch(this.currentMonIdx, pitch);      
    }
    this.setPitch(pitch);
  }

  onLengthChange = (e: Event) => {
    const element = e.currentTarget as HTMLSelectElement;
    const length = parseInt(element.value, 10);
    if(this.currentMonIdx > 151){
      MonsterManager.updateLength(this.currentMonIdx, length);      
    }
    this.setLength(length);
  }

  onVolumeChange = (e: Event) => {
    const element = e.currentTarget as HTMLSelectElement;
    const volume = parseInt(element.value, 10);
    this.volume = volume;
  }

  setPitch(value: number) {
    this.pitchInputElement.value = value.toString();
    this.pitch = value;
  }

  setLength(value: number) {
    this.lengthInputElement.value = value.toString();
    this.length = value;
  }

  selectPokemon = () => {
    const pokemon = MonsterManager.get(this.currentMonIdx);
    this.selectedPokemon = pokemon;
    this.currentBaseCryIdx = pokemon.cry;
    this.refresh();  
    //this.selectCryType(cryTypes[pokemon.cry]);
    this.setPitch(pokemon.pitch);
    this.setLength(pokemon.length - 0x80);
    //this.refresh();
  }

  selectCryType = (cryType: CryType) => {
    if (cryType === this.selectedCryType) return;

    this.selectedCryTypeIndex = this.cryTypes.indexOf(cryType);
    this.selectedCryType = cryType;
    //this.selectedCryTypeSelectElement.value = this.selectedCryTypeIndex.toString();
  }

  updateCommands() {
   // if (this.selectedCryType !== this.customCryType) {
  //    this.updateCryTypeCommands(this.selectedCryType);
  //  } else {
 //     this.parseCustomCryTypeCommands();
 //   }
   // this.updateRawCommands(this.selectedCryType);
    //this.parseCryCommands();
    this.updateCryTypeCommands(BaseCryManager.get(this.currentBaseCryIdx));
  }

  onSelectedPokemonChange = (e: Event) => {
    this.currentMonIdx = this.selectedPokemonSelectElement.selectedIndex;
    this.selectPokemon();   
    this.updateCommands();
  }

  onCryTypeChange = (e: Event) => {
    const element = e.currentTarget as HTMLSelectElement;
    const cryTypeIndex = parseInt(element.value, 10);
    this.selectCryType(this.cryTypes[cryTypeIndex]);
    this.updateCommands();
  }

  onCommandsInput = () => {
    this.parseCryCommands();
    //this.updateCommands();
  }

  download = () => {
    const {
      data
    } = this.generateData();

    const resampled = util.resamplePcm(
      this.cryGenerator.sourceSampleRate,
      this.cryGenerator.audioContext.sampleRate,
      data,
      this.volume
    );

    const seconds = resampled.length / this.cryGenerator.audioContext.sampleRate;
    const blob = util.convertPcmToWav(seconds, 1, this.cryGenerator.audioContext.sampleRate, 1, resampled);

    const filename = this.selectedCryType === this.customCryType ?
      "custom-cry" :
      this.selectedPokemon.name.toLowerCase() + "-cry";
    saveAs(blob, `${filename}.wav`);
  }

  parseCryCommands() {
    const pulse1Commands = this.pulse1CommandsElement.value.split("\n");
    const pulse2Commands = this.pulse2CommandsElement.value.split("\n");
    const noiseCommands = this.noiseCommandsElement.value.split("\n");

    const newCommands = {
      pulse1: [],
      pulse2: [],
      noise: []
    };

    const pulse1 = [];
    for (let index = 0; index < pulse1Commands.length; index++) {
      const command = pulse1Commands[index].split(" ");
      if (command[0] === "duty") {
        pulse1.push({ "duty": parseInt(command[1]) });
      } else if (command[0] === "note") {
        pulse1.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
      }
    }
    newCommands.pulse1 = pulse1;

    const pulse2 = [];
    for (let index = 0; index < pulse2Commands.length; index++) {
      const command = pulse2Commands[index].split(" ");
      if (command[0] === "duty") {
        pulse2.push({ "duty": parseInt(command[1]) });
      } else if (command[0] === "note") {
        pulse2.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
      }
    }
    newCommands.pulse2 = pulse2;

    const noise = [];
    for (let index = 0; index < noiseCommands.length; index++) {
      const command = noiseCommands[index].split(" ");
      if (command[0] === "note") {
        noise.push({ "note": [parseInt(command[1]), parseInt(command[2]), parseInt(command[3]), parseInt(command[4])] });
      }
    }
    newCommands.noise = noise;

    BaseCryManager.updateChannels(this.currentBaseCryIdx, newCommands);
  }

  updateCryTypeCommands(cryInfo) {
    const cry = cryInfo.channels;
    this.pulse1CommandsElement.disabled = cryInfo.isReference;
    this.pulse1CommandsElement.value = "";
    for (let index = 0; index < cry.pulse1.length; index++) {
      if (cry.pulse1[index].duty !== undefined) {
        this.pulse1CommandsElement.value = this.pulse1CommandsElement.value +
          "duty 0x" + cry.pulse1[index].duty.toString(0x10) + "\n";
      } else if (cry.pulse1[index].note) {
        this.pulse1CommandsElement.value = this.pulse1CommandsElement.value +
          "note " +
          (cry.pulse1[index].note[0]) + " " +
          cry.pulse1[index].note[1] + " " +
          cry.pulse1[index].note[2] + " " +
          cry.pulse1[index].note[3] + "\n";
      }
    }

    this.pulse2CommandsElement.value = "";
    this.pulse2CommandsElement.disabled = cryInfo.isReference;
    for (let index = 0; index < cry.pulse2.length; index++) {
      if (cry.pulse2[index].duty !== undefined) {
        this.pulse2CommandsElement.value = this.pulse2CommandsElement.value +
          "duty 0x" + cry.pulse2[index].duty.toString(0x10) + "\n";
      } else if (cry.pulse2[index].note) {
        this.pulse2CommandsElement.value = this.pulse2CommandsElement.value +
          "note " +
          (cry.pulse2[index].note[0]) + " " +
          cry.pulse2[index].note[1] + " " +
          cry.pulse2[index].note[2] + " " +
          cry.pulse2[index].note[3] + "\n";
      }
    }

    this.noiseCommandsElement.value = "";
    this.noiseCommandsElement.disabled = cryInfo.isReference;
    for (let index = 0; index < cry.noise.length; index++) {
      if (cry.noise[index].note) {
        this.noiseCommandsElement.value = this.noiseCommandsElement.value +
          "note " +
          (cry.noise[index].note[0]) + " " +
          cry.noise[index].note[1] + " " +
          cry.noise[index].note[2] + " 0x" +
          cry.noise[index].note[3].toString(0x10) + "\n";
      }
    }
  }

 /* updateRawCommands(cryType: CryType) {
    let content = "";

    const pulse1 = cryType.pulse1;
    for (let index = 0; index < pulse1.length; index++) {
      const command = pulse1[index];
      if (command.duty !== undefined) {
        const duty = command.duty;
        content += "FC " + (duty < 0x10 ? "0" : "") + duty.toString(0x10).toUpperCase() + " ";
      } else if (command.note) {
        content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
        content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";

        const length = command.note[3] & 0xFF, height = (command.note[3] >> 8) & 0xFF;
        content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " " + (height < 0x10 ? "0" : "") + height.toString(0x10).toUpperCase() + " ";
      }
    }

    content += "FF ";

    const pulse2 = cryType.pulse2;
    for (let index = 0; index < pulse2.length; index++) {
      const command = pulse2[index];
      if (command.duty !== undefined) {
        const duty = command.duty;
        content += "FC " + (duty < 0x10 ? "0" : "") + duty.toString(0x10).toUpperCase() + " ";
      } else if (command.note) {
        content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
        content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";

        const length = command.note[3] & 0xFF, height = (command.note[3] >> 8) & 0xFF;
        content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " " + (height < 0x10 ? "0" : "") + height.toString(0x10).toUpperCase() + " ";
      }
    }

    content += "FF ";

    const noise = cryType.noise;
    for (let index = 0; index < noise.length; index++) {
      const command = noise[index];
      if (command.note) {
        content += "2" + (command.note[0] & 0xF).toString(0x10).toUpperCase() + " ";
        content += (command.note[1] & 0xF).toString(0x10).toUpperCase() + (command.note[2] & 0xF).toString(0x10).toUpperCase() + " ";

        const length = command.note[3] & 0xFF;
        content += (length < 0x10 ? "0" : "") + length.toString(0x10).toUpperCase() + " ";
      }
    }

    content += "FF ";

    this.rawCommandsElement.value = content;
  }*/
}

export default new Ui();