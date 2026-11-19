import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => setCartItems([]);

  // ✅ Total price
  const getTotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};