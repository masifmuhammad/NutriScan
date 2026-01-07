import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Scanner from './components/Scanner';
import Results from './components/Results';
import History from './components/History';
import Footer from './components/Footer';
import FoodSearch from './components/FoodSearch';
import api from './services/api';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [todayStats, setTodayStats] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });

  useEffect(() => {
    loadHistory();
    loadTodayStats();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory(7);
      setHistory(data);
    } catch (err) {
      console.log('No history yet');
    }
  };

  const loadTodayStats = async () => {
    try {
      const data = await api.getTodayStats();
      setTodayStats(data);
    } catch (err) {
      console.log('No stats yet');
    }
  };

  const [scanError, setScanError] = useState(null);
  const [showFoodSearch, setShowFoodSearch] = useState(false);
  const [lastImageUrl, setLastImageUrl] = useState(null);

  const handleScan = async (file) => {
    setLastImageUrl(URL.createObjectURL(file));
    setScanning(true);
    setResults(null);
    setScanError(null);
    
    try {
      const data = await api.scanFood(file);
      setResults(data);
      setCurrentView('results');
      loadHistory();
      loadTodayStats();
    } catch (err) {
      console.error('Scan failed:', err);
      // Handle "not food" errors
      if (err.response?.data?.error === 'not_food') {
        setScanError({
          title: "That's not food! 😅",
          message: err.response.data.message,
          suggestion: err.response.data.suggestion
        });
      } else {
        setScanError({
          title: "Scan failed",
          message: "Something went wrong. Please try again.",
          suggestion: "Make sure the image is clear and well-lit."
        });
      }
    } finally {
      setScanning(false);
    }
  };

  const handleLogMeal = async () => {
    if (!results) return;
    try {
      await api.logMeal(results.id);
      loadHistory();
      loadTodayStats();
      setCurrentView('home');
      setResults(null);
    } catch (err) {
      console.error('Failed to log meal:', err);
    }
  };

  const handleWrongFood = () => {
    setShowFoodSearch(true);
  };

  const handleManualFoodSelect = async (foodId) => {
    setShowFoodSearch(false);
    try {
      const data = await api.getManualFood(foodId, lastImageUrl);
      setResults(data);
    } catch (err) {
      console.error('Failed to get food data:', err);
    }
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView}
        todayCalories={todayStats.calories}
      />
      
      <main className="main">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hero onStartScan={() => setCurrentView('scan')} />
              <History history={history} todayStats={todayStats} />
            </motion.div>
          )}

          {currentView === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Scanner 
                onScan={handleScan} 
                scanning={scanning}
                onBack={() => setCurrentView('home')}
                scanError={scanError}
                onClearError={() => setScanError(null)}
              />
            </motion.div>
          )}

          {currentView === 'results' && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <Results 
                results={results}
                onLog={handleLogMeal}
                onRescan={() => setCurrentView('scan')}
                onWrongFood={handleWrongFood}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Manual Food Search Modal */}
      <AnimatePresence>
        {showFoodSearch && (
          <FoodSearch
            onSelect={handleManualFoodSelect}
            onClose={() => setShowFoodSearch(false)}
            imageUrl={lastImageUrl}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

