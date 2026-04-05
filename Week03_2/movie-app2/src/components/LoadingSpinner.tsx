import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20" role='status'>
      <div className="size-16 animate-spin rounded-full border-8 border-t-transparent border-[#b2dab1]">
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;