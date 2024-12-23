import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    
    // إضافة توقيت لكل عنصر في الطلبات
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      timestamp: new Date().toISOString(),
    }));
  
    const updatedOrderHistory = [...orderHistory, ...updatedCartItems];
    localStorage.setItem("orderHistory", JSON.stringify(updatedOrderHistory));
    localStorage.removeItem("cart");
  
    setTimeout(() => {
      navigate("/orders");
    }, 2000);
  }, [navigate]);
}
export default Success;
