import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';

import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* Login Popup */}
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        {/* Navbar */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />

          {/* Catch-all route to redirect invalid paths to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
