"use strict";
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTasks = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((todo) => {
        const todoItem = createTodoItemElement(todo, false);
        todoList.appendChild(todoItem);
    });
    doneTasks.forEach((todo) => {
        const doneItem = createTodoItemElement(todo, true);
        doneList.appendChild(doneItem);
    });
};
const createTodoItemElement = (todo, isDone) => {
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
    }
    else {
        button.innerText = "삭제";
        button.classList.add("render-container__item-button--delete");
        button.addEventListener("click", () => deleteTask(todo));
    }
    li.appendChild(button);
    return li;
};
const addTodo = (text) => {
    if (text.trim() === "")
        return;
    const newTodo = {
        id: Date.now(),
        text: text,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTasks();
};
const completeTask = (todoToComplete) => {
    todos = todos.filter((t) => t.id !== todoToComplete.id);
    doneTasks.push(todoToComplete);
    renderTasks();
};
const deleteTask = (todoToDelete) => {
    doneTasks = doneTasks.filter((t) => t.id !== todoToDelete.id);
    renderTasks();
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
});
renderTasks();
