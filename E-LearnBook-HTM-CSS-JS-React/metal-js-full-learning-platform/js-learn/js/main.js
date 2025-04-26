// js/main.js
import { initRouter } from "./router.js";

// Starte den Router im <main id="app">
initRouter("#app");

// js/main.js JS-Trigger für Headbanging-Animation
window.addEventListener("load", () => {
  const header = document.querySelector(".site-header h1");
  setInterval(() => {
    header.classList.toggle("headbang");
  }, 4000);
});
