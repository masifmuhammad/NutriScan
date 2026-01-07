import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

function Hero({ onStartScan }) {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-dot"></span>
            AI-Powered Nutrition Tracking
          </motion.div>

          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Know exactly what's
            <br />
            <span className="highlight">on your plate</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Snap a photo of your food and get instant nutritional breakdown. 
            Track your daily intake effortlessly with machine learning.
          </motion.p>

          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="btn-primary" onClick={onStartScan}>
              <span className="btn-icon">◎</span>
              Scan Your Meal
            </button>
            <button className="btn-secondary">
              How It Works
            </button>
          </motion.div>

          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="stat">
              <span className="stat-value">2,500+</span>
              <span className="stat-label">Foods Recognized</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">98%</span>
              <span className="stat-label">Accuracy Rate</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">&lt;2s</span>
              <span className="stat-label">Analysis Time</span>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="visual-card">
            <div className="visual-header">
              <span className="visual-dot red"></span>
              <span className="visual-dot yellow"></span>
              <span className="visual-dot green"></span>
            </div>
            <div className="visual-content">
              <div className="food-preview">
                <div className="food-icon">🍛</div>
                <div className="food-scan-line"></div>
              </div>
              <div className="nutrition-preview">
                <div className="nutrient">
                  <span className="nutrient-name">Calories</span>
                  <div className="nutrient-bar cal"></div>
                  <span className="nutrient-value">450 kcal</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Protein</span>
                  <div className="nutrient-bar protein"></div>
                  <span className="nutrient-value">28g</span>
                </div>
                <div className="nutrient">
                  <span className="nutrient-name">Carbs</span>
                  <div className="nutrient-bar carbs"></div>
                  <span className="nutrient-value">52g</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="floating-badge badge-1">
            <span>🥗</span> Detected: Biryani
          </div>
          <div className="floating-badge badge-2">
            <span>✓</span> High Protein
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;

