import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 max-w-[1920px] mx-auto w-full px-6">
        <Outlet />
      </main>
    </div>
  );
};

// 💡 이 줄이 누락되어 있을 확률이 100%입니다!
export default Layout;