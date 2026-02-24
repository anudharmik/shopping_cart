
import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Balaclava Mask", price: 300 },
  { id: 2, name: "Riding Gloves", price: 2000 },
  { id: 3, name: "Riding Jacket", price: 5000 },
];

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Shopping Cart</h1>

      <h2>Products</h2>
      <ul>
        {PRODUCTS.map(product => (
          <li key={product.id}>
            {product.name} : ₹{product.price}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  function addToCart(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }
}