import { memo } from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
}

const TextInput = memo(function TextInput({ value, onChange }: TextInputProps) {
  console.log('%c[TextInput] 렌더링', 'color: #e53e3e; font-weight: bold;')

  return (
    <div className="section">
      <h2>Text Input</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="텍스트를 입력하세요..."
      />
      <span className="value">입력값: {value || '—'}</span>
    </div>
  )
})

export default TextInput
