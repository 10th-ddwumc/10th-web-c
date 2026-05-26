import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadImage, createLp } from '../apis/lps'

interface Props {
  onClose: () => void
}

const LpCreateModal = ({ onClose }: Props) => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [preview, setPreview] = useState('')

  // 이미지 업로드
  const { mutate: uploadImg } = useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      setThumbnail(data.data.imageUrl)
    },
  })

  // LP 생성
  const { mutate: submitLp, isPending } = useMutation({
    mutationFn: () => createLp({ title, content, thumbnail, tags, published: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] })
      onClose()
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file)) // 미리보기
    uploadImg(file)
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = () => {
  console.log({ title, content, thumbnail, tags }) // 이거 추가
  if (!title.trim() || !content.trim() || !thumbnail) return
  submitLp()
}

  

  return (
    // 배경 오버레이
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-xl w-full max-w-md p-6 relative'>
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl'
        >
          ✕
        </button>

        <h2 className='text-xl font-bold mb-4'>LP 추가</h2>

        {/* 이미지 업로드 */}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>LP 사진</label>
          {preview && (
            <img src={preview} alt='preview' className='w-full h-48 object-cover rounded mb-2' />
          )}
          <input type='file' accept='image/*' onChange={handleFileChange} />
        </div>

        {/* 제목 */}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
            className='w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
        </div>

        {/* 본문 */}
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='내용을 입력하세요'
            rows={3}
            className='w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500 resize-none'
          />
        </div>

        {/* 태그 */}
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-1'>태그 (엔터로 추가)</label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder='태그 입력 후 엔터'
            className='w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-pink-500'
          />
          <div className='flex flex-wrap gap-2 mt-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='bg-pink-100 text-pink-600 text-sm px-2 py-1 rounded-full flex items-center gap-1'
              >
                #{tag}
                <button onClick={() => removeTag(tag)} className='hover:text-pink-800'>✕</button>
              </span>
            ))}
          </div>
        </div>

        {/* 제출 버튼 */}
        <button
          onClick={handleSubmit}
          disabled={isPending || !title || !content || !thumbnail}
          className='w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 disabled:opacity-50'
        >
          {isPending ? '업로드 중...' : 'Add LP'}
        </button>
      </div>
    </div>
  )
}

export default LpCreateModal