'use strict';

const todoTask = class TodoTask {
  constructor(description, id = undefined, status = false) {
    this._id = id;
    this.description = description;
    this.status = status;
  }

  get id() {
    return this._id;
  }
};

export { todoTask as TodoTask };
