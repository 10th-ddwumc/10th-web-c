import TodoItem from './TodoItem'; 
import type { Task } from '../contexts/TodoContext'; 

interface TodoListProps {
  title: string;
  tasks: Task[];
  buttonText: string;
  buttonColor?: string;
  onButtonClick: (task: Task) => void;
}

const TodoList = ({ title, tasks, buttonText, buttonColor, onButtonClick }: TodoListProps) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TodoItem 
            key={task.id} 
            task={task} 
            isDone={title === "완료"}
            buttonText={buttonText}
            buttonColor={buttonColor}
            onButtonClick={onButtonClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;