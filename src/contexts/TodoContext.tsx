import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Task 타입을 별도 파일(types.ts 등)로 분리하는 것이 권장되나, 현재는 예시에 맞춰 유지합니다.
export interface Task {
  id: number;
  text: string;
}

interface TodoContextType {
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    const newTask: Task = { id: Date.now(), text };
    setTodos((prev) => [...prev, newTask]);
  };

  const completeTask = (task: Task) => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider value={{ todos, doneTasks, addTodo, completeTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo는 TodoProvider 안에서 사용되어야 합니다!');
  return context;
};