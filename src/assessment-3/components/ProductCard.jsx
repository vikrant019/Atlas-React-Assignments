function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <h3>{product.name}</h3>
      <p>Price: Rs. {product.price}</p>
      <p>Available: {product.quantity}</p>

      <button
        className="add-to-cart-btn"
        disabled={product.quantity === 0}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;