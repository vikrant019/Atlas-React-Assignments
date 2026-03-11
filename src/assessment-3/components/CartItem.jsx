function CartItem({ item, removeFromCart }) {
  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <span>Rs. {item.price}</span>
      <span>x {item.qty}</span>

      <button onClick={() => removeFromCart(item)}>
        Remove
      </button>
    </div>
  );
}

export default CartItem;