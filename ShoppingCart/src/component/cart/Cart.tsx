
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../../store/cartSlice';
import type { RootState } from '../../store/store';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px #1976d220', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(item => (
              <li key={item.id} style={{ marginBottom: '1.5rem', background: '#f5f5f5', borderRadius: 8, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 1px 4px #1976d210' }}>
                <img src={item.thumbnail} alt={item.title} style={{ width: 60, height: 60, borderRadius: 6, objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{item.title}</div>
                  <div style={{ color: '#1976d2', fontWeight: 500 }}>Price: ${item.price}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 6 }}>
                    <button onClick={() => dispatch(decrementQuantity(item.id))} disabled={item.quantity === 1} style={{ padding: '0.2rem 0.7rem', fontSize: '1.1rem', borderRadius: 4, border: '1px solid #1976d2', background: item.quantity === 1 ? '#eee' : '#1976d2', color: item.quantity === 1 ? '#aaa' : '#fff', cursor: item.quantity === 1 ? 'not-allowed' : 'pointer' }}>-</button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity(item.id))} style={{ padding: '0.2rem 0.7rem', fontSize: '1.1rem', borderRadius: 4, border: '1px solid #1976d2', background: '#1976d2', color: '#fff', cursor: 'pointer' }}>+</button>
                  </div>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))} style={{ background: '#ff5252', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', fontWeight: 600, cursor: 'pointer' }}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'right', fontWeight: 600, fontSize: '1.2rem', margin: '1.5rem 0' }}>
            Total: ${total.toFixed(2)}
          </div>
          <button
            style={{
              width: '100%',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '1rem',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 2px 8px #1976d220',
              cursor: 'pointer',
              marginTop: '1rem',
              letterSpacing: 1,
            }}
            onClick={() => {
              alert('Proceeding to payment... (demo)');
              dispatch(clearCart());
            }}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
