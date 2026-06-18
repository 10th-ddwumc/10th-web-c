import { memo } from 'react'

interface CounterProps {
  count: number
  onIncrement: () => void
}

const Counter = memo(function Counter({ count, onIncrement }: CounterProps) {
  console.log('%c[Counter] 렌더링', 'color: #4f46e5; font-weight: bold;')

  return (
    <div className="section">
      <h2>Counter</h2>
      <p>{count}</p>
      <button onClick={onIncrement}>+ 증가</button>
    </div>
  )
})

export default Counter
