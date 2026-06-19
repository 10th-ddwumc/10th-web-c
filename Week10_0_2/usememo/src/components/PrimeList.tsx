import { memo } from 'react'

interface PrimeListProps {
  primes: number[]
}

const PrimeList = memo(function PrimeList({ primes }: PrimeListProps) {
  console.log('%c[PrimeList] 렌더링', 'color: #4f46e5; font-weight: bold;')

  return (
    <div>
      <p className="result-header">소수 {primes.length}개</p>
      <div className="prime-grid">
        {primes.length === 0 ? (
          <span className="empty">2 이상의 숫자를 입력하세요.</span>
        ) : (
          primes.map((p) => (
            <span key={p} className="prime-badge">{p}</span>
          ))
        )}
      </div>
    </div>
  )
})

export default PrimeList
