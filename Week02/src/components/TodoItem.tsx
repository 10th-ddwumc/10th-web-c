import { useTodo } from "../context/TodoContext";
import type { Todo } from "../types";

type Props = {
    todo: Todo;
}

const TodoItem = ({ todo }: Props) => {
    const { completeTask, deleteTodo } = useTodo();

    return (
        <li className="render-container_item">
            <span className="render-container_item-text">{todo.text}</span>
            {todo.isDone ? (
                <button
                    className="render-container_item-button"
                    style={{ backgroundColor: "#dc3545" }}
                    onClick={() => deleteTodo(todo.id)}
                >삭제</button>
            ) : (
                <button
                    className="render-container_item-button"
                    style={{ backgroundColor: "#28a745" }}
                    onClick={() => completeTask(todo.id)}
                >완료</button>
            )}
        </li>
    );
};

export default TodoItem;