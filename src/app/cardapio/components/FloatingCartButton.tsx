export default function FloatingCartButton({ cart, onClick }: any) {
  const totalItens = cart.reduce((acc: number, p: any) => acc + p.quantity, 0);
  return (
    <button
      id="cart-button"
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-[#a89050] text-white px-5 py-3 rounded-full shadow-lg text-lg hover:opacity-90 transition-transform transform hover:scale-105"
    >
      🛒 ({totalItens})
    </button>
  );
}
