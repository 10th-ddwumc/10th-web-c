import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task } from './App';

interface TodoContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  todos: Task[];
  doneTasks: Task[];
  addTodo: (text: string) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const addTodo = (text: string) => {
    const newTask: Task = { id: Date.now(), text };
    setTodos([...todos, newTask]);
  };

  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider value={{ isDarkMode, toggleDarkMode, todos, doneTasks, addTodo, completeTask, deleteTask }}>
      {children}
    </TodoContext.Provider>
  );
};

//커스텀 훅
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('useTodo는 TodoProvider 안에서 사용되어야함!');
  return context;
};