import { NavLink, useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate(); // 페이지 이동 훅

  const navItemStyle = ({ isActive }: { isActive: boolean }) => 
    `transition-colors duration-200 font-medium ${
      isActive ? "text-red-600" : "text-white hover:text-zinc-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
      {/* 메뉴 버튼들 */}
      <ul className="flex gap-8 text-sm lg:text-base">
        <li>
          <NavLink to="/" className={navItemStyle}>홈</NavLink>
        </li>
        <li>
          <NavLink to="/popular" className={navItemStyle}>인기 영화</NavLink>
        </li>
        <li>
          <NavLink to="/now-playing" className={navItemStyle}>상영 중</NavLink>
        </li>
        <li>
          <NavLink to="/top-rated" className={navItemStyle}>평점 높은</NavLink>
        </li>
        <li>
          <NavLink to="/upcoming" className={navItemStyle}>개봉 예정</NavLink>
        </li>
      </ul>

      {/* 우측 로그인 버튼 추가 */}
      <div className="flex gap-4">
        <button 
          onClick={() => navigate('/login')} // /login 경로로 이동
          className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          로그인
        </button>
      </div>
    </nav>
  );
};

export default Navbar;