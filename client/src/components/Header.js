import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

function Header({ currentView, onNavigate, todayCalories }) {
  return (
    <header className="header">
      <div className="header-inner container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.02 }}
          onClick={() => onNavigate('home')}
        >
          <span className="logo-icon">◉</span>
          <span className="logo-text">nutri<em>scan</em></span>
        </motion.div>

        <nav className="nav">
          <button 
            className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            <span className="nav-label">Today</span>
          </button>
          <button 
            className={`nav-item ${currentView === 'scan' ? 'active' : ''}`}
            onClick={() => onNavigate('scan')}
          >
            <span className="nav-label">Scan</span>
          </button>
        </nav>

        <div className="header-stats">
          <div className="cal-badge">
            <span className="cal-number">{todayCalories || 0}</span>
            <span className="cal-label">kcal today</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

