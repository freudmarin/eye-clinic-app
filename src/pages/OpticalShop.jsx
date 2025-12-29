import { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/products.json';
import './OpticalShop.css';

// SVG Icons
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default function OpticalShop() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', ...new Set(productsData.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(p => p.category === selectedCategory);

  return (
    <div className="optical-shop">
      {/* Hero Section */}
      <section className="optical-hero">
        <div className="optical-hero__container">
          <span className="optical-hero__badge">Premium Eyewear</span>
          <h1 className="optical-hero__title">Optical Shop</h1>
          <p className="optical-hero__description">
            Discover our curated collection of designer frames, lenses, and contact lenses. 
            Expert fittings and personalized service for your perfect look.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="optical-content">
        <div className="optical-content__container">
          {/* Filter Section */}
          <div className="optical-filter">
            <div className="optical-filter__header">
              <div className="optical-filter__label">
                <FilterIcon />
                <span>Filter by category</span>
              </div>
              <span className="optical-filter__count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </span>
            </div>
            <div className="optical-filter__chips">
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-chip ${selectedCategory === category ? 'filter-chip--active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={selectedCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <article key={product.id} className="product-card">
                <div className="product-card__image-wrapper">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-card__image"
                  />
                  {!product.inStock && (
                    <span className="product-card__badge product-card__badge--out">
                      Out of Stock
                    </span>
                  )}
                  {product.inStock && product.id <= 2 && (
                    <span className="product-card__badge product-card__badge--bestseller">
                      Bestseller
                    </span>
                  )}
                </div>
                <div className="product-card__content">
                  <span className="product-card__brand">{product.brand}</span>
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__footer">
                    <span className="product-card__price">${product.price}</span>
                    <span className="product-card__category">{product.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fitting CTA */}
      <section className="optical-cta">
        <div className="optical-cta__container">
          <div className="optical-cta__content">
            <h2 className="optical-cta__title">Need Help Finding the Perfect Fit?</h2>
            <p className="optical-cta__description">
              Schedule a personalized fitting session with our optical specialists. 
              We'll help you find frames that match your style and vision needs.
            </p>
            <Link to="/appointment" className="btn btn--primary btn--lg">
              <CalendarIcon />
              Schedule a Fitting
            </Link>
          </div>
          <div className="optical-cta__features">
            <div className="optical-cta__feature">
              <span className="optical-cta__feature-icon">✓</span>
              <span>Free consultations</span>
            </div>
            <div className="optical-cta__feature">
              <span className="optical-cta__feature-icon">✓</span>
              <span>Expert styling advice</span>
            </div>
            <div className="optical-cta__feature">
              <span className="optical-cta__feature-icon">✓</span>
              <span>Adjustments included</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
