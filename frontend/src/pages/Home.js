import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing products...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover Your
            <span className="hero-highlight">Next Favorite</span>
          </h1>
          <p className="hero-subtitle">
            Curated products for the modern lifestyle
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <div className="title-accent"></div>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <h3>No products available yet</h3>
              <p>Check back soon for amazing deals!</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="product-placeholder">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21 15 16 10 5 21"/>
                        </svg>
                      </div>
                    )}
                    {product.stock < 10 && product.stock > 0 && (
                      <div className="stock-badge low">Only {product.stock} left!</div>
                    )}
                    {product.stock === 0 && (
                      <div className="stock-badge out">Out of Stock</div>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    {product.category && (
                      <span className="product-category">{product.category}</span>
                    )}
                    <p className="product-description">
                      {product.description?.substring(0, 100)}
                      {product.description?.length > 100 && '...'}
                    </p>
                    
                    <div className="product-footer">
                      <div className="product-price">
                        ${product.price?.toFixed(2)}
                      </div>
                      
                      <div className="product-actions">
                        <Link to={`/product/${product.id}`} className="btn-view">
                          View
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn-add"
                          disabled={product.stock === 0}
                        >
                          {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
