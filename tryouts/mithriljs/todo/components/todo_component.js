'use strict';

import { TodoTaskVM } from '../view_models/taskvm.js';
import { TodoTaskCreationComponent } from './todo_create_task_component.js';
import { TodoTableComponent } from './todo_table_component.js';

// Duck typing comes in to picture here
// Any object with controller (optional) and view can be considered as component
const todoComponent = class TodoComponent {
  // Client is passed to constructor for dependency injection purposes
  constructor(client) {
    this._client = client;
    this._todoVM = new TodoTaskVM(this._client);

    // No need to recompute this again
    this._task_creation_view = new TodoTaskCreationComponent(this._todoVM).view();
    this._table_component = new TodoTableComponent(this._todoVM);
  }

  // this method is called everytime redraw is called
  view() {
    // console.log('Render called');
    return m('div', [this._task_creation_view, this._table_component.view()]);
  }
};

export { todoComponent as TodoComponent };
