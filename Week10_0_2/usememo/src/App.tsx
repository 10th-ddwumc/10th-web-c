import { useState, useMemo } from 'react'
import PrimeList from './components/PrimeList'
import './App.css'

// 에라토스테네스의 체
function sieve(limit: number): number[] {
  if (limit < 2) return []

  console.log(`%c[sieve] 소수 계산 실행 (limit: ${limit})`, 'color: #e53e3e; font-weight: bold;')

  const isPrime = new Array(limit + 1).fill(true)
  isPrime[0] = isPrime[1] = false

  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false
      }
    }
  }

  return isPrime.reduce<number[]>((acc, prime, num) => {
    if (prime) acc.push(num)
    return acc
  }, [])
}

function App() {
  console.log('%c[App] 렌더링', 'color: #38a169; font-weight: bold;')

  const [limit, setLimit] = useState(50)
  const [text, setText] = useState('')

  // limit이 바뀔 때만 소수 계산 — text 입력 시엔 재계산 안 함
  const primes = useMemo(() => sieve(limit), [limit])

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    if (!isNaN(val) && val >= 0) setLimit(val)
  }

  return (
    <div className="app">
      <h1>소수 찾기 (에라토스테네스의 체)</h1>

      <div className="controls">
        <div className="field">
          <label>범위 (limit)</label>
          <input
            type="number"
            min={0}
            value={limit}
            onChange={handleLimitChange}
            placeholder="숫자를 입력하세요"
          />
        </div>

        <div className="field">
          <label>텍스트 입력 (리렌더링 테스트)</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="입력해도 소수 재계산 안 함"
          />
        </div>
      </div>

      <hr />

      {/* primes 참조가 동일하면 PrimeList도 리렌더 안 함 */}
      <PrimeList primes={primes} />
    </div>
  )
}

export default App
