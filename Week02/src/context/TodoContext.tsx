import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Todo } from "../types";

type TodoContextType = {
    todos: Todo[];
    addTodo: (text: string) => void;
    completeTask: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (text: string): void => {
        setTodos([...todos, { id: Date.now(), text, isDone: false }]);
    };

    const completeTask = (id: number): void => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: true } : todo
        ));
    };

    const deleteTodo = (id: number): void => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, completeTask, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (!context) throw new Error("TodoProvider 안에서 사용해주세요");
    return context;
};