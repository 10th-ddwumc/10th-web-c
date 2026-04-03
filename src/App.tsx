import { useState } from 'react';
import type { FormEvent } from 'react';
import TodoInput from './components/TodoInput'; 
import TodoList from './components/TodoList'; 
import { TodoProvider, useTodo } from './contexts/TodoContext'; 
import { ThemeProvider, useTheme } from './contexts/ThemeContext'; 
import './index.css'; 
import './App.css';  

function AppContent() {
    // 1. Context 분리에 따라 각각의 Hook에서 상태를 가져옴
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
        // 2. 최상위 div에 다크모드 클래스 적용
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
                        {/* 3. 피드백 반영: TodoList 컴포넌트를 사용하여 중복 로직 제거 */}
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

// 4. 두 개의 Provider로 AppContent를 감싸줌
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