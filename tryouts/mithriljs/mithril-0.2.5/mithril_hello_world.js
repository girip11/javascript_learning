/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */

// This is the sample application's namespace
const todo = {};

// data is an object that will have the
// desired properties to set the
//  this is the model
todo.Todo = class {
  constructor(description = '', done = false) {
    this._description = description;
    this._done = done;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get done() {
    return this._done;
  }

  set done(done) {
    this._done = done;
  }
};
// function (data) {
//   this.description = m.prop(data.description);
//   this.done = m.prop(false);
// };

todo.TodoList = Array;

// let myTask = new todo.Todo('Learn Mithril');
// console.log(myTask.description);
// myTask.done = true;

// let todoList = new todo.TodoList();
// todoList.push(myTask);

// view- model
// model level entity that stores the UI state
todo.TodoVM = class {
  constructor() {
    this._list = new todo.TodoList();
    this._description = '';
  }

  get todoList() {
    return this._list;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  add() {
    if (this._description) {
      console.log('Entry added to todo list');
      this._list.push(new todo.Todo(this._description));
      this.description = '';
    }
  }
};

todo.Controller = class {
  constructor() {
    this._todoVM = new todo.TodoVM();
  }

  get todoVM() {
    return this._todoVM;
  }
};

todo.View = class View {
  view(controller) {
    const todoVM = controller.todoVM();
    return m('div', [
      m('input', {
        onchange: m.withAttr('value', value => {
          console.log(`hit onchange: ${value}`);
          todoVM.description = value;
        }),
        value: todoVM.description,
      }),
      m(
        'button',
        {
          onclick: () => {
            todoVM.add();
          },
        },
        'Add',
      ),
      View.renderTable(todoVM),
    ]);
  }

  static renderTable(todoVM) {
    const tableHeader = () => {
      return m('tr', [
        m('td', [
          m('input', {
            onclick: m.withAttr('checked', value => {
              if (value) {
                todoVM.todoList.forEach(todoTask => {
                  todoTask.done = true;
                });
              }
            }),
            type: 'checkbox',
          }),
        ]),
        m('th', { scope: 'col' }, 'Todo description'),
      ]);
    };

    const tableData = todoTask => {
      return m('tr', [
        m('td', [
          m('input', {
            onclick: m.withAttr('checked', value => {
              todoTask.done = value;
            }),
            type: 'checkbox',
            checked: todoTask.done,
          }),
        ]),
        m('td', todo.done ? m('s', todo.description) : todo.description),
      ]);
    };

    const tableRows = [tableHeader()];
    todoVM.todoList.map(todoTask => tableRows.push(tableData(todoTask)));

    return m('table', tableRows);
  }
};

// let todoController =
// const todoView = new todo.View();
// controller.todoVM.description = 'Learning Mithril';
m.mount(document.body, {
  controller() {
    return new todo.Controller(new todo.TodoVM());
  },
  view(controller) {
    const todoView = new todo.View();
    return todoView.view(controller);
  },
});
