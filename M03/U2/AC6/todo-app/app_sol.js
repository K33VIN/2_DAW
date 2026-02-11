const taskList = document.getElementById('task-list');
const form = document.getElementById('todo-form');
const clearAllButton = document.getElementById('clear-all');
const sortButton = document.getElementById('sort');

form.addEventListener('submit',addTask);
clearAllButton.addEventListener('click',clearAllTasks);
sortButton.addEventListener('click',sortList);

let tasks = [];

// function addTask(event){
//     event.preventDefault();
//     // Pillar la ul
//     const taskList = document.getElementById('task-list');
//     const value = document.getElementById('task-input').value;
//     // Crear li
//     let nuevaTarea = document.createElement('li');
//     nuevaTarea.innerHTML = value;
//     taskList.append(nuevaTarea);
//     document.getElementById('task-input').value = "";
// }

function addTask(event){
    event.preventDefault();
    const value = document.getElementById('task-input').value;
    let newTask = {"completed": false, "text":value};
    tasks.push(newTask);

    refreshTaskList();

    document.getElementById('task-input').value = "";
}

function clearAllTasks(){
    tasks = [];

    refreshTaskList();

}

function sortList(e)
    e.preventDefault();
    tasks.sort();     // TO FIX: add sort function

    refreshTaskList();


function removeTask(e){
    // Identificar la tarea a borrar
    let text = e.target.parentElement.getAttribute("taskId");
    let index = null;
    for ([i,task] of tasks.entries()){
        console.log(task.text, text)
        if (task.text == text){
            index = i;
        }
    }
    console.log(index);
    // let index = tasks.indexOf(text);
    // console.log(index);
    tasks.splice(index,1);

    refreshTaskList();
}

function completeTask(e){
    e.target.parentElement.classList.toggle('completed');
}

function refreshTaskList(){
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let nuevaTarea = document.createElement('li');
        nuevaTarea.innerHTML = task.text;
        nuevaTarea.setAttribute('taskId',task.text);
        taskList.append(nuevaTarea);
        // Añadimos botón
        let completedButton = document.createElement('button');
        completedButton.innerHTML = "DONE/NOT_DONE";
        completedButton.addEventListener('click',completeTask);
        nuevaTarea.append(completedButton);
        // Añadir el botón
        let removeTaskButton = document.createElement('button');
        removeTaskButton.innerHTML = "Esborra";
        removeTaskButton.addEventListener('click',removeTask);
        nuevaTarea.append(removeTaskButton);
    })
}