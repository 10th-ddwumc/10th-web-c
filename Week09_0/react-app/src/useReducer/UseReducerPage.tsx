import { useState, useReducer, type JSX } from 'react';

// State 인터페이스
interface IState {
  counter: number;
}

// Action 인터페이스
interface IAction {
  type: 'INCREMENT' | 'DECREMENT' | 'RESET';
}

// reducer 함수
function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'INCREMENT':
      return { counter: state.counter + 1 };
    case 'DECREMENT':
      return { counter: state.counter - 1 };
    case 'RESET':
      return { counter: 0 };
    default:
      return state;
  }
}

export default function UseReducerPage(): JSX.Element {
  // 1. useState
  const [count, setCount] = useState(0);

  // 2. useReducer
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrease = (): void => {
    setCount(count + 1);
  };

  return (
    <div className='flex flex-col gap-10'>
      {/* useState */}
      <div>
        <h2 className='text-3xl font-bold'>useState</h2>
        <h2>useState훅 사용: {count}</h2>
        <button
          onClick={handleIncrease}
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Increase
        </button>
      </div>

      {/* useReducer */}
      <div>
        <h2 className='text-3xl font-bold'>useReducer</h2>
        <h2>useReducer훅 사용: {state.counter}</h2>
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className='bg-green-500 text-white px-4 py-2 rounded mr-2'
        >
          Increase
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className='bg-red-500 text-white px-4 py-2 rounded mr-2'
        >
          Decrease
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className='bg-gray-500 text-white px-4 py-2 rounded'
        >
          Reset
        </button>
      </div>
    </div>
  );
}