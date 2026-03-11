import ProductCard from "./ProductCard";

function ProductList({ products, addToCart }) {
  return (
    <div className="products">
      <h2>Products</h2>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;