'use strict';

const todoTaskVM = class TodoTaskVM {
  constructor(client) {
    this._client = client;
    this._tasks = [];

    // this is used storing the current description while typing
    // in the textbox
    this.current_description = '';

    // scheduling the fetch tasks async, so that
    // the ui is non blocking. Initially an empty table will be rendered.
    setTimeout(() => this._fetchTasksFromServer());
  }

  _fetchTasksFromServer() {
    this._client.getAllTasks().then(tasks => {
      this._tasks = tasks;
    });
  }

  getAllTasks() {
    return this._tasks;
  }

  addTask(task) {
    if (task) {
      console.log(`Adding task with description: ${task.description}`);
      this._client.createTask(task).then(task => {
        console.log(`Created task successfully: ${task}`);
        this._tasks.push(task);
        this.current_description = '';
      });
    }
  }

  updateTaskStatus(taskId, status) {
    let task = this._tasks.find(task => task.id === taskId);

    if (task) {
      task.status = status;
    }
    this._client.updateTask(task).then(task => console.log(`Updated task successfully: ${task}`));
  }

  deleteTask(taskId) {
    let taskIndex = this._tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
      let deletedTask = this._tasks.splice(taskIndex, 1);
      this._client
        .deleteTask(taskId)
        .then(_ => console.log(`Deleted task successfully: ${deletedTask}`));
    }
  }
};

export { todoTaskVM as TodoTaskVM };
