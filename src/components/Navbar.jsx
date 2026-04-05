import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-slate-900 text-white shadow-lg">
      <h1 className="text-xl font-bold tracking-tight">Jaehee.Dev</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        <Link to="/foods" className="hover:text-blue-400 transition">Favorite Foods</Link>
      </div>
    </nav>
  );
}