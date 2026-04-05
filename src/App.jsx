import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Foods from '../../src/pages/Foods';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/foods" element={<Foods />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;