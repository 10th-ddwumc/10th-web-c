import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MoviesPage from './pages/MoviePage';
import HomePage from './pages/HomPage';
import MovieDetailPage from './pages/MovieDetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:movieId" element={<MovieDetailPage />} />
        {/* 굳이 라우터를 여러개 반복해서 쓸 필요 */}
        <Route path=":category" element={<MoviesPage />} />
      </Route>
    </Routes>
  );
};

export default App;