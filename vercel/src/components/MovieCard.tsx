import React from 'react';

interface MovieCardProps {
    movie: any;
    onClick: (movie: any) => void;
}

export const MovieCard = React.memo(({ movie, onClick }: MovieCardProps) => {
    const posterUrl = movie.poster_path 
        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` 
        : 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        <div 
            onClick={() => onClick(movie)}
            style={{ 
                border: '1px solid #e1e4e6', 
                borderRadius: '12px', 
                overflow: 'hidden',
                cursor: 'pointer', 
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            }}
        >
            {/* 포스터 영역 */}
            <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img 
                    src={posterUrl} 
                    alt={movie.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* 평점 배지 (우측 상단 블루 팁 느낌) */}
                {movie.vote_average > 0 && (
                    <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        backgroundColor: '#007bff', color: '#fff', padding: '4px 8px',
                        borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                    }}>
                        ★ {movie.vote_average.toFixed(1)}
                    </div>
                )}
            </div>

            {/* 영화 정보 텍스트 영역 (사진의 하단 텍스트 구조 구현) */}
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                <h4 style={{ 
                    margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#1e2022',
                    textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' 
                }}>
                    {movie.title}
                </h4>
                
                <span style={{ fontSize: '12px', color: '#868e96' }}>
                    {movie.release_date ? `${movie.release_date} 개봉` : '개봉일 정보 없음'}
                </span>

                <p style={{ 
                    margin: 0, fontSize: '13px', color: '#495057', lineHeight: '1.5',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', // 3줄 제한 후 ... 처리
                    height: '58px'
                }}>
                    {movie.overview || '등록된 줄거리 정보가 없습니다.'}
                </p>
            </div>
        </div>
    );
});

MovieCard.displayName = 'MovieCard';