import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar /> {/* 네비게이션 바는 모든 페이지에서 공통으로 보여야 하니까 Layout에 넣어줌 */}
      <main className="p-8">
        <Outlet /> {/* 여기서 실제 페이지 갈아끼워짐 */}
      </main>
    </div>
  );
};

export default Layout;