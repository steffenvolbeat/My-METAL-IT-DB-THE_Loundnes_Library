// js/router.js
const routes = {
  "": "js/sections/beginner.html",
  "#/beginner": "js/sections/beginner.html",
  "#/intermediate": "js/sections/intermediate.html",
  "#/expert": "js/sections/expert.html",
  "#/quiz": "js/sections/quiz.html",
  "#/flashcard": "js/sections/flashcard.html",
  "#/console": "js/sections/console.html",
};

export function initRouter(appSelector) {
  const app = document.querySelector(appSelector);

  async function loadRoute() {
    const hash = window.location.hash;
    const path = routes[hash] || routes[""];
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`404: ${path}`);
      const html = await res.text();
      app.innerHTML = html;
      // alle inline-/src-Scripts aus sections korrekt nachladen
      app.querySelectorAll('script[type="module"]').forEach((old) => {
        const s = document.createElement("script");
        s.type = "module";
        if (old.src) {
          // rel. zu index.html
          s.src = old.src;
        } else {
          s.textContent = old.textContent;
        }
        document.body.appendChild(s);
        old.remove();
      });
    } catch (err) {
      console.error(err);
      app.innerHTML = `<p>Seite nicht gefunden.</p>`;
    }
  }

  window.addEventListener("hashchange", loadRoute);
  window.addEventListener("load", loadRoute);
}
