import type { Task } from '../App';

interface TodoItemProps {
  task: Task;
  buttonText: string;
  buttonColor?: string;
  onButtonClick: (task: Task) => void;
}

const TodoItem = ({ task, buttonText, buttonColor, onButtonClick }: TodoItemProps) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button 
        className="render-container__item-button"
        style={{ backgroundColor: buttonColor }}
        onClick={() => onButtonClick(task)}
      >
        {buttonText}
      </button>
    </li>
  );
};
export default TodoItem;