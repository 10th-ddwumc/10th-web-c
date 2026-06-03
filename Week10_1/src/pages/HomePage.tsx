import React, { useState, useMemo, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { MovieCard } from '../components/MovieCard';
import { MovieModal } from '../components/MovieModal';

export default function HomePage(): React.ReactElement {
    // 1. 상태(State) 관리 영역
    const [searchQuery, setSearchQuery] = useState('');     // 인풋 제어 전용 (타이핑 시 이 상태만 변경됨)
    const [appliedQuery, setAppliedQuery] = useState('');   // 실제 API 요청 버튼을 눌렀을 때만 변경됨
    const [includeAdult, setIncludeAdult] = useState(false); 
    const [language, setLanguage] = useState('ko-KR');      
    const [selectedMovie, setSelectedMovie] = useState<any | null>(null); 

    // 2. API 요청 조건 묶기 (useMemo를 통한 메모이제이션)
    const fetchParams = useMemo(() => ({
        query: appliedQuery,
        include_adult: includeAdult,
        language: language,
        page: 1
    }), [appliedQuery, includeAdult, language]);

    // TMDB 검색 API 호출 (url은 기본 baseURL 뒤에 추가 파라미터가 없으므로 빈 문자열 전달)
    const { data, loading } = useFetch<any>('', fetchParams);

    // 3. 이벤트 핸들러 최적화 (useCallback)
    const handleSearchSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        setAppliedQuery(searchQuery.trim());
    }, [searchQuery]);

    const handleMovieClick = useCallback((movie: any) => {
        setSelectedMovie(movie);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedMovie(null);
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            {/* 상단 검색 영역 레이아웃 */}
            <header style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    
                    {/* 영화 제목 입력 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <label style={{ fontWeight: 'bold', color: '#333' }}>🎬 영화 제목 입력</label>
                        <input 
                            type="text" 
                            placeholder="영화 제목을 입력하세요" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '12px', fontSize: '16px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
                        />
                    </div>

                    {/* 필터 옵션 그룹 */}
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {/* 성인 콘텐츠 표시 여부 */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '14px' }}>
                            <input 
                                type="checkbox" 
                                checked={includeAdult}
                                onChange={(e) => setIncludeAdult(e.target.checked)}
                                style={{ width: '16px', height: '16px' }}
                            />
                            🔞 성인 콘텐츠 포함
                        </label>

                        {/* 언어 선택 */}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                            🌐 언어
                            <select 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value)}
                                style={{ padding: '6px 10px', borderRadius: '4px', border: '1px solid #ccc', backgroundColor: '#fff' }}
                            >
                                <option value="ko-KR">한국어 (ko-KR)</option>
                                <option value="en-US">영어 (en-US)</option>
                                <option value="ja-JP">일본어 (ja-JP)</option>
                            </select>
                        </label>
                    </div>

                    <button type="submit" style={{ padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                        검색하기
                    </button>
                </form>
            </header>

            {/* 영화 결과 리스트 */}
            <main>
                {loading && <p style={{ textAlign: 'center', color: '#666' }}>로딩 중...</p>}
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                    {data?.results?.map((movie: any) => (
                        <MovieCard 
                            key={movie.id} 
                            movie={movie} 
                            onClick={handleMovieClick} 
                        />
                    ))}
                </div>

                {!loading && data?.results?.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#999', marginTop: '4px' }}>검색 결과가 없습니다.</p>
                )}
            </main>

            {/* 영화 상세 정보 모달 */}
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
        </div>
    );
}