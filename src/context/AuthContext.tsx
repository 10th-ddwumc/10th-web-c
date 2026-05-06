import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  accessToken: string | null
  nickname: string | null
  login: (token: string, nickname: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  )
  const [nickname, setNickname] = useState<string | null>(
    localStorage.getItem('nickname')
  )

  const login = (token: string, nickname: string) => {
    setAccessToken(token)
    setNickname(nickname)
    localStorage.setItem('accessToken', token)
    localStorage.setItem('nickname', nickname)
  }

  const logout = () => {
    setAccessToken(null)
    setNickname(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('nickname')
  }

  return (
    <AuthContext.Provider value={{ accessToken, nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}