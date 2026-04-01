import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import HomePage from './pages/HomPage';
import MovieDetailPage from './pages/MovieDetailPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies/:movieId" element={<MovieDetailPage />} />
        <Route path="popular" element={<PopularPage />} />
        <Route path="now-playing" element={<NowPlayingPage />} />
        <Route path="top-rated" element={<TopRatedPage/>} />
        <Route path="upcoming" element={<UpcomingPage />} />
      </Route>
    </Routes>
  );
};

export default App;