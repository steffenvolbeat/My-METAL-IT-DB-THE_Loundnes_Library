// src/features/sprint-planner.js
import { loadItem, saveItem } from "../services/storage-handler.js";

const SPRINT_KEY = "current-sprint";

export async function initSprintPlanner() {
  const form = document.getElementById("sprint-form");
  if (!form) return;

  // Felder referenzieren
  const nameInput = form["sprint-name"];
  const startInput = form["sprint-start"];
  const endInput = form["sprint-end"];
  const sizeInput = form["sprint-team-size"];
  const pointsInput = form["sprint-points-per-day"];

  // Bestehenden Sprint laden
  const existing = await loadItem(SPRINT_KEY);
  if (existing) {
    nameInput.value = existing.name;
    startInput.value = existing.start;
    endInput.value = existing.end;
    sizeInput.value = existing.capacity.teamSize;
    pointsInput.value = existing.capacity.pointsPerDay;
    renderCapacityChart(existing);
  }

  // Formular-Handler
  form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    // Datum-Range-Validation
    if (new Date(endInput.value) < new Date(startInput.value)) {
      alert("Enddatum muss gleich oder nach dem Startdatum liegen.");
      return;
    }

    // Sprint-Objekt
    const sprint = {
      id: Date.now().toString(),
      name: nameInput.value,
      start: startInput.value,
      end: endInput.value,
      capacity: {
        teamSize: Number(sizeInput.value),
        pointsPerDay: Number(pointsInput.value),
      },
    };

    // Speichern & Chart updaten
    await saveItem(SPRINT_KEY, sprint);
    renderCapacityChart(sprint);
  });
}

function renderCapacityChart(sprint) {
  const ctx = document.getElementById("capacity-chart").getContext("2d");
  const start = new Date(sprint.start);
  const end = new Date(sprint.end);
  const labels = [];
  const data = [];
  let cur = new Date(start);

  while (cur <= end) {
    labels.push(cur.toLocaleDateString("de-DE"));
    data.push(sprint.capacity.teamSize * sprint.capacity.pointsPerDay);
    cur.setDate(cur.getDate() + 1);
  }

  // bestehenden Chart zerstören, falls vorhanden
  if (window.capacityChart) {
    window.capacityChart.destroy();
  }

  // Neues Bar-Chart anlegen
  window.capacityChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Tägliche Kapazität (Story‑Points)",
          data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Story‑Points" },
        },
        x: {
          title: { display: true, text: "Datum" },
        },
      },
      plugins: {
        legend: { display: false },
      },
    },
  });
}
