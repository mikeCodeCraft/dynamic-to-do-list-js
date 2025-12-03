// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Create the addTask Function
    function addTask(taskText = null, save = true) {
        let fromInput = false;
        if (taskText === null) {
            taskText = taskInput.value.trim();
            fromInput = true;
            // Check if taskText is not empty
            if (taskText === '') {
                alert('Please enter a task');
                return;
            }
        }

        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Update Local Storage after removal
            const taskTextToRemove = li.childNodes[0].nodeValue.trim();
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = storedTasks.indexOf(taskTextToRemove);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(li);

        // Clear the task input field if added from input
        if (fromInput) {
            taskInput.value = '';
        }

        // Save to Local Storage if required
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Load tasks on page load
    loadTasks();

    // Attach Event Listeners
    // Add an event listener to addButton
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});