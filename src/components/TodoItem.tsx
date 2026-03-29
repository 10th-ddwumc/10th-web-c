import { useTodo } from '../TodoContext';
import type { Task } from '../App';

interface TodoItemProps {
  task: Task;
  isDone: boolean; // 할 일인지 완료인지 구분만 해줌
}

const TodoItem = ({ task, isDone }: TodoItemProps) => {
  const { completeTask, deleteTask } = useTodo(); // 낚시질! 🎣

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button 
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? '#dc3545' : '#28a745' }}
        onClick={() => isDone ? deleteTask(task) : completeTask(task)}
      >
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default TodoItem;