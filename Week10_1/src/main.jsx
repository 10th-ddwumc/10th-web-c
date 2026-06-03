import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// 💡 지워진 App 대신 우리가 만든 HomePage를 바로 불러옵니다!
import HomePage from './pages/HomePage.tsx'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 💡 화면에 App 대신 HomePage를 바로 렌더링합니다. */}
    <HomePage />
  </StrictMode>,
);