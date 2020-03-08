'use strict';

import { TodoTask } from '../models/task.js';

const todoTaskCreationView = class TodoTaskCreationView {
  constructor(todovm) {
    this._todovm = todovm;
  }

  renderView() {
    return m('div', this._getView());
  }

  // get a inpout text box and a create button
  _getView() {
    let textbox = m('input[type="text"]', {
      onchange: m.withAttr('value', value => {
        this._todovm.current_description = value;
      }),
      value: this._todovm.current_description,
    });

    let button = m(
      'button',
      {
        onclick: m.withAttr('text', () => this._createTask()),
      },
      'Create',
    );

    return [textbox, button];
  }

  _createTask() {
    if (this._todovm.current_description) {
      this._todovm.addTask(new TodoTask(this._todovm.current_description));
    }
  }
};
export { todoTaskCreationView as TodoTaskCreationView };
