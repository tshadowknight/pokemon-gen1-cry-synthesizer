import ui from "./ui";
import { BaseCryManager } from "./data/BaseCryManager";
import { MonsterManager } from "./data/MonsterManager";

window.addEventListener("load", () => {
  BaseCryManager.init();
  MonsterManager.init();
  ui.init();
});