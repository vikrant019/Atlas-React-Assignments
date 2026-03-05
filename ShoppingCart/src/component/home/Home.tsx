
import React, { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import "./Home.css";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  brand: string;
  category: string;
  description: string;
}


const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  interface Category {
    slug: string;
    name: string;
    url: string;
  }
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const loader = useRef<HTMLDivElement | null>(null);
  const itemsPerPage = 18;

  // Fetch categories on mount
  useEffect(() => {
    axios.get("https://dummyjson.com/products/categories")
      .then(res => {
        setCategories(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products?limit=100`)
      .then(response => {
        setAllProducts(response.data.products);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;
    const filtered = selectedCategory === "all"
      ? allProducts
      : allProducts.filter(p => p.category === selectedCategory);
    const paged = filtered.slice(0, (page + 1) * itemsPerPage);

    Promise.resolve().then(() => {
      setProducts(paged);
      setHasMore(paged.length < filtered.length);
      setLoading(false);
    });
  }, [allProducts, selectedCategory, page]);

  useEffect(() => {
    if (!hasMore || loading) return;
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (
          window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200
        ) {
          if (!loading && hasMore) {
            setPage(prev => prev + 1);
          }
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const isInCart = (id: number) => cartItems.some(item => item.id === id);

  return (
    <div className="home-section">
      <div className="featured-products">
        <h2 className="product-list-heading">
          <span className="product-list-heading-icon">
            <FaShoppingCart />
          </span>
          Product List
        </h2>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={cat => {
            setSelectedCategory(cat);
            setPage(0);
          }}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="product-list">
           {products.map((product, idx) => (
            <ProductCard key={`${product.id}-${idx}`} product={product} disabled={isInCart(product.id)} />
          ))}
        </div>
        {loading && <div style={{ textAlign: 'center', margin: '2rem 0' }}>Loading more products...</div>}
        {!hasMore && <div style={{ textAlign: 'center', margin: '2rem 0', color: '#888' }}>No more products to load.</div>}
        <div ref={loader} />
      </div>
    </div>
  );
};

export default Home;
