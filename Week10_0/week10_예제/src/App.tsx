import { useState, useCallback } from 'react'
import Counter from './components/Counter'
import TextInput from './components/TextInput'
import './App.css'

function App() {
  console.log('%c[App] 렌더링', 'color: #38a169; font-weight: bold;')

  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  // useCallback — count가 바뀌어도 TextInput에 전달되는 onChange 참조 유지
  // text가 바뀌어도 Counter에 전달되는 onIncrement 참조 유지
  const handleIncrement = useCallback(() => {
    setCount((prev) => prev + 1)
  }, [])

  const handleTextChange = useCallback((value: string) => {
    setText(value)
  }, [])

  return (
    <div className="app">
      <h1>렌더링 최적화 데모</h1>

      <Counter count={count} onIncrement={handleIncrement} />

      <div className="divider" />

      <TextInput value={text} onChange={handleTextChange} />
    </div>
  )
}

export default App
