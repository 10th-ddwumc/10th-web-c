import { useState, useReducer } from "react";

const initialState = { counter: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREASE":
      return { counter: state.counter + 1 };
    case "DECREASE":
      return { counter: state.counter - 1 };
    case "RESET_TO_ZERO":
      return { counter: 0 };
    default:
      return state;
  }
}

export default function CounterComparison() {
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ padding: "40px" }}>

      <div>
        <h2>useState</h2>
        <p>useState 사용: {count}</p>
        <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      </div>

      <hr />

      <div>
        <h2>useReducer</h2>
        <p>useReducer 사용: {state.counter}</p>
        <button onClick={() => dispatch({ type: "INCREASE" })}>Increase</button>
        <button onClick={() => dispatch({ type: "DECREASE" })}>Decrease</button>
        <button onClick={() => dispatch({ type: "RESET_TO_ZERO" })}>reset</button>
      </div>

    </div>
  );
}