const BASE_URL = 'http://localhost:8000'

// 댓글 목록 조회
export const getComments = async (
  lpId: number,
  cursor: number,
  order: 'asc' | 'desc'
) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(
    `${BASE_URL}/v1/lps/${lpId}/comments?cursor=${cursor}&limit=10&order=${order}`,
    {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  )
  if (!res.ok) throw new Error('댓글 불러오기 실패')
  return res.json()
}

// 댓글 작성
export const createComment = async (lpId: number, content: string) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}/v1/lps/${lpId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('댓글 작성 실패')
  return res.json()
}

// 댓글 수정
export const updateComment = async (lpId: number, commentId: number, content: string) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw new Error('댓글 수정 실패')
  return res.json()
}

// 댓글 삭제
export const deleteComment = async (lpId: number, commentId: number) => {
  const token = localStorage.getItem('accessToken')

  const res = await fetch(`${BASE_URL}/v1/lps/${lpId}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  })
  if (!res.ok) throw new Error('댓글 삭제 실패')
  return res.json()
}