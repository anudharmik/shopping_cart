export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li>
      {item.name} – ₹{item.price} × {item.quantity}

      <button
        style={{
          marginLeft: "10px",
          opacity: item.quantity === 0 ? 0.5 : 1,
          cursor: item.quantity === 0 ? "not-allowed" : "pointer"
        }}
        disabled={item.quantity === 0}
        onClick={() => onDecrease(item.id)}
      >
        -
      </button>

      <button
        style={{ marginLeft: "5px" }}
        onClick={() => onIncrease(item.id)}
      >
        +
      </button>
    </li>
  );
}