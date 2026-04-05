import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
    const [input, setInput] = useState("");
    const { addTodo } = useTodo();

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        if (input.trim()) {
            addTodo(input.trim());
            setInput("");
        }
    };

    return (
        <form id="todo-form" className="todo-container_form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-container_input"
                placeholder="할 일을 입력해주세요"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="todo-container_button">할 일 추가</button>
        </form>
    );
};

export default TodoForm;