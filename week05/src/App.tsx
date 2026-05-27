import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PremiumWebtoonPage from './pages/PremiumWebtoonPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 누구나 접근 가능 */}
          <Route path="/" element={<HomePage />} />

          {/* 비로그인 유저만 접근 가능 */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* 로그인한 유저만 접근 가능 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/premium/webtoon/:id" element={<PremiumWebtoonPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;