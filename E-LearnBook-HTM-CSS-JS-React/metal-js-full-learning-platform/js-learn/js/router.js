// js/router.js
const routes = {
  "":               "js/sections/beginner.html",
  "#/beginner":     "js/sections/beginner.html",
  "#/intermediate": "js/sections/intermediate.html",
  "#/expert":       "js/sections/expert.html",
  "#/quiz":         "js/sections/quiz.html",
  "#/flashcard":    "js/sections/flashcard.html",
  "#/console":      "js/sections/console.html",
};

export function initRouter(appSelector) {
  const app = document.querySelector(appSelector);

  // Eine einzige loadRoute-Funktion
  async function loadRoute() {
    const hash = window.location.hash;
    const path = routes[hash] || routes[""];

    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`404: ${path}`);
      const html = await res.text();
      app.innerHTML = html;

      // Alle <script type="module"> in der Sektion nachladen
      app.querySelectorAll('script[type="module"]').forEach(oldScript => {
        const s = document.createElement("script");
        s.type = "module";
        if (oldScript.src) s.src = oldScript.src;
        else               s.textContent = oldScript.textContent;
        document.body.appendChild(s);
        oldScript.remove();
      });

    } catch (err) {
      console.error(err);
      app.innerHTML = `<p style="color: red; text-align: center;">
                         Seite nicht gefunden (404).
                       </p>`;
    }
  }

  // Hook einrichten
  window.addEventListener("hashchange", loadRoute);
  window.addEventListener("load",       loadRoute);
}
