# Shopping Cart (React)

A mini e-commerce shopping cart application built with React, focusing on clean state management, component-based architecture, and real-world cart behavior.

## 🚀 Features
- Display a list of products
- Add products to the cart
- Increase and decrease item quantity
- Disable decrease button at quantity 1
- Automatically remove items when quantity reaches 0
- Persist cart data using `localStorage`
- Clear cart functionality
- Responsive and clean UI

## 🧠 Concepts Used
- React Hooks (`useState`, `useEffect`, `useRef`)
- Immutable state updates
- Derived state (`reduce` for total calculation)
- Component refactoring and prop-driven architecture
- Side-effect handling with a single source of truth
- Defensive programming for persistence

## 🛠 Tech Stack
- React
- Vite
- JavaScript (ES6+)
- CSS

## 📦 Project Structure
src/
├── components/
│ ├── ProductList.jsx
│ ├── ProductItem.jsx
│ ├── Cart.jsx
│ └── CartItem.jsx
├── App.jsx
├── index.css
└── main.jsx


## ▶️ How to Run Locally
```bash
npm install
npm run dev


