
const taskForm = document.getElementById('task-form')
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const taskClear = document.getElementById('tasks-clear-container');
const taskFilter = document.getElementById('tasks-filter-container');

loadAllEventListeners();

function loadAllEventListeners() {

    document.addEventListener('DOMContentLoaded', getTasks);
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    taskClear.addEventListener('click', clearTasks);
    taskFilter.addEventListener('keyup', filterTasks);

}

function getTasks() {

    let tasks1;

    if (localStorage.getItem('tasks1') === null) {
        tasks1 = [];
    } else {
        tasks1 = JSON.parse(localStorage.getItem('tasks1'));
    }

    console.log(tasks1)
        
    tasks1.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'task-item';
        li.appendChild(document.createTextNode(task));

        const link = document.createElement('a');
        link.className = 'delete';
        link.innerHTML = '<i class="fas fa-check-square"></i>';
            
        li.appendChild(link)
        taskList.appendChild(li);
            
        })
}

function addTask(e) {

    if (taskInput.value === '')
        alert('Add a Task')

    const li = document.createElement('li');
    li.className = 'task-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete';
    link.innerHTML = '<i class="fas fa-check-square"></i>';

    li.appendChild(link);
    taskList.appendChild(li);

    addTaskToLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault(); 

}

function addTaskToLocalStorage(task) {

    let tasks1;

    if(localStorage.getItem('tasks1') === null) {
        tasks1 = [];
    } else {
        tasks1 = JSON.parse(localStorage.getItem('tasks1'));
    }

    tasks1.push(task);

    localStorage.setItem('tasks1', JSON.stringify(tasks1));

}



function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete')) {
        if(confirm('Are you sure?'))
            e.target.parentElement.parentElement.remove()
    }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

}


function removeTaskFromLocalStorage(taskItem) {

    let tasks1;

    if(localStorage.getItem('tasks1') === null) {
        tasks1 = [];
    } else {
        tasks1 = JSON.parse(localStorage.getItem('tasks1'))
    }
        


    tasks1.forEach(function(task, index) {
        if(taskItem.textContent === task)
            tasks1.splice(index, 1)
    });

    localStorage.setItem('tasks1', JSON.stringify(tasks1))
}

function clearTasks() {

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearTaskFromLocalStorage();

}

function clearTaskFromLocalStorage() {
    localStorage.clear();
}

function filterTasks(e) {

    const filterText = e.target.value.toLowerCase();

    document.querySelectorAll('.task-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(filterText) != -1)
            task.style.display = 'block'
        else 
            task.style.display = 'none'
    });

}