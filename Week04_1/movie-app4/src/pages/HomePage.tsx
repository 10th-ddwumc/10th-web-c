import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page text-center py-24 flex flex-col items-center gap-6 bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
      <span className='text-6xl text-[#dda5e3]'>🎬</span>
      <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight">UMC Movies 에 오신 것을 환영합니다!</h1>
      <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
        최신 인기 영화부터 개봉 예정 영화까지, TMDB API를 활용한 실시간 영화 정보를 확인해 보세요. 카테고리를 선택하여 탐색을 시작하세요.
      </p>
      
      <div className='flex gap-4 mt-6'>
          <Link to="/movies/popular" className='px-7 py-3 bg-[#dda5e3] text-white rounded-full font-bold shadow-md hover:bg-[#b2dab1] transition-colors'>
              인기 영화 보러가기 →
          </Link>
      </div>
    </div>
  );
};

export default HomePage;