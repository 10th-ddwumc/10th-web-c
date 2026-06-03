import React from 'react';

interface MovieModalProps {
    movie: any | null;
    onClose: () => void;
}

export const MovieModal = React.memo(({ movie, onClose }: MovieModalProps) => {
    if (!movie) return null;

    const backdropUrl = movie.backdrop_path 
        ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        : (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '');

    // IMDb 검색 URL 생성
    const handleImdbSearch = () => {
        const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;
        window.open(searchUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: '#fff', borderRadius: '12px', width: '100%',
                maxWidth: '500px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                display: 'flex', flexDirection: 'column'
            }}>
                {/* 상단 비주얼 영역 (포스터/백드롭 이미지) */}
                {backdropUrl && (
                    <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                        <img 
                            src={backdropUrl} 
                            alt={movie.title} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                            padding: '20px 15px 10px 15px', color: '#fff'
                        }}>
                            <h2 style={{ margin: 0, fontSize: '22px', textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}>{movie.title}</h2>
                        </div>
                    </div>
                )}

                {/* 상세 정보 컨텐츠 영역 */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {!backdropUrl && <h2 style={{ margin: '0 0 10px 0' }}>{movie.title}</h2>}
                    
                    <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#666' }}>
                        <span>⭐ 평점: <b>{movie.vote_average || '없음'}</b></span>
                        <span>📅 개봉일: <b>{movie.release_date || '정보 없음'}</b></span>
                    </div>

                    <div style={{ marginTop: '5px' }}>
                        <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>줄거리</h4>
                        <p style={{ 
                            fontSize: '14px', color: '#555', lineHeight: '1.6', 
                            margin: 0, maxHeight: '150px', overflowY: 'auto' 
                        }}>
                            {movie.overview || '등록된 줄거리 정보가 없습니다.'}
                        </p>
                    </div>

                    {/* 하단 버튼 그룹 */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button 
                            onClick={handleImdbSearch}
                            style={{
                                flex: 1, padding: '10px', backgroundColor: '#f5c518', 
                                color: '#000', border: 'none', borderRadius: '6px', 
                                cursor: 'pointer', fontWeight: 'bold'
                            }}
                        >
                            🎬 IMDb에서 검색하기
                        </button>
                        <button 
                            onClick={onClose}
                            style={{
                                padding: '10px 20px', backgroundColor: '#e0e0e0', 
                                color: '#333', border: 'none', borderRadius: '6px', 
                                cursor: 'pointer', fontWeight: 'bold'
                            }}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

MovieModal.displayName = 'MovieModal';