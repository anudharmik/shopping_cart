export default function ProductItem({ product, onAdd }) {
  return (
    <li>
      {product.name} : ₹{product.price}
      <button
        style={{ marginLeft: "10px" }}
        onClick={() => onAdd(product)}
      >
        Add to Cart
      </button>
    </li>
  );
}