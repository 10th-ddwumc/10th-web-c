import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeLayout from './layouts/HomeLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LpDetailPage from './pages/LpDetailPage'
import ProtectedRoute from './components/ProtectedRoute'
import MyPage from './pages/MyPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path='/my' element={<MyPage />} />
          <Route path='/lp/:lpId' element={<ProtectedRoute> <LpDetailPage /></ProtectedRoute>}/>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App