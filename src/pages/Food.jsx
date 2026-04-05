export default function Foods() {
  const myFoods = [
    { id: 1, name: '마라탕', emoji: '🍜', desc: '고기랑 꼬치 추가금액 없음. 무난하다.' },
    { id: 2, name: '토라카츠', emoji: '🍖', desc: '월곡 오면 꼭 먹어야하는 근본 카츠집.' },
    { id: 3, name: '치코커피', emoji: '☕️', desc: '귀여운 강아지 초롱이가 있다. 커피랑 아이스크림도 낫벧' },
    { id: 4, name: '모모양과', emoji: '🥧', desc: '에그타르트와 까눌레가 끝내준다.아 휘낭시에도.' },
  ];

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-slate-800">My Favorite Foods 😋</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {myFoods.map((food) => (
          <div key={food.id} className="flex items-center p-6 bg-white border border-pink-100 rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <span className="text-5xl mr-6">{food.emoji}</span>
            <div>
              <h3 className="text-xl font-bold text-pink-600">{food.name}</h3>
              <p className="text-gray-500 mt-1">{food.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}