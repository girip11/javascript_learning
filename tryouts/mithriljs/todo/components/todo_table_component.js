'use strict';

import { TodoTableView } from '../views/todo_table_view.js';

// Duck typing comes in to picture here
// Any object with controller (optional) and view can be considered as component
const todoTableComponent = class TodoTableComponent {
  constructor(todoVM) {
    this._todoVM = todoVM;
    this._view = new TodoTableView(this._todoVM);
  }

  // _getTasks() {
  //   // console.log('_getTasks called');
  //   this._todoVM.fetchTasksFromServer().then(_ => {
  //     // console.log('within _getTasks then clause');
  //     m.redraw();
  //   });
  // }

  // this method is called everytime redraw is called
  view() {
    // console.log('Render called');
    return this._view.renderView();
  }
};

export { todoTableComponent as TodoTableComponent };
