const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskLeft = document.getElementById("task-left");

// Event listener for adding tasks when Enter is pressed
inputBox.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && inputBox.value.trim() !== "") {
        addTask(inputBox.value.trim());
        inputBox.value = ""; // Clear the input box
    }
});

// Function to add a new task
function addTask(taskText) {
    // Create a new list item
    const newTodo = document.createElement("li");
  
    // Create a checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            newTodo.classList.add("checked");
        } else {
            newTodo.classList.remove("checked");
        }
        updateTaskCount(); // Update task count when checkbox is toggled
    });

    // Create a span for the task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    // Create a close button
    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "\u00D7"; // Unicode for '×'
    closeBtn.className = "close";
    closeBtn.addEventListener("click", function () {
        newTodo.remove(); // Remove the task when the close button is clicked
        updateTaskCount(); // Update task count when a task is removed
    });

    // Assemble the list item
    newTodo.appendChild(checkbox);
    newTodo.appendChild(taskSpan);
    newTodo.appendChild(closeBtn);

    // Add the list item to the list container
    listContainer.appendChild(newTodo);

    // Update the task count
    updateTaskCount();
}

// Function to update the task count
function updateTaskCount() {
    const tasks = listContainer.querySelectorAll("li");
    const incompleteTasks = Array.from(tasks).filter(
        (task) => !task.querySelector("input[type='checkbox']").checked
    );
    taskLeft.textContent = `${incompleteTasks.length} Task${incompleteTasks.length !== 1 ? 's' : ''} left`; // Handle plural correctly
}

function handleTaskEdit(event) {
    const taskItem = event.target; // Get the task list item that was double-clicked
    if (taskItem.tagName !== 'LI') return; // Only edit the task if it's a list item (li)

    // Find the span that holds the task text
    const taskTextSpan = taskItem.querySelector("span");

    // Create an input box and set its value to the current task text
    const inputBox = document.createElement("input");
    inputBox.type = "text";
    inputBox.value = taskTextSpan.textContent; // Set the input value to the current task text
    inputBox.classList.add("edit-input"); // Add a class for styling the input field
    
    // Replace the task text with the input box
    taskItem.replaceChild(inputBox, taskTextSpan);

    // Focus the input box for immediate editing
    inputBox.focus();

    // When the user presses Enter or clicks outside (on blur), update the task
    inputBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter" && inputBox.value.trim() !== "") {
            taskTextSpan.textContent = inputBox.value.trim(); // Update the task text
            taskItem.replaceChild(taskTextSpan, inputBox); // Replace the input box with updated text
            updateTaskCount(); // Update the task count
        }
    });

    inputBox.addEventListener("blur", function () {
        if (inputBox.value.trim() !== "") {
            taskTextSpan.textContent = inputBox.value.trim(); // Update the task text
            taskItem.replaceChild(taskTextSpan, inputBox); // Replace the input box with updated text
            updateTaskCount(); // Update the task count
        }
    });
}

// Attach the event listener for double-click to each task in the list
listContainer.addEventListener("dblclick", handleTaskEdit);