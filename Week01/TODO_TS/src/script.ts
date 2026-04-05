const todoInput = document.getElementById("todo_input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
}

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTask = (): void => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";

    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text }); // oush → push 오타 수정
    todoInput.value = '';
    renderTask();
};

const completeTask = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);
    renderTask();
};

const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => { // void → HTMLLIElement 수정
    const li = document.createElement("li");
    li.classList.add("render-container_item");

    const span = document.createElement("span");
    span.classList.add("render-container_item-text");
    span.textContent = todo.text;

    const button = document.createElement("button");
    button.classList.add("render-container_item-button");

    if (isDone) {
        button.textContent = "삭제";
        button.style.backgroundColor = "#dc3545";
    } else {
        button.textContent = "완료";
        button.style.backgroundColor = "#28a745";
    }

    button.addEventListener("click", (): void => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            completeTask(todo);
        }
    });

    li.appendChild(span);
    li.appendChild(button);

    return li; // li 반환 추가
};

// form 이벤트는 전역에 한 번만 등록
todoForm.addEventListener("submit", (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});