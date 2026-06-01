import useCartStore from '../store/useCartStore';
import useModalStore from '../store/useModalStore';

export default function Modal() {
  const { clearCart } = useCartStore();
  const { closeModal } = useModalStore();

  const handleConfirm = () => {
    clearCart();   // 장바구니 전체 삭제
    closeModal();  // 모달 닫기
  };

  const handleCancel = () => {
    closeModal();  // 모달만 닫기
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-lg bg-white p-6 text-center shadow-lg">
        <h4 className="text-lg font-semibold text-gray-800">
          정말 삭제하시겠습니까?
        </h4>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
          >
            네
          </button>
          <button
            onClick={handleCancel}
            className="rounded bg-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-400"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
