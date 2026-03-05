


import { NavLink, Route, Routes } from "react-router-dom";
import Cart from "../cart/Cart";
import Home from "../home/Home";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";


const Navbar: React.FC = () => {
  const cartCount = useSelector((state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <FaShoppingCart style={{ marginRight: '0.5rem', fontSize: '1.5em', verticalAlign: 'middle' }} />
          Shopping App
        </div>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : undefined}>Home</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : undefined}>
            Cart <FaShoppingCart className="cart-icon" style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </NavLink>
        </div>
      </nav>
      <div className="navbar-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default Navbar;
