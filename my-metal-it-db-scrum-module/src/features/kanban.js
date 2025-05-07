// src/features/kanban.js
import { loadItem, saveItem } from "../services/storage-handler.js";

const BACKLOG_KEY = "backlog-items";

export async function initKanban() {
  const board = document.getElementById("kanban-board");
  if (!board) return; // nichts tun, wenn kein Board da

  // erst einmal die Spalten befüllen
  await renderBoard();

  // Drag & Drop auf allen Spalten aktivieren
  board.querySelectorAll(".kanban-col").forEach((col) => {
    col.addEventListener("dragover", (e) => e.preventDefault());
    col.addEventListener("drop", async (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const newLabel = col.getAttribute("aria-label");
      await moveTask(id, newLabel);
      await renderBoard();
    });
  });
}

async function renderBoard() {
  const items = await loadItem(BACKLOG_KEY, []);
  const board = document.getElementById("kanban-board");

  // jede Spalte zurücksetzen (nur Heading stehen lassen)
  board.querySelectorAll(".kanban-col").forEach((col) => {
    const heading = col.querySelector("h3")?.textContent || "";
    col.innerHTML = `<h3>${heading}</h3>`;
  });

  // Karten für alle Items erzeugen und einhängen
  items.forEach((item) => {
    const colLabel = mapStatus(item.status);
    const column = board.querySelector(`.kanban-col[aria-label="${colLabel}"]`);
    if (!column) return;

    const card = document.createElement("article");
    card.className = "kanban-card";
    card.draggable = true;
    card.id = item.id;
    card.innerHTML = `
      <h4>${item.title}</h4>
      <time datetime="${item.createdAt}">
        ${new Date(item.createdAt).toLocaleDateString("de-DE")}
      </time>
    `;

    // Drag‑Start: Task‑ID mitgeben
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.id);
      e.dataTransfer.effectAllowed = "move";
    });

    column.appendChild(card);
  });
}

async function moveTask(id, newLabel) {
  const items = await loadItem(BACKLOG_KEY, []);
  const idx = items.findIndex((i) => i.id === id);
  if (idx < 0) return;

  items[idx].status = mapStatusKey(newLabel);
  await saveItem(BACKLOG_KEY, items);
}

function mapStatus(status) {
  // wandelt internen Status in das aria-label um
  switch (status) {
    case "todo":
      return "To Do";
    case "inprogress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "To Do";
  }
}

function mapStatusKey(label) {
  // wandelt aria-label zurück in internen Key
  switch (label) {
    case "To Do":
      return "todo";
    case "In Progress":
      return "inprogress";
    case "Done":
      return "done";
    default:
      return "todo";
  }
}
