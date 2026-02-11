// DOM ELEMENTS
const taskList = document.getElementById('task-list');
const form = document.getElementById('todo-form');
const input = document.getElementById('task-input');
const clearAllButton = document.getElementById('clear-all');
const sortButton = document.getElementById('sort');

// EVENT LISTENERS
form.addEventListener('submit', addTask);
clearAllButton.addEventListener('click', clearTasks);
// 
sortButton.addEventListener('click', sortTasks);

// GLOBAL VARIABLES
// La variable tasks representa el ESTADO de nuestra app
// tasks = [task1, task2, tasks, (...)]
let tasks = [];
let taskId = 0;

// USER FUNCTIONS
function renderTasks() {
    taskList.innerHTML = "";

    for (let task of tasks) {
        let li = document.createElement('li');
        li.innerHTML = task.text;
        li.id = task.id;
        li.contentEditable = true;

        if (task.completed) {
            li.style.textDecoration = "line-through";
            li.style.opacity = "0.5";
        }

        li.addEventListener('contextmenu',completeTask);
        taskList.append(li);
        let div = document.createElement('div');
        div.classList.add('btnPanel');
        li.append(div);
        let editBtn = document.createElement('button');
        editBtn.innerHTML = 'EDIT';
        editBtn.addEventListener('click', editTask);
        div.append(editBtn);
        let delBtn = document.createElement('button');
        delBtn.innerHTML = 'X';
        delBtn.addEventListener('click', removeTask);
        div.append(delBtn);
    }

}

function addTask(event) {
    event.preventDefault();
    // Tomamos texto del input
    let textoInput = input.value;
    let task = {
        id: taskId++,
        text: textoInput,
        completed: false
    }
    // Añadir tarea a tasks
    tasks.push(task);
    renderTasks();

    input.value = "";
    input.focus();
}

function clearTasks() {
    tasks = [];
    renderTasks();
}

function editTask(event) {
    // Detectar el id del elemento clicado
    let id2Edit = event.target.parentElement.parentElement.id;
    let newText = event.target.parentElement.parentElement.childNodes[0].textContent;
    // Editar de tasks el elemento con ese id
    let auxTasks = [];
    for (let task of tasks) {
        if (task.id != id2Edit) {
            auxTasks.push(task);
        }
        else{
            // Editar tarea
            let newTask = {
                id: task.id,
                text: newText,
                completed: task.completed
            }
            auxTasks.push(newTask);
        }
    }
    tasks = auxTasks;
    // Repintar (ESTO SIEMPRE)
    renderTasks();
}

function removeTask(event) {
    // Detectar el id del elemento clicado
    let id2Delete = event.target.parentElement.parentElement.id;
    // Borrar de tasks el elemento con ese id
    let auxTasks = [];
    for (let task of tasks) {
        if (task.id != id2Delete) {
            auxTasks.push(task);
        }
    }
    tasks = auxTasks;
    // Repintar (ESTO SIEMPRE)
    renderTasks();
}

// Esta funcion altera el estaddo de "completado" cuando hagamos click der
function completeTask(event) {
    // Evitamos que salga el menu del navegador por defecto
    event.preventDefault();

    // El ID esta en el elemento li
    let id2Complete = event.target.closest('li').id;

    // Buscamos en el array y cambiamos el booleano
    for (let task of tasks) {
        if (task.id == id2Complete) {
            task.completed = !task.completed;
        }
    }

    // siempre repintar
    renderTasks();
}

// Esta funcion ordena las tareas alfabeticamente
function sortTasks() {
    tasks.sort((a, b) => {
        if (a.text.toLowerCase() < b.text.toLowerCase()) return -1;
        if (a.text.toLowerCase() > b.text.toLowerCase()) return 1;
        return 0;
    });

    // Repintar
    renderTasks();
}