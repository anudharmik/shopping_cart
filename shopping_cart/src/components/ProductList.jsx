import ProductItem from "./ProductItem";

export default function ProductList({ products, onAdd }) {
  return (
    <>
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
    </>
  );
}