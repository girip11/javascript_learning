'use strict';

import { TodoTaskCreationView } from '../views/todo_create_task_view.js';

// Duck typing comes in to picture here
// Any object with controller (optional) and view can be considered as component
const todoTaskCreationComponent = class TodoTaskCreationComponent {
  constructor(todoVM) {
    this._todoVM = todoVM;
    this._view = new TodoTaskCreationView(this._todoVM);
  }

  // this method is called everytime redraw is called
  view() {
    // console.log('Render called');
    return this._view.renderView();
  }
};

export { todoTaskCreationComponent as TodoTaskCreationComponent };
