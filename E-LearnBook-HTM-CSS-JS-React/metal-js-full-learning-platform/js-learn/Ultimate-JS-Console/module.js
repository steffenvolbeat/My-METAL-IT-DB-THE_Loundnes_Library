// Datei: js-learn/menu.js
import { loadPage } from "../router.js";

// Liste aller Seiten / Kapitel
const pages = ["intro", "basics", "closures", "async", "finale", "quiz"];
const menu = document.getElementById("menu");

// Menü-Buttons erstellen
menu.innerHTML = pages
  .map(
    (p) =>
      `
    <button data-page="${p}">` +
      p.charAt(0).toUpperCase() +
      p.slice(1) +
      `</button>
  `
  )
  .join("");

// Direkt beim Start Intro laden und erstes Button aktivieren
loadPage("intro");
menu.querySelector(`button[data-page="intro"]`).classList.add("active");

// Klick-Handler: Seite wechseln
menu.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Active-Style umschalten
    menu
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // Kapitel laden
    const page = btn.dataset.page;
    loadPage(page);
  });
});

// Datei: js-learn/router.js
export async function loadPage(name) {
  const app = document.getElementById("app");
  try {
    const module = await import(`./sections/${name}.js`);
    // sections/*.js geben HTML-String per default() zurück
    app.innerHTML = module.default();

    // Bei Quiz: extra Initialisierung
    if (name === "quiz") {
      // Quiz-Skript nachladen
      await import(`../quiz/quiz.js`);
    }
  } catch (e) {
    console.error("Ladefehler:", e);
    app.innerHTML = "<p>Fehler beim Laden des Kapitels.</p>";
  }
}

// Datei: js-learn/main.js
import "./styles/darkmetal.css";
import "./styles/inferno-animations.css";
import { loadPage } from "../router.js";

// Body war initial versteckt, um FOUC zu verhindern
document.body.classList.remove("hidden");

// Event-Delegation für Link-Hash oder direktes Navigieren (optional)
window.addEventListener("hashchange", () => {
  const name = location.hash.slice(1);
  if (name) loadPage(name);
});

// Beim ersten Laden: prüfe Hash oder lade Intro
const initial = location.hash.slice(1) || "intro";
loadPage(initial);
// Active-Button bei direktem Hash-Landing setzen
const activeBtn = document.querySelector(`button[data-page="${initial}"]`);
if (activeBtn) activeBtn.classList.add("active");
