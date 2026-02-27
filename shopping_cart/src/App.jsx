
import { useState , useEffect,useRef} from "react";

const PRODUCTS = [
  { id: 1, name: "Balaclava Mask", price: 300 },
  { id: 2, name: "Riding Gloves", price: 2000 },
  { id: 3, name: "Riding Jacket", price: 5000 },
];


export default function App() {
  const [cart, setCart] = useState([]);
  const isFirstRender=useRef(true);

  //runs once on mount to load cart from localStorage
  useEffect(()=>{
    try{
    const savedCart=localStorage.getItem("cart");
    if(savedCart){
      const parsedCart=JSON.parse(savedCart);
      setCart(JSON.parse(savedCart));
    }
    }catch(err){
    console.error("Invalid cart data in localStorage, clearing it.",err);
    localStorage.removeItem("cart");
    }
  },[]);

  //runs everytime cart changes to save cart to localStorage
  useEffect(()=>{
    if(isFirstRender.current){
      isFirstRender.current=false;
      return;
    }
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart]);
  

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
      {item.name} – ₹{item.price} × {item.quantity}

      <button
        style={{ marginLeft: "10px" }}
        onClick={() => decrease(item.id)}
      >
        -
      </button>

      <button
        style={{ marginLeft: "5px" }}
        onClick={() => increase(item.id)}
      >
        +
      </button>
    </li>
    ))}
      </ul>
      )}
      <h3>Total: ₹{total}</h3>
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

function increase(id) {
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
}

function decrease(id) {
  setCart(prevCart =>
    prevCart
      .map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
}
}