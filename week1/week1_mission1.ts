const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('todo-item'); 

  const span = document.createElement('span');
  span.textContent = todo.text;
  li.appendChild(span);

  const button = document.createElement('button');
  if (isDone) {
    button.textContent = '삭제';
    button.classList.add('delete-button');
    button.onclick = () => {
      doneTasks = doneTasks.filter((t) => t.id !== todo.id);
      renderTasks();
    };
  } else {
    button.textContent = '완료';
    button.classList.add('complete-button');
    button.onclick = () => {
      todos = todos.filter((t) => t.id !== todo.id);
      doneTasks.push(todo);
      renderTasks();
    };
  }

  li.appendChild(button);
  return li;
};

todoForm.onsubmit = (e: Event) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
  }
};

renderTasks();