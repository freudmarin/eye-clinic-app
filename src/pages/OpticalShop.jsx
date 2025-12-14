import { useState } from 'react';
import productsData from '../data/products.json';
import './OpticalShop.css';

export default function OpticalShop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(productsData.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className="optical-shop">
      <div className="container">
        <div className="shop-content">
          <div className="filter-section">
            <div className="filter-header">
              <span className="filter-label">Filter by:</span>
              <span className="results-count">{filteredProducts.length} products</span>
            </div>
            <div className="filter-chips">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
              </div>
              <div className="product-info">
                <span className="product-brand">{product.brand}</span>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <span className="product-category">{product.category}</span>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
