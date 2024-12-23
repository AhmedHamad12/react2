import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CheckoutButton from "./CheckoutButton";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const basketId = JSON.parse(localStorage.getItem("basket"))?.id;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("You must be logged in to view your cart.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `https://localhost:7251/api/Basket/${basketId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.items) {
          setCartItems(response.data.items);
          localStorage.setItem("cart", JSON.stringify(response.data.items)); 
        } else {
          setError("Basket is empty or invalid response from server.");
        }
      } catch (err) {
        setError("Failed to fetch cart items. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (basketId) {
      fetchCartItems();
    } else {
      setError("Basket ID is missing.");
      setIsLoading(false);
    }
  }, [basketId]);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const clearCart = () => {
    setCartItems([]); 
    localStorage.removeItem("cart"); 
    localStorage.removeItem("basket"); 
    alert("Cart has been cleared!");
  };

  if (isLoading) {
    return <p>Loading your cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <Header />
      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={item.pictureUrl}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>Price: {item.price} LE</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="cart-item-total">
                  <p>Total: {item.price * item.quantity} LE</p>
                </div>
              </div>
            ))}
          </div>
          <div className="right section">
            <h2>Order Summary</h2>
            <p>Subtotal: {calculateSubtotal()} LE</p>
            <p>Shipping: Free</p>
            <h3>Total: {calculateSubtotal()} LE</h3>
            <CheckoutButton cartItems={cartItems} clearCart={clearCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
