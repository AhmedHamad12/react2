import React from "react";


const Header = () => {
  return (
    <header className="shop-header">
      <div className="logo">Corefit</div>
      <nav className="nav">
        <a href="/home"  >Home</a>
        <a href="/Shop" >Shop</a>
        <a href="/Settings">Settings</a>
        <a href="/Cart">🛒</a>
        <a href="/Orders">Orders</a>
      </nav>
    </header>
  );
};

export default Header;