import { TaskClient } from './task_client.js';
import { TodoComponent } from './components/todo_component.js';

let tc = new TaskClient('https://rem-rest-api.herokuapp.com/api');
let todoComponent = new TodoComponent(tc);
m.mount(document.body, todoComponent);
