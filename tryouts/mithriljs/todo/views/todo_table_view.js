'use strict';

const todoTableView = class TodoTableView {
  constructor(todovm) {
    this._todovm = todovm;
  }

  renderView() {
    return m('div', [this._getTable()]);
  }

  _getTable() {
    return m('table', [this._getTableHeader(), this._getTableData()]);
  }

  _getTableHeader() {
    let tasks = this._todovm.getAllTasks();
    let statusColumn = m(
      'td',
      m('input[type="checkbox"]', {
        onchange: m.withAttr('checked', checked => {
          tasks.forEach(task => {
            if (task.status !== checked) {
              this._todovm.updateTaskStatus(task.id, checked);
            }
          });
        }),
        checked: !tasks.some(task => task.status === false),
      }),
    );

    let descriptionColumn = m('th', { scope: 'col' }, 'Description');
    let deleteColumn = m('td', '');
    let headerRow = m('tr', [statusColumn, descriptionColumn, deleteColumn]);
    return m('thead', headerRow);
  }

  _getTableData() {
    console.log(`Task count: ${this._todovm.getAllTasks().length}`);
    const tableRows = this._todovm.getAllTasks().map(task => {
      let statusColumn = m(
        'td',
        m('input[type="checkbox"]', {
          onchange: m.withAttr('checked', checked => {
            this._todovm.updateTaskStatus(task.id, checked);
          }),
          checked: task.status,
        }),
      );

      let descriptionColumn = m('td', task.description);

      let deleteTaskColumn = m('td', this._getDeleteTaskButton(task));

      return m('tr', [statusColumn, descriptionColumn, deleteTaskColumn]);
    });

    return m('tbody', tableRows);
  }

  _getDeleteTaskButton(task) {
    return m(
      'button',
      {
        onclick: m.withAttr('id', taskId => {
          this._todovm.deleteTask(Number.parseInt(taskId));
        }),
        id: task.id,
      },
      'x',
    );
  }
};

export { todoTableView as TodoTableView };
