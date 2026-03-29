import { useState } from 'react';
import type { FormEvent } from 'react';
import TodoInput from './components/TodoInput'; 
import { TodoProvider, useTodo } from './TodoContext';
import './App.css'; 
import './index.css'; 

// 타입 정의
export type Task = {
  id: number;
  text: string;
};

function AppContent() {
    // useState -> useTodo로 변경! (Context에서 관리하는 상태와 함수들을 가져옴)
    const { 
        isDarkMode, 
        toggleDarkMode, 
        todos, 
        doneTasks, 
        addTodo, 
        completeTask, 
        deleteTask 
    } = useTodo();

    console.log("현재 다크모드 상태:", isDarkMode);

    // 입력창 상태는 화면 안에서만 쓰니까 여기서 관리해도 됨!
    const [todoInput, setTodoInput] = useState<string>('');

    const handleAddTodo = (e: FormEvent) => {
        e.preventDefault();
        if (!todoInput.trim()) return;
        
        // Context의 addTodo를 실행! (여기서 text만 넘기면 됨)
        addTodo(todoInput); 
        setTodoInput('');
    };


  return (
    <div className={isDarkMode ? 'dark' : ''}>
        <div className="app-layout">
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
        <h1 className="todo-container__header">Hyun's TODO</h1>
        {/* 기존의 form -> component 를 넣음 */}
        <TodoInput 
            value={todoInput} 
            onChange={(e) => setTodoInput(e.target.value)} 
            onSubmit={handleAddTodo}
        />

        <div className="render-container">
            <div className="render-container__section">
            <h2 className="render-container__title">할 일</h2>
            <ul className="render-container__list">
                {todos.map((task) => (
                <li key={task.id} className="render-container__item dark:bg-[#2d2d2d] dark:border-none">
                    <span className="render-container__item-text">{task.text}</span>
                    <button 
                    className="render-container__item-button"
                    style={{ backgroundColor: '#28a745' }}
                    onClick={() => completeTask(task)}
                    >
                    완료
                    </button>
                </li>
                ))}
            </ul>
            </div>

            <div className="render-container__section">
            <h2 className="render-container__title">완료</h2>
            <ul className="render-container__list">
                {doneTasks.map((task) => (
                <li key={task.id} className="render-container__item dark:bg-[#2d2d2d] dark:border-none">
                    <span className="render-container__item-text">{task.text}</span>
                    <button 
                    className="render-container__item-button"
                    onClick={() => deleteTask(task)}
                    >
                    삭제
                    </button>
                </li>
                ))}
            </ul>
            </div>
        </div>
        </div>
        </div>
        </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

export default App;