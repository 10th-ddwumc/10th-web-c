import type { ChangeEvent, FormEvent } from 'react';

interface TodoInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

// props를 인자로 받아서 사용
const TodoInput = ({ value, onChange, onSubmit }: TodoInputProps) => {
  return (
    <form className="todo-container__form" onSubmit={onSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={value}
        onChange={onChange}
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoInput;