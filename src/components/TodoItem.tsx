import type { Task } from '../contexts/TodoContext';

interface TodoItemProps {
  task: Task;
  isDone: boolean;
  buttonText: string;    
  buttonColor?: string; 
  onButtonClick: (task: Task) => void; // 부모가 정의한 동작 수행
}

const TodoItem = ({ 
  task, 
  isDone, 
  buttonText, 
  buttonColor, 
  onButtonClick 
}: TodoItemProps) => {
  
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button 
        className="render-container__item-button"
        style={{ backgroundColor: buttonColor || (isDone ? '#dc3545' : '#28a745') }}
        onClick={() => onButtonClick(task)}
      >
        {buttonText}
      </button>
    </li>
  );
};

export default TodoItem;