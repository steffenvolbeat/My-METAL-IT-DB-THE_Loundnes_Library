//projects/todo

const input = document.getElementById("new-task");
const btn = document.getElementById("add-btn");
const list = document.getElementById("task-list");

btn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement("li");
  li.innerHTML = `<span>${text}</span><button>❌</button>`;
  list.appendChild(li);
  input.value = "";
  li.querySelector("button").addEventListener("click", () => li.remove());
});
