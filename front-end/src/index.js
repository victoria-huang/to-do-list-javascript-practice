let taskAdapter = new Adapter('http://localhost:3000/tasks');

document.addEventListener('DOMContentLoaded', () => {
  // let taskAdapter = new Adapter('http://localhost:3000/tasks');
  taskAdapter.getAllResources().then(tasks => displayTasks(tasks))

  let addTaskButton = document.getElementById("add-task-button");
  addTaskButton.addEventListener('click', addTask);
})

function displayTasks(tasks) {
  let taskObjs = tasks.map((task) => { return new Task(task.id, task.description, task.priority, task.completed) })

  let toDoTasks = taskObjs.filter((task) => { return !task.completed; });
  let completedTasks = taskObjs.filter((task) => { return task.completed; });

  // append incomplete tasks
  // let toDoList = document.querySelector('#tasks-to-do ul');
  toDoTasks.forEach((task) => {
    showTask(task)
    // let taskEle = document.createElement('li');
    // taskEle.setAttribute('id', `task-id-${task.id}`)
    // taskEle.innerHTML = `<div>${task.description}<br>Priority: ${task.priority}</div><br>`
    // taskEle.innerHTML += `<button type='button' id='complete-task-${task.id}'>Complete</button><br>`
    // taskEle.innerHTML += `<button type='button' id='edit-task-${task.id}'>Edit</button><br>`
    // taskEle.innerHTML += `<button type='button' id='remove-task-${task.id}'>Remove</button><br><br>`
    // toDoList.append(taskEle);
    //
    // //event listener for completion
    // let completeTask = document.getElementById(`complete-task-${task.id}`);
    // completeTask.addEventListener('click', () => {task.completeTask()})
    //
    // //event listener for editing
    // let editTask = document.getElementById(`edit-task-${task.id}`);
    // editTask.addEventListener('click', () => {task.editTask()})
    //
    // //event listener for removing
    // let removeTask = document.getElementById(`remove-task-${task.id}`);
    // removeTask.addEventListener('click', () => {task.removeTask()})
  })

  // append completed tasks
  let completedList = document.querySelector('#completed-tasks ul');
  completedTasks.forEach((task) => {
    let taskEle = document.createElement('li');
    taskEle.setAttribute('id', `task-id-${task.id}`)
    taskEle.innerHTML = `<div>${task.description}</div><br>`
    taskEle.innerHTML += `<button type='button' id='remove-task-${task.id}'>Remove</button><br><br>`
    completedList.append(taskEle);

    let removeTask = document.getElementById(`remove-task-${task.id}`);
    removeTask.addEventListener('click', () => {task.removeTask()})
  })
}

function addTask() {
  let formDiv = document.getElementById('forms');
  let addTaskHeader = document.createElement('h2');
  addTaskHeader.innerText = "Add New Task";
  let newForm = document.createElement("form");
  newForm.setAttribute('id', 'new-task-form');
  newForm.innerHTML = "<label for='description'>Description: </label><input type='text' id='description' required><br><label for='priority'>Priority: </label><input type='text' id='priority' required><br><input type='submit' value='Add Task'>"
  formDiv.append(addTaskHeader, newForm);

  newForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let description = document.getElementById('description').value;
    let priority = document.getElementById('priority').value;
    addTaskHeader.remove();
    newForm.remove();
    // let taskAdapter = new Adapter('http://localhost:3000/tasks');
    taskAdapter.createResource({description: description, priority: priority})
    .then(task => {
      let taskObj = new Task(task.id, task.description, task.priority, task.completed)
      showTask(taskObj)});
  })
}

function showTask(task) {
  let toDoList = document.querySelector('#tasks-to-do ul');
  let taskEle = document.createElement('li');
  taskEle.setAttribute('id', `task-id-${task.id}`)
  taskEle.innerHTML = `<div>${task.description}<br>Priority: ${task.priority}</div><br>`
  taskEle.innerHTML += `<button type='button' id='complete-task-${task.id}'>Complete</button><br>`
  taskEle.innerHTML += `<button type='button' id='edit-task-${task.id}'>Edit</button><br>`
  taskEle.innerHTML += `<button type='button' id='remove-task-${task.id}'>Remove</button><br><br>`
  toDoList.append(taskEle);

  //event listener for completion
  let completeTask = document.getElementById(`complete-task-${task.id}`);
  completeTask.addEventListener('click', () => {task.completeTask()})

  //event listener for editing
  let editTask = document.getElementById(`edit-task-${task.id}`);
  editTask.addEventListener('click', () => {task.editTask()})

  //event listener for removing
  let removeTask = document.getElementById(`remove-task-${task.id}`);
  removeTask.addEventListener('click', () => {task.removeTask()})
}
