const BASE_URL = 'http://localhost:8000'

export const getLps = async (cursor: number, order: 'asc' | 'desc') => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(
    `${BASE_URL}/v1/lps?cursor=${cursor}&limit=10&order=${order}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  )
  if (!res.ok) throw new Error('데이터 불러오기 실패')
  return res.json()
}

export const getLpDetail = async (lpId: number) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}/v1/lps/${lpId}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  if (!res.ok) throw new Error('데이터 불러오기 실패')
  return res.json()
}

// 이미지 업로드
export const uploadImage = async (file: File) => {
  const token = localStorage.getItem('accessToken')
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${BASE_URL}/v1/uploads`, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  })
  if (!res.ok) throw new Error('이미지 업로드 실패')
  return res.json()
}

// LP 생성
export const createLp = async (body: {
  title: string
  content: string
  thumbnail: string
  tags: string[]
  published: boolean
}) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}/v1/lps`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error('LP 생성 실패')
  return res.json()
}