import useCartStore from "../store/useCartStore";

const Footer = () => {
  const total = useCartStore((state) => state.total);
  const amount = useCartStore((state) => state.amount);
  const openModal = useCartStore((state) => state.openModal);

  return (
    <div className="p-6 border-t">
      <div className="flex justify-between mb-4">
        <span className="font-bold">전체 수량</span>
        <span>{amount}개</span>
      </div>
      <div className="flex justify-between mb-6">
        <span className="font-bold">전체 금액</span>
        <span>${total.toLocaleString()}</span>
      </div>
      <button
        onClick={openModal}
        className="w-full bg-red-500 text-white py-3 rounded font-bold hover:bg-red-600"
      >
        전체 삭제
      </button>
    </div>
  );
};

export default Footer;