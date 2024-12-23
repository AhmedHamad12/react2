import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./orders.css";

const Orders = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
    
    const groupedOrders = savedOrders.reduce((acc, order) => {
      const orderDate = new Date(order.timestamp).toLocaleDateString(); 
      if (!acc[orderDate]) {
        acc[orderDate] = [];
      }
      acc[orderDate].push(order);
      return acc;
    }, {});

    setOrderHistory(groupedOrders);
  }, []);

  if (Object.keys(orderHistory).length === 0) {
    return (
      <div>
        <Header />
        <div className="orders-container">
          <h1>Your Orders</h1>
          <p>No orders found. Start shopping now!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="orders-container">
        <h1>Your Orders</h1>
        {Object.keys(orderHistory).map((date) => (
          <div key={date} className="order-group">
            <h2 className="order-date">Orders from: {date}</h2>
            <div className="order-list">
              {orderHistory[date].map((order, index) => (
                <div key={index} className="order-item">
                  <img
                    src={order.pictureUrl}
                    alt={order.name}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h3>{order.name}</h3>
                    <p>
                      <strong>Price:</strong> {order.price} USD
                    </p>
                    <p>
                      <strong>Quantity:</strong> {order.quantity}
                    </p>
                    <p>
                      <strong>Total:</strong> {order.price * order.quantity} USD
                    </p>
                    <p>
                      <strong>Ordered At:</strong>{" "}
                      {new Date(order.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
