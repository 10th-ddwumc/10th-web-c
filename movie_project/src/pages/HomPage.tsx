const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
      {/* 로딩 애니메이션 표시 */}
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-xl font-bold text-zinc-400 animate-pulse">
        홈 콘텐츠를 불러오는 중입니다...잠시만 기다려주세요!
      </p>
    </div>
  );
};

export default HomePage;