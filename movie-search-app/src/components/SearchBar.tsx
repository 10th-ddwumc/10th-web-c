import { useState, type KeyboardEvent } from 'react'
import type { Language } from '../types/movie'

interface SearchBarProps {
  onSearch: (query: string, includeAdult: boolean, language: Language) => void
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'ko-KR', label: '한국어' },
  { value: 'en-US', label: 'English' },
  { value: 'ja-JP', label: '日本語' },
]

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [includeAdult, setIncludeAdult] = useState(false)
  const [language, setLanguage] = useState<Language>('ko-KR')

  const handleSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch(trimmed, includeAdult, language)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 검색하세요..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          검색
        </button>
      </div>

      <div className="flex items-center gap-5 px-1">
        <div className="flex gap-1">
          {LANGUAGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setLanguage(value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                language === value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none ml-auto">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => setIncludeAdult(e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
          <span className="text-sm text-gray-300">성인 콘텐츠 포함</span>
        </label>
      </div>
    </div>
  )
}
