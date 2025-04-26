// js/router.js
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
      const response = await fetch(route);
      if (!response.ok) throw new Error("Fetch failed");
      const html = await response.text();
      app.innerHTML = html;

      const scripts = app.querySelectorAll('script[type="module"]');
      for (const script of scripts) {
        const newScript = document.createElement("script");
        newScript.type = "module";
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      }
    } catch (err) {
      app.innerHTML = `<p>Seite nicht gefunden.</p>`;
      console.error(err);
    }
  }

  window.addEventListener("hashchange", loadRoute);
  window.addEventListener("load", loadRoute);
}
