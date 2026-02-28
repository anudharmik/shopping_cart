import { useState, useEffect, useRef } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

const PRODUCTS = [
  { id: 1, name: "Balaclava Mask", price: 300 },
  { id: 2, name: "Riding Gloves", price: 2000 },
  { id: 3, name: "Riding Jacket", price: 5000 },
];

export default function App() {
  const [cart, setCart]=useState([]);
  const isFirstRender=useRef(true);

  //runs once on mount to load cart from localStorage
  useEffect(()=>{
    try{
    const savedCart=localStorage.getItem("cart");
    if(savedCart){
      setCart(JSON.parse(savedCart));
    }
    }catch{
    localStorage.removeItem("cart");
    }
  }, []);

  //runs everytime cart changes to save cart to localStorage and clears localStorage if cart is empty
  useEffect(()=>{
    if(isFirstRender.current){
      isFirstRender.current=false;
      return;
    }
    if(cart.length===0){
      localStorage.removeItem("cart"); 
    }else{
    localStorage.setItem("cart",JSON.stringify(cart));
    }
  },[cart]);
  
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,0
  );

  function addToCart(product) {
    setCart(prev =>prev.some(item => item.id === product.id)
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );
  }

  function increase(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrease(id) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <div style={{
  maxWidth:"800px",
  margin:"0 auto",
  padding:"20px",
  fontFamily: "system-ui, sans-serif"
  }}>
      <h1>Mini Shopping Cart</h1>

      <ProductList
        products={PRODUCTS}
        onAdd={addToCart}
      />

      <Cart
        cart={cart}
        total={total}
        onIncrease={increase}
        onDecrease={decrease}
        onClear={clearCart}
      />
    </div>
  );
}