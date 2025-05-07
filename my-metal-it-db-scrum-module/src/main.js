// src/main.js
// Empty scaffold file for the Scrum module
// src/main.js
import { initBacklog } from "./features/backlog.js";
import { initSprintPlanner } from "./features/sprint-planner.js";
import { initKanban } from "./features/kanban.js";
import { initReports } from "./features/reports.js";
import { initRetro } from "./features/retrospective.js";
import { initAdminPanel } from "./features/admin-panel.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initAdminPanel();
    await initBacklog();
    await initSprintPlanner();
    await initKanban();
    await initReports();
    await initRetro();
    console.log("🖤 Metal Scrum-Tool initialisiert");

    // Overlay ausblenden
    const overlay = document.getElementById("init-overlay");
    if (overlay) overlay.style.display = "none";
  } catch (err) {
    console.error("Initialisierung fehlgeschlagen:", err);
    // Fehler im Overlay anzeigen
    const overlay = document.getElementById("init-overlay");
    if (overlay) overlay.innerHTML = "<p style='color: red;'>💥 Fehler bei der Initialisierung</p>";
  }
});