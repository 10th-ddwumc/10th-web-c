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