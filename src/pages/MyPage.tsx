import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getMe, updateUser, deleteUser, signout } from '../apis/users'
import { uploadImage } from '../apis/lps'
import { useState, useEffect } from 'react'

const MyPage = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('')

  // 내 정보 조회
    const { data, isPending } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    })

    useEffect(() => {
    if (data?.data) {
        setName(data.data.name ?? '')
        setBio(data.data.bio ?? '')
        setAvatar(data.data.avatar ?? '')
        setAvatarPreview(data.data.avatar ?? '')
    }
    }, [data])
  // 프로필 수정
  const { mutate: editUser, isPending: isUpdating } = useMutation({
    mutationFn: () => updateUser({ name, bio, avatar }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      setIsEditing(false)
    },
  })

  // 아바타 업로드
  const { mutate: uploadAvatar } = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      setAvatar(data.data.imageUrl)
      setAvatarPreview(data.data.imageUrl)
    },
  })

  // 로그아웃
  const { mutate: logout } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      localStorage.removeItem('accessToken')
      navigate('/login')
    },
  })

  // 회원 탈퇴
  const { mutate: withdraw } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem('accessToken')
      navigate('/login')
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarPreview(URL.createObjectURL(file))
    uploadAvatar(file)
  }

  if (isPending) return <div className='p-6'>로딩 중...</div>

  const user = data?.data

  return (
    <div className='max-w-md mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>마이페이지</h1>

      {/* 프로필 영역 */}
      <div className='flex flex-col items-center mb-6'>
        {/* 아바타 */}
        <div className='w-24 h-24 rounded-full bg-pink-200 overflow-hidden mb-3'>
          {avatarPreview ? (
            <img src={avatarPreview} alt='avatar' className='w-full h-full object-cover' />
          ) : (
            <div className='w-full h-full flex items-center justify-center text-pink-600 text-3xl font-bold'>
              {user?.name?.[0] ?? '?'}
            </div>
          )}
        </div>

        {isEditing && (
          <input type='file' accept='image/*' onChange={handleAvatarChange} className='text-sm mb-2' />
        )}
      </div>

      {isEditing ? (
        // 수정 모드
        <div className='flex flex-col gap-4 mb-6'>
          <div>
            <label className='block text-sm font-medium mb-1'>이름</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className='w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500 resize-none'
            />
          </div>
          <div className='flex gap-2'>
            <button
              onClick={() => editUser()}
              disabled={isUpdating}
              className='flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 disabled:opacity-50'
            >
              {isUpdating ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300'
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        // 조회 모드
        <div className='mb-6'>
          <p className='text-lg font-bold'>{user?.name}</p>
          <p className='text-gray-500 text-sm'>{user?.email}</p>
          <p className='text-gray-700 mt-2'>{user?.bio ?? '소개가 없어요.'}</p>
          <button
            onClick={() => {
              setName(user?.name ?? '')
              setBio(user?.bio ?? '')
              setIsEditing(true)
            }}
            className='mt-4 w-full border border-pink-500 text-pink-500 py-2 rounded hover:bg-pink-50'
          >
            프로필 수정
          </button>
        </div>
      )}

      {/* 로그아웃 */}
      <button
        onClick={() => logout()}
        className='w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 mb-3'
      >
        로그아웃
      </button>

      {/* 회원 탈퇴 */}
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className='w-full text-red-400 text-sm hover:underline'
      >
        회원 탈퇴
      </button>

      {/* 탈퇴 확인 모달 */}
      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 w-80'>
            <h2 className='text-lg font-bold mb-2'>정말 탈퇴하시겠어요?</h2>
            <p className='text-gray-500 text-sm mb-6'>
              탈퇴 시 모든 게시글, 댓글, 좋아요 정보가 삭제됩니다.
            </p>
            <div className='flex gap-2'>
              <button
                onClick={() => withdraw()}
                className='flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600'
              >
                탈퇴
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className='flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300'
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPage