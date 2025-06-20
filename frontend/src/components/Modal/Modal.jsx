export default function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
          aria-label="Close Modal"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}