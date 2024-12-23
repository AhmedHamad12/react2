import React, { useState, useEffect } from "react";

const HeroSection = () => {
  const [userName, setUserName] = useState("User"); // Default username
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication token is missing. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://localhost:7251/api/Accounts/GetCurrentUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUserName(data.displayName || "User"); // Use `displayName` from API
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="hero">
      <div className="search1">
        <h1>Welcome Back {userName}! 👋</h1>
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search Item" className="search" />
        </div>
      </div>
      <div className="offer">
        <h2>Get offers now!</h2>
        <h1>Black Friday</h1>
        <p>Discounts of up to 50%</p>
        <button>Shopping Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
