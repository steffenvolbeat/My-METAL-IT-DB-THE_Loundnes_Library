// src/features/reports.js

import { loadItem } from "../services/storage-handler.js";

const SPRINT_KEY = "current-sprint";
const BACKLOG_KEY = "backlog-items"; // ✅ korrigierter Key (Plural beachten)

export async function initReports() {
  const sprint = await loadItem(SPRINT_KEY);
  if (!sprint) return; // Kein aktiver Sprint vorhanden

  const items = await loadItem(BACKLOG_KEY, []);
  const totalPoints = items.length; // Optional: hier könntest du echte Story Points summieren
  const spent = calculateElapsedDays(sprint);
  const remaining = Math.max(totalPoints - spent, 0);

  const ctx = document.getElementById("burndown-chart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: generateDateLabels(sprint.start, sprint.end),
      datasets: [
        {
          label: "Verbleibende Punkte",
          data: generateBurndownSeries(totalPoints, sprint),
          fill: false,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          tension: 0.1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Punkte" },
        },
      },
    },
  });
}

function generateDateLabels(start, end) {
  const dates = [];
  let cur = new Date(start);
  const last = new Date(end);
  while (cur <= last) {
    dates.push(cur.toLocaleDateString("de-DE"));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function generateBurndownSeries(total, sprint) {
  const start = new Date(sprint.start);
  const end = new Date(sprint.end);
  const days = Math.max(Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1, 1);

  const series = [];
  for (let i = 0; i < days; i++) {
    series.push(Math.max(total - i * (total / (days - 1)), 0));
  }
  return series;
}

function calculateElapsedDays(sprint) {
  const now = new Date();
  const start = new Date(sprint.start);
  return now > start ? Math.floor((now - start) / (1000 * 60 * 60 * 24)) : 0;
}
