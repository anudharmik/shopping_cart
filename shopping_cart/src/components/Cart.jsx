import CartItem from "./CartItem";

export default function Cart({
  cart,
  total,
  onIncrease,
  onDecrease,
  onClear
}) {
  return (
    <div style={{
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
    background: "#fafafa"
    }}>
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            ))}
          </ul>

          <h3>Total: ₹{total}</h3>

          <button
            onClick={onClear}
            style={{ marginTop: "10px" }}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}