// js/router.js
// Definiert Router und zugehörige Section-Dateien
const routes = {
  "": "js/sections/beginner.html",
  "#/beginner": "js/sections/beginner.html",
  "#/intermediate": "js/sections/intermediate.html",
  "#/expert": "js/sections/expert.html",
  "#/console": "js/sections/console.html",
  "#/flashcard": "js/sections/flashcard.html",
};

export function initRouter(appSelector) {
  const app = document.querySelector(appSelector);

  async function loadRoute() {
    const hash = window.location.hash;
    const route = routes[hash] || routes[""];
    try {
      const res = await fetch(route);
      const html = await res.text();
      app.innerHTML = html;
    } catch (err) {
      app.innerHTML = `<p>Seite nicht gefunden.</p>`;
      console.error(err);
    }
  }

  window.addEventListener("hashchange", loadRoute);
  window.addEventListener("load", loadRoute);
}
