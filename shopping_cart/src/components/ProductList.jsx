import ProductItem from "./ProductItem";

export default function ProductList({ products, onAdd }) {
  return (
    <div style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    background: "#fafafa"
    }}>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <ProductItem
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </ul>
    </div>
  );
}