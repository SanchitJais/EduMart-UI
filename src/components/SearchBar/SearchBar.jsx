// ============================================================
// EduMart – SearchBar Component
// Full-featured search with suggestions and keyboard navigation
// ============================================================

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { products } from '../../data/products';
import styles from './SearchBar.module.scss';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Filter suggestions as user types
  useEffect(() => {
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
    setShowSuggestions(false);
    onSearch?.();
  };

  const clearQuery = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
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
          placeholder="Search books, toys, stationery..."
          className={styles.input}
          aria-label="Search products"
          autoComplete="off"
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
        <div className={styles.suggestions} role="listbox">
          {suggestions.map((product) => (
            <button
              key={product.id}
              className={styles.suggestionItem}
              onMouseDown={() => handleSelect(product)}
              role="option"
              aria-selected="false"
            >
              <img
                src={product.images[0]}
                alt={product.title}
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
