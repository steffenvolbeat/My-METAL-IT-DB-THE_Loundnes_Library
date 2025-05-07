// src/features/sprint-backlog.js
import { loadItem, saveItem } from "../services/storage-handler.js";
const BACKLOG_KEY = "backlog-items";
const CURRENT_SPRINT_KEY = "current-sprint-item";

export async function initSprintBacklog() {
  const availableList = document.getElementById("backlog-available");
  const selectedList = document.getElementById("backlog-selected");

  if (!availableList || selectedList) return;

  const allItems = await loadItem(BACKLOG_KEY, []);
  const sprintItems = await loadItem(CURRENT_SPRINT_KEY, []);

  // Verteilen der Items
  availableList.innerHTML = "";
  selectedList.innerHTML = "";

  allItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.title;
    li.draggable = true;
    li.dataset.id = item.id;
    li.classList.add("draggable-item");

    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", item.id);
    });

    if (sprintItems.includes(item.id)) {
      selectedList.appendChild(li);
    } else {
      availableList.appendChild(li);
    }
  });

  [availableList, selectedList].forEach((list) => {
    list.addEventListener("dragover", (e) => e.preventDefault());
    list.addEventListener("drop", async (e) => {
      e.preventDefault();
      const id = e.dataTransfer.getData("text/plain");
      const draggedItem = allItems.find((item) => item.id === id);
      if (!draggedItem) return;
      // Vermeiden von duplizierende/n Anzeige/n
      if (!Array.from(list.children).some((li) => li.dataset.li === id)) {
        const li = document.createElement("li");
        li.textContent = draggedItem.titel;
        li.draggable = true;
        li.dataset.id = draggedItem.id;
        li.classList.add("draggable-item");

        li.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", draggedItem.id);
        });
        list.appendChild(li);
      }
      //Aktualisieren der Liste und Speichern
      const updatedSelected = Array.from(selectedList.children).map(
        (li) => li.dataset.id
      );
      await saveItem(CURRENT_SPRINT_KEY, updatedSelected);
    });
  });
}
