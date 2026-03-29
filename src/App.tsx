import { useState } from 'react';
import type { FormEvent } from 'react';
import TodoInput from './components/TodoInput'; 
import './App.css'; 
import './index.css'; 

// 타입 정의
export type Task = {
  id: number;
  text: string;
};

function App() {
  //useState 사용 -> 상태 관리해줌
  const [todoInput, setTodoInput] = useState<string>(''); // 입력값
  const [todos, setTodos] = useState<Task[]>([]);         // 할 일 목록
  const [doneTasks, setDoneTasks] = useState<Task[]>([]); // 완료 목록
  
  // 할 일 추가
  const addTodo = (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지!!!!
    if (!todoInput.trim()) return;

    const newTask: Task = { id: Date.now(), text: todoInput };
    setTodos([...todos, newTask]); // 기존 리스트에 추가
    setTodoInput(''); // 입력창 비우기
  };

  // 완료로 이동
  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id)); // 할 일에서 제거됨
    setDoneTasks([...doneTasks, task]);              // 완료에 추가됨
  };

  // 완료에서 삭제
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">Hyun's TODO</h1>
      {/* 기존의 form -> component 를 넣음 */}
      <TodoInput 
        value={todoInput} 
        onChange={(e) => setTodoInput(e.target.value)} 
        onSubmit={addTodo} 
      />

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todos.map((task) => (
              <li key={task.id} className="render-container__item">
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
              <li key={task.id} className="render-container__item">
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
  );
}

export default App;