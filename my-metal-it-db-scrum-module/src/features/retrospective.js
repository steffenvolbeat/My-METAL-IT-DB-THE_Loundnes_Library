// src/features/retrospective.js
import { loadItem, saveItem } from "../services/storage-handler.js";

const RETRO_KEY = "retro-entries";

export async function initRetro() {
  const form = document.getElementById("retro-form");
  const list = document.createElement("ul");
  list.setAttribute("aria-label", "Vergangene Retrospektiven");
  form.after(list);

  // Alte Retros laden und darstellen
  const entries = await loadItem(RETRO_KEY, []);
  renderRetroList(list, entries);

  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();
    const entry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      wentWell: form.elements["wentWell"].value,
      wentBad: form.elements["wentBad"].value,
      improvements: form.elements["improvements"].value,
    };
    entries.unshift(entry);
    await saveItem(RETRO_KEY, entries);
    renderRetroList(list, entries);
    form.reset();
  });
}

function renderRetroList(list, entries) {
  list.innerHTML = "";
  entries.forEach((e) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <article>
        <header>
          <time datetime="${e.date}">
            ${new Date(e.date).toLocaleDateString("de-DE")}
          </time>
        </header>
        <p><strong>Gut:</strong> ${e.wentWell}</p>
        <p><strong>Schlecht:</strong> ${e.wentBad}</p>
        <p><strong>Verbessern:</strong> ${e.improvements}</p>
      </article>
    `;
    list.appendChild(li);
  });
}
