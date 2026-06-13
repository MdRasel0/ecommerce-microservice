import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductDetail from './pages/ProductDetail';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/category/:category" element={<Home />} />
              <Route path="/search" element={<Home />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3 className="footer-logo">
                    <span className="logo-neo">NEO</span>
                    <span className="logo-mart">MART</span>
                  </h3>
                  <p className="footer-tagline">Modern e-commerce, redefined.</p>
                </div>
                <div className="footer-section">
                  <h4>Quick Links</h4>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/cart">Cart</a></li>
                    <li><a href="/orders">Orders</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Categories</h4>
                  <ul>
                    <li><a href="/category/electronics">Electronics</a></li>
                    <li><a href="/category/fashion">Fashion</a></li>
                    <li><a href="/category/home">Home & Garden</a></li>
                  </ul>
                </div>
                <div className="footer-section">
                  <h4>Support</h4>
                  <ul>
                    <li><a href="/">Help Center</a></li>
                    <li><a href="/">Shipping Info</a></li>
                    <li><a href="/">Returns</a></li>
                  </ul>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2024 NeoMart. Microservices E-Commerce Platform.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
