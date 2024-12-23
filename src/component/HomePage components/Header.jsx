import React from "react";


const Header = () => {
  return (
    <header className="home-header">
      <div className="logo">Corefit</div>
      <nav className="nav">
        <a href="/home" className="home" >Home</a>
        <a href="/Shop">Shop</a>
        <a href="/Settings">Settings</a>
        <a href="/Cart">🛒</a>
      </nav>
    </header>
  );
};

export default Header;
