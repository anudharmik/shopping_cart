export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li>
      {item.name} – ₹{item.price} × {item.quantity}

      <button
        style={{
          marginLeft: "10px",
          opacity: item.quantity === 1?0.75:1
        }}
        onClick={() => onDecrease(item.id)}
      >
        {item.quantity === 1?"Remove":"-"}
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