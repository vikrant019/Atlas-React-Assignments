import React from "react";
import "../../App.css";

const Footer: React.FC = () => (
  <footer className="footer-main text-center shadow rounded" style={{padding: '1.2rem 0', marginTop: '2rem', background: 'linear-gradient(90deg, #e3f2fd 60%, #fff 100%)', color: '#1976d2', fontWeight: 500, fontSize: '1.1rem'}}>
    <span>&copy; {new Date().getFullYear()} ShoppingCart. All rights reserved.</span>
  </footer>
);

export default Footer;
