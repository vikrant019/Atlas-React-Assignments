import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    brand: string;
    category: string;
    description: string;
  };
  disabled: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, disabled }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-card">
      <img className="product-card-img" src={product.thumbnail} alt={product.title} />
      <div className="product-card-title">{product.title}</div>
      <div className="product-card-price">${product.price}</div>
      <div className="product-card-brand">Brand: {product.brand}</div>
      <div className="product-card-category">{product.category}</div>
      <div className="product-card-desc">{product.description.slice(0, 50)}...</div>
      <button
        className="btn" 
        onClick={() => dispatch(addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1
        }))}
        disabled={disabled}
        style={disabled ? { background: '#ccc', cursor: 'not-allowed' } : {}}
      >
        {disabled ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
