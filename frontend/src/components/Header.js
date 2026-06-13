import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { getCartCount, user, setUser } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <Link to="/" className="logo">
            <span className="logo-neo">NEO</span>
            <span className="logo-mart">MART</span>
          </Link>
          
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          <nav className="header-nav">
            {user ? (
              <>
                <Link to="/orders" className="nav-link">My Orders</Link>
                <span className="nav-link user-name">{user.firstName}</span>
                <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
              </>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}
            <Link to="/cart" className="cart-link">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
            </Link>
          </nav>
        </div>
      </div>
      
      <div className="header-bottom">
        <div className="container">
          <nav className="category-nav">
            <Link to="/category/electronics" className="category-link">Electronics</Link>
            <Link to="/category/fashion" className="category-link">Fashion</Link>
            <Link to="/category/home" className="category-link">Home & Garden</Link>
            <Link to="/category/sports" className="category-link">Sports</Link>
            <Link to="/category/books" className="category-link">Books</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
