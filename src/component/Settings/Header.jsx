import React from "react";


const Header = () => {
  return (
    <header className="header">
      <div className="logo">Corefit</div>
      <nav className="nav">
        <a href="/home" >Home</a>
        <a href="/Shop">Shop</a>
        <a href="/Settings" className="setting">Settings</a>
        <a href="/Cart">🛒</a>
      </nav>
    </header>
  );
};

export default Header;
