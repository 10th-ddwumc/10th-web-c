const BASE_URL = 'http://localhost:8000'

// 내 정보 조회
export const getMe = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${BASE_URL}/v1/users/me`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  if (!res.ok) throw new Error('내 정보 조회 실패')
  return res.json()
}

// 프로필 수정
export const updateUser = async (body: { name?: string; bio?: string; avatar?: string }) => {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${BASE_URL}/v1/users`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('프로필 수정 실패')
  return res.json()
}

// 회원 탈퇴
export const deleteUser = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${BASE_URL}/v1/users`, {
    method: 'DELETE',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  if (!res.ok) throw new Error('회원 탈퇴 실패')
  return res.json()
}

// 로그아웃
export const signout = async () => {
  const token = localStorage.getItem('accessToken')
  const res = await fetch(`${BASE_URL}/v1/auth/signout`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  if (!res.ok) throw new Error('로그아웃 실패')
  return res.json()
}