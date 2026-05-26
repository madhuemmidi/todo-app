window.onload = displayTasks;

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";

    displayTasks();
}

function displayTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>

            <button onclick="deleteTask(${index})">Delete</button>
        `;

        list.appendChild(li);
    });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks[index].completed = !tasks[index].completed;

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}
