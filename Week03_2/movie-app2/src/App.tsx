import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import MovieDetailsPage from './pages/MovieDetailPage'; // 파일명 확인 필요 (구조상 MovieDetails.tsx)
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout을 상위 루트로 설정하여 모든 페이지에 Navbar 적용 */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          
          {/* 동적 라우팅을 사용하여 카테고리별로 같은 MoviePage 컴포넌트 사용 */}
          <Route path="movies/:category" element={<MoviePage />} />
          
          {/* 특정 상세 페이지 경로 */}
          <Route path="movie/:id" element={<MovieDetailsPage />} />
          
          {/* 잘못된 경로 처리 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;