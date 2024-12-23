import React from 'react';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import './component/HomePage components/AboutUs.jsx';
import './component/HomePage components/Footer.jsx';
import './component/HomePage components/Header.jsx';
import './component/HomePage components/HeroSection.jsx';
import './styles/HomePageStyles/AboutUs.css';
import './styles/HomePageStyles/NewArrival.css';
import './styles/HomePageStyles/HeroSection.css';
import './styles/HomePageStyles/Header.css';
import './styles/HomePageStyles/Footer.css';
import './styles/main.css';
import './styles/RegisterForm.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Home components/Header';
import Shop from './pages/Shop.jsx';
import Settings from './pages/Settings.jsx';
import Cart from './component/cart/cart.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Success from './component/cart/Success.jsx';
import Orders from './component/cart/Order.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحة تسجيل الدخول */}
        <Route path="/" element={<Landing />} />

        {/* المسارات المحمية */}
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Shop"
          element={
            <ProtectedRoute>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
         <Route
          path="/Orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Success"
          element={
            <ProtectedRoute>
              <Success />
              
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
