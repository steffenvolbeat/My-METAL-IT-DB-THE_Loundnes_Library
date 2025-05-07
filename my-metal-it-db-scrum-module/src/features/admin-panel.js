// src/features/admin-panel.js
import { loadItem, saveItem } from "../services/storage-handler.js";

const SPRINT_KEY = "current-sprint";
const BACKLOG_KEY = "backlog-items";

export async function initAdminPanel() {
  const sprintForm = document.getElementById("sprint-form");
  const backlogForm = document.getElementById("backlog-form");

  if (!sprintForm || !backlogForm) return;

  // Sprint speichern
  sprintForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("sprint-name").value.trim();
    const start = document.getElementById("sprint-start").value;
    const end = document.getElementById("sprint-end").value;

    if (!name || !start || !end) {
      showNotification(
        "❌ Alle Sprint-Felder müssen ausgefüllt sein.",
        "error"
      );
      return;
    }

    const sprint = { name, start, end };
    await saveItem(SPRINT_KEY, sprint);
    showNotification("✅ Sprint wurde gespeichert.");
    sprintForm.reset();
  });

  // Backlog-Item speichern
  backlogForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("backlog-title").value.trim();
    if (!title) {
      showNotification("❌ Der Titel darf nicht leer sein.", "error");
      return;
    }

    const newItem = {
      id: crypto.randomUUID(),
      title,
    };

    const items = await loadItem(BACKLOG_KEY, []);
    items.push(newItem);
    await saveItem(BACKLOG_KEY, items);

    showNotification("➕ Backlog-Item wurde gespeichert.");
    backlogForm.reset();
  });
}

// 💬 Visuelle Benachrichtigung anzeigen
function showNotification(message, type = "success") {
  const notif = document.createElement("div");
  notif.className = `notification ${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}
