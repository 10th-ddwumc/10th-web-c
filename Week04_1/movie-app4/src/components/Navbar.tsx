import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { name: '홈', path: '/' },
  { name: '인기 영화', path: '/movies/popular' },
  { name: '상영 중', path: '/movies/now_playing' },
  { name: '평점 높은', path: '/movies/top_rated' },
  { name: '개봉 예정', path: '/movies/upcoming' },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1920px] mx-auto px-6 py-4 flex items-center justify-between">
        
        
        <div className="flex gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              // NavLink의 active 스타일링 기능 활용
              className={({ isActive }) => 
                `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-[#b2dab1] text-white' // 활성화 상태
                    : 'text-gray-700 hover:bg-gray-100' // 기본 상태
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;