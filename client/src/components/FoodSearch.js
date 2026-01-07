import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiX } from 'react-icons/hi';
import './FoodSearch.css';

// Available foods in our database
const FOODS = [
  // Pakistani Main Dishes
  { id: 'biryani', name: 'Chicken Biryani', category: 'Pakistani', emoji: '🍛' },
  { id: 'pulao', name: 'Chicken Pulao', category: 'Pakistani', emoji: '🍚' },
  { id: 'karahi', name: 'Chicken Karahi', category: 'Pakistani', emoji: '🍲' },
  { id: 'mutton', name: 'Mutton Karahi', category: 'Pakistani', emoji: '🍖' },
  { id: 'nihari', name: 'Beef Nihari', category: 'Pakistani', emoji: '🥘' },
  { id: 'haleem', name: 'Haleem', category: 'Pakistani', emoji: '🥣' },
  { id: 'korma', name: 'Chicken Korma', category: 'Pakistani', emoji: '🍛' },
  { id: 'chana', name: 'Chana Masala', category: 'Pakistani', emoji: '🫘' },
  { id: 'dal', name: 'Dal Tadka', category: 'Pakistani', emoji: '🥣' },
  
  // Pakistani Breads & Snacks
  { id: 'paratha', name: 'Aloo Paratha', category: 'Pakistani', emoji: '🫓' },
  { id: 'naan', name: 'Naan', category: 'Pakistani', emoji: '🍞' },
  { id: 'roti', name: 'Chapati/Roti', category: 'Pakistani', emoji: '🫓' },
  { id: 'samosa', name: 'Samosa', category: 'Pakistani', emoji: '🥟' },
  { id: 'pakora', name: 'Pakora', category: 'Pakistani', emoji: '🥘' },
  
  // Pakistani BBQ & Grilled
  { id: 'tikka', name: 'Chicken Tikka', category: 'Pakistani', emoji: '🍗' },
  { id: 'kebab', name: 'Seekh Kebab', category: 'Pakistani', emoji: '🍢' },
  
  // Pakistani Beverages & Desserts
  { id: 'chai', name: 'Chai (Tea)', category: 'Pakistani', emoji: '☕' },
  { id: 'lassi', name: 'Lassi', category: 'Pakistani', emoji: '🥛' },
  { id: 'halwa', name: 'Sooji Halwa', category: 'Pakistani', emoji: '🍮' },
  
  // International
  { id: 'pizza', name: 'Pepperoni Pizza', category: 'Italian', emoji: '🍕' },
  { id: 'burger', name: 'Beef Burger', category: 'American', emoji: '🍔' },
  { id: 'salad', name: 'Garden Salad', category: 'Healthy', emoji: '🥗' },
  { id: 'rice', name: 'Steamed Rice', category: 'Grain', emoji: '🍚' },
  { id: 'chicken', name: 'Grilled Chicken', category: 'Protein', emoji: '🍗' },
  
  // Fruits
  { id: 'orange', name: 'Orange', category: 'Fruit', emoji: '🍊' },
  { id: 'apple', name: 'Apple', category: 'Fruit', emoji: '🍎' },
  { id: 'banana', name: 'Banana', category: 'Fruit', emoji: '🍌' },
  
  // Beverages
  { id: 'soda', name: 'Cola Soda', category: 'Beverage', emoji: '🥤' },
];

function FoodSearch({ onSelect, onClose, imageUrl }) {
  const [search, setSearch] = useState('');
  
  const filtered = FOODS.filter(food => 
    food.name.toLowerCase().includes(search.toLowerCase()) ||
    food.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      className="food-search-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="food-search-modal"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
      >
        <div className="search-header">
          <h2>What did you eat?</h2>
          <p>AI couldn't identify this - please select manually</p>
          <button className="close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>

        {imageUrl && (
          <div className="search-image">
            <img src={imageUrl} alt="Your food" />
          </div>
        )}

        <div className="search-input-wrapper">
          <HiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search foods... (biryani, pizza, salad...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {search && (
            <button className="clear-btn" onClick={() => setSearch('')}>
              <HiX />
            </button>
          )}
        </div>

        <div className="food-list">
          {filtered.length > 0 ? (
            filtered.map(food => (
              <button
                key={food.id}
                className="food-item"
                onClick={() => onSelect(food.id)}
              >
                <span className="food-emoji">{food.emoji}</span>
                <div className="food-details">
                  <span className="food-name">{food.name}</span>
                  <span className="food-category">{food.category}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="no-results">
              <span>😕</span>
              <p>No foods found for "{search}"</p>
              <span className="hint">Try: biryani, pizza, chicken, orange...</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FoodSearch;

