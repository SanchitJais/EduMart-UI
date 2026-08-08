// ============================================================
// EduMart – SearchBar Component
// Full-featured search with suggestions and keyboard navigation
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { products } from '../../data/products';
import ProductImage from '../ProductImage/ProductImage';
import styles from './SearchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter suggestions as user types
  useEffect(() => {
    setActiveIndex(-1);
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const results = products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
      .slice(0, 6);
    setSuggestions(results);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
      onSearch?.();
    }
  };

  const handleSelect = (product) => {
    navigate(`/products/${product.id}`);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.();
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.form} role="search">
        <FiSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search books, toys, stationery..."
          className={styles.input}
          aria-label="Search products"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestions && suggestions.length > 0}
          aria-controls="search-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `search-suggestion-${suggestions[activeIndex].id}` : undefined}
        />
        {query && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={clearQuery}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
        <button type="submit" className={styles.submitBtn} aria-label="Search">
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className={styles.suggestions} role="listbox" id="search-suggestions">
          {suggestions.map((product, i) => (
            <button
              key={product.id}
              id={`search-suggestion-${product.id}`}
              type="button"
              className={`${styles.suggestionItem} ${i === activeIndex ? styles.highlighted : ''}`}
              onMouseDown={() => handleSelect(product)}
              onMouseEnter={() => setActiveIndex(i)}
              role="option"
              aria-selected={i === activeIndex}
            >
              <ProductImage
                product={product}
                className={styles.suggestionImg}
              />
              <div className={styles.suggestionInfo}>
                <span className={styles.suggestionTitle}>{product.title}</span>
                <span className={styles.suggestionCategory}>{product.category}</span>
              </div>
              <span className={styles.suggestionPrice}>₹{product.discountPrice}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
