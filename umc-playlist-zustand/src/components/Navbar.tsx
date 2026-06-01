import useCartStore from "../store/useCartStore";

const Navbar = () => {
  const amount = useCartStore((state) => state.amount);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Ohtani Ahn</h1>
      <div className="relative">
        <span>🛒</span>
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {amount}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;