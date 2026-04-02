import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MovieDetail from './pages/MovieDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies/:movieId" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}
