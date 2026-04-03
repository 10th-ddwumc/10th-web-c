import { useState } from 'react';
import type { FormEvent } from 'react';
import TodoInput from './components/TodoInput'; 
import TodoList from './components/TodoList'; 
import { TodoProvider, useTodo } from './contexts/TodoContext'; 
import { ThemeProvider, useTheme } from './contexts/ThemeContext'; 
import './index.css'; 
import './App.css';  

function AppContent() {
    const { todos, doneTasks, addTodo, completeTask, deleteTask } = useTodo();
    const { isDarkMode, toggleDarkMode } = useTheme();

    const [todoInput, setTodoInput] = useState<string>('');

    const handleAddTodo = (e: FormEvent) => {
        e.preventDefault();
        if (!todoInput.trim()) return;
        addTodo(todoInput); 
        setTodoInput('');
    };

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="app-layout dark:bg-[#1a1a1a] min-h-screen transition-colors">
                <div className="todo-container">
                    <div className="flex justify-end mb-4"> 
                        <button 
                            onClick={toggleDarkMode}
                            className="px-3 py-1 text-xs rounded-full font-bold shadow-sm transition-all 
                                    bg-gray-200 text-gray-800 hover:bg-gray-300
                                    dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
                        >
                            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>
                    
                    <h1 className="todo-container__header dark:text-white">Hyun's TODO</h1>
                    
                    <TodoInput 
                        value={todoInput} 
                        onChange={(e) => setTodoInput(e.target.value)} 
                        onSubmit={handleAddTodo}
                    />

                    <div className="render-container">
                        <TodoList 
                            title="할 일"
                            tasks={todos}
                            buttonText="완료"
                            buttonColor="#28a745"
                            onButtonClick={completeTask}
                        />

                        <TodoList 
                            title="완료"
                            tasks={doneTasks}
                            buttonText="삭제"
                            buttonColor="#dc3545"
                            onButtonClick={deleteTask}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
  return (
    <ThemeProvider>
        <TodoProvider>
            <AppContent />
        </TodoProvider>
  </ThemeProvider>
  );
}

export default App;