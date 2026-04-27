let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, index) => {
    let div = document.createElement("div");
    div.className = "task";

    if (task.done) {
      div.classList.add("completed");
      completed++;
    }

    div.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text} (${task.category})</span>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(div);
  });

  updateProgress(completed);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let text = document.getElementById("taskInput").value;
  let category = document.getElementById("category").value;

  if (text === "") return;

  tasks.push({ text, category, done: false });
  document.getElementById("taskInput").value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function updateProgress(completed) {
  let total = tasks.length;
  let percent = total ? (completed / total) * 100 : 0;
  document.getElementById("progressBar").style.width = percent + "%";
}

function toggleMode() {
  document.body.classList.toggle("dark");
}

renderTasks();