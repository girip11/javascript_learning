'use strict';

import { TodoTask } from './models/task.js';

const taskClient = class TaskClient {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  createTask(task) {
    return this._createOrUpdateTask(task);
  }

  getTask(taskId) {
    let get_url = `${this._baseUrl}/tasks/${taskId}`;
    return TaskClient._sendRequest({
      method: 'GET',
      url: get_url,
      deserialize: TaskClient._deserialize,
    });
  }

  getAllTasks() {
    const deserialize = function(value) {
      let json = JSON.parse(value);
      return json['data'].map(
        entry => new TodoTask(entry['description'], entry['id'], entry['status']),
      );
    };

    return TaskClient._sendRequest({
      method: 'GET',
      url: `${this._baseUrl}/tasks`,
      deserialize: deserialize,
    });
  }

  updateTask(task) {
    return this._createOrUpdateTask(task, true);
  }

  deleteTask(taskId) {
    return TaskClient._sendRequest({
      method: 'DELETE',
      url: `${this._baseUrl}/tasks/${taskId}`,
    });
  }

  _createOrUpdateTask(task, update = false) {
    let post_url = `${this._baseUrl}/tasks`;

    if (update) {
      post_url = `${post_url}/${task.id}`;
    }

    return TaskClient._sendRequest({
      method: update ? 'PUT' : 'POST',
      url: post_url,
      task: task,
      serialize: TaskClient._serialize,
      deserialize: TaskClient._deserialize,
    });
  }

  static _serialize(data) {
    return JSON.stringify(data);
  }

  static _deserialize(data) {
    let taskJson = JSON.parse(data);
    return new TodoTask(taskJson['description'], taskJson['id'], taskJson['status']);
  }

  static _configureXhr(xhr) {
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.withCredentials = true;
  }

  static _sendRequest({
    method: httpMethod,
    url: httpUrl,
    task: data = null,
    serialize = null,
    deserialize = null,
  }) {
    let options = {
      method: httpMethod,
      url: httpUrl,
      config: TaskClient._configureXhr,
    };

    if (data !== null) {
      options.data = data;
    }

    if (serialize) {
      options.serialize = serialize;
    }

    if (deserialize) {
      options.deserialize = deserialize;
    }

    return m.request(options).catch(e => console.log(e));
  }
};

export { taskClient as TaskClient };
