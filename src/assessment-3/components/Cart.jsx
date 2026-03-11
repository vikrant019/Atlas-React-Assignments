import CartItem from "./CartItem";

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="cart">
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          removeFromCart={removeFromCart}
        />
      ))}

      <h3>Total: Rs. {total}</h3>
    </div>
  );
}

export default Cart;