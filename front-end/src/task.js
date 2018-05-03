// let taskAdapter = new Adapter('http://localhost:3000/tasks');

class Task {
  constructor(id, description, priority, completed) {
    this.id = id;
    this.description = description;
    this.priority = priority;
    this.completed = completed;
  }

  completeTask() {
    // let taskAdapter = new Adapter('http://localhost:3000/tasks');
    taskAdapter.editResource(this.id, {completed: true})
    this.completed = true;

    document.getElementById(`task-id-${this.id}`).remove()

    let completedList = document.querySelector('#completed-tasks ul');
    let newLi = document.createElement('li');
    newLi.setAttribute('id', `task-id-${this.id}`)
    newLi.innerHTML = `<div>${this.description}</div><br>`
    newLi.innerHTML += `<button type='button' id='remove-task-${this.id}'>Remove</button><br><br>`
    completedList.append(newLi);

    let removeTask = document.getElementById(`remove-task-${this.id}`);
    removeTask.addEventListener('click', () => {this.removeTask()})
  }

  editTask() {
    let formDiv = document.getElementById('forms');
    let editTaskHeader = document.createElement('h2');
    editTaskHeader.innerText = "Edit Task";
    let editForm = document.createElement("form");
    editForm.setAttribute('id', 'edit-task-form');
    editForm.innerHTML = `<label for='description'>Description: </label><textarea type='text' id='description'>${this.description}</textarea><br><label for='priority'>Priority: </label><textarea type='text' id='priority'>${this.priority}</textarea><br><input type='submit' value='Edit Task'>`
    formDiv.append(editTaskHeader, editForm);

    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let description = document.getElementById('description').value;
      let priority = document.getElementById('priority').value;
      editTaskHeader.remove();
      editForm.remove();
      // let taskAdapter = new Adapter('http://localhost:3000/tasks');
      taskAdapter.editResource(this.id, {description: description, priority: priority})
      let taskEle = document.querySelector(`#task-id-${this.id} div`);
      this.description = description;
      this.priority = priority;
      taskEle.innerHTML = `${this.description}<br>Priority: ${this.priority}`;
    })
  }

  removeTask() {
    // let taskAdapter = new Adapter('http://localhost:3000/tasks');
    taskAdapter.deleteResource(this.id);
    document.getElementById(`task-id-${this.id}`).remove();
  }
}
