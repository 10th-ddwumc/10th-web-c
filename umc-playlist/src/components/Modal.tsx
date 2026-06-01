import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { closeModal } from "../store/modalSlice";
import { clearCart } from "../store/cartSlice";

const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNo = () => {
    dispatch(closeModal());
  };

  const handleYes = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-6 shadow-xl">
        <h2 className="text-lg font-bold">정말 삭제하시겠습니까?</h2>
        <div className="flex gap-4">
          <button
            onClick={handleNo}
            className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            아니요
          </button>
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;