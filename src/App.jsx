import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { products } from './data/products';
import './styles/App.css';
import CartSidebar from './components/CartSidebar'; // ← Add import

function App() {
  // Required state
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // addToCart
  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // removeFromCart
  const removeFromCart = (productId) => {
    console.log('removed from ', productId);
    setCart(cart.filter(item => item.id !== productId));
  };

  // updateQuantity
  const updateQuantity = (productId, newQuantity) => {
    console.log('Updating the cart:', productId);
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  // toggleCart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    console.log("cartToggled");
  };
  //helper Funcion
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="app">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />

      <main className="main-content">
        <ProductList
          products={products}
          onAddToCart={addToCart}  // ✅ as per instruction
        />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;