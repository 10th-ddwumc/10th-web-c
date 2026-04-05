export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-4xl font-extrabold mb-4 text-slate-800">반갑다, 재희다.</h2>
      <p className="text-gray-600 text-lg">Vite + React + Tailwind로 만든 SPA 과제물이다.</p>
      <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        더 알아보기
      </button>
    </div>
  );
}