import { useState, useEffect, useRef } from 'react'

function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdated = useRef<number>(0)      // 마지막 실행 시각
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const now = Date.now()
    const remaining = interval - (now - lastUpdated.current)

    if (remaining <= 0) {
      // interval 지났으면 즉시 실행
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      lastUpdated.current = now
      setThrottledValue(value)
    } else {
      // 아직 interval 안 지났으면 남은 시간 후 실행 (trailing)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        lastUpdated.current = Date.now()
        setThrottledValue(value)
        timeoutRef.current = null
      }, remaining)
    }

    // 언마운트 시 타이머 정리
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, interval])

  return throttledValue
}

export default useThrottle