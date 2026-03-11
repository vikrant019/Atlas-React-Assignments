import { useState } from "react";
import { productsData } from "./data/products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const qtyById = new Map(cart.map((c) => [c.id, c.qty]));

  const products = productsData.map((p) => {
    const inCart = qtyById.get(p.id) ?? 0;
    return { ...p, quantity: Math.max(0, p.quantity - inCart) };
  });

  const cartItems = cart
    .map((c) => {
      const product = productsData.find((p) => p.id === c.id);
      if (!product) return null;
      return { id: product.id, name: product.name, price: product.price, qty: c.qty };
    })
    .filter(Boolean);

  const addToCart = (product) => {
    if (product.quantity === 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: product.id, qty: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (!existing) return prev;

      if (existing.qty === 1) {
        return prev.filter((item) => item.id !== product.id);
      }

      return prev.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  return (
    <div className="container">
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cartItems} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;