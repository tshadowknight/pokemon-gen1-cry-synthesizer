import ui from "./ui";
import { BaseCryManager } from "./data/BaseCryManager";

window.addEventListener("load", () => {
  BaseCryManager.init();
  ui.init();
});