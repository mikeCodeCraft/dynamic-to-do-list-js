// script.js

document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(taskText => createTaskItem(taskText));

    function createTaskItem(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';  // Correct: uses className

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    function updateLocalStorage() {
        const currentTasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            currentTasks.push(li.firstChild.nodeValue.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        createTaskItem(taskText);
        taskInput.value = '';
        updateLocalStorage();
    }

    // These two event listeners
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});