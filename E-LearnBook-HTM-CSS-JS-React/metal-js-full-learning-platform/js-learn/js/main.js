// js/main.js
import { initRouter } from "./router.js";

// Starte den Router in <main id="app">
initRouter("#app");

// Headbang-Animation
window.addEventListener("load", () => {
  const header = document.querySelector(".site-header h1");
  setInterval(() => header.classList.toggle("headbang"), 4000);
});
