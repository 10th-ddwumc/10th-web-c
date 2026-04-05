import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const { todos } = useTodo();

    const todoItems = todos.filter((todo) => !todo.isDone);
    const doneItems = todos.filter((todo) => todo.isDone);

    return (
        <div className="render-container">
            <div className="render-container_section">
                <h2 className="render-container_title">할 일</h2>
                <ul className="render-container_list">
                    {todoItems.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
            <div className="render-container_section">
                <h2 className="render-container_title">완료</h2>
                <ul className="render-container_list">
                    {doneItems.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;