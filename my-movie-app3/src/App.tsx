import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* :movieId 부분이 useParams로 가져올 변수가 됩니다 */}
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}