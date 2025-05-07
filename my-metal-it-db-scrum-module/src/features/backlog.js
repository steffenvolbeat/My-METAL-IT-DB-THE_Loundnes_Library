// src/features/backlog.js
// Empty scaffold file for the Scrum module
import { saveItem, loadItem } from "../services/storage-handler.js";

const BACKLOG_KEY = "backlog-items";

export async function initBacklog() {
  const container = document.getElementById("backlog-items");
  const addBtn = document.getElementById("add-backlog-item");

  // 1) Lade vorhandene Einträge
  const items = await loadItem(BACKLOG_KEY, []);
  renderBacklogItems(container, items);

  // 2) Event: Neue Aufgabe hinzufügen
  addBtn.addEventListener("click", () => {
    const title = prompt("Titel der neuen Aufgabe:");
    if (!title) return;
    const newItem = {
      id: Date.now().toString(),
      title,
      status: "todo",
      createdAt: new Date().toISOString(),
    };
    items.push(newItem);
    saveItem(BACKLOG_KEY, items);
    renderBacklogItems(container, items);
  });
}

// Rendert alle Backlog‑Items als Liste
function renderBacklogItems(container, items) {
  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    article.setAttribute("role", "listitem");
    article.setAttribute("draggable", "true");
    article.dataset.id = item.id;
    article.classList.add("scrum-backlog-item");
    article.innerHTML = `
      <h3>${item.title}</h3>
      <time datetime="${item.createdAt}">
        ${new Date(item.createdAt).toLocaleDateString("de-DE")}
      </time>
    `;
    // Drag‑Events für Priorisierung
    article.addEventListener("dragstart", onDragStart);
    article.addEventListener("drop", onDropItem);
    article.addEventListener("dragover", (e) => e.preventDefault());
    container.append(article);
  });
}

// Drag start: ID ins DataTransfer schreiben
function onDragStart(evt) {
  evt.dataTransfer.setData("text/plain", evt.target.dataset.id);
}

// Drop: Elemente neu anordnen
async function onDropItem(evt) {
  evt.preventDefault();
  const targetId = evt.target.closest("article")?.dataset.id;
  const draggedId = evt.dataTransfer.getData("text/plain");
  if (draggedId === targetId) return;

  const items = await loadItem(BACKLOG_KEY, []);
  const fromIndex = items.findIndex((i) => i.id === draggedId);
  const toIndex = items.findIndex((i) => i.id === targetId);

  // Element herausnehmen und neu einfügen
  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  await saveItem(BACKLOG_KEY, items);
  renderBacklogItems(document.getElementById("backlog-items"), items);
}
