document.addEventListener('DOMContentLoaded', () => {
  // Load tasks from local storage on page load
  loadTasks();
});

function addTask() {
  const taskNameInput = document.getElementById('taskNameInput');
  const taskDescriptionInput = document.getElementById('taskDescriptionInput');
  const taskList = document.getElementById('taskList');

  if (taskNameInput.value.trim() === '') {
    alert('Please enter a task name.');
    return;
  }

  // Create task item
  const taskItem = document.createElement('li');
  taskItem.className = 'taskItem';
  taskItem.id = "taskItem";
  taskItem.innerHTML = `
    <strong>${taskNameInput.value}</strong>
    <p>${taskDescriptionInput.value}</p>
    <button onclick="removeTask(this)">Remove</button>
  `;

  // Append task item to the list
  taskList.appendChild(taskItem);

  // Save tasks to local storage
  saveTasks();

  // Clear input fields
  taskNameInput.value = '';
  taskDescriptionInput.value = '';
}

function removeTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();

  // Save tasks to local storage after removal
  saveTasks();
}

function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = [];
  // Iterate through task items and store in array
  for (const taskItem of taskList.children) {
    const task = {
      name: taskItem.querySelector('strong').innerText,
      description: taskItem.querySelector('p').innerText
    };
    tasks.push(task);
  }

  // Save tasks array to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    // Parse stored tasks from local storage
    const tasks = JSON.parse(storedTasks);

    // Create task items for each task
    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.className = 'taskItem';
      taskItem.innerHTML = `
        <strong>${task.name}</strong>
        <p>${task.description}</p>
        <button onclick="removeTask(this)">Remove</button>
      `;

      // Append task item to the list
      taskList.appendChild(taskItem);
    });
  }
}