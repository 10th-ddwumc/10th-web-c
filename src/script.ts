const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
  id: number; //식별자
  text: string; // 할 일 내용
};

let todos: Todo[] = []; // 할 일 목록
let doneTasks: Todo[] = []; // 완료 목록

const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 1. 할 일 목록 렌더링
  todos.forEach((todo) => {
    const todoItem = createTodoItemElement(todo, false);
    todoList.appendChild(todoItem);
  });

  // 2. 완료 목록 렌더링
  doneTasks.forEach((todo) => {
    const doneItem = createTodoItemElement(todo, true);
    doneList.appendChild(doneItem);
  });
};

const createTodoItemElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.className = "render-container__item";

  const span = document.createElement("span");
  span.innerText = todo.text;
  li.appendChild(span);

  const button = document.createElement("button");

  button.classList.add("render-container__item-button");

  if (!isDone) {
    button.innerText = "완료";
    button.classList.add("render-container__item-button--complete");
    button.addEventListener("click", () => completeTask(todo));
  } else {
    button.innerText = "삭제";
    button.classList.add("render-container__item-button--delete");
    button.addEventListener("click", () => deleteTask(todo));
  }

  li.appendChild(button);
  return li;
};

const addTodo = (text: string): void => {
  if (text.trim() === "") return;

  const newTodo: Todo = {
    id: Date.now(), // 중복 방지
    text: text,
  };
  todos.push(newTodo);

  todoInput.value = "";
  renderTasks();
};

const completeTask = (todoToComplete: Todo): void => {
  todos = todos.filter((t: Todo) => t.id !== todoToComplete.id);

  doneTasks.push(todoToComplete);

  renderTasks();
};

const deleteTask = (todoToDelete: Todo): void => {
  doneTasks = doneTasks.filter((t: Todo) => t.id !== todoToDelete.id);

  renderTasks();
};

todoForm.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  addTodo(todoInput.value);
});

renderTasks();
