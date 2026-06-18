import { useState, useCallback, type KeyboardEvent } from 'react'
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

  const handleSearch = useCallback(() => {
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch(trimmed, includeAdult, language)
  }, [query, includeAdult, language, onSearch])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch()
    },
    [handleSearch],
  )

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* 검색 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="제목, 장르, 배우로 검색..."
          className="flex-1 px-5 py-3 rounded bg-[#2a2a2a] border border-[#333] text-white placeholder-[#777] focus:outline-none focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-colors text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-[#E50914] hover:bg-[#f40612] active:bg-[#b30710] text-white font-bold text-sm rounded tracking-wide transition-colors"
        >
          검색
        </button>
      </div>

      {/* 옵션 행 */}
      <div className="flex items-center justify-between px-0.5">
        {/* 언어 선택 */}
        <div className="flex gap-1.5">
          {LANGUAGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setLanguage(value)}
              className={`px-3 py-1 rounded text-xs font-medium tracking-wide transition-colors border ${
                language === value
                  ? 'bg-[#E50914] border-[#E50914] text-white'
                  : 'bg-transparent border-[#444] text-[#aaa] hover:border-[#E50914] hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 성인 콘텐츠 */}
        <label className="flex items-center gap-2 cursor-pointer select-none group">
          <div className="relative">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={(e) => setIncludeAdult(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-[#333] rounded-full peer-checked:bg-[#E50914] transition-colors" />
            <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
          </div>
          <span className="text-xs text-[#aaa] group-hover:text-white transition-colors">
            19+ 포함
          </span>
        </label>
      </div>
    </div>
  )
}
