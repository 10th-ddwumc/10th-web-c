const BASE_URL = 'http://localhost:8000'

// 회원가입
export const signup = async (
  name: string,
  email: string,
  password: string,
  bio: string,
  avatar: string
) => {
  const res = await fetch(`${BASE_URL}/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, bio, avatar }),
  })
  if (!res.ok) throw new Error('회원가입 실패')
  return res.json()
}

// 로그인
export const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/v1/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('로그인 실패')
  return res.json()
}