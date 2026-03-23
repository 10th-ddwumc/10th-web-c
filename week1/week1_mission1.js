var todoForm = document.getElementById('todo-form');
var todoInput = document.getElementById('todo-input');
var todoList = document.getElementById('todo-list');
var doneList = document.getElementById('done-list');
var todos = [];
var doneTasks = [];
var renderTasks = function () {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach(function (todo) {
        var li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach(function (todo) {
        var li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
var createTodoElement = function (todo, isDone) {
    var li = document.createElement('li');
    li.classList.add('todo-item');
    var span = document.createElement('span');
    span.textContent = todo.text;
    li.appendChild(span);
    var button = document.createElement('button');
    if (isDone) {
        button.textContent = '삭제';
        button.classList.add('delete-button');
        button.onclick = function () {
            doneTasks = doneTasks.filter(function (t) { return t.id !== todo.id; });
            renderTasks();
        };
    }
    else {
        button.textContent = '완료';
        button.classList.add('complete-button');
        button.onclick = function () {
            todos = todos.filter(function (t) { return t.id !== todo.id; });
            doneTasks.push(todo);
            renderTasks();
        };
    }
    li.appendChild(button);
    return li;
};
todoForm.onsubmit = function (e) {
    e.preventDefault();
    var text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text: text });
        todoInput.value = '';
        renderTasks();
    }
};
renderTasks();
